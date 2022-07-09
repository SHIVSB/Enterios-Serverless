import { Employee } from "../models/employee.model";
import * as jwt from "jsonwebtoken";
import { TokenInput } from "../types/validationInput";

export const employeeAuthentication = async (data: TokenInput) => {
  let user;

  try {
    if (data.token) {
      const decoded = jwt.verify(data.token, process.env.JWT_KEY);
      //find the user by id
      console.log(decoded.id);
      user = await Employee.findById(decoded.id).select("-password");

      if (!user.role || user.role !== "EMPLOYEE") {
        return {
          error: true,
          message: "User not authorized",
        };
      }

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
