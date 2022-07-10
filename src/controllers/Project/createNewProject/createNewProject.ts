import { CustomerProject } from "../../../models/customerProject.model";
import { CustomerProjectInput } from "../../../types/validationInput";
import { User } from "../../../models/user.model";

export const createNewProject = async (body: CustomerProjectInput) => {
  try {
    const project = new CustomerProject();
    project.customerId = body.customerId;
    project.projectCity = body.projectCity;
    project.projectArea = body.projectArea;
    project.projectType = body.projectType;
    project.save();

    await User.findByIdAndUpdate(
      body.customerId,
      {
        $push: {
          projects: project._id,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } catch (error) {
    return {
      error: true,
      message: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
