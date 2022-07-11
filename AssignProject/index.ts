import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { assignProject } from "../src/controllers/Admin/allProjects/assignProject/assignProject";
import {
  ProjectAssignmentInput,
  TokenInput,
} from "../src/types/validationInput";
import { adminAuthentication } from "../src/utils/adminAuthentication";
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
        const body: ProjectAssignmentInput = req.body;
        const project = await assignProject(body);

        if (project.error) {
          context.res = {
            Headers: HEADERS,
            status: 500,
            body: {
              message: project.message,
            },
          };
          return;
        } else {
          context.res = {
            Headers: HEADERS,
            status: 200,
            body: {
              message: project.message,
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
  } catch (error) {}
};

export default httpTrigger;
