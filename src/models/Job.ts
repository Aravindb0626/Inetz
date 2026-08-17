import mongoose, { Schema, Document, Model } from "mongoose";

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
    title: { 
      type: String, 
      required: true, 
      trim: true 
    },
    companyName: { 
      type: String, 
      required: true, 
      trim: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    domain: { 
      type: String, 
      required: true, 
      trim: true 
    },
    location: { 
      type: String, 
      required: true, 
      default: "Remote", 
      trim: true 
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship"],
      default: "Internship",
      required: true,
    },
    salaryOrStipend: { 
      type: String, 
      required: true, 
      trim: true 
    },
    postedBy: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true,
    },
    isActive: { 
      type: Boolean, 
      default: true,
    },
  },
  { 
    timestamps: true,
    autoIndex: process.env.NODE_ENV !== "production",
  }
);

// ─── QUERY PERFORMANCE & DIRECTORY INDEXES ───────────────────────────────────

// 1. High-speed multi-filter index for the Student Jobs Directory
JobSchema.index({ isActive: 1, domain: 1, jobType: 1, createdAt: -1 });

// 2. Fast retrieval for Employer Dashboard (jobs posted by an employer)
JobSchema.index({ postedBy: 1, createdAt: -1 });

// 3. Fast keyword search across titles, companies, domains, and descriptions
JobSchema.index(
  { title: "text", companyName: "text", domain: "text", description: "text" },
  { weights: { title: 10, companyName: 5, domain: 3, description: 1 } }
);

// ─────────────────────────────────────────────────────────────────────────────

// Clear cached model in Next.js development to prevent HMR schema collisions
if (process.env.NODE_ENV !== "production") {
  delete mongoose.models.Job;
}

export const Job: Model<IJob> =
  mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);

export default Job;