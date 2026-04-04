import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Note: We use 'jose' because 'jsonwebtoken' is not compatible with Edge Runtime
import { jwtVerify } from 'jose'; 

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  // 1. Define your Route Groups
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/onboarding');

  // 2. Logic: User is trying to access a protected page without a token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 3. Logic: User is already logged in, so don't show them Login/Register pages
  if (isAuthRoute && token) {
    try {
      // Verify token is valid before redirecting
      await jwtVerify(token, SECRET);
      return NextResponse.redirect(new URL('/', req.url));
    } catch (err) {
      // If token is expired/invalid, let them stay on the login page
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

// 4. IMPORTANT: The Matcher config tells Next.js exactly where to run this
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/onboarding/:path*',
    '/login',
    '/register',
  ],
};