"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Plus, 
  Briefcase, 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  ExternalLink,
  DollarSign
} from "lucide-react";
import Link from "next/link";

interface JobItem {
  _id: string;
  title: string;
  companyName: string;
  domain: string;
  location: string;
  jobType: string;
  salaryOrStipend: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State for Posting a Job
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    domain: "Web Development",
    location: "Remote",
    jobType: "Internship",
    salaryOrStipend: "",
    description: "",
  });

  const fetchEmployerJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/employer/jobs");
      const data = await res.json();
      if (data.success) {
        setJobs(data.jobs || []);
      }
    } catch (err) {
      console.error("Failed to fetch employer jobs:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployerJobs();
  }, [fetchEmployerJobs]);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/employer/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setFormData({
          title: "",
          companyName: "",
          domain: "Web Development",
          location: "Remote",
          jobType: "Internship",
          salaryOrStipend: "",
          description: "",
        });
        fetchEmployerJobs();
      } else {
        alert(data.error || "Failed to publish job");
      }
    } catch {
      alert("Error submitting job form.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Employer Dashboard</h1>
          <p className="text-xs text-zinc-500 mt-1">Manage active job listings and view candidate applications.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus size={16} /> Post New Opportunity
        </button>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Briefcase size={22} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Total Listings</p>
            <p className="text-xl font-black text-zinc-900">{jobs.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Active Jobs</p>
            <p className="text-xl font-black text-zinc-900">{jobs.filter((j) => j.isActive).length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200 flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Users size={22} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Recruitment Status</p>
            <p className="text-xs font-bold text-emerald-600 mt-1">Accepting Applicants</p>
          </div>
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900">Your Posted Jobs</h2>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-xs text-zinc-400 gap-2">
            <Loader2 className="animate-spin" size={16} /> Loading job listings...
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center space-y-3">
            <Briefcase className="w-10 h-10 text-zinc-300 mx-auto" />
            <h3 className="text-sm font-bold text-zinc-800">No jobs posted yet</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Create your first job or internship posting to start receiving applications from qualified candidates.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-2 px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2"
            >
              <Plus size={14} /> Create Listing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="text-base font-bold text-zinc-900">{job.title}</h3>
                      <p className="text-xs font-medium text-zinc-500">{job.companyName}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      job.isActive ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-500"
                    }`}>
                      {job.isActive ? "Active" : "Closed"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 pt-1">
                    <span className="flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={13} /> {job.jobType}</span>
                    <span className="flex items-center gap-1 font-semibold text-zinc-700"><DollarSign size={13} /> {job.salaryOrStipend}</span>
                  </div>

                  <p className="text-xs text-zinc-600 line-clamp-2 pt-1">{job.description}</p>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-zinc-400">
                    Posted {new Date(job.createdAt).toLocaleDateString("en-IN")}
                  </span>
                  <Link
                    href={`/employer/jobs/${job._id}/applicants`}
                    className="px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Users size={14} /> Applicants <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Post New Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-xl border border-zinc-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
              <h3 className="text-lg font-bold text-zinc-900">Post New Opportunity</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Job / Internship Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React Frontend Developer Intern"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    placeholder="Optional (Defaults to profile)"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Domain Track *</label>
                  <select
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Python Development">Python Development</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Android App Development">Android App Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Job Type</label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Remote / Chennai"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Stipend / Pay *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹15,000 / month"
                    value={formData.salaryOrStipend}
                    onChange={(e) => setFormData({ ...formData, salaryOrStipend: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Job Description & Requirements *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe key responsibilities, required skills, and qualification guidelines..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}