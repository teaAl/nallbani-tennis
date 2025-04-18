import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (request: Request) => {
  try {
    const body = await request.json();
    const { userId, status } = body;

    if (
      !userId ||
      !status ||
      !["PENDING", "ACTIVE", "INACTIVE", "UNCOMPLETE"].includes(status)
    ) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { status },
    });

    return NextResponse.json({
      message: "User status updated successfully",
      user: { id: updatedUser.id, status: updatedUser.status },
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
