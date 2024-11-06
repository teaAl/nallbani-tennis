import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const bookings = await prisma.booking.findMany();
  return NextResponse.json(bookings as Booking[]);
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