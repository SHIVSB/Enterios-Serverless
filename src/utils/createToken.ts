import * as jwt from "jsonwebtoken";

export const createToken = async (id: string) => {
  try {
    const token = await jwt.sign({ id: id }, process.env.JWT_KEY, {
      expiresIn: "10d",
    });
    return {
      error: false,
      message: token,
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
