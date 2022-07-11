import { CustomerProject } from "../../../../models/customerProject.model";
import { ProjectReviewInput } from "../../../../types/validationInput";
import { projectConstants } from "../../../../constants/projectConstants";

export const reviewProject = async (body: ProjectReviewInput) => {
  try {
    const project = await CustomerProject.findByIdAndUpdate(
      body.projectId,
      {
        projectCity: body.projectCity,
        projectArea: body.projectArea,
        projectType: body.projectType,
        projectConfirmationStatus:
          projectConstants.projectStatus.reviewSuccessfull,
        projectEstimate: body.projectEstimate,
      },
      {
        new: true,
        runValidators: true,
      }
    );

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
