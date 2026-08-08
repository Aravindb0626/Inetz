import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
  Global is used here to maintain a cached connection across hot reloads
  in development and across serverless function invocations in production.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  // 1. If connection already exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // 2. If no promise exists, create a new connection promise
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI as string, opts)
      .then((m) => {
        console.log("Connected to MongoDB successfully");
        return m;
      })
      .catch((err) => {
        console.error("MongoDB Connection Failed:", err);
        cached.promise = null; // Reset promise so next request can retry
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset cached promise on failure
    throw e;
  }

  return cached.conn;
}