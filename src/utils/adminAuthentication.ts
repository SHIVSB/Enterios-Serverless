import { Employee } from "../models/employee.model";
import * as jwt from "jsonwebtoken";
import { TokenInput } from "../types/validationInput";

export const adminAuthentication = async (data: TokenInput) => {
  let ADMIN;

  try {
    if (data.token) {
      const decoded = jwt.verify(data.token, process.env.JWT_KEY);
      //find the user by id
      console.log(decoded.id);
      ADMIN = await Employee.findById(decoded.id).select("-password");

      if (!ADMIN.role || ADMIN.role !== "ADMIN") {
        return {
          error: true,
          message: "User not authorized",
        };
      }

      return {
        error: false,
        message: ADMIN,
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
