import { signUpStudent } from "../../services";
import { controller } from "../../core";
import { Controller } from "../../utils";
import { registerSchema } from "../../schemas";

export const registerStudent: Controller = (req, res) =>
  controller({
    req,
    res,
    service: signUpStudent,
    validation: { schema: registerSchema },
  });
