import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { adminAuthentication } from "../src/utils/adminAuthentication";
import { TokenInput } from "../src/types/validationInput";
import { getAllEmployees } from "../src/controllers/Admin/allEmployees/getAllEmployees/getAllEmployees";
import { connect } from "../src/config/db.config";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const HEADERS = { "Content-Type": "application/json" };

  connect();

  try {
    if (req.headers.authorization.startsWith("Bearer")) {
      const token = req.headers.authorization.split(" ")[1];
      const data: TokenInput = { token };
      const result = await adminAuthentication(data);
      // console.log(result);

      if (result.error) {
        context.res = {
          Headers: HEADERS,
          status: 500,
          body: {
            message: result.message,
          },
        };
        return;
      } else {
        const employees = await getAllEmployees();

        if (employees.error) {
          context.res = {
            Headers: HEADERS,
            status: 500,
            body: {
              message: employees.message,
            },
          };
          return;
        } else {
          context.res = {
            Headers: HEADERS,
            status: 200,
            body: {
              message: employees.message,
            },
          };
        }
      }
    } else {
      context.res = {
        Headers: HEADERS,
        status: 500,
        body: {
          message: "No token detected",
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
