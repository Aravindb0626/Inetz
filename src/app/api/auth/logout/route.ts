import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );

    // List all potential session cookies to eliminate residual auth tokens
    const cookiesToClear = [
      "token",
      "next-auth.session-token",
      "__Secure-next-auth.session-token",
      "next-auth.csrf-token",
      "__Host-next-auth.csrf-token",
    ];

    cookiesToClear.forEach((cookieName) => {
      response.cookies.set(cookieName, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0),
        maxAge: 0,
        path: "/",
      });
    });

    // Prevent browser and CDN caching of the logout response
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error: any) {
    console.error("LOGOUT_ROUTE_ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Logout processing failed" },
      { status: 500 }
    );
  }
}