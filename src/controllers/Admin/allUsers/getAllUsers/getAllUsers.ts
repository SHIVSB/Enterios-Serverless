import { User } from "../../../../models/user.model";

export const getAllUsers = async () => {
  try {
    const users = await User.find({}).lean();

    return {
      error: false,
      message: users,
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
