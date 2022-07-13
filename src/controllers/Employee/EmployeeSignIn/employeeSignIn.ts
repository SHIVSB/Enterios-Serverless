import { Employee } from "../../../models/employee.model";
import { EmployeeSignInInput } from "../../../types/validationInput";

export const employeeSignIn = async (body: EmployeeSignInInput) => {
  try {
    const employee = await Employee.findOne({ email: body.email });

    if (!employee) {
      return {
        error: true,
        message: "Employee not found",
      };
    }

    const passwordMatch = await employee.comparePassword(body.password);

    if (passwordMatch) {
      return {
        error: false,
        message: "Employee successfully logged in",
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
