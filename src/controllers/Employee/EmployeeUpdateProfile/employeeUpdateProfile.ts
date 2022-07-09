import { Employee } from "../../../models/employee.model";
import { EmployeeUpdateInfo } from "../../../types/validationInput";

export const updateEmployeeProfile = async (body: EmployeeUpdateInfo) => {
  try {
    if (body.firstName) {
      await Employee.findByIdAndUpdate(
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
      await Employee.findByIdAndUpdate(
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
      await Employee.findByIdAndUpdate(
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
      await Employee.findByIdAndUpdate(
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

    if (body.phone) {
      await Employee.findByIdAndUpdate(
        body.id,
        {
          phone: body.phone,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    if (body.city) {
      await Employee.findByIdAndUpdate(
        body.id,
        {
          city: body.city,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    if (body.profilePhoto) {
      await Employee.findByIdAndUpdate(
        body.id,
        {
          profilePhoto: body.profilePhoto,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    if (body.bio) {
      await Employee.findByIdAndUpdate(
        body.id,
        {
          bio: body.bio,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    if (body.linkedinProfile) {
      await Employee.findByIdAndUpdate(
        body.id,
        {
          linkedinProfile: body.linkedinProfile,
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
