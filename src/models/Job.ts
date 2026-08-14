import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IJob extends Document {
  title: string;
  companyName: string;
  description: string;
  domain: string;
  location: string;
  jobType: "Full-time" | "Part-time" | "Internship";
  salaryOrStipend: string;
  postedBy: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    domain: { type: String, required: true, trim: true },
    location: { type: String, required: true, default: "Remote", trim: true },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship"],
      default: "Internship",
      required: true,
    },
    salaryOrStipend: { type: String, required: true, trim: true },
    postedBy: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true,
      index: true 
    },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

// 🎯 Performance Index: Fast filtering for student portal by active status & domain
JobSchema.index({ isActive: 1, domain: 1, createdAt: -1 });

// 🎯 Employer Dashboard Index: Fast retrieval of jobs posted by a specific employer
JobSchema.index({ postedBy: 1, createdAt: -1 });

export default models.Job || model<IJob>("Job", JobSchema);