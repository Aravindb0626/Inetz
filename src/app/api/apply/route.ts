import { connectToDatabase } from "@/lib/db";
import Application from "@/models/Application";
import Transaction from "@/models/Transaction"; // 1. Import the model
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!, 
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    const { fullName, email, phone, amountToPay, track } = body;

    // 1. Validation
    if (!fullName || !email || !phone) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    if (!amountToPay || amountToPay < 500) {
      return NextResponse.json({ success: false, error: "Min ₹500 required" }, { status: 400 });
    }

    // 2. Create Razorpay Order
    const amountInPaise = Math.round(amountToPay * 100);
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: { studentName: fullName, email: email },
    });

    if (!order) throw new Error("Order creation failed");

    // 3. Save Application (Marked as PENDING/UNPAID initially)
    const newApplication = await Application.create({
      ...body,
      amount: amountToPay, 
      razorpayOrderId: order.id,
      status: "pending",        // "Right" way: Start as pending
      paymentStatus: "unpaid",  // "Right" way: Start as unpaid
    });

    // 4. CREATE THE TRANSACTION RECORD
    // This logs that the student ATTEMPTED to pay.
    await Transaction.create({
      studentEmail: email,
      applicationId: newApplication._id,
      razorpayOrderId: order.id,
      amount: amountToPay,
      note: `Initial enrollment fee for ${track || "Internship"}`,
      status: "pending", // Will be updated to 'success' in verify route
    });

    // 5. Return details to trigger modal
    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        amount: order.amount,
        key: process.env.RAZORPAY_KEY_ID, 
        applicationId: newApplication._id,
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("RAZORPAY_ORDER_ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: "Process failed. Try again." },
      { status: 500 }
    );
  }
}