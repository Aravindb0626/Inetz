import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Job from "@/models/Job";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    // 1. Extract Filter Parameters
    const domain = searchParams.get("domain")?.trim() || "";
    const jobType = searchParams.get("jobType")?.trim() || "";
    const search = searchParams.get("search")?.trim() || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);
    const skip = (page - 1) * limit;

    // 2. Build Query (Only active jobs)
    const query: Record<string, any> = { isActive: true };

    if (domain && domain !== "All") {
      query.domain = domain;
    }

    if (jobType && jobType !== "All") {
      query.jobType = jobType;
    }

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const searchRegex = new RegExp(escapedSearch, "i");
      query.$or = [
        { title: searchRegex },
        { companyName: searchRegex },
        { location: searchRegex },
        { description: searchRegex },
      ];
    }

    // 3. Parallel Database Execution
    const [jobs, totalJobs, uniqueDomains] = await Promise.all([
      Job.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Job.countDocuments(query),
      Job.distinct("domain", { isActive: true }),
    ]);

    return NextResponse.json(
      {
        success: true,
        jobs,
        availableDomains: ["All", ...uniqueDomains.filter(Boolean)],
        pagination: {
          totalJobs,
          totalPages: Math.ceil(totalJobs / limit) || 1,
          currentPage: page,
          limit,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET_PUBLIC_JOBS_ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}