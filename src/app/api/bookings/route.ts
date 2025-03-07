import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { z } from 'zod';


export const GET = async (req: Request) => {
  try {
    const bookings = await prisma.bookings.findMany();
    return NextResponse.json({ bookings });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching bookings' }, { status: 500 });
  }
}

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const newBooking = await prisma.bookings.create({ data });
    return NextResponse.json({ newBooking });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}


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