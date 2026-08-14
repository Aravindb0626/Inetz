"use client";

import React from "react";
import {
  Briefcase,
  Unlock,
  Lock,
  Video,
  Loader2,
  ExternalLink
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Job Applications & Interviews</h1>
          <p className="text-xs text-zinc-500 mt-1">Track status and enter unlocked video interview rooms.</p>
        </div>
        <Link
          href="/jobs"
          className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
        >
          Browse Openings <ExternalLink size={12} />
        </Link>
      </div>

      {loadingApps ? (
        <div className="flex items-center justify-center py-20 text-xs text-zinc-400 gap-2">
          <Loader2 className="animate-spin" size={16} /> Loading applications...
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center space-y-3">
          <Briefcase className="w-10 h-10 text-zinc-300 mx-auto" />
          <h3 className="text-sm font-bold text-zinc-800">No active applications</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Submit applications for verified tech jobs and internship opportunities to get started.
          </p>
          <Link
            href="/jobs"
            className="mt-2 px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2"
          >
            Explore Jobs
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-[10px] font-black uppercase text-zinc-400">
                  <th className="p-4">Position & Company</th>
                  <th className="p-4">Stage Status</th>
                  <th className="p-4">Interview Access</th>
                  <th className="p-4 text-right">Meeting Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs">
                {applications.map((app) => {
                  const job = app.jobId || {};
                  const isUnlocked = app.interviewStatus === "Approved";

                  return (
                    <tr key={app._id} className="hover:bg-zinc-50/50">
                      <td className="p-4">
                        <div className="font-bold text-zinc-900">{job.title || "N/A"}</div>
                        <div className="text-[11px] font-semibold text-emerald-600">{job.companyName}</div>
                      </td>

                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          app.status === "Shortlisted" ? "bg-blue-50 text-blue-700" : "bg-zinc-100 text-zinc-600"
                        }`}>
                          {app.status}
                        </span>
                      </td>

                      <td className="p-4">
                        {isUnlocked ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs">
                            <Unlock size={14} /> Unlocked
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-600 font-bold text-xs">
                            <Lock size={14} /> Locked
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-right">
                        {isUnlocked ? (
                          <Link
                            href={`/student/interview/${app._id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs"
                          >
                            <Video size={13} /> Launch Interview
                          </Link>
                        ) : (
                          <span className="text-[11px] text-zinc-400 italic">Pending Approval</span>
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