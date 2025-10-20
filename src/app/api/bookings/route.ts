import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

// GET all bookings
export async function GET() {
  redirect("/");
  try {
    const bookingsResponse = await prisma.booking.findMany();
    return NextResponse.json(bookingsResponse, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: "Error fetching bookings" + error },
      { status: 500 }
    );
  }
}
