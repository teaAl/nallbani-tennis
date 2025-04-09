import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma  from "@/lib/prisma";
import jwt from "jsonwebtoken";
// import { redirect } from "next/dist/server/api-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.users.create({
      data: {
        // name,
        email,
        password: hashedPassword
      }
    });

    // Generate JWT token
    const secret = process.env.NEXTAUTH_SECRET || 'fallback-secret';
    const token = jwt.sign(
      { 
        id: user.id,
        email: user.email,
        // name: user.name 
      },
      secret,
      { expiresIn: '30d' }
    );

    // Don't return the password
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      token,
      redirect: "/profile"
    }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}