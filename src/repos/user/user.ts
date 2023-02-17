import { repo } from "../../core";
import { db } from "../../models";

export const findUserByEmail = (email: string) =>
  repo(() =>
    db.users.findFirst({
      where: {
        email,
      },
      include: { student: true, tutor: true },
    })
  );

export const expireToken = (id: number) =>
  repo(() =>
    db.otps.update({
      where: { id },
      data: { expired: true },
    })
  );

export const createToken = (id: number, token: number) =>
  repo(() =>
    db.otps.create({
      data: { userId: id, token },
    })
  );

export const findUserById = (id: number) =>
  repo(() =>
    db.users.findUnique({
      where: {
        id,
      },
    })
  );

export const findUserByEmailOrPhone = (email: string) =>
  repo(() =>
    db.users.findFirst({
      where: { OR: [{ phone: email }, { email }] },
    })
  );

export const findUserByEmailPhoneUsername = (
  email: string,
  phone: string,
  username: string
) =>
  repo(() =>
    db.users.findFirst({
      where: { OR: [{ phone }, { email }, { username }] },
    })
  );

export const findUserByEmailPhone = (email: string, phone: string) =>
  repo(() =>
    db.users.findFirst({
      where: { OR: [{ phone }, { email }] },
    })
  );
