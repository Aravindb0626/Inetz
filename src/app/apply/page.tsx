"use client";

import React, { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Phone, GraduationCap, 
  Sparkles, ChevronDown, CheckCircle2, 
  Send, Loader2 
} from "lucide-react";

const ApplyAndPayPage = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    department: "",
    year: "1st Year",
    domain: "MERN Stack",
    duration: "1 Month",
    mode: "Online",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyAndPay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // 1. Create Order & Save Application in Backend
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      // 2. Open Razorpay Checkout Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: data.amount,
        currency: "INR",
        name: "INetZ Academy",
        description: "Internship Registration Fee",
        order_id: data.orderId, 
        handler: function (response: any) {
          // Success Path
          setPaymentSuccess(true);
          setIsProcessing(false);
          setTimeout(() => router.push("/dashboard"), 3000);
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#059669" },
        modal: { ondismiss: () => setIsProcessing(false) }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error: any) {
      alert("Error: " + error.message);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans p-6">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      {/* SUCCESS OVERLAY */}
      <AnimatePresence>
        {paymentSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-zinc-950 text-center p-6">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="space-y-6">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold italic">Payment Successful!</h2>
              <p className="text-zinc-500">Welcome to the Residency, {formData.fullName}.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-4xl mx-auto py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight italic">
            Complete <span className="text-emerald-600">Registration</span>
          </h1>
          <p className="text-zinc-500 mt-4">Fill your details and secure your seat with the ₹500 registration fee.</p>
        </header>
        
        <form onSubmit={handleApplyAndPay} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-12 space-y-10 shadow-2xl">
          
          {/* SECTION 1: PERSONAL */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <User className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold italic">Contact Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Full Name</label>
                <input name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="Sonu" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="sonu@example.com" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Phone Number</label>
                <div className="relative">
                   <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                   <input name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="+91..." />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: ACADEMIC */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold italic">Education</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">College Name</label>
                <input name="college" value={formData.college} onChange={handleChange} required className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="University Name" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Department</label>
                <input name="department" value={formData.department} onChange={handleChange} required className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="CSE / IT" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Year</label>
                <select name="year" value={formData.year} onChange={handleChange} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 px-5 text-sm outline-none">
                   <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option><option>Passed out</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 3: INTERNSHIP INFO */}
          <div className="space-y-6">
             <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold italic">Preferences</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Domain</label>
                <select name="domain" value={formData.domain} onChange={handleChange} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 px-5 text-sm outline-none">
                   <option>MERN Stack</option><option>Python / AI</option><option>Java</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Duration</label>
                <select name="duration" value={formData.duration} onChange={handleChange} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 px-5 text-sm outline-none">
                   <option>1 Month</option><option>3 Months</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Mode</label>
                <select name="mode" value={formData.mode} onChange={handleChange} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 px-5 text-sm outline-none">
                   <option>Online</option><option>Offline</option>
                </select>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isProcessing}
            className="w-full py-6 bg-emerald-600 text-white rounded-[1.5rem] font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 disabled:opacity-70"
          >
            {isProcessing ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
            {isProcessing ? "Connecting to Razorpay..." : "Secure Payment • ₹500"}
          </button>

        </form>
      </main>
    </div>
  );
};

export default ApplyAndPayPage;