"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  GraduationCap,
  Calendar,
  Mail,
  Briefcase,
  FileText,
  ChevronRight,
  LayoutGrid,
  Info,
  BadgeCheck,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface Application {
  _id: string;
  fullName?: string;
  email?: string;
  phone?: string;
  college?: string;
  year?: string;
  department?: string;
  domain: string;
  duration: string;
  mode: string;
  status: string;
  createdAt: string;
}

const Dashboard = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  // ── HYBRID AUTHORIZATION CHECK ──
  // Check if we have a manual session storage user
  const getManualUser = () => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  };

  const manualUser = getManualUser();
  const isAuthorized = sessionStatus === "authenticated" || !!manualUser;

  useEffect(() => {
    const fetchDashboardData = async () => {
      // 1. Identify User (NextAuth OR Manual)
      let userEmail =
        session?.user?.email || manualUser?.email || manualUser?.user?.email;

      // 2. Gate: If NextAuth is still thinking and no manual user, wait.
      if (!userEmail) {
        if (sessionStatus !== "loading") setLoading(false);
        return;
      }

      // 3. Fetch Data
      try {
        const response = await fetch(`/api/student/data?email=${userEmail}`);
        const result = await response.json();

        if (result.success) {
          const apps = Array.isArray(result.data.profile)
            ? result.data.profile
            : [result.data.profile];

          setApplications(apps);
          if (apps.length > 0) setSelectedAppId(apps[0]._id);
        }
      } catch (error) {
        console.error("Secure Data Fetch Failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [session, sessionStatus]);

  const activeApp = applications.find((a) => a._id === selectedAppId);

  // ── UI RENDER LOGIC ──

  // 1. LOADING STATE
  if (loading && sessionStatus === "loading") {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 text-zinc-900 animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
          Syncing Secure Environment...
        </p>
      </div>
    );
  }

  // 2. RESTRICTED ACCESS STATE
  if (!loading && !isAuthorized) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#F9F9F9] p-6 text-center">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 border border-zinc-100">
          <Info className="w-8 h-8 text-zinc-300" />
        </div>
        <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900">
          Access Restricted
        </h2>
        <p className="text-xs text-zinc-500 mt-2 mb-8 max-w-xs mx-auto">
          Please sign in to your student account to access the technical portal.
        </p>
        <button
          onClick={() => {
            // Clear storage just in case a "ghost" session is causing the loop
            sessionStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className="bg-zinc-900 text-white px-10 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-zinc-900/20"
        >
          Return to Login
        </button>
      </div>
    );
  }

  // 3. MAIN DASHBOARD
  return (
    <div className="h-screen bg-[#F9F9F9] text-zinc-900 font-sans overflow-hidden flex flex-col">
      <header className="bg-white border-b border-zinc-200 py-4 px-8 shrink-0">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white">
              <LayoutGrid className="w-4 h-4" />
            </div>
            <h1 className="text-sm font-black uppercase tracking-tight">
              Technical <span className="text-orange-500">Portal</span>
            </h1>
          </div>

          <div className="flex items-center gap-3 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-100 shadow-sm">
            {session?.user?.image ? (
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-zinc-200">
                <Image
                  src={session.user.image}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-[10px] text-white font-bold uppercase">
                {(session?.user?.name || manualUser?.name || "S").charAt(0)}
              </div>
            )}
            <span className="text-xs font-bold text-zinc-700">
              {session?.user?.name || manualUser?.name || "Developer"}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1400px] w-full mx-auto p-6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                My Records
              </h2>
              <span className="text-[10px] bg-zinc-200 px-2 py-0.5 rounded-full font-bold">
                {applications.length}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {applications.map((app) => (
                <button
                  key={app._id}
                  onClick={() => setSelectedAppId(app._id)}
                  className={cn(
                    "w-full text-left p-5 rounded-2xl border transition-all relative overflow-hidden",
                    selectedAppId === app._id
                      ? "bg-white border-zinc-900 shadow-xl"
                      : "bg-white border-zinc-200 hover:border-zinc-400 shadow-sm",
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3
                        className={cn(
                          "text-sm font-black",
                          selectedAppId === app._id
                            ? "text-zinc-900"
                            : "text-zinc-500",
                        )}
                      >
                        {app.domain}
                      </h3>
                      <p className="text-[10px] font-bold text-zinc-400 mt-1 uppercase tracking-wider">
                        {app.duration} • {app.mode}
                      </p>
                    </div>
                    <ChevronRight
                      className={cn(
                        "w-4 h-4",
                        selectedAppId === app._id
                          ? "text-zinc-900"
                          : "text-zinc-200",
                      )}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 overflow-hidden">
            <AnimatePresence mode="wait">
              {activeApp ? (
                <motion.div
                  key={selectedAppId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="h-full flex flex-col bg-white rounded-[2.5rem] border border-zinc-200 shadow-sm overflow-hidden"
                >
                  <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-xl border border-zinc-200">
                        <FileText className="w-4 h-4 text-zinc-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                          Enrollment Status
                        </p>
                        <p
                          className={cn(
                            "text-xs font-bold uppercase",
                            activeApp.status?.toLowerCase() === "pending"
                              ? "text-orange-500"
                              : "text-emerald-600",
                          )}
                        >
                          {activeApp.status}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                        Created
                      </p>
                      <p className="text-xs font-bold text-zinc-900">
                        {new Date(activeApp.createdAt).toLocaleDateString(
                          "en-GB",
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em] flex items-center gap-2">
                          <User className="w-3 h-3" /> Identity
                        </h4>
                        <InfoItem
                          label="Full Name"
                          value={activeApp.fullName}
                          icon={User}
                        />
                        <InfoItem
                          label="Email"
                          value={activeApp.email}
                          icon={Mail}
                        />
                        <InfoItem
                          label="Phone"
                          value={activeApp.phone}
                          icon={Phone}
                        />
                      </div>
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em] flex items-center gap-2">
                          <GraduationCap className="w-3 h-3" /> Academics
                        </h4>
                        <InfoItem
                          label="University"
                          value={activeApp.college}
                          icon={GraduationCap}
                        />
                        <InfoItem
                          label="Study Year"
                          value={activeApp.year}
                          icon={Calendar}
                        />
                        <InfoItem
                          label="Department"
                          value={activeApp.department}
                          icon={Briefcase}
                        />
                      </div>
                      <div className="space-y-6 md:col-span-2 pt-8 border-t border-zinc-50">
                        <h4 className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em] flex items-center gap-2">
                          <BadgeCheck className="w-3 h-3" /> Training Config
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <DetailCard label="Track" value={activeApp.domain} />
                          <DetailCard
                            label="Duration"
                            value={activeApp.duration}
                          />
                          <div
                            className={cn(
                              "p-5 rounded-2xl border",
                              activeApp.mode === "Offline"
                                ? "bg-orange-50 border-orange-100"
                                : "bg-blue-50 border-blue-100",
                            )}
                          >
                            <p
                              className={cn(
                                "text-[9px] font-black uppercase mb-1",
                                activeApp.mode === "Offline"
                                  ? "text-orange-400"
                                  : "text-blue-400",
                              )}
                            >
                              Mode
                            </p>
                            <p className="text-sm font-black text-zinc-800">
                              {activeApp.mode}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-[2.5rem] bg-zinc-50/50">
                  <Info className="w-8 h-8 text-zinc-200 mb-2 opacity-50" />
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                    Select a record to initialize
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e4e4e7;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

const InfoItem = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value?: string;
  icon: any;
}) => (
  <div className="flex items-start gap-4 group">
    <div className="w-8 h-8 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100 group-hover:bg-zinc-900 group-hover:text-white transition-all">
      <Icon className="w-3.5 h-3.5" />
    </div>
    <div>
      <p className="text-[9px] font-black text-zinc-400 uppercase tracking-wider leading-none mb-1.5">
        {label}
      </p>
      <p className="text-sm font-bold text-zinc-800">{value || "Not Set"}</p>
    </div>
  </div>
);

const DetailCard = ({ label, value }: { label: string; value: string }) => (
  <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
    <p className="text-[9px] font-black text-zinc-400 uppercase mb-1 tracking-widest">
      {label}
    </p>
    <p className="text-sm font-black text-zinc-800">{value}</p>
  </div>
);

export default Dashboard;
