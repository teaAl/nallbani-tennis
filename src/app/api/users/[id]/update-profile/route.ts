import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PreferedPlayTime } from "@prisma/client"; // Import the enum type from Prisma

interface UpdateProfileData {
  bio?: string;
  avatar?: "avatar1" | "avatar2" | "avatar3" | "avatar4";
  level?: SkillLevel;
  preferedPlayTime?: PreferedPlayTime;
}

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const body = await request.json();

    // Create an object with only the provided fields
    const updateData: Partial<UpdateProfileData> = {};

    if (body.bio !== undefined) updateData.bio = body.bio;
    if (body.avatar !== undefined) updateData.avatar = body.avatar;
    if (body.preferedPlayTime !== undefined) {
      if (Object.values(PreferedPlayTime).includes(body.preferedPlayTime)) {
        updateData.preferedPlayTime = body.preferedPlayTime as PreferedPlayTime;
      } else {
        return NextResponse.json(
          { message: "Invalid value for preferedPlayTime" },
          { status: 400 }
        );
      }
    }

    // Check if at least one field is provided
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "At least one field must be provided for update" },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: id },
      data: updateData,
    });

    return NextResponse.json({
      message: "User profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

//TODO: Make this api general for all user updates - idk if its a good idea tho
