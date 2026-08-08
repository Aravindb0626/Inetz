import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    
    // 1. Throw server-level configuration error if env var is missing
    if (!jwtSecret) {
      console.error("❌ Auth Error: JWT_SECRET is missing from environment variables.");
      return NextResponse.json(
        { authenticated: false, error: "Server authentication misconfigured" },
        { status: 500 }
      );
    }

    // 2. Extract JWT token from HTTP-only cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 401 }
      );
    }

    // 3. Verify and decode payload using jose
    const SECRET = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(token, SECRET);

    // 4. Return user profile and role payload
    return NextResponse.json({ 
      authenticated: true, 
      user: {
        id: payload.id,
        email: payload.email,
        role: payload.role || "student" 
      } 
    });

  } catch (err: any) {
    // Fails on expired token, malformed signature, or corrupted payload
    console.warn("🔒 JWT Verification failed:", err.message);
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 401 }
    );
  }
}