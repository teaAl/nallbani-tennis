import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      avatar,
      birthday,
      bio,
      level,
      notesForCoach,
      phoneNumber,
      preferedTime,
    } = body;

    await prisma.user.update({
      where: { id: id },
      data: {
        avatar,
        dateOfBirth: birthday,
        bio,
        level,
        notesForCoach,
        phoneNumber,
        preferedPlayTime: preferedTime,
        status: "ACTIVE",
      },
    });

    return NextResponse.json({
      message: "User profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
