import { User } from "../../../models/user.model";
import { UserSignInInput } from "../../../types/validationInput";

export const userSignIn = async (
  body: UserSignInInput
): Promise<{
  error: boolean;
  message: string;
  profile?: any;
}> => {
  try {
    const user = await User.findOne({ email: body.email });

    if (!user) {
      return {
        error: true,
        message: "User not found",
      };
    }

    const passwordMatch = await user.comparePassword(body.password);

    if (passwordMatch) {
      return {
        error: false,
        message: "User successfully logged in",
      };
    } else {
      return {
        error: true,
        message: "Invalid Password",
      };
    }
  } catch (error) {
    return {
      error: true,
      message: "Internal server error",
    };
  }
};
