import { connectToDatabase } from "@/lib/db";
import Application from "@/models/Application";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const rawEmail = searchParams.get("email");

    if (!rawEmail) {
      return NextResponse.json(
        { success: false, error: "Email parameter is missing" },
        { status: 400 }
      );
    }

    // CLEANING THE EMAIL: Trim spaces and lowercase it
    const email = decodeURIComponent(rawEmail).trim().toLowerCase();

    // Parallel fetching with CASE-INSENSITIVE regex
    // This ensures "Sonu@gmail.com" matches "sonu@gmail.com"
    const [application, transactions] = await Promise.all([
      Application.findOne({ 
        email: { $regex: new RegExp(`^${email}$`, "i") } 
      }).sort({ createdAt: -1 }),
      
      Transaction.find({ 
        studentEmail: { $regex: new RegExp(`^${email}$`, "i") } 
      }).sort({ date: -1 })
    ]);

    if (!application) {
      console.log(`🔎 No application found in DB for: ${email}`);
      return NextResponse.json(
        { success: false, error: "No student profile found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        profile: application,
        ledger: transactions,
        summary: {
          totalPaid: transactions
            .filter(tx => tx.status === "success")
            .reduce((acc, curr) => acc + curr.amount, 0),
          pendingAmount: transactions
            .filter(tx => tx.status === "pending")
            .reduce((acc, curr) => acc + curr.amount, 0),
        }
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error("❌ Database Fetch Error:", error.message);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}