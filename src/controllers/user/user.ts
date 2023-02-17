import { signInUser } from "../../services";
import { controller } from "../../core";
import { Controller } from "../../utils";
import { loginSchema } from "../../schemas";

export const loginStudent: Controller = (req, res) =>
  controller({
    req,
    res,
    service: signInUser,
    params: { id: Number(req.params.id) },
    validation: { schema: loginSchema },
  });
