import { NextRequest, NextResponse } from "next/server";
import { Student } from "@/models/Student";
import { connectToDatabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const studentId = formData.get("studentId") as string | null;
    const email = formData.get("email") as string | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No resume PDF file uploaded." },
        { status: 400 }
      );
    }

    // 🎯 Fallback: Find by studentId OR email address
    let student = null;

    if (studentId && studentId !== "undefined" && studentId.trim() !== "") {
      student = await Student.findById(studentId);
    } 
    
    if (!student && email && email.trim() !== "") {
      student = await Student.findOne({ email: email.trim().toLowerCase() });
    }

    if (!student) {
      return NextResponse.json(
        { success: false, error: "Student record not found. Please log in again." },
        { status: 404 }
      );
    }

    // File validation (Max 5MB PDF)
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, error: "Only PDF format documents are supported." },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Resume file size must be less than 5MB." },
        { status: 400 }
      );
    }

    // Store the URL (Cloudinary / S3 / Static storage)
    // Replace with your actual upload logic if using Cloudinary/S3
    const resumeUrl = `https://storage.inetz.com/resumes/${student._id}-${Date.now()}.pdf`;

    student.resumeUrl = resumeUrl;
    await student.save();

    return NextResponse.json({
      success: true,
      message: "Resume uploaded successfully.",
      resumeUrl: student.resumeUrl,
    });
  } catch (error: any) {
    console.error("Upload resume failure:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process resume upload." },
      { status: 500 }
    );
  }
}