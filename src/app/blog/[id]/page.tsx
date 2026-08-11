import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { connectToDatabase } from "@/lib/db";
import { Journal } from "@/models/Journal";
import mongoose from "mongoose";

// Generate SEO Metadata for individual posts
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  await connectToDatabase();
  
  let post = await Journal.findOne({ slug: resolvedParams.id }).lean() as any;
  if (!post && mongoose.Types.ObjectId.isValid(resolvedParams.id)) {
    post = await Journal.findById(resolvedParams.id).lean() as any;
  }

  if (!post) {
    return {
      title: "Post Not Found | Inetz Technologies",
    };
  }

  return {
    title: `${post.title} | Inetz Technologies Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [post.mediaUrl || post.image],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  await connectToDatabase();
  
  let post = await Journal.findOne({ slug: resolvedParams.id }).lean() as any;
  if (!post && mongoose.Types.ObjectId.isValid(resolvedParams.id)) {
    post = await Journal.findById(resolvedParams.id).lean() as any;
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
      {/* Top Header Area */}
      <div className="w-full bg-white pt-24 pb-8 px-6">
        <div className="max-w-[800px] mx-auto flex flex-col items-center text-center">
          <div className="w-full text-left mb-10">
            <Link href="/blog" className="inline-flex items-center text-[#8B9DB4] font-semibold text-[15px] hover:text-[#5d7a9c] transition-colors">
              <span className="mr-2 text-lg leading-none">&lt;</span> Back
            </Link>
          </div>

          <h1 className="text-[32px] md:text-[46px] font-medium text-[#000000] leading-[1.1] mb-8 tracking-tight max-w-[95%]">
            {post.title}
          </h1>

          <div className="text-[#3E526B] text-[15px] mb-6 font-normal">
            Last updated on - {new Date(post.date || post.createdAt).toLocaleDateString()}
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden relative shadow-sm bg-zinc-100">
              <Image 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" 
                alt={post.author || "Author"}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-[#5B799E] font-medium text-lg">{post.author || "Inetz Team"}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full bg-white pt-12 px-6">
        <div className="max-w-[800px] mx-auto">
          {/* Featured Image */}
          {(post.mediaUrl || post.image) && (
            <div className="relative aspect-[16/9] w-full bg-zinc-100 overflow-hidden rounded-xl mb-12 shadow-md">
              <Image
                src={post.mediaUrl || post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <article 
            className="prose prose-lg max-w-none text-zinc-700
              prose-headings:font-bold prose-headings:text-[#1A2B49]
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-[#3C9657] hover:prose-a:text-[#2a6b3d]
              prose-strong:text-zinc-900 prose-ul:list-disc prose-ul:pl-5
              prose-li:mb-2
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer of the article */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
            <Link href="/blog" className="inline-flex items-center px-6 py-3 bg-[#1A2B49] text-white font-medium rounded-lg hover:bg-zinc-800 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              More Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
