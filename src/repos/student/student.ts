import { repo } from "../../core";
import { db } from "../../models";
import { CreateStudentData } from "../../utils";

export const createStudent = ({
  email,
  password,
  phone,
  username,
  ...data
}: CreateStudentData) =>
  repo(() =>
    db.students.create({
      data: {
        ...data,
        user: {
          connectOrCreate: {
            where: { email },
            create: {
              email,
              password,
              phone,
              username,
              role: "student",
            },
          },
        },
      },
      include: {
        user: {
          select: { id: true, email: true, username: true, phone: true },
        },
      },
    })
  );
