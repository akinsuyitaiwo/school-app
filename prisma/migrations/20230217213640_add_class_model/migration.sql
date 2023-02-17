/*
  Warnings:

  - Added the required column `classId` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classId` to the `Tutors` table without a default value. This is not possible if the table is not empty.
  - Made the column `role` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "classId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tutors" ADD COLUMN     "classId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "username" DROP DEFAULT,
ALTER COLUMN "role" SET NOT NULL;

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tutors" ADD CONSTRAINT "Tutors_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
