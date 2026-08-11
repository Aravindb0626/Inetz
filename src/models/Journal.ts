import mongoose from "mongoose";

const JournalSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String },
  mediaUrl: { type: String },
  readTime: { type: String },
  date: { type: Date, default: Date.now },
  isFeatured: { type: Boolean, default: false },
  videoUrl: { type: String },
  galleryImages: [{ type: String }],
}, { timestamps: true });

export const Journal = mongoose.models.Journal || mongoose.model("Journal", JournalSchema);
