import * as sgMail from "@sendgrid/mail";
import { EmailMessageInput } from "../types/validationInput";
import { EmailMessage } from "../models/emailMessaging.model";

export const emailMessaging = async (body: EmailMessageInput) => {
    try {
        const msg = {
            to: body.to,
            subject: body.subject,
            text: body.message,
            from: "shivtechnica04@gmail.com"
        }

        await sgMail.send(msg);

        await EmailMessage.create({
            from: body.adminId,
            to: body.to,
            message: body.message,
            subject: body.subject
        })

        return {
            error: false,
            message: "Mail sent successfully"
        };
    } catch (error) {
        return {
            error: true,
            message: JSON.stringify({
                error: error.message,
            }),
        };
    }
}
