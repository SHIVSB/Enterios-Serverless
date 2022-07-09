import mongoose from "mongoose";
const bcrypt = require("bcryptjs");

export type userDocument = mongoose.Document & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city: string;
  comparePassword: comparePasswordFunction;
};

type comparePasswordFunction = (userPassword: string) => Promise<boolean>;

const userSchema = new mongoose.Schema<userDocument>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      default: "NP",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function save(next) {
  const user = this as userDocument;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt
      .hash(user.password, salt)
      .then((hashedPassword: string) => {
        user.password = hashedPassword;
        next();
      })
      .catch((err) => console.log(err));
  });
});

const comparePassword: comparePasswordFunction = async function (userPassword) {
  try {
    return await bcrypt.compare(userPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<userDocument>("User", userSchema);
