import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Student } from "@/models/Student";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing Student ID" }, { status: 400 });
    }

    await connectToDatabase();

    // Look up by Mongo ObjectId or numeric sNo
    let studentDoc = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      studentDoc = await Student.findById(id).lean();
    } else {
      studentDoc = await Student.findOne({ sNo: Number(id) }).lean();
    }

    if (!studentDoc) {
      return NextResponse.json({ success: false, error: "Student record not found in database" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      student: studentDoc,
    });
  } catch (error: any) {
    console.error("CERTIFICATE_DATA_ERROR:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}