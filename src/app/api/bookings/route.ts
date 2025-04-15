// import { NextResponse } from 'next/server';
// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '@/lib/prisma';
// import { z } from 'zod';


// export const GET = async (req: Request) => {
//   try {
//     const bookings = await prisma.bookings.findMany();
//     return NextResponse.json({ bookings });
//   } catch (error) {
//     return NextResponse.json({ error: 'Error fetching bookings' }, { status: 500 });
//   }
// }

// export const POST = async (req: Request) => {
//   try {
//     const data = await req.json();
//     const newBooking = await prisma.bookings.create({ data });
//     return NextResponse.json({ newBooking });
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";

// Mock bookings data
let mockBookings: Array<{ id: string; court: string; date: string; time: string }> = [
  { id: "1", court: "Court 1", date: "2025-04-15", time: "10:00 AM" },
  { id: "2", court: "Court 2", date: "2025-04-16", time: "2:00 PM" },
];

// GET: Fetch all bookings
export const GET = async () => {
  try {
    return NextResponse.json({ bookings: mockBookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Error fetching bookings" }, { status: 500 });
  }
};

// POST: Create a new booking
export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const newBooking = {
      id: (mockBookings.length + 1).toString(), // Generate a mock ID
      ...data,
    };
    mockBookings.push(newBooking);
    return NextResponse.json({ newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ error: "Error creating booking" }, { status: 500 });
  }
};

// DELETE: Delete a booking
export const DELETE = async (req: Request) => {
  try {
    const data = await req.json();
    const bookingId = data.id;

    // Find and remove the booking
    mockBookings = mockBookings.filter((booking) => booking.id !== bookingId);

    return NextResponse.json({ message: `Booking with ID ${bookingId} deleted successfully` });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json({ error: "Error deleting booking" }, { status: 500 });
  }
};

// export async function GET() {
//   try {
//     const bookings = await prisma.bookings.findMany();
//     return NextResponse.json(bookings);
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     return NextResponse.json({ error: 'Error fetching bookings' }, { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   const data = await request.json();
//   const newBooking = await prisma.bookings.create({ data });
//   return NextResponse.json(newBooking);
// }

// export async function DELETE(request: Request) {
//   const data = await request.json();
//   const deletedBooking = await prisma.bookings.delete({ where: { id: data.id } });
//   return NextResponse.json(deletedBooking);
// }