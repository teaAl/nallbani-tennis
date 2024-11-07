-- CreateEnum
CREATE TYPE "BookingType" AS ENUM ('exploratory', 'serious');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('approved', 'pending', 'rejected');

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "bookingType" "BookingType" NOT NULL,
    "recurring" BOOLEAN NOT NULL,
    "individual" BOOLEAN NOT NULL,
    "group" JSONB NOT NULL,
    "needEquipment" BOOLEAN NOT NULL,
    "schedule" JSONB NOT NULL,
    "status" "BookingStatus" NOT NULL,
    "contactInfo" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
