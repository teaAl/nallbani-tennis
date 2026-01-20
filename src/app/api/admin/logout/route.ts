import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });
  
  // Clear the admin session cookie
  res.cookies.set("admin-session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
  
  return res;
}

// Also support GET for simple logout links
export async function GET() {
  const res = NextResponse.redirect(new URL("/admin-auth", process.env.NEXTAUTH_URL || "http://localhost:3000"));
  
  res.cookies.set("admin-session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
  
  return res;
}