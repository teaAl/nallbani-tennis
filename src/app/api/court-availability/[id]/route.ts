// app/api/court-availability/[id]/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET a specific court availability slot
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const availability = await prisma.courtAvailability.findUnique({
      where: { id },
      include: {
        court: {
          select: {
            id: true,
            name: true,
            type: true,
            indoor: true,
          },
        },
      },
    });

    if (!availability) {
      return NextResponse.json(
        { message: "Court availability not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(availability);
  } catch (error) {
    console.error("Error fetching court availability:", error);
    return NextResponse.json(
      { message: "Error fetching court availability" },
      { status: 500 }
    );
  }
}

// PUT (update) a specific court availability slot
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { courtId, dayOfWeek, startTime, endTime, isRecurring, active } =
      body;

    // Check if the availability exists
    const existingAvailability = await prisma.courtAvailability.findUnique({
      where: { id },
    });

    if (!existingAvailability) {
      return NextResponse.json(
        { message: "Court availability not found" },
        { status: 404 }
      );
    }

    // Update the availability slot
    const updatedAvailability = await prisma.courtAvailability.update({
      where: { id },
      data: {
        courtId: courtId || undefined,
        dayOfWeek: dayOfWeek || undefined,
        startTime: startTime || undefined,
        endTime: endTime || undefined,
        updatedAt: new Date(),
      },
      include: {
        court: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(updatedAvailability);
  } catch (error) {
    console.error("Error updating court availability:", error);
    return NextResponse.json(
      { message: "Error updating court availability" },
      { status: 500 }
    );
  }
}

// DELETE a specific court availability slot
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if the availability exists
    const existingAvailability = await prisma.courtAvailability.findUnique({
      where: { id: id },
    });

    if (!existingAvailability) {
      return NextResponse.json(
        { message: "Court availability not found" },
        { status: 404 }
      );
    }

    // Delete the availability slot
    await prisma.courtAvailability.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Court availability deleted" });
  } catch (error) {
    console.error("Error deleting court availability:", error);
    return NextResponse.json(
      { message: "Error deleting court availability" },
      { status: 500 }
    );
  }
}
