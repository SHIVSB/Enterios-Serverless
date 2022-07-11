import { CustomerProject } from "../../../../models/customerProject.model";
import { ProjectIdInput } from "../../../../types/validationInput";

export const getProjectById = async (body: ProjectIdInput) => {
  try {
    const projects = await CustomerProject.findById(body.projectId).lean();

    return {
      error: false,
      message: projects,
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
