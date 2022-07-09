import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { connect } from "../src/config/db.config";
import { UserSignUpInput } from "../src/types/validationInput";
import { userSignUp } from "../src/controllers/User/userSignUp/userSignUp";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const HEADERS = { "Content-Type": "application/json" };

  if (!req.body) {
    // console.log(req.body);
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
    const body: UserSignUpInput = req.body;
    const result = await userSignUp(body);

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
          message: "Signed up successfully",
        },
      };
    }
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
