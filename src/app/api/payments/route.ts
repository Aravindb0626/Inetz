import { NextRequest, NextResponse } from "next/server";
import { Student } from "@/models/Student";
import { connectToDatabase } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone")?.trim();

    // ─── BRANCH A: SINGLE STUDENT LOOKUP BY PHONE ───
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
        courseName: student.duration, 
        totalBilling: student.totalBilling,
        totalAccumulatedPaid: student.totalCollection || 0
      });
    }

    // ─── BRANCH B: ALL TRANSACTIONS AUDIT LEDGER LIST FETCH ───
    // CHANGED: Query matches all students so zero installment rows aren't ignored
    const students = await Student.find({})
      .select("name phone college domain duration totalBilling totalCollection balanceAmount installments paymentType paymentMethod transactionId billingBy displayDate")
      .lean();

    const transactions: any[] = [];

    students.forEach((student: any) => {
      if (student.installments && student.installments.length > 0) {
        // Flatten true historical installment splits array list
        student.installments.forEach((inst: any) => {
          transactions.push({
            receiptNo: inst.receiptNo || "MIG-DATA",
            date: inst.date || student.doj || "N/A",
            name: student.name,
            phone: student.phone,
            college: student.college || "N/A",
            domain: student.domain || "Web development",
            courseName: student.duration || "1 Month",
            totalCoursePayment: student.totalBilling || 0,
            alreadyPaidAmount: (student.totalCollection || 0) - (inst.paidAmount || 0),
            paidAmount: inst.paidAmount || 0,
            balanceAmount: student.balanceAmount ?? Math.max(0, (student.totalBilling || 0) - (student.totalCollection || 0)),
            paymentType: student.paymentType || "Part Payment",
            paymentMethod: inst.paymentMethod || "Cash",
            transactionId: inst.transactionId || "N/A",
            billingBy: inst.billingBy || "Historical Data"
          });
        });
      } else {
        // Fallback catch placeholder for Unpaid / Zero installment tracking profiles!
        transactions.push({
          receiptNo: "REGISTRATION-PENDING",
          date: student.doj || "N/A",
          name: student.name,
          phone: student.phone,
          college: student.college || "N/A",
          domain: student.domain || "Web development",
          courseName: student.duration || "1 Month",
          totalCoursePayment: student.totalBilling || 0,
          alreadyPaidAmount: 0,
          paidAmount: 0,
          balanceAmount: student.totalBilling || 0,
          paymentType: "Part Payment",
          paymentMethod: "N/A",
          transactionId: "N/A",
          billingBy: "System Registration"
        });
      }
    });

    return NextResponse.json({ success: true, data: transactions });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ─── KEEP YOUR EXISTING POST METHOD DOWN HERE UNCHANGED ───
export async function POST(req: NextRequest) {
  // ... your existing code handles creation & nested increments perfectly!
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