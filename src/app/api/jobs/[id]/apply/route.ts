import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/db";
import Application from "@/models/Application";
import Job from "@/models/Job";
import { Student } from "@/models/Student";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Please log in to apply for this position." },
        { status: 401 }
      );
    }

    const userId = (session.user as any).id;
    const userEmail = session.user.email;
    const jobId = params.id;

    await connectToDatabase();

    // 1. Verify Job Existence & Active Status
    const job = await Job.findById(jobId).lean();
    if (!job || !job.isActive) {
      return NextResponse.json(
        { success: false, error: "This job listing is no longer accepting applications." },
        { status: 404 }
      );
    }

    // 2. Fetch Resume URL from Request Body or Student Record
    const body = await req.json().catch(() => ({}));
    let finalResumeUrl = body.resumeUrl;

    // Fallback: If resumeUrl wasn't passed directly in payload, search Student collection by email or user ID
    if (!finalResumeUrl) {
      const student = await Student.findOne({
        $or: [{ _id: userId }, { email: userEmail }],
      }).lean();

      finalResumeUrl = student?.resumeUrl;
    }

    if (!finalResumeUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "No resume found. Please upload a PDF resume in your profile before applying.",
        },
        { status: 400 }
      );
    }

    // 3. Create Application Record
    // Note: The Application model's unique compound index ({ jobId: 1, studentId: 1 })
    // will catch duplicate applications if a student tries applying twice.
    const application = await Application.create({
      jobId,
      studentId: userId,
      resumeUrl: finalResumeUrl,
      status: "Applied",
      interviewStatus: "Locked", // Default locked state
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully!",
        application,
      },
      { status: 201 }
    );
  } catch (error: any) {
    // MongoDB duplicate key error code (E11000)
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "You have already applied for this job listing." },
        { status: 400 }
      );
    }

    console.error("SUBMIT_APPLICATION_ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}