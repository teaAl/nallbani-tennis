import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // Paths that don't require authentication
  const publicPaths = ["/", "/login", "/signup"];

  // Check if the path is public
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith("/api/")
  );

  // If not logged in and trying to access a protected route
  if (!token && !isPublicPath) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  // If logged in but status is pending and trying to access restricted area
  if (
    token &&
    token.status === "PENDING" &&
    !pathname.startsWith("/pending") &&
    !isPublicPath
  ) {
    return NextResponse.redirect(new URL("/pending", req.url));
  }

  // If logged in but status is incomplete and trying to access restricted area
  if (
    token &&
    token.status === "INCOMPLETE" &&
    !pathname.startsWith("/complete-profile") &&
    !isPublicPath
  ) {
    return NextResponse.redirect(new URL("/complete-profile", req.url));
  }

  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
