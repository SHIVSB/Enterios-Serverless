import { Employee } from "../../../models/employee.model";
import { EmployeeSignUpInput } from "../../../types/validationInput";

export const employeeSignUp = async (body: EmployeeSignUpInput) => {
  try {
    if (await Employee.findOne({ email: body.email }).lean()) {
      return {
        error: true,
        message: "Employee email already exists in the database!",
      };
    }
    const employee = new Employee();
    employee.firstName = body.firstName;
    employee.lastName = body.lastName;
    employee.email = body.email;
    employee.password = body.password;
    employee.phone = body.phone;
    employee.city = body.city;
    employee.profilePhoto = body.profilePhoto;
    employee.bio = body.bio;
    employee.linkedinProfile = body.linkedinProfile;
    employee.save();

    return {
      message: JSON.stringify({
        result: "Employee successfully signed up",
      }),
    };
  } catch (error) {
    return {
      error: true,
      message: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
