import { CustomerProject } from "../../../../models/customerProject.model";

export const getAllProjects = async () => {
  try {
    const projects = await CustomerProject.find({}).lean();

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
