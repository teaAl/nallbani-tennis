import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// export async function GET() {
//   const bookedHours = await prisma.bookedHours.findMany();
//   return NextResponse.json(bookedHours);
// }

// export async function POST(request: Request) {
//   const data = await request.json();
//   const newHour = await prisma.bookedHours.create({ data });
//   return NextResponse.json(newHour);
// }

// export async function DELETE(request: Request) {
//   const data = await request.json();
//   const deletedHour = await prisma.bookedHours.delete({ where: { id: data.id } });
//   return NextResponse.json(deletedHour);
// }