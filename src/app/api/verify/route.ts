import { connectToDatabase } from "@/lib/db";
import Application from "@/models/Application";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    // 1. Verify the Signature (Security First)
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest("hex");

    const isAuthentic = razorpay_signature === expectedSign;

    if (isAuthentic) {
      // 2. SUCCESS FLOW
      
      // Update the Transaction record
      await Transaction.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { 
          status: "success", 
          razorpayPaymentId: razorpay_payment_id 
        }
      );

      // Update the Application record
      await Application.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { 
          status: "Success", 
          paymentStatus: "paid" 
        }
      );

      return NextResponse.json({ 
        success: true, 
        message: "Payment verified successfully" 
      });
      
    } else {
      // 3. FAILURE FLOW (Signature Mismatch)
      
      await Transaction.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: "failed" }
      );

      return NextResponse.json(
        { success: false, error: "Signature verification failed" }, 
        { status: 400 }
      );
    }
    
  } catch (error: any) {
    console.error("VERIFICATION_ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}