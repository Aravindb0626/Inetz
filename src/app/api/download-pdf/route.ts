export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const fileName = req.nextUrl.searchParams.get("file");
    if (!fileName)
      return NextResponse.json({ error: "Missing file param" }, { status: 400 });

    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "syllabuses" });

    // Find the file metadata first to confirm it exists
    const files = await bucket.find({ filename: fileName }).toArray();
    if (!files.length)
      return NextResponse.json({ error: "File not found" }, { status: 404 });

    // Stream it out
    const downloadStream = bucket.openDownloadStreamByName(fileName);

    const chunks: Buffer[] = [];
    await new Promise<void>((resolve, reject) => {
      downloadStream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
      downloadStream.on("end", resolve);
      downloadStream.on("error", reject);
    });

    const fileBuffer = Buffer.concat(chunks);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error("Download error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}