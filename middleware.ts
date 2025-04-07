// File: middleware.ts (in the root of your project)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Paths that require authentication
const protectedPaths = ['/dashboard', '/profile', '/bookings'];

// Paths that should not be accessible if user is logged in
const authPaths = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;
  
  // Check if the path is protected and user is not authenticated
  if (protectedPaths.some(path => pathname.startsWith(path)) && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }
  
  // Check if the path is an auth path and user is authenticated
  if (authPaths.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [...protectedPaths, ...authPaths],
};