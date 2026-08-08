import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );

    // Overwrite cookie value and force immediate browser clearance
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      maxAge: 0, // Force zero max-age alongside Date 0
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("LOGOUT_ROUTE_ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Logout processing failed" },
      { status: 500 }
    );
  }
}