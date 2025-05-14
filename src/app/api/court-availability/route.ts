// app/api/court-availability/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all court availability slots
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dayOfWeek = searchParams.get("dayOfWeek");
    const courtId = searchParams.get("courtId");

    // Build filters object
    const filters: any = { active: true };
    if (dayOfWeek) filters.dayOfWeek = dayOfWeek;
    if (courtId) filters.courtId = courtId;

    const availabilitySlots = await prisma.courtAvailability.findMany({
      where: filters,
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
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    });

    return NextResponse.json(availabilitySlots);
  } catch (error) {
    console.error("Error fetching court availability:", error);
    return NextResponse.json(
      { message: "Error fetching court availability" },
      { status: 500 }
    );
  }
}

// POST a new court availability slot
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { courtId, dayOfWeek, startTime, endTime, isRecurring = true } = body;

    // Validate required fields
    if (!courtId || !dayOfWeek || !startTime || !endTime) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the new availability slot
    const newAvailability = await prisma.courtAvailability.create({
      data: {
        courtId,
        dayOfWeek,
        startTime,
        endTime,
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

    return NextResponse.json(newAvailability, { status: 201 });
  } catch (error) {
    console.error("Error creating court availability:", error);
    return NextResponse.json(
      { message: "Error creating court availability" },
      { status: 500 }
    );
  }
}
