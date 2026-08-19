"use client";

import React from "react";
import { signOut } from "next-auth/react";
import {
  User,
  Briefcase,
  GraduationCap,
  CreditCard,
  LogOut,
  Building
} from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  activeTab: "profile" | "applications" | "courses" | "transactions";
  setActiveTab: (tab: "profile" | "applications" | "courses" | "transactions") => void;
  userName: string;
  userEmail: string;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  userName,
  userEmail,
}: SidebarProps) {
  return (
    <aside className="w-full md:w-64 bg-zinc-900 text-white shrink-0 p-6 flex flex-col justify-between border-r border-zinc-800">
      <div className="space-y-8">
        {/* User Card */}
        <div className="flex items-center gap-3 pb-6 border-b border-zinc-800">
          <div className="w-10 h-10 bg-emerald-500 text-white font-black rounded-xl flex items-center justify-center text-sm">
            {userName ? userName.charAt(0).toUpperCase() : "S"}
          </div>
          <div className="overflow-hidden">
            <h2 className="text-sm font-bold truncate">{userName || "Student"}</h2>
            <p className="text-[10px] text-zinc-400 truncate">{userEmail}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              activeTab === "profile"
                ? "bg-emerald-500 text-white font-bold"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <User size={16} /> My Profile & Resume
          </button>

          <button
            onClick={() => setActiveTab("applications")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              activeTab === "applications"
                ? "bg-emerald-500 text-white font-bold"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <Briefcase size={16} /> Applications & Interviews
          </button>

          <button
            onClick={() => setActiveTab("courses")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              activeTab === "courses"
                ? "bg-emerald-500 text-white font-bold"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <GraduationCap size={16} /> My Internship Courses
          </button>

          <button
            onClick={() => setActiveTab("transactions")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              activeTab === "transactions"
                ? "bg-emerald-500 text-white font-bold"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <CreditCard size={16} /> Payment History
          </button>
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="pt-6 border-t border-zinc-800 space-y-3">
        <Link
          href="/jobs"
          className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <Building size={14} /> Browse Job Openings
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-2 text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors px-1"
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </aside>
  );
}