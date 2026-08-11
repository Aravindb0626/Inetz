import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Journal } from "@/models/Journal";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    // Sort by date descending
    const journals = await Journal.find({}).sort({ date: -1 }).lean();
    return NextResponse.json(journals);
  } catch (error: any) {
    console.error("GET /api/journal Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    let imageUrl = body.image || "";
    
    // If the image is a base64 string, upload to Cloudinary
    if (imageUrl && imageUrl.startsWith('data:image')) {
      const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
        folder: "inetz_journals",
      });
      imageUrl = uploadResponse.secure_url;
    }

    // Process gallery images if they are base64
    let galleryImages = body.galleryImages || [];
    if (galleryImages.length > 0) {
      const processedGallery = await Promise.all(
        galleryImages.map(async (img: string) => {
          if (img.startsWith('data:image')) {
            const res = await cloudinary.uploader.upload(img, { folder: "inetz_journals" });
            return res.secure_url;
          }
          return img;
        })
      );
      galleryImages = processedGallery;
    }

    const newJournal = await Journal.create({
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      author: body.author || "Admin",
      readTime: body.readTime || "5 min read",
      date: body.date ? new Date(body.date) : new Date(),
      image: imageUrl,
      mediaUrl: body.mediaUrl || imageUrl,
      isFeatured: body.isFeatured || false,
      videoUrl: body.videoUrl || "",
      galleryImages: galleryImages,
    });

    return NextResponse.json(newJournal, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/journal Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
