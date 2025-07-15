import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { BookingState } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { courtAvailabilityId, approvedBookingId } = body;

    if (!courtAvailabilityId || !approvedBookingId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Get all bookings for this slot
    const bookings = await prisma.booking.findMany({
      where: { courtAvailabilityId },
    });

    // 2. Update bookings: confirm one, cancel others
    const updatePromises = bookings.map((booking) =>
      prisma.booking.update({
        where: { id: booking.id },
        data: {
          status:
            booking.id === approvedBookingId
              ? BookingState.CONFIRMED
              : BookingState.CANCELED,
        },
      })
    );
    await Promise.all(updatePromises);

    // 3. Update the court availability state
    await prisma.courtAvailability.update({
      where: { id: courtAvailabilityId },
      data: { bookingState: BookingState.CONFIRMED },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: "Error approving booking: " + error },
      { status: 500 }
    );
  }
}
