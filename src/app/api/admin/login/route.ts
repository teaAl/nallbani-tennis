import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const MAX_ATTEMPTS = 5;
const BLOCK_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const ATTEMPT_WINDOW = 60 * 60 * 1000; // 1 hour window for attempts

export async function POST(req: Request) {
  const cookieStore = await cookies();
  
  // Check if currently blocked
  const blockedCookie = cookieStore.get("admin-blocked");
  const blockExpiryCookie = cookieStore.get("admin-block-expiry");
  
  if (blockedCookie?.value === "true" && blockExpiryCookie?.value) {
    const expiryTime = parseInt(blockExpiryCookie.value);
    if (Date.now() < expiryTime) {
      const remainingHours = Math.ceil((expiryTime - Date.now()) / (60 * 60 * 1000));
      return NextResponse.json(
        { 
          error: "Blocked", 
          message: `Too many failed attempts. Try again in ${remainingHours} hours.` 
        },
        { status: 403 }
      );
    } else {
      // Block expired, clear cookies
      cookieStore.delete("admin-blocked");
      cookieStore.delete("admin-block-expiry");
      cookieStore.delete("admin-attempts");
    }
  }

  // Get current attempts
  const attemptsCookie = cookieStore.get("admin-attempts");
  const attempts = attemptsCookie?.value ? parseInt(attemptsCookie.value) : 0;

  // Check if max attempts reached
  if (attempts >= MAX_ATTEMPTS) {
    const blockExpiry = Date.now() + BLOCK_DURATION;
    
    const res = NextResponse.json(
      { 
        error: "Blocked",
        message: "Too many failed attempts. Access blocked for 24 hours."
      },
      { status: 403 }
    );
    
    res.cookies.set("admin-blocked", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: BLOCK_DURATION / 1000,
      path: "/",
    });
    
    res.cookies.set("admin-block-expiry", blockExpiry.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: BLOCK_DURATION / 1000,
      path: "/",
    });
    
    return res;
  }

  // Verify password
  const { password } = await req.json();
  
  if (!password) {
    return NextResponse.json(
      { error: "Password required" },
      { status: 400 }
    );
  }

  if (password === process.env.ADMIN_PASSWORD) {
    // Success - clear attempts and set session
    const res = NextResponse.json({ success: true });
    
    res.cookies.set("admin-session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 8 * 60 * 60, // 8 hours
      path: "/",
    });
    
    // Clear attempt tracking
    res.cookies.delete("admin-attempts");
    res.cookies.delete("admin-blocked");
    res.cookies.delete("admin-block-expiry");
    
    return res;
  }

  // Wrong password - increment attempts
  const newAttempts = attempts + 1;
  const remainingAttempts = MAX_ATTEMPTS - newAttempts;
  
  const res = NextResponse.json(
    { 
      error: "Invalid password",
      remainingAttempts: remainingAttempts > 0 ? remainingAttempts : 0,
      message: remainingAttempts > 0 
        ? `Invalid password. ${remainingAttempts} attempts remaining.`
        : "Too many failed attempts. Access will be blocked."
    },
    { status: 401 }
  );
  
  res.cookies.set("admin-attempts", newAttempts.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: ATTEMPT_WINDOW / 1000, // Attempts expire after 1 hour
    path: "/",
  });
  
  return res;
}