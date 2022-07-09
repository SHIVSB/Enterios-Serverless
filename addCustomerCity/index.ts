import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { connect } from "../src/config/db.config";
import { User } from "../src/models/user.model";
import { AddCityInput } from "../src/types/validationInput";
import * as jwt from "jsonwebtoken";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const HEADERS = { "Content-Type": "application/json" };

  if (!req.body) {
    context.res = {
      Headers: HEADERS,
      status: 400,
      body: {
        message: "Body content is empty!",
      },
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

    const body: AddCityInput = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        city: body.city.toUpperCase(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    updatedUser.save();

    context.res = {
      Headers: HEADERS,
      status: 200,
      body: {
        message: "User city added/updated successfully",
      },
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: {
        message: JSON.stringify({
          error: error.message,
        }),
      },
      headers: HEADERS,
    };
  }
};

export default httpTrigger;
