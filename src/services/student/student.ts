import {
  Service,
  response,
  databaseError,
  // sendEmail,
  generateRandomDigits,
  existError,
  CreateStudentData,
} from "../../utils";
import { service } from "../../core";
import bcrypt from "bcrypt";
import { createToken, createStudent, findUserByEmailPhone } from "../../repos";

export const signUpStudent: Service<CreateStudentData> = ({ validatedData }) =>
  service(async () => {
    const { username, phone, email, password, ...customerData } = validatedData;

    const { data: emailExist, error: emailExistError } =
      await findUserByEmailPhone(email, phone);

    if (emailExistError) return response.serverError(emailExistError);
    if (emailExist) return response.conflict(existError("Email or Phone"));
    const { data: customer, error: registrationError } = await createStudent({
      ...customerData,
      phone,
      username,
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password, 10),
    });
    if (registrationError) return response.failed(registrationError);
    if (!customer) return response.serverError(databaseError);
    const token = generateRandomDigits(6);
    await createToken(customer.user.id, Number(token));
    // const message = `use this ${token} to verify your account.`;
    // await sendEmail([email], message, "Verify Account");
    return response.created(
      token,
      "Account created successfully, kindly proceed to verify account"
    );
  });
