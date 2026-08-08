import { connectToDatabase } from "@/lib/db";
import { Student } from "@/models/Student";
import { NextResponse } from "next/server";

// ─── GET: FETCH STUDENT PROFILE BY EMAIL OR PHONE ──────────────────────────
export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const rawEmail = searchParams.get("email");
    const rawPhone = searchParams.get("phone");

    if (!rawEmail && !rawPhone) {
      return NextResponse.json(
        { success: false, error: "Missing search parameter (email or phone)" },
        { status: 400 }
      );
    }

    const searchConditions: any[] = [];

    if (rawEmail) {
      const email = decodeURIComponent(rawEmail).trim().toLowerCase();
      if (email.length > 0) {
        const escapedEmail = email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        searchConditions.push(
          { email: email },
          { email: { $regex: new RegExp(`^${escapedEmail}$`, "i") } }
        );
      }
    }

    if (rawPhone) {
      const phoneRaw = decodeURIComponent(rawPhone).trim();
      const phoneDigits = phoneRaw.replace(/\D/g, "");
      const last10Digits = phoneDigits.slice(-10);

      if (last10Digits.length > 0) {
        searchConditions.push(
          { phone: phoneRaw },
          { phone: last10Digits },
          { phone: { $regex: last10Digits } }
        );
      }
    }

    if (searchConditions.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid search parameters provided" },
        { status: 400 }
      );
    }

    const student = await Student.findOne({ $or: searchConditions }).lean();

    if (!student) {
      return NextResponse.json(
        { success: false, error: "No student profile found linked to this account" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, student }, { status: 200 });
  } catch (error: any) {
    console.error("GET_STUDENT_ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ─── POST: LINK LOGGED-IN EMAIL TO EXISTING PHONE RECORD ────────────────────
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { email, phone } = body;

    const studentEmail = (email || "").trim().toLowerCase();
    const studentPhone = (phone || "").trim();

    if (!studentEmail || !studentPhone) {
      return NextResponse.json(
        { success: false, error: "Both Email and Phone number are required." },
        { status: 400 }
      );
    }

    const phoneDigits = studentPhone.replace(/\D/g, "");
    const last10Digits = phoneDigits.slice(-10);

    if (!last10Digits) {
      return NextResponse.json(
        { success: false, error: "Invalid phone number provided." },
        { status: 400 }
      );
    }

    // Find the student profile created offline or manually by admin
    const student = await Student.findOne({
      $or: [
        { phone: studentPhone },
        { phone: last10Digits },
        { phone: { $regex: last10Digits } }
      ]
    });

    if (!student) {
      return NextResponse.json(
        { success: false, error: "No student profile found with this phone number. Please contact admin." },
        { status: 404 }
      );
    }

    // Sync logged-in Google/NextAuth email to the MongoDB profile
    student.email = studentEmail;
    await student.save();

    return NextResponse.json(
      {
        success: true,
        message: "Account linked successfully!",
        student,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("POST_LINK_STUDENT_ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to link profile" },
      { status: 500 }
    );
  }
}