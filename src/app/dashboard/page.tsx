"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Phone, GraduationCap,
  Calendar, Mail, Briefcase, FileText,
  LayoutGrid, Info, BadgeCheck, Loader2,
  CreditCard, IndianRupee, AlertCircle, CheckCircle2, Link2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import axios from "axios";

interface Installment {
  receiptNo: string;
  date: string;
  paidAmount: number;
  paymentMethod: string;
  billingBy: string;
  transactionId?: string;
}

interface StudentProfile {
  _id: string;
  sNo: number;
  doj: string;
  name: string;
  phone: string;
  college: string;
  domain: string;
  duration: string;
  totalBilling: number;
  totalCollection: number;
  pendingAmount: number;
  feesStatus: "Pending" | "Fully Paid" | string;
  certificateStatus: "Pending" | "Issued" | string;
  installments: Installment[];
  createdAt?: string;
}

const Dashboard = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState<StudentProfile | null>(null);
  
  // Account Linking States
  const [phoneInput, setPhoneInput] = useState("");
  const [linking, setLinking] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (sessionStatus !== "authenticated" || !session?.user?.email) {
        if (sessionStatus === "unauthenticated") setLoading(false);
        return;
      }

      try {
        const userEmail = session.user.email;
        const response = await axios.get(`/api/student/data?email=${encodeURIComponent(userEmail)}`);

        if (response.data?.success && response.data?.student) {
          setStudentData(response.data.student);
        }
      } catch (error: any) {
        if (error.response?.status !== 404) {
          console.error("Student data fetch failed:", error);
        }
        setStudentData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [session, sessionStatus]);

  // Account Linking Form Handler via Axios POST
  const handlePhoneSubmitAndLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.email) {
      return alert("Session expired. Please sign in again.");
    }

    const cleanPhone = phoneInput.trim();
    if (cleanPhone.length < 10) {
      return alert("Please enter a valid 10-digit phone number.");
    }

    setLinking(true);

    try {
      const response = await axios.post("/api/student/data", {
        email: session.user.email,
        phone: cleanPhone,
      });

      if (response.data?.success && response.data?.student) {
        setStudentData(response.data.student);
      }
    } catch (err: any) {
      console.error("Account linking error:", err);
      const errorMessage = err.response?.data?.error || "No student record found for this phone number.";
      alert(errorMessage);
    } finally {
      setLinking(false);
    }
  };

  // Loading State
  if (loading || sessionStatus === "loading") return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="w-8 h-8 text-zinc-900 animate-spin mb-4" />
      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Synchronizing Session...</p>
    </div>
  );

  // Unauthenticated State
  if (sessionStatus === "unauthenticated") return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <p className="text-sm font-bold text-zinc-900">Please sign in to view your portal.</p>
      <a href="/login" className="mt-4 text-xs font-black uppercase text-orange-500 underline">Go to Login</a>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-zinc-900 font-sans flex flex-col">
      
      {/* COMPACT HEADER */}
      <header className="bg-white border-b border-zinc-200 py-4 px-6 md:px-8 shrink-0">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white">
              <LayoutGrid className="w-4 h-4" />
            </div>
            <h1 className="text-sm font-black uppercase tracking-tight">Student <span className="text-emerald-600">Portal</span></h1>
          </div>
          
          <div className="flex items-center gap-3 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-100 shadow-sm">
            {session?.user?.image ? (
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-zinc-200">
                <Image 
                  src={session.user.image} 
                  alt="Profile" 
                  fill 
                  sizes="24px"
                  className="object-cover" 
                />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] text-white font-bold">
                {session?.user?.name?.charAt(0) || "S"}
              </div>
            )}
            <span className="text-xs font-bold text-zinc-700">{session?.user?.name || "Student"}</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-6">
        {studentData ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            
            {/* LEFT COLUMN: STUDENT & ENROLLMENT OVERVIEW */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Profile Card */}
              <div className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-black text-zinc-900">{studentData.name}</h2>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">{studentData.phone}</p>
                  </div>
                  <span className={cn(
                    "text-[9px] font-black uppercase px-3 py-1 rounded-full border tracking-wider",
                    studentData.pendingAmount > 0 
                      ? "bg-amber-50 text-amber-700 border-amber-200" 
                      : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  )}>
                    {studentData.pendingAmount > 0 ? "Pending Dues" : "Fully Paid"}
                  </span>
                </div>

                <div className="space-y-3 pt-2 border-t border-zinc-100">
                  <InfoItem label="Email Address" value={session?.user?.email || "N/A"} icon={Mail} />
                  <InfoItem label="College / University" value={studentData.college} icon={GraduationCap} />
                  <InfoItem label="Date of Joining" value={studentData.doj} icon={Calendar} />
                </div>
              </div>

              {/* Enrolled Track Summary */}
              <div className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-emerald-600" /> Enrolled Internship Track
                </h3>
                
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-2">
                  <p className="text-xs font-black text-zinc-400 uppercase">Specialization Domain</p>
                  <p className="text-base font-black text-zinc-900">{studentData.domain}</p>
                  <div className="flex items-center gap-2 pt-2">
                    <span className="px-2.5 py-1 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-700">
                      Duration: {studentData.duration}
                    </span>
                    <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-bold text-emerald-700">
                      Cert Status: {studentData.certificateStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial Snapshot */}
              <div className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-zinc-600" /> Fee Breakdown
                </h3>
                
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-3">
                    <p className="text-[9px] font-black uppercase text-zinc-400">Total Fee</p>
                    <p className="text-sm font-black text-zinc-900 mt-1">₹{studentData.totalBilling?.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-3">
                    <p className="text-[9px] font-black uppercase text-emerald-600">Total Paid</p>
                    <p className="text-sm font-black text-emerald-700 mt-1">₹{studentData.totalCollection?.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-3">
                    <p className="text-[9px] font-black uppercase text-amber-600">Balance</p>
                    <p className="text-sm font-black text-amber-700 mt-1">₹{studentData.pendingAmount?.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: PAYMENT RECEIPTS & INSTALLMENT HISTORY */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-zinc-200 shadow-sm h-full flex flex-col">
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-tight text-zinc-900">Payment Receipts</h3>
                    <p className="text-[10px] font-bold text-zinc-400 mt-0.5">Verified Installments History</p>
                  </div>
                  <span className="text-[10px] bg-zinc-100 px-2.5 py-1 rounded-full font-extrabold text-zinc-600 border border-zinc-200">
                    {studentData.installments?.length || 0} Payments
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto mt-6 space-y-4 pr-1 custom-scrollbar max-h-[600px]">
                  {studentData.installments && studentData.installments.length > 0 ? (
                    studentData.installments.map((inst, idx) => (
                      <div key={inst.receiptNo || idx} className="bg-zinc-50/60 border border-zinc-200/80 rounded-2xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-black text-zinc-900">{inst.receiptNo}</span>
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-white border border-zinc-200 rounded text-zinc-600">
                              {inst.paymentMethod}
                            </span>
                          </div>
                          <p className="text-[11px] font-medium text-zinc-500 flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-zinc-400" /> Date: <span className="font-bold text-zinc-700">{inst.date}</span>
                          </p>
                          <p className="text-[11px] font-medium text-zinc-500">
                            Issued By: <span className="font-bold text-zinc-700">{inst.billingBy}</span>
                          </p>
                        </div>

                        <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-200/60">
                          <p className="text-[9px] font-black uppercase text-zinc-400">Amount Paid</p>
                          <p className="text-lg font-black text-emerald-600">₹{inst.paidAmount?.toLocaleString("en-IN")}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16 border-2 border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50">
                      <FileText className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">No Verified Payment Receipts Found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* PHONE LINKING SECTION (Matching Portal Theme & Styling) */
          <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-[2rem] border border-zinc-200 shadow-sm text-center space-y-6">
            <div className="w-12 h-12 bg-zinc-900 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <Link2 className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-base font-black text-zinc-900 uppercase tracking-tight">Link Your Student Profile</h2>
              <p className="text-[11px] text-zinc-500 font-medium mt-1">
                No profile linked to <span className="font-bold text-zinc-800">{session?.user?.email}</span>. If you registered offline or paid via cash, enter your registered mobile number below to connect your profile.
              </p>
            </div>

            <form onSubmit={handlePhoneSubmitAndLink} className="space-y-4">
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="tel"
                  placeholder="Enter Registered Mobile Number"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500 transition-all placeholder:text-zinc-400"
                />
              </div>

              <button
                type="submit"
                disabled={linking}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-black text-xs uppercase py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {linking ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {linking ? "Syncing Profile..." : "Sync & View Portal"}
              </button>
            </form>
          </div>
        )}
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E4E4E7; border-radius: 10px; }
      `}</style>
    </div>
  );
};

/* Info Row Helper Component */
const InfoItem = ({ label, value, icon: Icon }: { label: string, value?: string, icon: any }) => (
  <div className="flex items-start gap-3">
    <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0 border border-zinc-200 text-zinc-600">
      <Icon className="w-3.5 h-3.5" />
    </div>
    <div>
      <p className="text-[9px] font-black text-zinc-400 uppercase tracking-wider leading-none mb-1">{label}</p>
      <p className="text-xs font-bold text-zinc-800">{value || "Not Provided"}</p>
    </div>
  </div>
);

export default Dashboard;