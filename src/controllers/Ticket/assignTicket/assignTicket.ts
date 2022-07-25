import { Ticket } from "../../../models/ticket.model"
import { AssignTicketInput } from "../../../types/validationInput";
import { notificationServiceClient } from "../../../utils/notificationServiceClient";

export const assignTicket = async (body: AssignTicketInput) => {
    try {
        notificationServiceClient(body);
    } catch (error) {
        return {
            error: true,
            message: JSON.stringify({
                error: error.message,
            }),
        };
    }
}