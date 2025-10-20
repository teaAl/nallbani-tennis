import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid username." });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // If everything is ok, return success
    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong.", details: error });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid username." }, { status: 401 });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    // If everything is ok, return success
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong.", details: error },
      { status: 500 }
    );
  }
}
