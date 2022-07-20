import { Ticket } from "../../../models/ticket.model";
import { TicketInput } from "../../../types/validationInput";
import { User } from "../../../models/user.model";

export const createTicket = async (body: TicketInput) => {
    try {
        const ticket = new Ticket();
        ticket.title = body.title;
        ticket.description = body.description;
        ticket.reporter = body.reporter;
        ticket.save();
    } catch (error) {
        return {
            error: true,
            message: JSON.stringify({
                error: error.message,
            }),
        };
    }
};
