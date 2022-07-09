import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { connect } from "../src/config/db.config";
import { userSignIn } from "../src/controllers/User/userSignIn/userSignIn";
import { User } from "../src/models/user.model";
import { UserSignInInput } from "../src/types/validationInput";
import { createToken } from "../src/utils/createToken";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const HEADERS = { "Content-Type": "application/json" };
  connect();
  try {
    const body: UserSignInInput = req.body;

    const result = await userSignIn(body);

    if (result.error) {
      context.res = {
        status: 400,
        body: {
          message: result.message,
        },
        headers: HEADERS,
      };
    } else {
      const userfound = await User.findOne({ email: body.email });
      const token = await createToken(userfound._id);
      context.res = {
        status: 200,
        body: {
          message: result.message,
          token: token.message,
        },
        headers: HEADERS,
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
