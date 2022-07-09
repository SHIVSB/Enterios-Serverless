import { User } from "../models/user.model";
import * as jwt from "jsonwebtoken";
import { TokenInput } from "../types/validationInput";

// req.headers.authorization.startsWith("Bearer")
// token = req.headers.authorization.split(" ")[1];

export const userAuthentication = async (data: TokenInput) => {
  let user;

  try {
    if (data.token) {
      const decoded = jwt.verify(data.token, process.env.JWT_KEY);
      //find the user by id
      user = await User.findById(decoded.id).select("-password");

      return {
        error: false,
        message: user,
      };
    }
  } catch (error) {
    return {
      error: true,
      message: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
