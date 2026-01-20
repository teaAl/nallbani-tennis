import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ============================================
  // ADMIN AUTHENTICATION
  // ============================================
  if (pathname.startsWith("/admin") || pathname === "/admin-auth") {
    
    const adminSession = req.cookies.get("admin-session")?.value;
    const adminBlocked = req.cookies.get("admin-blocked")?.value;
    const blockExpiry = req.cookies.get("admin-block-expiry")?.value;

    // Check if block has expired
    if (adminBlocked && blockExpiry) {
      const expiryTime = parseInt(blockExpiry);
      if (Date.now() < expiryTime) {
        // Still blocked
        if (pathname === "/admin-auth") {
          return new NextResponse(
            `<html><body><h1>Access Blocked</h1><p>Too many failed attempts. Try again later.</p></body></html>`,
            {
              status: 403,
              headers: { "Content-Type": "text/html" },
            }
          );
        }
        return NextResponse.redirect(new URL("/", req.url));
      } else {
        // Block expired, clear cookies
        const response = NextResponse.next();
        response.cookies.delete("admin-blocked");
        response.cookies.delete("admin-block-expiry");
        response.cookies.delete("admin-attempts");
        // Continue processing...
      }
    }

    // If accessing /admin-auth with valid session, redirect to dashboard
    if (pathname === "/admin-auth" && adminSession === "true") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    // If accessing /admin/* without session, redirect to auth
    if (pathname.startsWith("/admin") && pathname !== "/admin-auth" && adminSession !== "true") {
      return NextResponse.redirect(new URL("/admin-auth", req.url));
    }
    return NextResponse.next();
  }

  // ============================================
  // API PROTECTION
  // ============================================
  if (
    pathname.startsWith("/api") &&
    !pathname.startsWith("/api/auth") &&
    !pathname.startsWith("/api/webhook") &&
    !pathname.startsWith("/api/admin")
  ) {
    const apiKey =
      req.headers.get("x-api-key") ||
      req.nextUrl.searchParams.get("apikey");
    const validApiKey = process.env.API_SECRET_KEY;

    if (!apiKey || apiKey !== validApiKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // ============================================
  // REGULAR USER AUTHENTICATION
  // ============================================
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const publicPaths = ["/", "/login", "/signup", "/admin-auth"]; 
  const isPublicPath = publicPaths.some((path) => pathname === path);
  const isApiPath = pathname.startsWith("/api/");
  const isPendingPath = pathname.startsWith("/pending");
  const isCompletePath = pathname.startsWith("/complete-profile");

  const criticalApiRoutes = [
    "/api/auth/session",
    "/api/users/complete-profile",
  ];
  const isCriticalApi = criticalApiRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Not logged in and trying to access protected route
  if (!token && !isPublicPath && !isApiPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Handle user status-based routing
  if (token) {
    const status = token.status as string;

    if (status === "UNCOMPLETE") {
      if (isPendingPath) {
        return NextResponse.redirect(new URL("/complete-profile", req.url));
      }
      if (!isCompletePath && !isCriticalApi && !isApiPath) {
        return NextResponse.redirect(new URL("/complete-profile", req.url));
      }
    } else if (status === "PENDING") {
      if (!isPendingPath && !isApiPath) {
        return NextResponse.redirect(new URL("/pending", req.url));
      }
    } else if (status === "ACTIVE") {
      if (isPendingPath || isCompletePath) {
        return NextResponse.redirect(new URL("/profile", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|public/).*)",
    "/api/:path*",
    "/admin/:path*",
    "/admin-auth",
  ],
};
