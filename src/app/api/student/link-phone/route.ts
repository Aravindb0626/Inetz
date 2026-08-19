import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/user";
import { Student } from "@/models/Student";
export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone || phone.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit phone number." },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, SECRET);

    await connectToDatabase();

    const cleanPhone = phone.trim();

    // 1. Save Phone on User model
    await User.findByIdAndUpdate(payload.id, { $set: { phone: cleanPhone } });

    // 2. Check if a Student record exists with this phone number
    const matchingStudent = await Student.findOne({ phone: cleanPhone }).lean();

    return NextResponse.json({
      success: true,
      message: matchingStudent
        ? "Account linked successfully with your student record!"
        : "Phone number updated. No existing student billing record was found for this number.",
      matchedStudent: !!matchingStudent,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}