// app/api/court-availability/route.ts
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

// GET all court availability slots
export async function GET(request: Request) {
  redirect("/");

  try {
    const { searchParams } = new URL(request.url);
    const dayOfWeek = searchParams.get("dayOfWeek");
    const courtId = searchParams.get("courtId");

    // Build filters object
    const filters: any = {};
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

    console.log("Fetched court availability slots:", availabilitySlots);
    return NextResponse.json(availabilitySlots);
  } catch (error) {
    console.error("Error fetching court availability:", error);
    return NextResponse.json(
      { message: "Error fetching court availability" + error },
      { status: 500 }
    );
  }
}

// POST a new court availability slot
export async function POST(request: Request) {
  try {
    console.log("Available Prisma models:", Object.keys(prisma));
    const body = await request.json();
    const { courtId, dayOfWeek, startTime, endTime, price } = body;

    console.log("POST request body:", body);

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
        courtId: courtId,
        dayOfWeek: dayOfWeek,
        startTime: startTime,
        endTime: endTime,
        price: price ? parseFloat(price) : 10,
      },
      // include: {
      //   court: {
      //     select: {
      //       id: true,
      //       name: true,
      //     },
      //   },
      // },
    });

    console.log("New availability created:", newAvailability);

    return NextResponse.json(newAvailability, { status: 201 });
  } catch (error) {
    // console.error("Error creating court availability:", error);
    return NextResponse.json(
      { message: "Error creating court availability: " + error },
      { status: 500 }
    );
  }
}
