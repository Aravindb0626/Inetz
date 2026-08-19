import { connectToDatabase } from "@/lib/db";
import { Student } from "@/models/Student";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
      phone,
      paidAmount,
      billingBy,
      paymentMethod,
    } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { success: false, error: "Missing RAZORPAY_KEY_SECRET in environment variables" },
        { status: 500 }
      );
    }

    // 1. Verify Razorpay HMAC Signature
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSign = crypto
      .createHmac("sha256", keySecret)
      .update(sign)
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return NextResponse.json(
        { success: false, error: "Invalid Razorpay payment signature." },
        { status: 400 }
      );
    }

    const studentPhone = (phone || "").trim();
    const studentEmail = (email || "").trim().toLowerCase();

    if (!studentPhone && !studentEmail) {
      return NextResponse.json(
        { success: false, error: "Phone number or email is required for payment verification." },
        { status: 400 }
      );
    }

    // 2. Find Student Record by Phone or Email fallback
    const searchConditions: any[] = [];
    if (studentPhone) searchConditions.push({ phone: studentPhone });
    if (studentEmail) searchConditions.push({ email: studentEmail });

    const student = await Student.findOne({ $or: searchConditions });

    if (!student) {
      return NextResponse.json(
        { success: false, error: "Student record not found for this account." },
        { status: 404 }
      );
    }

    // 🎯 3. Guard: Ensure installments array exists
    if (!Array.isArray(student.installments)) {
      student.installments = [];
    }

    // 🎯 4. Idempotency Check: Don't add duplicate payment if already processed
    const alreadyRecorded = student.installments.some(
      (inst: any) => inst.transactionId === razorpay_payment_id
    );

    if (alreadyRecorded) {
      return NextResponse.json({
        success: true,
        message: "Payment already verified and recorded",
        studentId: student._id,
      });
    }

    // 5. Format Receipt Details
    const displayDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const paymentVal = Number(paidAmount) || 0;
    const uniqueReceiptNo = `IT-ONLINE-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 6. Push Installment Entry
    student.installments.push({
      receiptNo: uniqueReceiptNo,
      date: displayDate,
      paidAmount: paymentVal,
      paymentMethod: paymentMethod || "Razorpay Online",
      transactionId: razorpay_payment_id || "N/A",
      billingBy: billingBy || "Razorpay Online",
    });

    // 🎯 7. Recalculate totalCollection directly in case pre("save") hook only updates balance
    const currentTotalCollected = student.installments.reduce(
      (sum: number, inst: any) => sum + (Number(inst.paidAmount) || 0),
      0
    );
    student.totalCollection = currentTotalCollected;

    // 8. Trigger pre("save") hook to recalculate pendingAmount and set feesStatus
    await student.save();

    return NextResponse.json({
      success: true,
      message: "Payment verified and recorded successfully",
      studentId: student._id,
    });
  } catch (error: any) {
    console.error("VERIFY_ROUTE_EXCEPTION:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Verification processing failed." },
      { status: 500 }
    );
  }
}