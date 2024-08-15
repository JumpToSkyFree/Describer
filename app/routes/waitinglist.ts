import { db } from "../db";
import { z } from "zod";
import { json } from "@remix-run/node";
import {
  FieldsResponseErrors,
  JoinWaitingListServerContext,
  WaitingListUserInformations,
} from "~/components/interfaces";
import {
  PrismaClientKnownRequestError,
  // PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export const userInformationsValidator = z.object({
  fullname: z.string().min(1),
  email: z.string().min(1),
});

export function isEmailAlreadyExists(response: JoinWaitingListServerContext) {
  if (response && "errors" in response) {
    return response.errors["email"].codes.at(0) === "already_exists";
  }

  return false;
}

export async function checkUserInformation(formData: FormData) {
  let result: WaitingListUserInformations;

  try {
    result = userInformationsValidator.parse({
      fullname: formData.get("fullname"),
      email: formData.get("email"),
    });
  } catch (e) {
    const result = e as Zod.ZodError;
    const errors: FieldsResponseErrors = {
      success: false,
      errors: {},
      data: {
        fullname: formData.get("fullname"),
        email: formData.get("email"),
      },
    };

    result.issues.forEach((issue) => {
      const field = issue.path[0];

      errors.errors[field] = { codes: [issue.code] };
    });

    return json(errors);
  }

  try {
    const { email, fullname } = await db.userWaiting.create({ data: result });
    return json({ email, fullname, success: true });
  } catch (e) {
    const response: FieldsResponseErrors<WaitingListUserInformations> = {
      success: false,
      errors: {},
      data: {
        fullname: formData.get("fullname") as string,
        email: formData.get("email") as string,
      },
    };

    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        if (e.meta && e.meta.target) {
          (e.meta.target as Array<string>).map((field) => {
            // response.errors[field]["codes"] = ["already_exists"];

            if (!response.errors[field]) {
              response.errors[field] = {
                codes: ["already_exists"],
              };
            }
          });
        }
      }
    }

    return json(response);
  }
}
