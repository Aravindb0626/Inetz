import { connectToDatabase } from "@/lib/db";
import Application from "@/models/Application";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// Initialize Razorpay with your TEST keys
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

   
    const amount = 500 * 100; 
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    
    const newApplication = await Application.create({
      ...body,
      razorpayOrderId: order.id, 
      status: "pending",
    });

    // 3. Return the Order details to the Frontend
    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      applicationId: newApplication._id,
    }, { status: 201 });

  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}