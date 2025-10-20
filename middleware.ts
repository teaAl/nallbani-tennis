import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  /* ===================================
    Changes added after last refactor
  ====================================*/

  if (
    pathname.startsWith("/api") &&
    !pathname.startsWith("/api/auth") &&
    !pathname.startsWith("/api/webhook")
  ) {
    const apiKey =
      req.headers.get("x-api-key") || req.nextUrl.searchParams.get("apikey");
    const validApiKey = process.env.API_SECRET_KEY;

    if (!apiKey || apiKey !== validApiKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  /* ===================================
    Changes added after last refactor
  ====================================*/

  // 1. Define public paths that don't require authentication
  const publicPaths = ["/", "/login", "/signup"];
  const isPublicPath = publicPaths.some((path) => pathname === path);

  // 2. Special paths that have specific access rules
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

  // 3. If not logged in and trying to access a protected route
  if (!token && !isPublicPath && !isApiPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 4. For logged-in users, handle status-based access
  if (token) {
    // Get user status from token (which is now always up-to-date)
    const status = token.status as string;

    // Handle UNCOMPLETE users
    if (status === "UNCOMPLETE") {
      // Explicitly block access to pending path and redirect to complete-profile
      if (isPendingPath) {
        return NextResponse.redirect(new URL("/complete-profile", req.url));
      }
      // Block access to any other protected routes
      if (!isCompletePath && !isCriticalApi && !isApiPath) {
        return NextResponse.redirect(new URL("/complete-profile", req.url));
      }
    }

    // Handle PENDING users
    else if (status === "PENDING") {
      // Only allow access to pending page and API routes
      if (!isPendingPath && !isApiPath) {
        return NextResponse.redirect(new URL("/pending", req.url));
      }
    }

    // Handle ACTIVE users
    else if (status === "ACTIVE") {
      // Don't allow access to pending or complete-profile pages
      if (isPendingPath) {
        return NextResponse.redirect(new URL("/profile", req.url));
      }
      if (isCompletePath) {
        return NextResponse.redirect(new URL("/profile", req.url));
      }
    }
  }

  // 5. Allow the request to proceed
  return NextResponse.next();

  // // Paths that don't require authentication
  // const publicPaths = ["/", "/login", "/signup"];

  // // Check if the path is public
  // const isPublicPath = publicPaths.some(
  //   (path) => pathname === path || pathname.startsWith("/api/")
  // );

  // // If not logged in and trying to access a protected route
  // if (!token && !isPublicPath) {
  //   const url = new URL("/login", req.url);
  //   url.searchParams.set("callbackUrl", encodeURI(pathname));
  //   return NextResponse.redirect(url);
  // }

  // // If logged in but status is pending and trying to access restricted area
  // if (
  //   token &&
  //   token.status === "PENDING" &&
  //   !pathname.startsWith("/pending") &&
  //   !isPublicPath
  // ) {
  //   return NextResponse.redirect(new URL("/pending", req.url));
  // }

  // // If logged in but status is UNCOMPLETE
  // if (token && token.status === "UNCOMPLETE") {
  //   // Explicitly check for /profile path to redirect to complete-profile
  //   if (pathname === "/profile" || pathname.startsWith("/profile/")) {
  //     return NextResponse.redirect(new URL("/complete-profile", req.url));
  //   }

  //   // For other protected paths (excluding API and complete-profile paths)
  //   if (
  //     !pathname.startsWith("/api/") &&
  //     !pathname.startsWith("/complete-profile") &&
  //     !isPublicPath
  //   ) {
  //     return NextResponse.redirect(new URL("/complete-profile", req.url));
  //   }
  // }

  // // If trying to access complete-profile but profile is already complete
  // if (
  //   token &&
  //   token.status === "ACTIVE" &&
  //   pathname.startsWith("/complete-profile")
  // ) {
  //   return NextResponse.redirect(new URL("/profile", req.url));
  // }

  // // If trying to access pending but status is ACTIVE or UNCOMPLETE
  // if (token && token.status === "ACTIVE" && pathname.startsWith("/pending")) {
  //   return NextResponse.redirect(new URL("/profile", req.url));
  // }

  // return NextResponse.next();
}

export default withAuth(
  function middleware(req) {
    console.log("Protected API accessed:", req.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Only allow access to auth routes without token
        if (req.nextUrl.pathname.startsWith("/api/auth")) {
          return true;
        }

        // All other API routes require authentication
        if (req.nextUrl.pathname.startsWith("/api")) {
          return !!token;
        }

        // Allow all non-API routes
        return true;
      },
    },
  }
);

// Configure which routes use this middleware
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
    "/api/:path*",
  ],
};

//TODO: Fix acess to /pending and /complete-profile for users according to their status
