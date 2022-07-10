import mongoose from "mongoose";
import { projectConstants } from "../constants/projectConstants";

export type customerProjectDocument = mongoose.Document & {
  customerId: Array<object>;
  projectCity: string;
  projectArea: number;
  projectType: string;
  projectEstimate: number;
  projectDuration: number;
  projectName: string;
  projectConfirmationStatus: string;
  projectAssigned: boolean;
  projectAssignee: object;
  location: Array<number>;
  projectCancelled: boolean;
  projectCompleted: boolean;
};

const customerProjectSchema = new mongoose.Schema<customerProjectDocument>(
  {
    customerId: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      ],
      projectCity: {
        type: String,
        required: true,
      },
      projectArea: {
        type: Number,
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
        ref: "employee",
      },
      location: {
        type: Array,
      },
      projectCancelled: {
        type: Boolean,
      },
      projectCompleted: {
        type: Boolean,
      },
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
