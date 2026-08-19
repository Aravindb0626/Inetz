import mongoose, { Schema, Document, Model } from "mongoose";

export interface IApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  resumeUrl: string;
  status: "Applied" | "Shortlisted" | "Rejected";
  interviewStatus: "Locked" | "Approved" | "Completed";
  interviewDate?: Date;
  interviewLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Rejected"],
      default: "Applied",
    },
    interviewStatus: {
      type: String,
      enum: ["Locked", "Approved", "Completed"],
      default: "Locked",
    },
    interviewDate: {
      type: Date,
    },
    interviewLink: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    autoIndex: process.env.NODE_ENV !== "production",
  }
);

// ─── COMPOUND & QUERY PERFORMANCE INDEXES ─────────────────────────────────────

// 1. Fast Employer Applicant Roster Lookup (Query by Job, sorted newest first)
ApplicationSchema.index({ jobId: 1, createdAt: -1 });

// 2. Fast Student Dashboard Lookup (Query by Student, sorted newest first)
ApplicationSchema.index({ studentId: 1, createdAt: -1 });

// 3. Unique Guard: Prevents duplicate applications for the same job
ApplicationSchema.index({ jobId: 1, studentId: 1 }, { unique: true });

// ─────────────────────────────────────────────────────────────────────────────

// Clear cached model in Next.js development to prevent HMR schema collisions
if (process.env.NODE_ENV !== "production") {
  delete mongoose.models.Application;
}

export const Application: Model<IApplication> =
  mongoose.models.Application ||
  mongoose.model<IApplication>("Application", ApplicationSchema);

export default Application;