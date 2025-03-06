/*
  Warnings:

  - The values [exploratory,serious] on the enum `BookingType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookingSingle` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookingType_new" AS ENUM ('individual', 'group');
ALTER TABLE "Bookings" ALTER COLUMN "bookingType" TYPE "BookingType_new" USING ("bookingType"::text::"BookingType_new");
ALTER TYPE "BookingType" RENAME TO "BookingType_old";
ALTER TYPE "BookingType_new" RENAME TO "BookingType";
DROP TYPE "BookingType_old";
COMMIT;

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "BookingSingle";

-- DropEnum
DROP TYPE "ExperienceLevel";

-- CreateTable
CREATE TABLE "Bookings" (
    "id" SERIAL NOT NULL,
    "bookingType" "BookingType" NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "bookingTime" TIMESTAMP(3) NOT NULL,
    "hasEquipment" BOOLEAN NOT NULL,
    "username" TEXT NOT NULL,
    "useremail" TEXT NOT NULL,
    "userphone" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);
