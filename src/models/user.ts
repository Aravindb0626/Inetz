import mongoose, { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcryptjs";

// 1. Define the Interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

// 2. Define the Schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "student" },
  createdAt: { type: Date, default: Date.now },
});

/**
 * 3. Pre-save Hook (Async Version)
 * In Mongoose + TS, if you use an 'async' function, 
 * you do NOT need the 'next' parameter.
 */
UserSchema.pre<IUser>("save", async function (this: IUser) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error: any) {
    throw error; // Mongoose will catch this as a save error
  }
});

// 4. Instance Method for Password Comparison
UserSchema.methods.comparePassword = async function (
  this: IUser, 
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// 5. The Export Strategy
const User = (models.User as mongoose.Model<IUser>) || model<IUser>("User", UserSchema);

export default User;
