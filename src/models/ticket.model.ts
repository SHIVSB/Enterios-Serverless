import mongoose from "mongoose";
import { ticketConstants } from "../constants/ticketConstants";

export type ticketDocument = mongoose.Document & {
    title: string;
    description: string;
    ticketPriority: number;
    status: string;
    reporter: string;
    assignee: string;
};

const ticketSchema = new mongoose.Schema<ticketDocument>(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        ticketPriority: {
            type: Number,
            required: true,
            default: ticketConstants.ticketPriority.four  // possilbe values 1/2/3/4
        },
        status: {
            type: String,
            required: true,
            default: ticketConstants.ticketStatus.open  // possible values OPEN CLOSED BLOCKED
        },
        reporter: {
            type: String
        },
        assignee: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

export const Ticket = mongoose.model<ticketDocument>(
    "Ticket",
    ticketSchema
);
