"use client";

import React from "react";
import {
  Briefcase,
  Unlock,
  Lock,
  Video,
  Loader2,
  ExternalLink,
  Building,
  CheckCircle2,
  Clock,
  Calendar
} from "lucide-react";
import Link from "next/link";

interface ApplicationRecord {
  _id: string;
  jobId: {
    _id: string;
    title: string;
    companyName: string;
    location: string;
    domain: string;
    salaryOrStipend: string;
  };
  resumeUrl: string;
  status: "Applied" | "Shortlisted" | "Rejected";
  interviewStatus: "Locked" | "Approved" | "Completed";
  interviewDate?: string;
  interviewLink?: string;
  createdAt: string;
}

interface ApplicationsTabProps {
  applications: ApplicationRecord[];
  loadingApps: boolean;
}

export default function ApplicationsTab({
  applications,
  loadingApps,
}: ApplicationsTabProps) {
  return (
    <div className="max-w-5xl space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-900">Job Applications & Interviews</h1>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">
            Track hiring stages and enter unlocked video interview rooms.
          </p>
        </div>
        <Link
          href="/jobs"
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md shadow-orange-500/20 self-start sm:self-auto"
        >
          Browse Openings <ExternalLink size={12} />
        </Link>
      </div>

      {/* Main List */}
      {loadingApps ? (
        <div className="flex items-center justify-center py-20 text-xs text-zinc-400 gap-2">
          <Loader2 className="animate-spin text-orange-500" size={18} /> Loading your applications...
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-12 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto">
            <Briefcase size={22} />
          </div>
          <h3 className="text-sm font-extrabold text-zinc-800">No active applications</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto font-medium">
            Submit applications for verified tech jobs and internship tracks to begin your placement evaluations.
          </p>
          <Link
            href="/jobs"
            className="mt-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all shadow-sm"
          >
            Explore Partner Openings
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-zinc-200/90 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/80 border-b border-zinc-200 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                  <th className="p-4 sm:px-6">Position & Company</th>
                  <th className="p-4">Stage Status</th>
                  <th className="p-4">Interview Access</th>
                  <th className="p-4 sm:px-6 text-right">Interview Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs">
                {applications.map((app) => {
                  const job = app.jobId || {};
                  const isUnlocked = app.interviewStatus === "Approved";

                  return (
                    <tr key={app._id} className="hover:bg-zinc-50/60 transition-colors">
                      
                      {/* Position & Company */}
                      <td className="p-4 sm:px-6">
                        <div className="font-extrabold text-zinc-900">{job.title || "Software Engineering Role"}</div>
                        <div className="text-[11px] font-bold text-zinc-500 mt-0.5">{job.companyName || "Partner Employer"}</div>
                        <div className="text-[10px] text-zinc-400 font-medium">
                          {job.location} • Applied {new Date(app.createdAt).toLocaleDateString("en-IN")}
                        </div>
                      </td>

                      {/* Application Stage Status */}
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                            app.status === "Shortlisted"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : app.status === "Rejected"
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : "bg-zinc-100 text-zinc-600 border border-zinc-200"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>

                      {/* Interview Portal Lock State */}
                      <td className="p-4">
                        {isUnlocked ? (
                          <div className="space-y-1">
                            <span className="inline-flex items-center gap-1 text-emerald-600 font-extrabold text-xs">
                              <Unlock size={13} /> Unlocked
                            </span>
                            {app.interviewDate && (
                              <p className="text-[10px] text-zinc-500 font-medium flex items-center gap-1">
                                <Calendar size={11} className="text-orange-500" />
                                {new Date(app.interviewDate).toLocaleString("en-IN", {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-600 font-bold text-xs">
                            <Lock size={13} /> Locked (Pending Review)
                          </span>
                        )}
                      </td>

                      {/* Action Link */}
                      <td className="p-4 sm:px-6 text-right">
                        {isUnlocked ? (
                          app.interviewLink ? (
                            <a
                              href={app.interviewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-extrabold rounded-xl text-xs transition-all shadow-sm"
                            >
                              <Video size={13} /> Join Meeting Room <ExternalLink size={11} />
                            </a>
                          ) : (
                            <span className="text-[11px] text-emerald-600 font-bold">Meeting Link Coming Soon</span>
                          )
                        ) : (
                          <span className="text-[11px] text-zinc-400 italic">Under Evaluation</span>
                        )}
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}