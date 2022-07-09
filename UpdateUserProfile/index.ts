import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { connect } from "../src/config/db.config";
import { User } from "../src/models/user.model";
import * as jwt from "jsonwebtoken";
import { UserUpdateInfo } from "../src/types/validationInput";
import { updateUserProfile } from "../src/controllers/User/updateUserProfile/updateUserProfile";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const HEADERS = { "Content-Type": "application/json" };

  if (!req.body) {
    context.res = {
      error: true,
      status: 400,
      message: "Body content is empty!",
    };

    return;
  }

  connect();

  try {
    let token, user;

    if (req.headers.authorization.startsWith("Bearer")) {
      try {
        token = req.headers.authorization.split(" ")[1];
        if (token) {
          const decoded = jwt.verify(token, process.env.JWT_KEY);
          //find the user by id
          user = await User.findById(decoded.id).select("-password");
        }
      } catch (error) {
        context.res = {
          Headers: HEADERS,
          status: 400,
          body: {
            message: "User not authenticated",
          },
        };
        return;
      }
    } else {
      context.res = {
        Headers: HEADERS,
        status: 500,
        body: {
          message: "No authorization token detected",
        },
      };
      return;
    }

    const { id } = user;
    req.body.id = id;
    const body: UserUpdateInfo = req.body;

    const result = await updateUserProfile(body);

    if (result) {
      context.res = {
        Headers: HEADERS,
        status: 500,
        body: {
          message: result.message,
        },
      };
    } else {
      context.res = {
        Headers: HEADERS,
        status: 200,
        body: {
          message: "User updated successfully",
        },
      };
    }
  } catch (error) {
    context.res = {
      Headers: HEADERS,
      status: 500,
      body: {
        message: JSON.stringify({
          error: error.message,
        }),
      },
    };
  }
};

export default httpTrigger;
