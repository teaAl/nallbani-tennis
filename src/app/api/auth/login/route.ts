import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if( !email || !password) {
            return NextResponse.json(
                { error: "Email and password are required." }, 
                { status: 400 }
            );
        }

        // find the user
        const user = await prisma.users.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email." }, 
                { status: 401 }
            );
        }

        // verify the password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid password." }, 
                { status: 401 }
            );
        }

        // create a JWT token
        const secret = process.env.NEXTAUTH_SECRET || 'fallback-secret';
        const token = jwt.sign(
            { id: user.id, email: user.email },
            secret,
            { expiresIn: "30d" }
        );

        // return user data and token
        const { password: _, ...userWithoutPassword } = user;
        return NextResponse.json({
            user: userWithoutPassword,
            token,
        }, { status: 200 });
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json(
            { error: "An error occurred during login " }, 
            { status: 500 }
        );
    }
}