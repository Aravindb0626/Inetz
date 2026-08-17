"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Filter, 
  CheckCircle2, 
  Loader2, 
  Send,
  FileText,
  AlertCircle,
  ExternalLink,
  UserCheck,
  ArrowRight,
  Sparkles,
  Check
} from "lucide-react";

interface Job {
  _id: string;
  title: string;
  companyName: string;
  domain: string;
  location: string;
  jobType: string;
  salaryOrStipend: string;
  description: string;
  createdAt: string;
}

interface StudentProfile {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  domainTrack: string;
  resumeUrl: string;
}

export default function PublicJobDirectory() {
  const { data: session } = useSession();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [domains, setDomains] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  // Applied Job Tracking
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());

  // Selected Job & Application Modal State
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applyMessage, setApplyMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch Jobs List
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (selectedDomain !== "All") params.append("domain", selectedDomain);
      if (selectedType !== "All") params.append("jobType", selectedType);

      const res = await fetch(`/api/jobs?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setJobs(data.jobs || []);
        if (data.availableDomains) {
          setDomains(data.availableDomains);
        }
      }
    } catch {
      console.error("Failed to load jobs feed");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedDomain, selectedType]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchJobs]);

  // Fetch Student Profile details when opening application modal
  const handleOpenApplyModal = async (job: Job) => {
    setSelectedJob(job);
    setApplyMessage(null);

    if (!session) return;

    setLoadingProfile(true);
    try {
      // 🎯 Primary fetch to /api/student/me with fallback to /api/auth/me
      let res = await fetch("/api/auth/me");
      if (!res.ok) {
        res = await fetch("/api/auth/me");
      }
      const data = await res.json();

      if (data.authenticated && data.user) {
        setStudentProfile({
          fullName: data.user.fullName || data.user.name || session.user?.name || "",
          email: data.user.email || session.user?.email || "",
          phone: data.user.phone || "",
          college: data.user.college || "",
          domainTrack: data.user.domainTrack || data.user.domain || "",
          resumeUrl: data.user.resumeUrl || "",
        });
      } else {
        setStudentProfile({
          fullName: session.user?.name || "",
          email: session.user?.email || "",
          phone: "",
          college: "",
          domainTrack: "",
          resumeUrl: "",
        });
      }
    } catch (err) {
      console.error("Failed to load student profile:", err);
    } finally {
      setLoadingProfile(false);
    }
  };

  // Submit 1-Click Application
  const handleConfirmApplication = async () => {
    if (!selectedJob) return;

    if (!session) {
      setApplyMessage({
        type: "error",
        text: "Please sign in to submit your application.",
      });
      return;
    }

    if (!studentProfile?.resumeUrl) {
      setApplyMessage({
        type: "error",
        text: "Please upload your resume in the Student Profile tab before applying.",
      });
      return;
    }

    setApplying(true);
    setApplyMessage(null);

    try {
      const res = await fetch(`/api/jobs/${selectedJob._id}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeUrl: studentProfile.resumeUrl,
          studentName: studentProfile.fullName,
          studentEmail: studentProfile.email,
          studentPhone: studentProfile.phone,
          studentCollege: studentProfile.college,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setApplyMessage({
          type: "success",
          text: "Application submitted successfully! Track your shortlisting status in your dashboard.",
        });
        setAppliedJobIds((prev) => new Set(prev).add(selectedJob._id));
      } else {
        setApplyMessage({
          type: "error",
          text: data.error || "Failed to submit application.",
        });
      }
    } catch {
      setApplyMessage({
        type: "error",
        text: "An unexpected error occurred while submitting.",
      });
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white p-8 rounded-3xl space-y-3 shadow-lg relative overflow-hidden">
        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 font-extrabold rounded-full text-[10px] uppercase tracking-wider inline-flex items-center gap-1.5 border border-orange-500/30">
          <Sparkles size={12} /> Verified Tech Careers & Placement Tracks
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Explore Placement Opportunities</h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-xl font-medium">
          Apply directly to vetted industrial partner positions with your verified student project portfolio.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input
              type="text"
              placeholder="Search by title, technology stack, or company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>

          <div className="w-full md:w-52">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer"
            >
              <option value="All">All Engagement Types</option>
              <option value="Internship">Internship Track</option>
              <option value="Full-time">Full-time Role</option>
              <option value="Part-time">Part-time Role</option>
            </select>
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-zinc-100">
          <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider flex items-center gap-1 mr-1">
            <Filter size={12} /> Tech Domains:
          </span>
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedDomain === dom
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {/* Job Cards Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-24 text-xs text-zinc-400 gap-2">
          <Loader2 className="animate-spin text-orange-500" size={18} /> Fetching matching opportunities...
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-3xl p-12 text-center space-y-2">
          <Briefcase className="w-10 h-10 text-zinc-300 mx-auto" />
          <h3 className="text-sm font-bold text-zinc-800">No active job listings found</h3>
          <p className="text-xs text-zinc-500">Try adjusting your search query or tech domain filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => {
            const hasApplied = appliedJobIds.has(job._id);

            return (
              <div
                key={job._id}
                className="bg-white p-6 rounded-3xl border border-zinc-200/90 shadow-sm hover:border-orange-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="text-base font-extrabold text-zinc-900 line-clamp-1">{job.title}</h3>
                      <p className="text-xs font-bold text-zinc-500 mt-0.5">{job.companyName}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-orange-50 border border-orange-100 text-orange-700 font-extrabold rounded-lg text-[10px] uppercase tracking-wider shrink-0">
                      {job.jobType}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 pt-1">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin size={13} className="text-zinc-400" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1 font-extrabold text-emerald-600">
                      <DollarSign size={13} /> {job.salaryOrStipend}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed font-medium">
                    {job.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-400">
                    {new Date(job.createdAt).toLocaleDateString("en-IN")}
                  </span>
                  
                  {hasApplied ? (
                    <span className="px-3.5 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5">
                      <Check size={14} /> Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOpenApplyModal(job)}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-orange-500/20 cursor-pointer"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ────────────────── 1-CLICK APPLICATION REVIEW MODAL ────────────────── */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-zinc-200 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-zinc-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-widest block">
                  Application Confirmation
                </span>
                <h3 className="text-xl font-black text-zinc-900">{selectedJob.title}</h3>
                <p className="text-xs font-bold text-zinc-500 mt-0.5">{selectedJob.companyName} • {selectedJob.location}</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-lg text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Job Details Banner */}
            <div className="grid grid-cols-3 gap-2 p-3.5 bg-zinc-50 border border-zinc-100 rounded-2xl text-center text-xs font-medium">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Package</span>
                <strong className="text-zinc-900 font-bold">{selectedJob.salaryOrStipend}</strong>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Type</span>
                <strong className="text-zinc-900 font-bold">{selectedJob.jobType}</strong>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Domain</span>
                <strong className="text-zinc-900 font-bold">{selectedJob.domain}</strong>
              </div>
            </div>

            {/* Status & Feedback Message */}
            {applyMessage && (
              <div
                className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2.5 ${
                  applyMessage.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
              >
                {applyMessage.type === "success" ? (
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle size={18} className="text-rose-600 shrink-0" />
                )}
                <span>{applyMessage.text}</span>
              </div>
            )}

            {/* Candidate Profile Summary Box */}
            <div className="space-y-3 pt-1">
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <UserCheck size={14} className="text-emerald-600" /> Candidate Profile Sent to Recruiter
              </h4>

              {!session ? (
                <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl text-center space-y-3">
                  <p className="text-xs font-semibold text-amber-800">
                    You must be logged in to apply for this position.
                  </p>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-extrabold rounded-xl shadow-sm"
                  >
                    Log In to Continue <ArrowRight size={13} />
                  </Link>
                </div>
              ) : loadingProfile ? (
                <div className="p-8 text-center text-xs text-zinc-400 flex items-center justify-center gap-2">
                  <Loader2 size={16} className="animate-spin text-orange-500" /> Loading candidate profile...
                </div>
              ) : studentProfile ? (
                <div className="p-4 bg-white border border-zinc-200 rounded-2xl space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase block">Candidate Name</span>
                      <strong className="text-zinc-900">{studentProfile.fullName || "—"}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase block">Email Address</span>
                      <span className="text-zinc-700 font-medium truncate block">{studentProfile.email || "—"}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase block">Contact Phone</span>
                      <span className="text-zinc-700 font-medium">{studentProfile.phone || "—"}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase block">College / Institute</span>
                      <span className="text-zinc-700 font-medium truncate block">{studentProfile.college || "—"}</span>
                    </div>
                  </div>

                  {/* Resume Attached Check */}
                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase block">Attached CV</span>
                      {studentProfile.resumeUrl ? (
                        <a
                          href={studentProfile.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-extrabold text-orange-600 hover:underline inline-flex items-center gap-1"
                        >
                          <FileText size={13} /> View Attached Resume <ExternalLink size={11} />
                        </a>
                      ) : (
                        <span className="text-xs font-bold text-rose-500">No resume attached</span>
                      )}
                    </div>

                    {!studentProfile.resumeUrl && (
                      <Link
                        href="/student/profile"
                        className="px-3 py-1.5 bg-orange-100 hover:bg-orange-200 text-orange-800 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                      >
                        Upload Resume <ArrowRight size={12} />
                      </Link>
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-3 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>

              {session && applyMessage?.type !== "success" && (
                <button
                  type="button"
                  onClick={handleConfirmApplication}
                  disabled={applying || loadingProfile || !studentProfile?.resumeUrl}
                  className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-orange-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {applying ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={14} /> Submit Application
                    </>
                  )}
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}