"use client";

import React, { useState } from "react";
import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface ApplyData {
  fullName: string;
  email: string;
  phone: string;
  college?: string;
  domain?: string;
  duration?: string;
  totalBilling?: number;
  amountToPay: number;
}

export default function RazorpayCheckout({ formData }: { formData: ApplyData }) {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Razorpay SDK failed to load. Please check your internet connection.");
        setLoading(false);
        return;
      }

      // 1. Call /api/apply (Creates Order & Student Record)
      const res = await axios.post("/api/apply", formData);

      if (!res.data.success) {
        alert(res.data.error || "Order creation failed");
        setLoading(false);
        return;
      }

      const { orderId, amount, key, studentId } = res.data;

      // 2. Open Razorpay Modal
      const options = {
        key: key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: "INR",
        name: "Inetz Technologies",
        description: `${formData.domain || "Course"} Fee Payment`,
        order_id: orderId,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#059669",
        },
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          try {
            // 3. Verify Payment Signature
            const verifyRes = await axios.post("/api/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              email: formData.email,
              phone: formData.phone,
              paidAmount: formData.amountToPay,
              billingBy: "Razorpay Online",
            });

            if (verifyRes.data.success) {
              alert("Payment successful & registration complete!");
              window.location.reload();
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification Error:", err);
            alert("Error verifying payment.");
          }
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (err: any) {
      console.error("Payment Error:", err);
      alert(err.response?.data?.error || "Processing failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all cursor-pointer disabled:opacity-50"
    >
      {loading ? "Processing..." : `Pay ₹${formData.amountToPay} & Submit`}
    </button>
  );
}