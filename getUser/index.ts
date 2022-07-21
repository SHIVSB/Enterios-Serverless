import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { connect } from "../src/config/db.config";
import { adminAuthentication } from "../src/utils/adminAuthentication";
import { TokenInput } from "../src/types/validationInput";
import { getUser } from "../src/controllers/Admin/allUsers/getUser/getUser";


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const HEADERS = { "Content-Type": "application/json" }

    connect();

    try {
        if (req.headers.authorization.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1];
            const data: TokenInput = { token };
            const result = await adminAuthentication(data);

            if (result.error) {
                context.res = {
                    Headers: HEADERS,
                    status: 500,
                    body: {
                        message: result.message,
                    },
                };
            } else {

                const user = await getUser(req.query.userid);

                if (user) {
                    context.res = {
                        Headers: HEADERS,
                        status: 500,
                        body: {
                            message: user.message,
                        },
                    };
                    return;
                } else {
                    context.res = {
                        Headers: HEADERS,
                        status: 200,
                        body: {
                            message: "User fetched successfully successfully",
                        },
                    };
                }
            }

        } else {
            context.res = {
                Headers: HEADERS,
                status: 500,
                body: {
                    message: "No authorization token detected",
                },
            };
        }
    } catch (error) {
        context.res = {
            Headers: HEADERS,
            status: 500,
            body: JSON.stringify({
                message: error.message,
            }),
        };
    }

};

export default httpTrigger;