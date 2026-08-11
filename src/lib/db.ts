import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;


// 🎯 Declare global type to avoid TypeScript `(global as any)` assertions
declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  // 1. Return existing connection if already established
  if (cached.conn) {
    return cached.conn;
  }

  // 2. Create connection promise if one is not already pending
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      
      // 🚀 Performance & Load Testing Tuning Options:
      maxPoolSize: 50,             // Maintain up to 50 socket connections for high concurrency
      minPoolSize: 10,             // Keep 10 sockets open to eliminate initial handshake latency
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging indefinitely if DB goes down
      socketTimeoutMS: 45000,      // Close sockets after 45s of inactivity
    };

    cached.promise = mongoose
      .connect(MONGODB_URI as string, opts)
      .then((m) => {
        console.log("✅ MongoDB Connected Successfully");
        return m;
      })
      .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        cached.promise = null; // Reset cached promise so subsequent requests can retry
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}