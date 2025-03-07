-- CreateEnum
CREATE TYPE "BookingType" AS ENUM ('individual', 'group');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('approved', 'pending', 'rejected');

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
