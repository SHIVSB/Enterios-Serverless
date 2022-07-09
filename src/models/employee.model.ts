import mongoose from "mongoose";
import * as bcrypt from "bcryptjs";

export type employeeDocument = mongoose.Document & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: number;
  city: string;
  profilePhoto: string;
  bio: string;
  role: string;
  isAccountVerified: boolean;
  accountVerificationToken: string;
  accountVerificationTokenExpires: Date;
  linkedinProfile: string;
  projects: [
    {
      projectName: string;
      projectCity: string;
      projectArea: string;
      projectDuration: number;
      projectEstimate: number;
    }
  ];
  comparePassword: comparePasswordFunction;
};

type comparePasswordFunction = (employeePassword: string) => Promise<boolean>;

const employeeSchema = new mongoose.Schema<employeeDocument>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
    },
    bio: {
      type: String,
      default: "No bio provided",
    },
    role: {
      type: String,
      default: "EMPLOYEE",
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    accountVerificationToken: {
      type: String,
    },
    accountVerificationTokenExpires: Date,
    linkedinProfile: {
      type: String,
      default: "#",
    },
    projects: [
      {
        projectName: {
          type: String,
        },
        projectCity: {
          type: String,
        },
        projectArea: {
          type: String,
        },
        projectDuration: {
          type: Number,
        },
        projectEstimate: {
          type: Number,
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

employeeSchema.pre("save", function save(next) {
  const employee = this as employeeDocument;
  if (!employee.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt
      .hash(employee.password, salt)
      .then((hashedPassword: string) => {
        employee.password = hashedPassword;
        next();
      })
      .catch((err) => console.log(err));
  });
});

const comparePassword: comparePasswordFunction = async function (
  employeePassword
) {
  try {
    return await bcrypt.compare(employeePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

employeeSchema.methods.comparePassword = comparePassword;

export const Employee = mongoose.model<employeeDocument>(
  "Employee",
  employeeSchema
);
