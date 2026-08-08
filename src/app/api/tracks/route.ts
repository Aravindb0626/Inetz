import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";

const ProgramSchema = new mongoose.Schema({
  title: String,
  slug: String,
  duration: String,
  price: Number,
  originalPrice: Number,
}, { collection: "programs" });

const Program = mongoose.models.Program || mongoose.model("Program", ProgramSchema);

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch all programs with title, duration, price, and originalPrice
    const programs = await Program.find({}, "title duration price originalPrice").lean();

    return NextResponse.json(programs, { status: 200 });
  } catch (error) {
    console.error("API Error [GET /api/tracks]:", error);
    return NextResponse.json(
      { error: "Failed to fetch tracks and durations" },
      { status: 500 }
    );
  }
}