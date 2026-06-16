import { NextRequest, NextResponse } from "next/server";
import { Student } from "@/models/Student";
import { connectToDatabase } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone")?.trim();

    // ─── BRANCH A: SINGLE STUDENT LOOKUP BY PHONE (FOR MODAL AUTOFILL) ───
    if (phone) {
      const student = await Student.findOne({ phone });
      if (!student) {
        return NextResponse.json({ exists: false });
      }
      return NextResponse.json({
        exists: true,
        name: student.name,
        college: student.college,
        domain: student.domain,
        courseName: student.duration, // Maps your schema's "duration" key safely
        totalBilling: student.totalBilling,
        totalAccumulatedPaid: student.totalCollection || 0 // Maps your schema's "totalCollection" key safely
      });
    }

    // ─── BRANCH B: ALL TRANSACTIONS AUDIT LEDGER LIST FETCH (FOR DATATABLE) ───
    // Querying all records with exactly matching schema field criteria projection keys
    const students = await Student.find({})
      .select("name phone college domain duration totalBilling totalCollection installments doj")
      .lean();

    const transactions: any[] = [];

    students.forEach((student: any) => {
      if (student.installments && student.installments.length > 0) {
        
        // 1. Sort the nested installment copies chronologically (Oldest to Newest)
        // This is crucial to accurately determine the history of previous balances!
        const chronologicalInstallments = [...student.installments].sort((a: any, b: any) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

        let runningPaidSum = 0;

        chronologicalInstallments.forEach((inst: any) => {
          const currentTotalFee = Number(student.totalBilling) || 0;
          const iterationPaidAmount = Number(inst.paidAmount) || 0;
          
          // Math calculation dynamically traces out the balance left at this point in time
          const historicalBalance = Math.max(0, currentTotalFee - (runningPaidSum + iterationPaidAmount));

          transactions.push({
            receiptNo: inst.receiptNo || "MIG-DATA",
            date: inst.date || student.doj || "N/A",
            name: student.name,
            phone: student.phone,
            college: student.college || "N/A",
            domain: student.domain || "Web development",
            courseName: student.duration || "1 Month", // Safely reads your database "duration"
            totalCoursePayment: currentTotalFee,
            alreadyPaidAmount: runningPaidSum, // 🎯 FIXED: Holds the exact mathematical running sum value up to this date
            paidAmount: iterationPaidAmount,
            balanceAmount: historicalBalance,
            paymentMethod: inst.paymentMethod || "Cash",
            transactionId: inst.transactionId || "N/A",
            billingBy: inst.billingBy || "Historical Data"
          });

          // Accumulate payment for the next upcoming installment entry row
          runningPaidSum += iterationPaidAmount;
        });
      } else {
        // Fallback catch block handles registration records with zero payment balance logs
        transactions.push({
          receiptNo: "REGISTRATION-PENDING",
          date: student.doj || "N/A",
          name: student.name,
          phone: student.phone,
          college: student.college || "N/A",
          domain: student.domain || "Web development",
          courseName: student.duration || "1 Month",
          totalCoursePayment: Number(student.totalBilling) || 0,
          alreadyPaidAmount: 0,
          paidAmount: 0,
          balanceAmount: Number(student.totalBilling) || 0,
          paymentMethod: "N/A",
          transactionId: "N/A",
          billingBy: "System Registration"
        });
      }
    });

    // Sort globally to ensure the newest transaction logs display at the top of your dashboard table grid
    transactions.sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return NextResponse.json({ success: true, data: transactions });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ─── POST: SAVE PAYMENT (HANDLES CREATION & NESTED INSTALLMENT APPENDS) ───
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const currentPaid = Number(data.paidAmount) || 0;
    const newInstallment = {
      receiptNo: data.receiptNo,
      date: data.displayDate,
      paidAmount: currentPaid,
      paymentMethod: data.paymentMethod,
      transactionId: data.transactionId,
      billingBy: data.billingBy
    };

    let student = await Student.findOne({ phone: data.phone.trim() });

    if (student) {
      student.installments.push(newInstallment);
      await student.save(); 
    } else {
      const count = await Student.countDocuments();
      student = new Student({
        sNo: count + 1,
        doj: data.displayDate,
        name: data.name.trim(),
        phone: data.phone.trim(),
        college: data.college.trim(),
        domain: data.domain,
        duration: data.courseName, 
        totalBilling: Number(data.totalCoursePayment) || 0,
        installments: [newInstallment],
        pendingAmount: (Number(data.totalCoursePayment) || 0) - currentPaid
      });
      await student.save();
    }
    return NextResponse.json({ success: true, receiptNo: data.receiptNo });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}