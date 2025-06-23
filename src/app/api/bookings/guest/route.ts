import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST a new booking
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      bookerType,
      courtAvailabilityId,
      guestEmail,
      guestName,
      guestPhone,
      needsEquipment,
    } = body;

    console.log("POST request body:", body);

    // Validate required fields
    if (
      !bookerType ||
      !courtAvailabilityId ||
      !guestEmail ||
      !guestName ||
      !guestPhone ||
      !needsEquipment
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the new availability slot
    const newBooking = await prisma.booking.create({
      data: {
        bookerType: bookerType,
        courtAvailabilityId: courtAvailabilityId,
        guestEmail: guestEmail,
        guestName: guestName,
        guestPhone: guestPhone,
        needsEquipment: needsEquipment,
      },
    });

    console.log("New booking created:", newBooking);

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating booking: " + error },
      { status: 500 }
    );
  }
}
