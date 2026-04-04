"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Phone, GraduationCap, CreditCard, 
  CheckCircle2, Clock, ChevronRight, LayoutGrid,
  Calendar, MapPin,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectedAppId, setSelectedAppId] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user") || "{}");
        console.log(user);
        const userEmail = user?.user?.email;
        const response = await fetch(`/api/student/data?email=${userEmail}`);
        const result = await response.json();

        if (result.success) {
          // In this version, result.data.profile might be an array or single object
          // We'll treat it as an array for a "Multiple Applications" view
          setApplications(Array.isArray(result.data.profile) ? result.data.profile : [result.data.profile]);
          setAllTransactions(result.data.ledger);
        }
      } catch (error) {
        console.error("Data fetch failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Filter transactions for the active selection
  const activeTransactions = allTransactions.filter(
    (tx) => tx.applicationId === selectedAppId // Assuming your schema links them
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center italic text-emerald-600">Loading Portal...</div>;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      <header className="bg-white border-b border-zinc-200 py-6 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold italic">Inetz <span className="text-emerald-600">Student Dashboard</span></h1>
          <div className="text-[10px] font-black bg-zinc-100 px-3 py-1 rounded-full uppercase tracking-widest">2026 Season</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: APPLICATIONS LIST (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <LayoutGrid className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-black uppercase tracking-widest text-zinc-400">Your Enrollments</h2>
            </div>

            {applications.map((app) => (
              <motion.div
                key={app._id}
                onClick={() => setSelectedAppId(app._id)}
                whileHover={{ y: -2 }}
                className={cn(
                  "cursor-pointer p-6 rounded-[2rem] border transition-all relative overflow-hidden",
                  selectedAppId === app._id 
                    ? "bg-white border-emerald-500 shadow-xl shadow-emerald-500/10" 
                    : "bg-white border-zinc-200 hover:border-zinc-300 shadow-sm"
                )}
              >
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <h3 className="text-lg font-bold italic">{app.domain}</h3>
                    <div className="flex gap-4 mt-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase">
                        <Calendar className="w-3 h-3" /> {app.duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase">
                        <MapPin className="w-3 h-3" /> {app.mode}
                      </div>
                    </div>
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                    app.status === 'pending' ? "bg-orange-50 text-orange-600" : "bg-emerald-50 text-emerald-600"
                  )}>
                    {app.status}
                  </div>
                </div>
                {selectedAppId === app._id && (
                  <motion.div layoutId="active-indicator" className="absolute left-0 top-0 w-1 h-full bg-emerald-600" />
                )}
              </motion.div>
            ))}
          </div>

          {/* RIGHT: DRILL-DOWN TRANSACTIONS (5 Columns) */}
          <aside className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {selectedAppId ? (
                <motion.div
                  key={selectedAppId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-zinc-900 text-white rounded-[2.5rem] shadow-2xl overflow-hidden sticky top-28"
                >
                  <div className="p-8 border-b border-white/5">
                    <h3 className="font-bold text-xs uppercase tracking-widest text-emerald-500">Payment History</h3>
                    <p className="text-[10px] text-zinc-500 mt-1 uppercase font-black">Linked to App ID: {selectedAppId.slice(-6)}</p>
                  </div>

                  <div className="p-6 space-y-4 min-h-[300px]">
                    {activeTransactions.length > 0 ? (
                      activeTransactions.map((tx) => (
                        <div key={tx._id} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="flex items-center gap-3">
                            {tx.status === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Clock className="w-4 h-4 text-orange-400" />}
                            <div>
                              <p className="text-xs font-bold">{tx.note}</p>
                              <p className="text-[9px] text-zinc-500">{new Date(tx.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <p className="text-sm font-black italic text-emerald-400">₹{tx.amount}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-20 opacity-30">
                        <CreditCard className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-[10px] font-bold uppercase">No payments found for this track</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-zinc-200 rounded-[2.5rem] text-zinc-400">
                   <ArrowRight className="w-6 h-6 mb-4 animate-pulse" />
                   <p className="text-[10px] font-black uppercase tracking-widest text-center leading-relaxed">
                     Select an application <br/> to view ledger
                   </p>
                </div>
              )}
            </AnimatePresence>
          </aside>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;