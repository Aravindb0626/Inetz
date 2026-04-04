import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "../../../../models/user";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // 1. Connect to DB
    await connectToDatabase();

    // 2. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already registered" }, { status: 400 });
    }

    // 3. Create User
    const newUser = new User({ name, email, password });
    await newUser.save();

    return NextResponse.json(
      { message: "Registration successful!", user: { name: newUser.name, email: newUser.email } },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}