import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

export async function GET() {
  try {
    const bookingsSingle = await prisma.bookingSingle.findMany();
    return NextResponse.json(bookingsSingle);
  } catch (error) {
    console.error('Error fetching bookingsSingle:', error);
    return NextResponse.json({ error: 'Error fetching bookingsSingle' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const data = await request.json();
  const newBooking = await prisma.bookingSingle.create({ data });
  return NextResponse.json(newBooking);
}

export async function DELETE(request: Request) {
  const data = await request.json();
  const deletedBooking = await prisma.bookingSingle.delete({ where: { id: data.id } });
  return NextResponse.json(deletedBooking);
}