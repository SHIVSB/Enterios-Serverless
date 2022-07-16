import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { User } from "../src/models/user.model";
import * as jwt from "jsonwebtoken";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const HEADERS = { "Content-Type": "application/json" };

    try {

        let token, user;
        if (req.headers.authorization.startsWith("Bearer")) {
            try {
                token = req.headers.authorization.split(" ")[1];
                if (token) {
                    const decoded = jwt.verify(token, process.env.JWT_KEY);
                    //find the user by id
                    user = await User.findById(decoded.id).select("-password");
                }

                if (user) {
                    context.res = {
                        Headers: HEADERS,
                        status: 200,
                        body: {
                            message: "Project data confirmed successfully by the customer",
                        },
                    }
                }

            } catch (error) {
                context.res = {
                    Headers: HEADERS,
                    status: 400,
                    body: {
                        message: "User not authenticated",
                    },
                };
                return;
            }
        }
    } catch (error) {

    }

};

export default httpTrigger;