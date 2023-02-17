export interface CreateStudentData {
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

export enum enumGender {
  FEMALE = "female",
  MALE = "male",
  NB = "nb",
}
