import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { z } from 'zod';


export const GET = async (req: Request) => {
  try {
    const bookings = await prisma.booking.findMany();
    return NextResponse.json({ bookings });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching bookings' }, { status: 500 });
  }
}

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const newBooking = await prisma.booking.create({ data });
    return NextResponse.json({ newBooking });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}