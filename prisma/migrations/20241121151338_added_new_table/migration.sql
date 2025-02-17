-- CreateTable
CREATE TABLE "BookingSingle" (
    "id" SERIAL NOT NULL,
    "bookingType" "BookingType" NOT NULL,
    "experienceLvl" "ExperienceLevel" NOT NULL,
    "needEquipment" BOOLEAN NOT NULL,
    "schedule" JSONB NOT NULL,
    "status" "BookingStatus" NOT NULL,
    "contactInfo" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingSingle_pkey" PRIMARY KEY ("id")
);
