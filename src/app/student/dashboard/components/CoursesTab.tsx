"use client";

import React, { useState, useEffect } from "react";
import { 
  GraduationCap, 
  Loader2, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Award, 
  Receipt, 
  BookOpen, 
  Sparkles 
} from "lucide-react";
import Link from "next/link";

interface EnrolledCourse {
  _id: string;
  courseTitle?: string;
  domain: string;
  duration?: string;
  enrolledDate?: string;
  progress?: number;
  status?: "Active" | "Completed";
  totalBilling?: number;
  totalCollection?: number;
  pendingAmount?: number;
  feesStatus?: "Pending" | "Fully Paid" | "Clear";
  certificateStatus?: "Pending" | "Issued";
}

interface TrackRecord {
  _id: string;
  courseTitle: string;
  domain: string;
  duration?: string;
  description?: string;
  slug?: string;
}

interface CoursesTabProps {
  courses: EnrolledCourse[];
}

export default function CoursesTab({ courses }: CoursesTabProps) {
  const [availableTracks, setAvailableTracks] = useState<TrackRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch("/api/tracks");
        const data = await res.json();
        if (data.success) {
          setAvailableTracks(data.tracks || []);
        }
      } catch (err) {
        console.error("Failed to load tracks from /api/tracks:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTracks();
  }, []);

  return (
    <div className="space-y-8">
      {/* ────────────────── SECTION 1: REGISTERED COURSE DETAILED VIEW ────────────────── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Registered Internship Program</h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              Detailed breakdown of your enrolled track, payment status, and learning progress.
            </p>
          </div>
          {courses.length > 0 && (
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-xs flex items-center gap-1.5">
              <Sparkles size={14} /> Official Inetz Intern
            </span>
          )}
        </div>

        {courses.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-10 text-center space-y-3 shadow-sm">
            <GraduationCap className="w-10 h-10 text-zinc-300 mx-auto" />
            <h3 className="text-sm font-bold text-zinc-800">No active course enrollments found</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Once your internship registration is processed, your assigned domain, schedule, and syllabus will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {courses.map((course) => {
              const isClear = course.feesStatus === "Clear" || course.feesStatus === "Fully Paid";
              const isCertIssued = course.certificateStatus === "Issued";

              return (
                <div
                  key={course._id}
                  className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden divide-y divide-zinc-100"
                >
                  {/* Card Header Header */}
                  <div className="p-6 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 font-bold rounded-md text-[10px] uppercase tracking-wider border border-emerald-500/30">
                          {course.domain || "Web Development"}
                        </span>
                        <span className="text-[11px] text-zinc-400 font-medium">
                          Enrolled: {course.enrolledDate || "N/A"}
                        </span>
                      </div>
                      <h2 className="text-xl font-extrabold tracking-tight">
                        {course.courseTitle || `${course.domain} Internship Track`}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${
                          isCertIssued
                            ? "bg-emerald-500 text-white"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        <Award size={14} />
                        Certificate: {course.certificateStatus || "Pending"}
                      </span>
                    </div>
                  </div>

                  {/* Card Details Body */}
                  <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    {/* Status & Progress */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-zinc-400 uppercase text-[10px] tracking-wider">
                        Training Progress
                      </h4>
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-extrabold text-zinc-900">
                          <span>Completion Rate</span>
                          <span>{course.progress || (isClear ? 100 : 50)}%</span>
                        </div>
                        <div className="w-full bg-zinc-100 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${course.progress || (isClear ? 100 : 50)}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-[11px] text-zinc-500 flex items-center gap-1.5 pt-1">
                        {course.status === "Completed" || isClear ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle2 size={13} /> Curriculum Completed
                          </span>
                        ) : (
                          <span className="text-blue-600 font-bold flex items-center gap-1">
                            <Clock size={13} /> Active Hands-on Training
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Billing & Fees Overview */}
                    <div className="space-y-3 md:border-x md:border-zinc-100 md:px-6">
                      <h4 className="font-bold text-zinc-400 uppercase text-[10px] tracking-wider flex items-center gap-1">
                        <Receipt size={12} /> Fee Breakdown
                      </h4>
                      <div className="space-y-1">
                        <div className="flex justify-between text-zinc-600">
                          <span>Total Program Fee:</span>
                          <strong className="text-zinc-900">₹{course.totalBilling ?? 1499}</strong>
                        </div>
                        <div className="flex justify-between text-zinc-600">
                          <span>Amount Collected:</span>
                          <strong className="text-emerald-600">₹{course.totalCollection ?? 1499}</strong>
                        </div>
                        <div className="flex justify-between text-zinc-600">
                          <span>Pending Balance:</span>
                          <strong className={course.pendingAmount ? "text-rose-600" : "text-zinc-400"}>
                            ₹{course.pendingAmount ?? 0}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Quick Learning Portal Actions */}
                    <div className="space-y-3 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-zinc-400 uppercase text-[10px] tracking-wider flex items-center gap-1">
                          <BookOpen size={12} /> Modules & Projects
                        </h4>
                        <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                          Access internship assignments, project repositories, and guided source code.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button className="flex-1 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5">
                          Open Learning Hub <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ────────────────── SECTION 2: OTHER AVAILABLE TRACKS ────────────────── */}
      
    </div>
  );
}