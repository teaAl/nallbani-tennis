import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET a specific court
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const court = await prisma.court.findUnique({
      where: { id },
    });

    if (!court) {
      return NextResponse.json(
        { message: "Court  not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(court);
  } catch (error) {
    console.error("Error fetching court :", error);
    return NextResponse.json(
      { message: "Error fetching court " },
      { status: 500 }
    );
  }
}

// PUT (update) a specific court
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, indoor, type } = body;
    // Check if the court exists
    const existingCourt = await prisma.court.findUnique({
      where: { id },
    });

    if (!existingCourt) {
      return NextResponse.json({ message: "Court not found" }, { status: 404 });
    }

    // Update the availability slot
    const updatedAvailability = await prisma.court.update({
      where: { id },
      data: {
        name: name,
        indoor: indoor,
        type: type,
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

    const existingCourt = await prisma.court.findUnique({
      where: { id: id },
      include: {
        // court_availability: true,
        bookings: true,
        lessons: true,
      },
    });

    if (!existingCourt) {
      return NextResponse.json({ message: "Court not found" }, { status: 404 });
    }

    console.log("Court details before deletion:", {
      courtId: existingCourt.id,
      courtName: existingCourt.name,
      bookingsCount: existingCourt.bookings.length,
      lessonsCount: existingCourt.lessons.length,
    });

    // Delete the availability slot
    await prisma.court.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { message: "Court deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting court: ", error);
    return NextResponse.json(
      { message: "Error deleting court" + error },
      { status: 500 }
    );
  }
}
