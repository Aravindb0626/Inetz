import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Program from "@/models/Program";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;

    const { searchParams } = new URL(req.url);
    const duration = searchParams.get("duration");

    const decodedSlug = decodeURIComponent(slug);

    // Exact index lookup using { slug, duration }
    const query: Record<string, any> = { slug: decodedSlug };
    if (duration) {
      const formattedDuration = duration.replace(/-/g, " ");
      query.duration = { $regex: `^${formattedDuration}$`, $options: "i" };
    }

    const program = await Program.findOne(query).select("-__v").lean();

    if (!program) {
      return NextResponse.json(
        { error: `Program not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(program, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error: any) {
    console.error("Fetch Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);

    // Fixed: Search by slug field (findByIdAndDelete fails on string slugs)
    const deleted = await Program.findOneAndDelete({ slug: decodedSlug });
    
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Program not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}