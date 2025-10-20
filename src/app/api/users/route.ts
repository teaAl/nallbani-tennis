import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const GET = async () => {
  redirect("/");
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        // password: true,
        avatar: true,
        role: true,
        status: true,
        createdAt: true,
        phoneNumber: true,
        level: true,
      },
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching users." },
      { status: 500 }
    );
  }
};
