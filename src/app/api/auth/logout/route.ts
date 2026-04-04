import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    // To logout, we set the cookie with an immediate expiration date (Date 0)
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0), // Sets the date to Jan 1, 1970 (instant expiry)
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: "Logout failed" }, 
      { status: 500 }
    );
  }
}