import Joi from "joi";

export const InitFileUploadSchema = Joi.object({
  type: Joi.string().required(),
  email: Joi.string().optional(),
});
