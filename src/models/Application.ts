import mongoose, { Schema, Document, models, model } from "mongoose";

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
      index: true 
    },
    studentId: { 
      type: Schema.Types.ObjectId, 
      ref: "Student", 
      required: true,
      index: true 
    },
    resumeUrl: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Rejected"],
      default: "Applied",
    },
    // 🎯 Access control flag for the student's interview portal
    interviewStatus: {
      type: String,
      enum: ["Locked", "Approved", "Completed"],
      default: "Locked",
    },
    interviewDate: { type: Date },
    interviewLink: { type: String, trim: true },
  },
  { timestamps: true }
);

// 🎯 Performance Indexes
ApplicationSchema.index({ jobId: 1, createdAt: -1 });
ApplicationSchema.index({ studentId: 1, createdAt: -1 });

// 🎯 Compound Unique Index: Prevents a student from applying to the same job twice
ApplicationSchema.index({ jobId: 1, studentId: 1 }, { unique: true });

export default models.Application || model<IApplication>("Application", ApplicationSchema);