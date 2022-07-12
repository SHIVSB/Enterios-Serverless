import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { connect } from "../src/config/db.config";
import { getAllAssignedProjects } from "../src/controllers/Admin/allProjects/assignedProjects/getAllAssignedProjects";
import { TokenInput } from "../src/types/validationInput";
import { adminAuthentication } from "../src/utils/adminAuthentication";

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
        const projects = await getAllAssignedProjects();

        if (projects.error) {
          context.res = {
            Headers: HEADERS,
            status: 500,
            body: {
              message: projects.message,
            },
          };
          return;
        } else {
          context.res = {
            Headers: HEADERS,
            status: 200,
            body: {
              message: projects.message,
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
