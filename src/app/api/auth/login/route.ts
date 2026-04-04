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

    // 3. Verify Password (using the method we defined in the User Model)
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 4. Create JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" } // Token expires in 24 hours
    );

    // 5. Create Response & Set HttpOnly Cookie
    const response = NextResponse.json(
      { 
        message: "Login successful",
        user: { name: user.name, email: user.email } 
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true, // Prevents JS access (Security Best Practice)
      secure: process.env.NODE_ENV === "production", // Only use HTTPS in production
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}