import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

export const PUT = async (request: Request) => {
  try {
    const body = await request.json();
    const { userId, role } = body;

    if (
      !userId ||
      !Array.isArray(role) || // Ensure role is an array
      role.length === 0 || // Ensure role is not empty
      !role.every((r) => Object.values(UserRole).includes(r)) // Ensure all elements are valid UserRole values
    ) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    return NextResponse.json({
      message: "User status updated successfully",
      user: { id: updatedUser.id, role: updatedUser.role },
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
