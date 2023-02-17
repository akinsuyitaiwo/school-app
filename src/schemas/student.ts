import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(2).max(20).required(),
  email: Joi.string().required(),
  password: Joi.string().required().min(6).max(16),
  phone: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
