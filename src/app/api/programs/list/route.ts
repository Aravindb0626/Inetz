import { NextResponse } from "next/server";
import Program from "@/models/Program";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch dynamic data from MongoDB
    const programs = await Program.find({})
      .select("title heroImg subtitle syllabus slug price originalPrice") 
      .lean(); 

    // Transform database fields to match the UI expectations
    const formattedPrograms = programs.map(p => {
      // Logic to determine tech stack key for icon rendering
      let stackKey: any = "Python"; 
      const lowerTitle = (p.title || "").toLowerCase();
      if (lowerTitle.includes("mern")) stackKey = "MERN";
      else if (lowerTitle.includes("java")) stackKey = "Java";

      return {
        _id: p._id,
        stack: stackKey,
        title: p.title,
        image: p.heroImg,
        subtitle: p.subtitle,
        description: p.subtitle, // Fallback if needed
        modules: p.syllabus?.length || 0,
        slug: p.slug
      };
    });

    return NextResponse.json(formattedPrograms);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
  }
}