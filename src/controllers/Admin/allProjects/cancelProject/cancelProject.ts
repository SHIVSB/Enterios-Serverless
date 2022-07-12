import { projectConstants } from "../../../../constants/projectConstants";
import { CustomerProject } from "../../../../models/customerProject.model";
import { ProjectCancelInput } from "../../../../types/validationInput";

export const cancelProject = async (body: ProjectCancelInput) => {
  try {
    const project = await CustomerProject.findByIdAndUpdate(
      body.projectId,
      {
        projectConfirmationStatus:
          projectConstants.projectStatus.projectCancelled,
        projectCancelled: true,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return {
      error: false,
      message: project,
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
