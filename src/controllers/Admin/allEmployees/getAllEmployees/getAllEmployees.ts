import { Employee } from "../../../../models/employee.model";

export const getAllEmployees = async () => {
  try {
    const employees = await Employee.find({}).lean();

    return {
      error: false,
      message: employees,
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
