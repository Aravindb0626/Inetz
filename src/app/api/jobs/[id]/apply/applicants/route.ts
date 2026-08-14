import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/db";
import Application from "@/models/Application";
import Job from "@/models/Job";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required." },
        { status: 401 }
      );
    }

    const userId = (session.user as any).id;
    const userRole = (session.user as any).role;

    if (userRole !== "employer" && userRole !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized access." },
        { status: 403 }
      );
    }

    await connectToDatabase();

    const jobId = params.id;

    // 1. Verify that the job exists and belongs to this employer
    const job = await Job.findById(jobId).lean();
    if (!job) {
      return NextResponse.json(
        { success: false, error: "Job listing not found." },
        { status: 404 }
      );
    }

    if (userRole !== "admin" && job.postedBy.toString() !== userId) {
      return NextResponse.json(
        { success: false, error: "You do not have permission to view applicants for this job." },
        { status: 403 }
      );
    }

    // 2. Fetch applications with populated student details
    const applicants = await Application.find({ jobId })
      .populate("studentId", "name email phone college domain duration")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: applicants.length,
        jobTitle: job.title,
        applicants,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET_APPLICANTS_ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}