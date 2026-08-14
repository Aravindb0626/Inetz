"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign, 
  Filter, 
  CheckCircle2, 
  Loader2, 
  Building, 
  Send,
  FileText,
  AlertCircle
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

export default function PublicJobDirectory() {
  const { data: session } = useSession();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [domains, setDomains] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  // Job Details & Application Modal
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [resumeUrlInput, setResumeUrlInput] = useState("");
  const [applying, setApplying] = useState(false);
  const [applyMessage, setApplyMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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
    }, 300); // 300ms debounce for live search

    return () => clearTimeout(timer);
  }, [fetchJobs]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    if (!session) {
      setApplyMessage({
        type: "error",
        text: "Please sign in to submit your application.",
      });
      return;
    }

    setApplying(true);
    setApplyMessage(null);

    try {
      const res = await fetch(`/api/jobs/${selectedJob._id}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeUrl: resumeUrlInput.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        setApplyMessage({
          type: "success",
          text: "Application submitted successfully! Track your status on your Student Dashboard.",
        });
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
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white p-8 rounded-3xl space-y-3 shadow-lg">
        <span className="px-3 py-1 bg-white/10 text-emerald-400 font-bold rounded-full text-[10px] uppercase tracking-wider inline-flex items-center gap-1.5">
          <Building size={12} /> Verified Tech Careers & Internships
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight">Explore Opportunities</h1>
        <p className="text-xs text-zinc-300 max-w-xl">
          Apply to industry roles across Full Stack Web Development, Python, Data Analytics, and Cloud Infrastructure.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Keyword Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 text-zinc-400" size={16} />
            <input
              type="text"
              placeholder="Search by role, skill, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>

          {/* Job Type Selector */}
          <div className="w-full md:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900"
            >
              <option value="All">All Job Types</option>
              <option value="Internship">Internship</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-100">
          <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider flex items-center gap-1 mr-1">
            <Filter size={12} /> Domains:
          </span>
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDomain === dom
                  ? "bg-zinc-900 text-white shadow-sm"
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
          <Loader2 className="animate-spin" size={18} /> Fetching matching opportunities...
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center space-y-2">
          <Briefcase className="w-10 h-10 text-zinc-300 mx-auto" />
          <h3 className="text-sm font-bold text-zinc-800">No jobs match your criteria</h3>
          <p className="text-xs text-zinc-500">Try adjusting your search query or domain filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:border-zinc-400 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 line-clamp-1">{job.title}</h3>
                    <p className="text-xs font-semibold text-emerald-600">{job.companyName}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-zinc-100 text-zinc-700 font-bold rounded-md text-[10px] uppercase tracking-wider">
                    {job.jobType}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                  <span className="flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
                  <span className="flex items-center gap-1 font-semibold text-zinc-700"><DollarSign size={13} /> {job.salaryOrStipend}</span>
                </div>

                <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-zinc-400">
                  {new Date(job.createdAt).toLocaleDateString("en-IN")}
                </span>
                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setApplyMessage(null);
                    setResumeUrlInput("");
                  }}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Apply Modal / Drawer */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-xl border border-zinc-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-zinc-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">{selectedJob.title}</h3>
                <p className="text-xs font-semibold text-emerald-600">{selectedJob.companyName} • {selectedJob.location}</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-zinc-400 hover:text-zinc-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-zinc-600">
              <div className="flex gap-4 p-3 bg-zinc-50 rounded-xl font-medium">
                <div><span className="text-zinc-400">Pay:</span> <strong className="text-zinc-800">{selectedJob.salaryOrStipend}</strong></div>
                <div><span className="text-zinc-400">Type:</span> <strong className="text-zinc-800">{selectedJob.jobType}</strong></div>
                <div><span className="text-zinc-400">Domain:</span> <strong className="text-zinc-800">{selectedJob.domain}</strong></div>
              </div>

              <div>
                <h4 className="font-bold text-zinc-800 mb-1">Role Overview & Qualifications</h4>
                <p className="whitespace-pre-line leading-relaxed">{selectedJob.description}</p>
              </div>
            </div>

            {/* Application Feedback Box */}
            {applyMessage && (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-center gap-2 font-medium ${
                  applyMessage.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
              >
                {applyMessage.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                {applyMessage.text}
              </div>
            )}

            {/* Application Form */}
            <form onSubmit={handleApply} className="space-y-4 pt-2 border-t border-zinc-100">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">PDF Resume HTTPS Link *</label>
                <input
                  type="url"
                  required
                  placeholder="https://utfs.io/f/my-resume.pdf"
                  value={resumeUrlInput}
                  onChange={(e) => setResumeUrlInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
                <p className="text-[10px] text-zinc-400 mt-1">
                  Provide a direct link to your Hosted PDF (Vercel Blob, AWS S3, or UploadThing).
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-bold"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={applying}
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {applying ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}