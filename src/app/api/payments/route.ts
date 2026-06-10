import { NextRequest, NextResponse } from "next/server";// Ensure you have your standard mongoose connection utility here
import { Student } from "@/models/Student";

// ─── GET: LOOKUP BY PHONE (CHANNELS INITIATED ONBLUR) ───
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone")?.trim();

    if (!phone) return NextResponse.json({ error: "Phone number required" }, { status: 400 });

    const student = await Student.findOne({ phone });

    if (!student) {
      return NextResponse.json({ exists: false });
    }

    return NextResponse.json({
      exists: true,
      name: student.name,
      college: student.college,
      domain: student.domain,
      courseName: student.duration, // Mapped to match dashboard state
      totalBilling: student.totalBilling,
      totalAccumulatedPaid: student.totalCollection
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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

    // Attempt to locate student and cleanly push installment atomically
    let student = await Student.findOne({ phone: data.phone.trim() });

    if (student) {
      student.installments.push(newInstallment);
      await student.save(); // pre-save recalculates values automatically
    } else {
      // Setup total count index sequence for a fresh S.No
      const count = await Student.countDocuments();
      
      student = new Student({
        sNo: count + 1,
        doj: data.displayDate,
        name: data.name.trim(),
        phone: data.phone.trim(),
        college: data.college.trim(),
        domain: data.domain,
        duration: data.courseName, // maps dashboard state
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