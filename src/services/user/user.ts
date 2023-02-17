import {
  Service,
  response,
  notExistError,
  UserData,
  incorrectCredentials,
  generateToken,
  LoginData,
} from "../../utils";
import { service } from "../../core";
import bcrypt from "bcrypt";
import { findUserByEmailOrPhone } from "../../repos";

export const signInUser: Service<LoginData> = ({ validatedData }) =>
  service(async () => {
    const { email, password } = validatedData;
    const { data: foundUser, error } = await findUserByEmailOrPhone(email);

    if (error) return response.serverError(error);
    if (!foundUser) return response.conflict(notExistError("Email or Phone"));
    const match = await bcrypt.compare(password, foundUser.password ?? "");
    if (!match) return response.conflict(incorrectCredentials);

    const user = foundUser as UserData;

    const token = await generateToken({
      id: user.id,
      email: user.email,
    });

    if (!token) return response.serverError();
    return response.success({ user, token }, "User logged in successfully");
  });
