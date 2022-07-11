import { CustomerProject } from "../../../../models/customerProject.model";
import { ProjectAssignmentInput } from "../../../../types/validationInput";
import { projectConstants } from "../../../../constants/projectConstants";

export const assignProject = async (body: ProjectAssignmentInput) => {
  try {
    const project = await CustomerProject.findByIdAndUpdate(body.projectId, {
      projectName: body.projectName,
      projectConfirmationStatus:
        projectConstants.projectStatus.projectConfirmed,
      projectAssigned: true,
      projectAssignee: body.assigneeId,
    });

    project.save();

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
