import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Retrieve and decode NextAuth's JWT session token
  // Fix: Explicitly pass secureCookie flag based on environment / protocol
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const isAuth = !!token;
  const isAdmin = token?.role === "admin";

  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isAdminRoute = pathname.startsWith("/admin");
  const isProtectedRoute = 
    pathname.startsWith("/dashboard") || 
    pathname.startsWith("/onboarding") || 
    isAdminRoute;

  // 1. Unauthenticated users trying to access ANY protected route -> Redirect to /login
  if (isProtectedRoute && !isAuth) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callback", pathname); // Avoid double-encoding
    return NextResponse.redirect(loginUrl);
  }

  // 2. Non-Admin users trying to access /admin -> Redirect to /dashboard
  if (isAdminRoute && isAuth && !isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 3. Logged-in users trying to access /login or /register -> Redirect to appropriate home
  if (isAuthRoute && isAuth) {
    const destination = isAdmin ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(destination, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all protected routes, including their base root paths
     */
    "/dashboard",
    "/dashboard/:path*",
    "/onboarding",
    "/onboarding/:path*",
    "/admin",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};