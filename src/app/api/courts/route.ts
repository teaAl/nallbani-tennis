import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async () => {
  try {
    const courts = await prisma.court.findMany();

    return NextResponse.json({ courts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching users." },
      { status: 500 }
    );
  }
};

// POST a new court
export async function POST(
  request: Request /*{params}: {params: { id: string }}*/
) {
  try {
    // const { id } = params;
    const body = await request.json();
    const { name, indoor, type } = body;

    const addCourt = await prisma.court.create({
      data: {
        active: true,
        name: name,
        indoor: indoor,
        type: type,
      },
    });

    return NextResponse.json(addCourt, { status: 200 });
  } catch (error) {
    console.error("Error creating court:", error);
    return NextResponse.json(
      { message: "Error creating court" },
      { status: 500 }
    );
  }
}
