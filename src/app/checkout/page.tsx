"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Zap,
  CreditCard
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const PaymentPage = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // THIS IS WHERE YOU LINK RAZORPAY LATER
  const handleRazorpayPayment = async () => {
  setIsProcessing(true);

  try {
    // 1. Create Order in your Backend
    const response = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        fullName: "Sonu", // Replace with actual state data
        email: "sonu@example.com",
        // ... include all other fields required by your Model
      }),
    });

    const data = await response.json();
    if (!data.success) throw new Error("Order creation failed");

    // 2. Open Razorpay Modal
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
      amount: data.amount,
      currency: "INR",
      name: "MERN Residency",
      order_id: data.orderId, // This links the payment to your DB entry
      handler: function (response) {
        // Payment Success Logic
        setPaymentSuccess(true);
        setIsProcessing(false);
        setTimeout(() => router.push("/dashboard"), 3000);
      },
      prefill: { name: "Sonu" },
      theme: { color: "#059669" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    setIsProcessing(false);
  }
};

  return (<>
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      
      {/* SUCCESS OVERLAY */}
      <AnimatePresence>
        {paymentSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-zinc-950 p-6 text-center"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-6"
            >
              <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-12 h-12 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold italic">Payment Successful!</h2>
              <p className="text-zinc-500 max-w-sm mx-auto">
                Welcome to the Residency, Sonu. Your enrollment is confirmed. Redirecting you to your dashboard...
              </p>
              <div className="flex justify-center gap-2">
                 <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" />
                 <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                 <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: INFO & TRUST (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-4 block">Final Step</span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter italic leading-tight">
                Complete your <span className="text-emerald-600 underline decoration-zinc-200 underline-offset-8">Registration</span>
              </h1>
              <p className="mt-6 text-lg text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
                Unlock your access to the MERN Residency 2026. This one-time registration fee secures your seat and activates your student portal.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <Zap className="w-5 h-5 text-emerald-600 mb-3" />
                <h3 className="font-bold text-sm italic">Instant Access</h3>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">Your dashboard and learning modules will be unlocked immediately.</p>
              </div>
              <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mb-3" />
                <h3 className="font-bold text-sm italic">Secure Payment</h3>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">Industry standard encryption via Razorpay secure gateway.</p>
              </div>
            </div>
          </div>

          {/* RIGHT: PAYMENT CARD (5 Columns) */}
          <aside className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] shadow-2xl overflow-hidden p-1"
            >
              <div className="bg-zinc-50 dark:bg-zinc-950 rounded-[2.2rem] p-8 md:p-10">
                <div className="flex justify-between items-center mb-10">
                  <CreditCard className="w-6 h-6 text-zinc-400" />
                  <div className="text-right">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Amount to Pay</p>
                    <p className="text-4xl font-black italic mt-1 text-emerald-600">₹500</p>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex justify-between text-xs border-b border-zinc-200 dark:border-zinc-800 pb-4">
                    <span className="text-zinc-400 font-medium">Registration Fee</span>
                    <span className="font-bold">₹500.00</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-zinc-200 dark:border-zinc-800 pb-4">
                    <span className="text-zinc-400 font-medium">GST (Included)</span>
                    <span className="font-bold">₹0.00</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2">
                    <span className="font-bold italic">Total Payable</span>
                    <span className="font-black">₹500.00</span>
                  </div>
                </div>

                <button 
                  onClick={handleRazorpayPayment}
                  disabled={isProcessing}
                  className={cn(
                    "w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-emerald-600/20",
                    isProcessing && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isProcessing ? "Opening Gateway..." : "Pay with Razorpay"}
                  {!isProcessing && <ArrowRight className="w-4 h-4" />}
                </button>

                <div className="mt-8 flex items-center justify-center gap-4 grayscale opacity-40">
                  <Lock className="w-3 h-3" />
                  <span className="text-[8px] font-black uppercase tracking-widest">Powered by Razorpay</span>
                </div>
              </div>
            </motion.div>
          </aside>

        </div>
      </main>
    </div>
    </>
  );
};

export default PaymentPage;