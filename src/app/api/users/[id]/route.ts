import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    // Fetch the user by ID
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      // select: {
      //   id: true,
      //   name: true,
      //   email: true,
      //   emailVerified: true,
      //   avatar: true,
      //   role: true,
      //   status: true,
      //   createdAt: true,
      //   phoneNumber: true,
      //   level: true,
      // },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the user." },
      { status: 500 }
    );
  }
};
