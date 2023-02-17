/* eslint-disable require-jsdoc */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import config from "../config";

const hashed = bcrypt.hashSync(config.ADMIN_PASSWORD, 10);

const main = async () => {
  try {
    await prisma.users.upsert({
      where: { email: "admin@vuba.com" },
      update: {},
      create: {
        email: "admin@vuba.com",
        password: hashed,
        role: "admin",
        verified: true,
      },
    });
    // await prisma.location.createMany({ data: location });
    console.log("seeding done...");
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

main();
