import { CustomerProject } from "../../../../models/customerProject.model";

export const getAllAssignedProjects = async () => {
  try {
    const projects = await CustomerProject.find({
      projectAssigned: true,
    }).populate("projectAssignee").lean();

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
