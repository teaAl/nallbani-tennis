/*
  Warnings:

  - Added the required column `experienceLvl` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('Beginner', 'Novice', 'Intermediate', 'Advanced', 'Professional');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "experienceLvl" "ExperienceLevel" NOT NULL;
