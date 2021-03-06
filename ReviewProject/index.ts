import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { reviewProject } from "../src/controllers/Admin/allProjects/reviewProject/reviewProject";
import { ProjectReviewInput, TokenInput } from "../src/types/validationInput";
import { adminAuthentication } from "../src/utils/adminAuthentication";
import { connect } from "../src/config/db.config";
import * as sgMail from "@sendgrid/mail";

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
        const body: ProjectReviewInput = req.body;

        // add email functionality here so that customer
        // can confirm the project details

        const confirmDetails = `Dear customer, you are requested to confirm the project details submitted with Enterios limited.
                                Once this request is confirmed we will start the work on your project.
                                Thank you.
                                Project City : ${body.projectCity}
                                Project Area : ${body.projectArea}
                                Project Type : ${body.projectType}
                                Project Estimate : ${body.projectEstimate}

                                If you want to edit any of the details, please mail the request to enterios@gmail.com.

                                If all details are correct, Please click on the link below to confirm the project details.
                                <a href="http://localhost:7071/api/customerprojectconfirmation></a>`;
        const msg = {
          to: body.customerEmail, // Change to your recipient
          from: "shivtechnica02@gmail.com", // Change to your verified sender
          subject: "Confirm the project details.",
          html: confirmDetails
        };

        const emailMsg = await sgMail.send(msg);

        const project = await reviewProject(body);

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
              mailedMessage: confirmDetails
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
