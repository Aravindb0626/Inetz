import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/user"; // Fixed path to match your layout standard
import bcrypt from "bcryptjs"; 

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // 1. Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required fields." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // 2. Connect to DB
    await connectToDatabase();

    // 3. Check if user exists (using case-insensitive lowercase matching)
    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email is already registered." }, 
        { status: 400 }
      );
    }

    // 4. Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 5. Create User with fields synced to match your NextAuth requirements
    const newUser = await User.create({ 
      name: name || undefined, 
      email: normalizedEmail, 
      password: hashedPassword,
      role: "student", // Matches standard fallback roles expected by UI layouts
      provider: "credentials", // Tagged to separate from Google sign-ups safely
    });

    return NextResponse.json(
      { 
        message: "Registration successful!", 
        user: { name: newUser.name, email: newUser.email } 
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}