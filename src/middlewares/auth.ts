import {
  MiddleWare,
  noPermissionError,
  unauthorizedError,
  unknownServerError,
  UserRole,
  validateUserToken,
} from "../utils";
import { findUserByEmail } from "../repos";
import { Tutors, Students } from "../models";

export const isAuthenticated: MiddleWare = async (req, res, next) => {
  if (!req.get("Authorization"))
    if (req.authOptional) return next();
    else return res.status(401).send({ message: unauthorizedError });
  try {
    const token = (req.header("Authorization") || "Bearer _").split(" ")[1];

    const verified = await validateUserToken(token);
    if (!verified)
      if (req.authOptional) return next();
      else return res.status(401).send({ message: unauthorizedError });

    const { data: userData, error } = await findUserByEmail(verified.email);
    if (error || !userData)
      return res.status(500).send({
        message: error ?? unknownServerError,
      });

    const { student, tutor, ...user } = userData;
    req.user = user;
    req.tutor = tutor as Tutors;
    req.student = student as Students;
    req.token = token;
    return next();
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: unknownServerError });
  }
};

export const isTutor: MiddleWare = (req, res, next) => {
  try {
    if (req.user?.role === UserRole.TUTOR) return next();
    else return res.status(403).send({ message: noPermissionError });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: unknownServerError });
  }
};
export const isStudent: MiddleWare = (req, res, next) => {
  try {
    if (req.user?.role === UserRole.STUDENT) return next();
    else return res.status(403).send({ message: noPermissionError });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: unknownServerError });
  }
};

export const isAdmin: MiddleWare = (req, res, next) => {
  try {
    if (req.user?.role === UserRole.ADMIN) return next();
    else return res.status(403).send({ message: noPermissionError });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: unknownServerError });
  }
};
