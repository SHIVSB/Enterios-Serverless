import { CustomerProject } from "../../../../models/customerProject.model";

export const getAllCancelledProjects = async () => {
  try {
    const projects = await CustomerProject.find({
      projectCancelled: true,
    }).lean();

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
