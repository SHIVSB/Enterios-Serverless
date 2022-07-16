import mongoose from "mongoose";

export type emailMessagingDocument = mongoose.Document & {
  from: string;
  to: string;
  message: string;
  subject: string;
};

const emailMessagingSchema = new mongoose.Schema<emailMessagingDocument>(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const EmailMessage = mongoose.model<emailMessagingDocument>(
  "EmailMessage",
  emailMessagingSchema
);
