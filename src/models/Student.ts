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
  phone: string;
  college: string;
  domain: string;
  duration: string;
  totalBilling: number;
  installments: IInstallment[];
  totalCollection: number;
  pendingAmount: number;
  feesStatus: "Pending" | "Fully Paid";
  certificateStatus: "Pending" | "Issued";
}

const InstallmentSchema = new Schema<IInstallment>({
  receiptNo: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  paidAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["Cash", "GPay"], required: true },
  transactionId: { type: String, default: "N/A" },
  billingBy: { type: String, required: true }
});

const StudentSchema = new Schema<IStudent>({
  sNo: { type: Number, required: true },
  doj: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true, unique: true },
  college: { type: String, required: true, trim: true },
  domain: { type: String, required: true },
  duration: { type: String, required: true },
  totalBilling: { type: Number, required: true },
  installments: [InstallmentSchema],
  totalCollection: { type: Number, default: 0 },
  pendingAmount: { type: Number, required: true },
  feesStatus: { type: String, enum: ["Pending", "Fully Paid"], default: "Pending" },
  certificateStatus: { type: String, enum: ["Pending", "Issued"], default: "Pending" }
}, { timestamps: true });

// ─── FIXED PRE-SAVE HOOK FOR MONGOOSE ───
// Removing the 'next' parameter and processing synchronously fixes the TypeScript error entirely
StudentSchema.pre<IStudent>("save", function () {
  const total = this.installments.reduce((sum, inst) => sum + inst.paidAmount, 0);
  this.totalCollection = total;
  this.pendingAmount = Math.max(0, this.totalBilling - total);
  this.feesStatus = this.pendingAmount === 0 ? "Fully Paid" : "Pending";
});

export const Student = mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);