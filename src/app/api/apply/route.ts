import { connectToDatabase } from "@/lib/db";
import { Student } from "@/models/Student";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const body = await req.json();
    const { fullName, name, email, phone, college, domain, duration, totalBilling, amountToPay } = body;

    const studentName = (fullName || name || "").trim();
    const studentPhone = (phone || "").trim();
    const studentEmail = (email || "").trim().toLowerCase(); // 🎯 Extract and normalize email

    if (!studentName || !studentPhone || !studentEmail) {
      return NextResponse.json(
        { success: false, error: "Missing required details (Name, Email, or Phone)" },
        { status: 400 }
      );
    }

    const payAmount = Number(amountToPay) || 500;
    if (payAmount < 500) {
      return NextResponse.json(
        { success: false, error: "Minimum payment is ₹500" },
        { status: 400 }
      );
    }

    // 1. Create Razorpay Order
    const amountInPaise = Math.round(payAmount * 100);
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        studentName,
        email: studentEmail,
        phone: studentPhone,
      },
    });

    if (!order) {
      throw new Error("Razorpay Order creation failed");
    }

    const billingTotal = Number(totalBilling) || payAmount;

    // 2. Find or Create/Update Student in "students" collection
    let student = await Student.findOne({ 
      $or: [{ phone: studentPhone }, { email: studentEmail }] 
    });

    if (student) {
      // 🎯 Update existing student profile including email
      student.name = studentName;
      student.email = studentEmail;
      if (college) student.college = college.trim();
      if (domain) student.domain = domain;
      if (duration) student.duration = duration;
      student.totalBilling = billingTotal;
      student.pendingAmount = Math.max(0, billingTotal - (student.totalCollection || 0));

      await student.save();
    } else {
      // 🎯 Create new student record with email included
      const lastStudent = await Student.findOne({}, { sNo: 1 }).sort({ sNo: -1 }).lean();
      const nextSNo = lastStudent && typeof lastStudent.sNo === "number" ? lastStudent.sNo + 1 : 1;

      const now = new Date();
      const dojString = now.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      student = await Student.create({
        sNo: nextSNo,
        name: studentName,
        email: studentEmail, // 🎯 Saved to MongoDB
        phone: studentPhone,
        college: college || "N/A",
        domain: domain || "Web Development",
        duration: duration || "1 Month",
        totalBilling: billingTotal,
        totalCollection: 0,
        pendingAmount: billingTotal,
        feesStatus: "Pending",
        doj: dojString,
        installments: [],
      });
    }

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        amount: order.amount,
        key: process.env.RAZORPAY_KEY_ID,
        studentId: student._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("APPLY_ROUTE_ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Process failed" },
      { status: 500 }
    );
  }
}