import { Employee } from "../../../models/employee.model";
import { ProjectInfo } from "../../../types/validationInput";

export const addCompletedProject = async (body: ProjectInfo) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      body.id,
      {
        $push: {
          projects: {
            projectName: body.projectName,
            projectCity: body.projectCity,
            projectArea: body.projectArea,
            projectDuration: body.projectDuration,
            projectEstimate: body.projectEstimate,
          },
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    employee.save();
  } catch (error) {
    return {
      error: true,
      message: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
