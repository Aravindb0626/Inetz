import mongoose, { Schema, model, models, Document } from "mongoose";


export interface IApplication extends Document {
  fullName: string;
  email: string;
  phone: string;
  college?: string;
  department?: string;
  year?: string;
  domain: string;
  mode: string;
  status: string;
  createdAt: Date;
  track: String,      // Added
  duration: String,   // Added
  amount: Number,
  razorpayOrderId: String,
  paymentStatus: String,
}

const ApplicationSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true }, // Not unique, as one person might apply for different roles
  phone: { type: String, required: true },
  college: { type: String },
  department: { type: String },
  year: { type: String },
  track: { type: String },      // Added   // Added
  amount: { type: Number },
  domain: { type: String, default: "MERN Stack" },
  duration : {type : String,},
  mode: { type: String, default: "Online" },
  razorpayOrderId: { type: String },
  status: { type: String, default: 'pending' },
  paymentStatus: { type: String, default: 'unpaid' },
  createdAt: { type: Date, default: Date.now },
});


const Application = (models.Application as mongoose.Model<IApplication>) || model<IApplication>("Application", ApplicationSchema);

export default Application;