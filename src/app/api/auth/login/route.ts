import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import jwt from "jsonwebtoken";
import User from "../../../../models/user";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. Database Connection
    await connectToDatabase();

    // 2. Find User
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 3. Verify Password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 4. Create JWT Token
    // CRITICAL: We add 'role' to the payload so middleware/me API can read it
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        role: user.role // Include role here
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // 5. Create Response & Set HttpOnly Cookie
    const response = NextResponse.json(
      { 
        user: { 
          name: user.name, 
          email: user.email, 
          role: user.role // Return role to frontend for immediate UI update
        }, 
        message: "Login successful",
      },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}