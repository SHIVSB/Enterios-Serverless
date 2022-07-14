import { User } from "../../../models/user.model";
import { UserUpdateInfo } from "../../../types/validationInput";

export const updateUserProfile = async (body: UserUpdateInfo) => {
  try {
    if (body.firstName) {
      await User.findByIdAndUpdate(
        body.id,
        {
          firstName: body.firstName,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    if (body.lastName) {
      await User.findByIdAndUpdate(
        body.id,
        {
          lastName: body.lastName,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    if (body.email) {
      await User.findByIdAndUpdate(
        body.id,
        {
          email: body.email,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    if (body.password) {
      await User.findByIdAndUpdate(
        body.id,
        {
          password: body.password,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }
  } catch (error) {
    return {
      error: true,
      message: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
