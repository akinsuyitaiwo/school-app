import { enumGender } from "./student";

export interface UserData {
  id: number;
  email: string;
  phone: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  dob?: string;
  gender?: enumGender;
}

export interface LoginData {
  email: string;
  password: string;
  gender?: enumGender;
}

export enum UserRole {
  TUTOR = "tutor",
  STUDENT = "student",
  ADMIN = "admin",
}
