import { NextRequest, NextResponse } from "next/server";
import { Student } from "@/models/Student";
import { connectToDatabase } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    // Fetch students with payment histories
    const students = await Student.find({ "installments.0": { $exists: true } })
      .select("name phone college domain installments")
      .lean();

    // Flatten nested installments array into a single chronological ledger list
    const transactions = students.flatMap((student: any) => 
      student.installments.map((inst: any) => ({
        receiptNo: inst.receiptNo,
        date: inst.date,
        name: student.name,
        phone: student.phone,
        college: student.college,
        domain: student.domain,
        paidAmount: inst.paidAmount,
        paymentMethod: inst.paymentMethod,
        transactionId: inst.transactionId,
        billingBy: inst.billingBy,
        createdAt: inst.createdAt || student.createdAt // Fallback for sorting timestamps safely
      }))
    );

    // Sort transactions by newest first
    transactions.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return NextResponse.json({ success: true, data: transactions });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}