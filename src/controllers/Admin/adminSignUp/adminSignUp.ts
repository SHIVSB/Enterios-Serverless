import { Employee } from "../../../models/employee.model";
import { AdminSignUpInput } from "../../../types/validationInput";

export const adminSignUp = async (body: AdminSignUpInput) => {
  try {
    if (await Employee.findOne({ email: body.email }).lean()) {
      return {
        error: true,
        message: "Admin email already exists in the database!",
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
    employee.role = body.role;
    employee.linkedinProfile = body.linkedinProfile;
    employee.save();

    return {
      message: JSON.stringify({
        result: "Admin account created successfully!",
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
