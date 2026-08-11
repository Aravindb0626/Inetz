import mongoose, { Schema, Document } from "mongoose";

export interface IInstallment {
  receiptNo: string;
  date: string;
  paidAmount: number;
  paymentMethod: "Cash" | "GPay";
  transactionId: string;
  billingBy: string;
}

export interface IStudent extends Document {
  sNo: number;
  doj: string;
  name: string;
  email?: string; // Optional for cash/manual entries
  phone: string;
  college: string;
  domain: string;
  duration: string;
  totalBilling: number;
  installments: IInstallment[];
  totalCollection: number;
  pendingAmount: number;
  feesStatus: "Pending" | "Fully Paid" | "Clear";
  certificateStatus: "Pending" | "Issued";
}

const InstallmentSchema = new Schema<IInstallment>({
  receiptNo: { type: String, required: true },
  date: { type: String, required: true },
  paidAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["Cash", "GPay"], required: true },
  transactionId: { type: String, default: "N/A" },
  billingBy: { type: String, required: true }
});

const StudentSchema = new Schema<IStudent>({
  sNo: { type: Number, required: true, index: true },
  doj: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: false, 
    trim: true, 
    lowercase: true, 
    default: "" 
  },
  phone: { type: String, required: true, trim: true, index: true },
  college: { type: String, required: true, trim: true },
  domain: { type: String, required: true, index: true },
  duration: { type: String, required: true },
  totalBilling: { type: Number, required: true },
  installments: [InstallmentSchema],
  totalCollection: { type: Number, default: 0 },
  pendingAmount: { type: Number, required: true },
  feesStatus: { 
    type: String, 
    enum: ["Pending", "Fully Paid", "Clear"], 
    default: "Pending" 
  },
  certificateStatus: { type: String, enum: ["Pending", "Issued"], default: "Pending" }
}, { timestamps: true });

// ─── INDEX DEFINITIONS FOR LOAD TEST OPTIMIZATION ────────────────────────────

// 1. Fast sorting for paginated tables (.sort({ createdAt: -1 }))
StudentSchema.index({ createdAt: -1 });

// 2. Fast lookup for payment verification ($or queries matching phone/email)
StudentSchema.index({ phone: 1, email: 1 });

// 3. Fast filtered directory queries (Filtering by domain + sorting by date)
StudentSchema.index({ domain: 1, createdAt: -1 });

// 4. Instant full-text search across name, email, and phone
StudentSchema.index({ name: "text", email: "text", phone: "text" });

// ─────────────────────────────────────────────────────────────────────────────

StudentSchema.pre<IStudent>("save", function () {
  const total = this.installments.reduce((sum, inst) => sum + inst.paidAmount, 0);
  this.totalCollection = total;
  this.pendingAmount = Math.max(0, this.totalBilling - total);
  this.feesStatus = this.pendingAmount === 0 ? "Clear" : "Pending";
});

// Force model re-compilation in development mode
if (process.env.NODE_ENV !== "production") {
  delete mongoose.models.Student;
}

export const Student = mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);