import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, SECRET);
    return NextResponse.json({ authenticated: true });
  } catch (err) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}