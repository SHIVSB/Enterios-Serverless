import mongoose from "mongoose";
import { projectConstants } from "../constants/projectConstants";

export type customerProjectDocument = mongoose.Document & {
  customerId: object;
  projectCity: string;
  projectArea: number;
  projectType: string;
  projectEstimate: number;
  projectDuration: number;
  projectName: string;
  projectConfirmationStatus: string;
  projectAssigned: boolean;
  projectAssignee: object;
  location: object;
  projectCancelled: boolean;
  projectCompleted: boolean;
};

const customerProjectSchema = new mongoose.Schema<customerProjectDocument>(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer Id is required || Login required"],
    },
    projectCity: {
      type: String,
      required: true,
    },
    projectArea: {
      type: Number,
      default: 0,
    },
    projectType: {
      type: String,
      required: [true, "Project type is required. Commercial || Residential"],
      enum: [
        projectConstants.type.residential,
        projectConstants.type.commercial,
      ],
    },
    projectEstimate: {
      type: Number,
      default: 0,
    },
    projectDuration: {
      type: Number,
    },
    projectName: {
      type: String,
    },
    projectConfirmationStatus: {
      type: String,
      enum: [
        projectConstants.projectStatus.underReview,
        projectConstants.projectStatus.reviewSuccessfull,
        projectConstants.projectStatus.projectConfirmed,
        projectConstants.projectStatus.projectCancelled,
      ],
      default: projectConstants.projectStatus.underReview,
    },
    projectAssigned: {
      type: Boolean,
      default: false,
    },
    projectAssignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    location: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
    projectCancelled: {
      type: Boolean,
    },
    projectCompleted: {
      type: Boolean,
    },
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

export const CustomerProject = mongoose.model<customerProjectDocument>(
  "CustomerProject",
  customerProjectSchema
);
