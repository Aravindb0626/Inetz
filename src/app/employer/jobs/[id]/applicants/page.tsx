"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  FileText, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Link as LinkIcon, 
  ArrowLeft, 
  Loader2, 
  ExternalLink,
  UserCheck
} from "lucide-react";
import Link from "next/link";

interface ApplicantRecord {
  _id: string;
  studentId: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    college?: string;
    domain?: string;
    duration?: string;
  };
  resumeUrl: string;
  status: "Applied" | "Shortlisted" | "Rejected";
  interviewStatus: "Locked" | "Approved" | "Completed";
  interviewDate?: string;
  interviewLink?: string;
  createdAt: string;
}

export default function EmployerApplicantsPage({ params }: { params: { id: string } }) {
  const [applicants, setApplicants] = useState<ApplicantRecord[]>([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true);

  // Selected Applicant for Approval Modal
  const [selectedApp, setSelectedApp] = useState<ApplicantRecord | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Modal Form State
  const [status, setStatus] = useState<"Applied" | "Shortlisted" | "Rejected">("Shortlisted");
  const [interviewStatus, setInterviewStatus] = useState<"Locked" | "Approved" | "Completed">("Approved");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewLink, setInterviewLink] = useState("");

  const fetchApplicants = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/employer/jobs/${params.id}/applicants`);
      const data = await res.json();
      if (data.success) {
        setApplicants(data.applicants || []);
        setJobTitle(data.jobTitle || "Job Listing");
      } else {
        alert(data.error || "Failed to load applicants.");
      }
    } catch {
      console.error("Failed to load applicants");
    } fontFinally: {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  const handleOpenApprovalModal = (app: ApplicantRecord) => {
    setSelectedApp(app);
    setStatus(app.status);
    setInterviewStatus(app.interviewStatus === "Locked" ? "Approved" : app.interviewStatus);
    setInterviewDate(app.interviewDate ? new Date(app.interviewDate).toISOString().slice(0, 16) : "");
    setInterviewLink(app.interviewLink || "");
    setModalOpen(true);
  };

  const handleSaveApproval = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    setUpdating(true);
    try {
      const res = await fetch("/api/employer/interview-approval", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: selectedApp._id,
          status,
          interviewStatus,
          interviewDate: interviewDate || null,
          interviewLink: interviewLink.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        fetchApplicants();
      } else {
        alert(data.error || "Failed to update candidate status.");
      }
    } catch {
      alert("Error updating application status.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/employer/dashboard"
            className="p-2 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-xl text-zinc-600 transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-zinc-900">{jobTitle}</h1>
            <p className="text-xs text-zinc-500">Applicant Roster & Interview Access Management</p>
          </div>
        </div>

        <span className="px-3.5 py-1.5 bg-zinc-900 text-white font-bold rounded-xl text-xs">
          {applicants.length} Candidates
        </span>
      </div>

      {/* Main Applicants Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-xs text-zinc-400 gap-2">
          <Loader2 className="animate-spin" size={16} /> Loading applicants...
        </div>
      ) : applicants.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center space-y-2">
          <UserCheck className="w-10 h-10 text-zinc-300 mx-auto" />
          <h3 className="text-sm font-bold text-zinc-800">No Applications Yet</h3>
          <p className="text-xs text-zinc-500">Candidates who apply for this position will appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/80 border-b border-zinc-200 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                  <th className="p-4">Candidate</th>
                  <th className="p-4">Academic & Domain</th>
                  <th className="p-4">Resume</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Interview Access</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs">
                {applicants.map((app) => {
                  const student = app.studentId || {};
                  const isUnlocked = app.interviewStatus === "Approved";

                  return (
                    <tr key={app._id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-zinc-900">{student.name || "N/A"}</div>
                        <div className="text-[11px] text-zinc-500">{student.email}</div>
                        <div className="text-[10px] text-zinc-400">{student.phone}</div>
                      </td>

                      <td className="p-4 text-zinc-600">
                        <div className="font-semibold text-zinc-800">{student.college || "N/A"}</div>
                        <div className="text-[11px] text-zinc-500">
                          {student.domain} • {student.duration}
                        </div>
                      </td>

                      <td className="p-4">
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg text-[11px] transition-colors"
                        >
                          <FileText size={13} /> View PDF <ExternalLink size={10} />
                        </a>
                      </td>

                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          app.status === "Shortlisted" 
                            ? "bg-blue-50 text-blue-700" 
                            : app.status === "Rejected" 
                            ? "bg-rose-50 text-rose-700" 
                            : "bg-zinc-100 text-zinc-600"
                        }`}>
                          {app.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          {isUnlocked ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs">
                              <Unlock size={14} /> Unlocked
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-amber-600 font-bold text-xs">
                              <Lock size={14} /> Locked
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleOpenApprovalModal(app)}
                          className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-lg text-xs transition-all"
                        >
                          Manage Access
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Approval & Lock Management Modal */}
      {modalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-xl border border-zinc-100">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-zinc-900">Manage Candidate Status</h3>
                <p className="text-xs text-zinc-500">{selectedApp.studentId?.name}</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-zinc-600 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveApproval} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Application Stage</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none"
                >
                  <option value="Applied">Applied</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Interview Access Gate</label>
                <select
                  value={interviewStatus}
                  onChange={(e) => setInterviewStatus(e.target.value as any)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none font-semibold text-zinc-800"
                >
                  <option value="Locked">🔒 Locked (Access Denied)</option>
                  <option value="Approved">✅ Approved (Unlock Interview Portal)</option>
                  <option value="Completed">🎉 Completed</option>
                </select>
              </div>

              {interviewStatus === "Approved" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Interview Date & Time</label>
                    <input
                      type="datetime-local"
                      value={interviewDate}
                      onChange={(e) => setInterviewDate(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Meeting Link (Google Meet / Zoom)</label>
                    <input
                      type="url"
                      placeholder="https://meet.google.com/xyz-abc-123"
                      value={interviewLink}
                      onChange={(e) => setInterviewLink(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none"
                    />
                  </div>
                </>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
                >
                  {updating && <Loader2 size={14} className="animate-spin" />} Save Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}