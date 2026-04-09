"use client";

import React, { useState, useEffect, Suspense } from "react";
import Script from "next/script";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User, Phone, ChevronDown, CheckCircle2,
  Loader2, ShieldCheck, CreditCard,
  ArrowLeft, Building2, Briefcase,
  AlertCircle, IndianRupee, Lock, ShoppingCart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { programData, type TechStack, type Duration } from "@/lib/program-data";

// 1. Move the main logic into a sub-component
function ReviewAndPayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlTrack = (searchParams.get("track") as TechStack) || "Python";
  const urlDuration = (searchParams.get("duration") as Duration) || "1 Month";

  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    department: "",
    year: "1st Year",
    track: urlTrack,
    duration: urlDuration,
    mode: "Online",
  });

  const currentProgram = programData[formData.track]?.[formData.duration];
  const discountedFee = currentProgram?.price || 500;
  const originalFee = currentProgram?.originalPrice || 2000;

  const [customAmount, setCustomAmount] = useState<number>(discountedFee);
  
  useEffect(() => {
    setCustomAmount(discountedFee);
  }, [discountedFee]);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (customAmount < 500) return alert("Min payment is ₹500");

    setIsProcessing(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        body: JSON.stringify({ ...formData, amountToPay: customAmount }),
      });
      const data = await res.json();

      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        name: "INetZ Academy",
        order_id: data.orderId,
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch("/api/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              router.push("/dashboard?status=success");
            } else {
              alert("Verification failed. Please contact support.");
              setIsProcessing(false);
            }
          } catch (err) {
            console.error("Verification error:", err);
            setIsProcessing(false);
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#A6056F" },
        modal: { ondismiss: () => setIsProcessing(false) },
      };
      
      if (!(window as any).Razorpay) {
        alert("Razorpay SDK not loaded. Please check your internet connection.");
        setIsProcessing(false);
        return;
      }

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <main className="max-w-5xl mx-auto px-6 py-8 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: REGISTRATION FORM */}
        <div className="lg:col-span-7 space-y-6">
          <button
            onClick={() => router.back()}
            className="text-[10px] font-black uppercase flex items-center gap-1.5 text-slate-400 hover:text-[#A6056F] transition-all tracking-widest"
          >
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
          <h1 className="text-2xl font-black tracking-tight text-[#632450] uppercase">Review & Apply</h1>

          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-5 h-5 rounded bg-[#ECCC6E]/20 text-[#632450] flex items-center justify-center text-[10px] font-black">1</span>
                <h2 className="font-black text-[11px] text-slate-800 uppercase tracking-widest">Contact Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input label="Full Name" value={formData.fullName} onChange={(v: any) => setFormData({ ...formData, fullName: v })} placeholder="Name" />
                <Input label="Email" value={formData.email} onChange={(v: any) => setFormData({ ...formData, email: v })} placeholder="Email" />
                <div className="md:col-span-2">
                  <Input label="Phone Number" value={formData.phone} onChange={(v: any) => setFormData({ ...formData, phone: v })} placeholder="Mobile" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-5 h-5 rounded bg-[#ECCC6E]/20 text-[#632450] flex items-center justify-center text-[10px] font-black">2</span>
                <h2 className="font-black text-[11px] text-slate-800 uppercase tracking-widest">Education Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <Input label="College" value={formData.college} onChange={(v: any) => setFormData({ ...formData, college: v })} placeholder="Institution" />
                </div>
                <Input label="Department" value={formData.department} onChange={(v: any) => setFormData({ ...formData, department: v })} placeholder="CSE / IT" />
                <Select label="Year" value={formData.year} options={["1st Year", "2nd Year", "3rd Year", "4th Year"]} onChange={(v: any) => setFormData({ ...formData, year: v })} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-5 h-5 rounded bg-[#ECCC6E]/20 text-[#632450] flex items-center justify-center text-[10px] font-black">3</span>
                <h2 className="font-black text-[11px] text-slate-800 uppercase tracking-widest">Program</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Select label="Track" value={formData.track} options={["Python", "MERN", "Java", "Data"]} onChange={(v: any) => setFormData({ ...formData, track: v })} />
                <Select label="Duration" value={formData.duration} options={["1 Week", "1 Month", "3 Months"]} onChange={(v: any) => setFormData({ ...formData, duration: v })} />
                <Select label="Mode" value={formData.mode} options={["Online", "Offline"]} onChange={(v: any) => setFormData({ ...formData, mode: v })} />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: COMPACT ORDER SUMMARY */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm sticky top-20">
            <div className="p-3 border-b border-slate-100 flex items-center gap-2 font-black text-[9px] uppercase tracking-widest text-slate-400">
              <ShoppingCart className="w-3.5 h-3.5 text-[#A6056F]" /> Order Summary
            </div>
            <div className="p-4">
              <div className="rounded-lg overflow-hidden mb-3 h-32 bg-slate-100">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600" className="w-full h-full object-cover" alt="Program" />
              </div>
              <h3 className="font-black text-sm leading-tight text-slate-800 uppercase tracking-tighter">
                {formData.duration} {formData.track} Internship
              </h3>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
                  <span>Standard Fee</span>
                  <span className="line-through decoration-slate-300">₹{originalFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] text-[#A6056F] font-black uppercase">
                  <span>Scholarship</span>
                  <span>-₹{(originalFee - discountedFee).toLocaleString()}</span>
                </div>

                <div className="bg-[#ECCC6E]/5 border border-[#632450]/10 rounded-lg p-2.5 my-3 flex items-center justify-between gap-3">
                  <div className="flex-shrink-0">
                    <label className="text-[8px] font-black uppercase text-[#632450]/60 tracking-widest block">Payable Now</label>
                    <p className="text-[7px] font-bold text-slate-400 italic">(Min ₹500)</p>
                  </div>
                  <div className="relative flex-1 max-w-[110px]">
                    <IndianRupee className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-[#632450]/50" />
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(parseInt(e.target.value) || 0)}
                      className="w-full pl-6 pr-2 py-1.5 bg-white border border-[#632450]/20 rounded text-sm font-black text-slate-800 outline-none text-right"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-dashed border-slate-200 flex justify-between items-baseline">
                  <span className="font-black text-[10px] text-slate-400 uppercase tracking-widest">Grand Total</span>
                  <span className="font-black text-xl text-[#632450] tracking-tighter">₹{customAmount.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full mt-5 py-3.5 bg-[#A6056F] hover:bg-[#850459] text-white rounded-lg font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-[#A6056F]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? <Loader2 className="animate-spin size-3" /> : <Lock className="size-3" />}
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// 2. Wrap the logic in a Suspense boundary for the build to pass
export default function ReviewAndPay() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#A6056F]" />
      </div>
    }>
      <ReviewAndPayContent />
    </Suspense>
  );
}

// Compact UI Components
function Input({ label, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <input
        {...props} onChange={(e) => props.onChange(e.target.value)} required
        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-bold focus:bg-white focus:border-[#A6056F] outline-none transition-all placeholder:text-slate-300"
      />
    </div>
  );
}

function Select({ label, options, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative">
        <select
          {...props} onChange={(e) => props.onChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-bold focus:bg-white focus:border-[#A6056F] outline-none appearance-none cursor-pointer"
        >
          {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-3 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}