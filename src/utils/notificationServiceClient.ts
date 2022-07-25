/**
 * 
 * Login to make POST call to the Enterios notification service app
 * 
 * 
 */

const {Client} = require("node-rest-client");

const client = new Client();

exports.client = Client

/**
 * Expose a function which will take the following information
 * 
 * subject, content, recepientEmails, requester, ticketId
 * 
 * and then make post call
 */

import { AssignTicketInput } from "../types/validationInput";

export const notificationServiceClient = (body: AssignTicketInput) => {
    const reqBody = {
        subject: body.subject,
        content: body.content,
        recepientEmails: body.emailIds,
        requester: body.requester,
        ticketId: body.ticketId
    }

    const headers = {
        "Content-Type": "application/json"
    }

    const args = {
        data: reqBody,
        headers: headers
    }

    var req = client.post("http://127.0.0.1:7777/notifServ/api/v1/notifications", args, (data, response) => {
        console.log("Request sent");
        console.log(data);
    })


    // check error while POST call
    req.on('requestTimeout', function (req) {
        console.log('request has expired');
        req.abort();
    });

    req.on('responseTimeout', function (res) {
        console.log('response has expired');
    });

    req.on('error', function (err) {
        console.log('request error', err);
    })
}