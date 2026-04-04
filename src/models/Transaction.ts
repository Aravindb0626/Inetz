import mongoose, { Schema, model, models, Document } from "mongoose";

// 1. Define the TypeScript Interface
export interface ITransaction extends Document {
  studentEmail: string;
  amount: number;
  note: string;
  status: "pending" | "success" | "failed";
  date: Date;
}

// 2. Define the Schema
const TransactionSchema = new Schema<ITransaction>(
  {
    studentEmail: { 
      type: String, 
      required: [true, "Student email is required for tracking"],
      lowercase: true,
      trim: true
    },
    amount: { 
      type: Number, 
      required: [true, "Transaction amount is required"] 
    },
    note: { 
      type: String, 
      required: [true, "A note or description is required"] 
    },
    status: { 
      type: String, 
      enum: ["pending", "success", "failed"], 
      default: "pending" 
    },
    date: { 
      type: Date, 
      default: Date.now 
    },
  },
  { 
    timestamps: true // Adds createdAt and updatedAt
  }
);

// 3. Export Strategy (Singleton Pattern)
const Transaction = (models.Transaction as mongoose.Model<ITransaction>) || 
                    model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;