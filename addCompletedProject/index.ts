import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { employeeAuthentication } from "../src/utils/employeeAuthentication";
import { ProjectInfo } from "../src/types/validationInput";
import { TokenInput } from "../src/types/validationInput";
import { addCompletedProject } from "../src/controllers/Employee/AddCompletedProject/addCompletedProject";
import { connect } from "../src/config/db.config";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const HEADERS = { "Content-Type": "application/json" };

  if (!req.body) {
    context.res = {
      Headers: HEADERS,
      status: 400,
      body: {
        message: "Body content is empty!",
      },
    };
    return;
  }

  connect();

  try {
    if (req.headers.authorization.startsWith("Bearer")) {
      const token = req.headers.authorization.split(" ")[1];
      const data: TokenInput = { token };
      const result = await employeeAuthentication(data);
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
        req.body.id = result.message.id;
        const body: ProjectInfo = req.body;
        const project = await addCompletedProject(body);

        if (project) {
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
              message: "Project added successfully",
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
      body: {
        message: JSON.stringify({
          error: error.message,
        }),
      },
    };
  }
};

export default httpTrigger;
