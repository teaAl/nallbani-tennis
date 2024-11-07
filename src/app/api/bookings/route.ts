import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// export async function GET() {
//   const bookings = await prisma.booking.findMany();
//   return NextResponse.json(bookings);
// }

export async function GET() {
    try {
      const bookings = await prisma.booking.findMany();
      return NextResponse.json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return NextResponse.json({ error: 'Error fetching bookings' }, { status: 500 });
    }
  }

export async function POST(request: Request) {
  const data = await request.json();
  const newBooking = await prisma.booking.create({ data });
  return NextResponse.json(newBooking);
}

export async function DELETE(request: Request) {
  const data = await request.json();
  const deletedBooking = await prisma.booking.delete({ where: { id: data.id } });
  return NextResponse.json(deletedBooking);
}