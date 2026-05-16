import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; 

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  // 1. Get both possible tokens
  const customToken = req.cookies.get('token')?.value;
  const nextAuthToken = req.cookies.get('next-auth.session-token')?.value || 
                        req.cookies.get('__Secure-next-auth.session-token')?.value;

  const { pathname } = req.nextUrl;

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/onboarding');

  // 2. Logic: If trying to access protected route
  if (isProtectedRoute) {
    // If neither token exists, go to login
    if (!customToken && !nextAuthToken) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // If custom token exists but NextAuth doesn't, verify the custom one
    if (customToken && !nextAuthToken) {
      try {
        await jwtVerify(customToken, SECRET);
      } catch (err) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }
  }

  // 3. Logic: If already logged in, prevent access to login/register
  if (isAuthRoute && (customToken || nextAuthToken)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/onboarding/:path*',
  ],
};