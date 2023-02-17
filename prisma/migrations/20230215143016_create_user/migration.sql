-- CreateEnum
CREATE TYPE "enum_Gender" AS ENUM ('female', 'male', 'nb');

-- CreateEnum
CREATE TYPE "enum_Role" AS ENUM ('admin', 'student', 'tutor');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "username" VARCHAR(255) NOT NULL DEFAULT '',
    "phone" TEXT DEFAULT '',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "enum_Role",

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tutors" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255) DEFAULT '',
    "lastName" VARCHAR(255) DEFAULT '',
    "photo" VARCHAR(255) DEFAULT '',
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gender" "enum_Gender" NOT NULL DEFAULT 'nb',

    CONSTRAINT "Tutors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255) DEFAULT '',
    "lastName" VARCHAR(255) DEFAULT '',
    "photo" TEXT DEFAULT '',
    "dob" TEXT DEFAULT '',
    "gender" "enum_Gender",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otps" (
    "id" SERIAL NOT NULL,
    "token" INTEGER NOT NULL,
    "expired" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Otps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tutors_userId_key" ON "Tutors"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Students_userId_key" ON "Students"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Otps_userId_key" ON "Otps"("userId");

-- AddForeignKey
ALTER TABLE "Tutors" ADD CONSTRAINT "Tutors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Otps" ADD CONSTRAINT "Otps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
