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

      const email = decodeURIComponent(rawEmail).trim().toLowerCase();

      // 1. Parallel fetching for speed
      // CHANGE: Use .find() instead of .findOne() to get ALL applications
      const [applications, transactions] = await Promise.all([
        Application.find({ 
          email: { $regex: new RegExp(`^${email}$`, "i") } 
        }).sort({ createdAt: -1 }),
        
        Transaction.find({ 
          studentEmail: { $regex: new RegExp(`^${email}$`, "i") } 
        }).sort({ date: -1 })
      ]);

      // 2. Check if the student has at least one record
      if (!applications || applications.length === 0) {
        return NextResponse.json(
          { success: false, error: "No enrollment records found" },
          { status: 404 }
        );
      }

      // 3. Structured Response for the Dashboard
      return NextResponse.json({
        success: true,
        data: {
          // Send the full array so the Dashboard can map over them
          profile: applications, 
          ledger: transactions,
          summary: {
            totalPaid: transactions
              .filter(tx => tx.status === "success")
              .reduce((acc, curr) => acc + curr.amount, 0),
            count: applications.length
          }
        }
      }, { status: 200 });

    } catch (error: any) {
      console.error("❌ API Fetch Error:", error.message);
      return NextResponse.json(
        { success: false, error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }