import { User } from "../../../models/user.model";
import { UserSignUpInput } from "../../../types/validationInput";

export const userSignUp = async (body: UserSignUpInput) => {
  try {
    if (await User.findOne({ email: body.email }).lean()) {
      return {
        error: true,
        message: "User email already exists",
      };
    }

    const user = new User();
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.email = body.email;
    user.password = body.password;
    user.save();

  } catch (error) {
    return {
      error: true,
      message: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
