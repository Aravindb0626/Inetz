import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    GOOGLE_SHEET_WEBAPP_URL_EXISTS: !!process.env.GOOGLE_SHEET_WEBAPP_URL,
    MONGODB_EXISTS: !!process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV,
  });
}