"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Plus, 
  Briefcase, 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Loader2, 
  ExternalLink,
  DollarSign,
  Edit3,
  Trash2,
  X,
  Save,
  AlertCircle
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

  // Modals State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobItem | null>(null);

  // Action Loading & Feedback States
  const [submitting, setSubmitting] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editError, setEditError] = useState<string | null>(null);

  // Form State for Posting a New Job
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

  // Create Job Listing
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
        setIsCreateModalOpen(false);
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

  // Edit Job Listing
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;

    setSavingEdit(true);
    setEditError(null);

    try {
      const res = await fetch(`/api/employer/jobs/${editingJob._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingJob),
      });

      const data = await res.json();

      if (data.success) {
        setEditingJob(null);
        fetchEmployerJobs();
      } else {
        setEditError(data.error || "Failed to update job details.");
      }
    } catch {
      setEditError("A network error occurred while updating the job.");
    } finally {
      setSavingEdit(false);
    }
  };

  // Delete Job Listing
  const handleDeleteJob = async (jobId: string, jobTitle: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${jobTitle}"? All candidate applications associated with this role will also be deleted.`
    );
    if (!confirmDelete) return;

    setDeletingId(jobId);
    try {
      const res = await fetch(`/api/employer/jobs/${jobId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setJobs((prev) => prev.filter((j) => j._id !== jobId));
      } else {
        alert(data.error || "Failed to delete job.");
      }
    } catch {
      alert("A network error occurred while deleting the job.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-zinc-200/90 shadow-sm">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-900">Employer Dashboard</h1>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">
            Manage your company listings, review talent profiles, and unlock candidate interviews.
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-orange-500/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} /> Post Opportunity
        </button>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl border border-orange-100">
            <Briefcase size={20} />
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">Total Listings</p>
            <p className="text-xl font-black text-zinc-900">{jobs.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">Active Listings</p>
            <p className="text-xl font-black text-zinc-900">{jobs.filter((j) => j.isActive).length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-zinc-100 text-zinc-700 rounded-xl">
            <Users size={20} />
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">Recruitment State</p>
            <p className="text-xs font-extrabold text-emerald-600 mt-1">Accepting Candidates</p>
          </div>
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-zinc-900 tracking-tight">Your Posted Jobs</h2>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-xs text-zinc-400 gap-2">
            <Loader2 className="animate-spin text-orange-500" size={16} /> Loading job listings...
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white border border-zinc-200/90 rounded-3xl p-12 text-center space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto">
              <Briefcase size={22} />
            </div>
            <h3 className="text-sm font-extrabold text-zinc-800">No jobs posted yet</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto font-medium">
              Create your first job or internship posting to start receiving verified student applications.
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 transition-all shadow-md shadow-orange-500/20 cursor-pointer"
            >
              <Plus size={14} /> Create Listing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {jobs.map((job) => (
              <div 
                key={job._id} 
                className="bg-white p-6 rounded-3xl border border-zinc-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  
                  {/* Job Header & Action Controls */}
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="text-base font-extrabold text-zinc-900 line-clamp-1">{job.title}</h3>
                      <p className="text-xs font-bold text-zinc-500 mt-0.5">{job.companyName}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        job.isActive 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                          : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                      }`}>
                        {job.isActive ? "ACTIVE" : "CLOSED"}
                      </span>

                      {/* Edit Button */}
                      <button
                        onClick={() => {
                          setEditingJob(job);
                          setEditError(null);
                        }}
                        className="p-1.5 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 rounded-lg transition-colors cursor-pointer"
                        title="Edit Job Details"
                      >
                        <Edit3 size={15} />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteJob(job._id, job.title)}
                        disabled={deletingId === job._id}
                        className="p-1.5 hover:bg-rose-50 text-zinc-400 hover:text-rose-600 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                        title="Delete Job"
                      >
                        {deletingId === job._id ? (
                          <Loader2 size={15} className="animate-spin text-rose-600" />
                        ) : (
                          <Trash2 size={15} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Attributes */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-zinc-400" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-zinc-400" /> {job.jobType}
                    </span>
                    <span className="flex items-center gap-1 font-extrabold text-emerald-600">
                      <DollarSign size={13} /> {job.salaryOrStipend}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-600 font-medium line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-zinc-400">
                    Posted {new Date(job.createdAt).toLocaleDateString("en-GB")}
                  </span>
                  <Link
                    href={`/employer/jobs/${job._id}/applicants`}
                    className="px-3.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors"
                  >
                    <Users size={14} /> Applicants <ExternalLink size={11} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ────────────────── CREATE JOB MODAL ────────────────── */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-zinc-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-start border-b border-zinc-100 pb-3.5">
              <div>
                <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-widest block">
                  New Posting
                </span>
                <h3 className="text-base font-black text-zinc-900">Post Placement Opportunity</h3>
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 p-1 font-bold cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-700">Job Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React Frontend Developer Intern"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-700">Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Inetz Technologies"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-700">Domain Track *</label>
                  <select
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold focus:bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Python Development">Python Development</option>
                    <option value="Java Full Stack">Java Full Stack</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Android App Development">Android App Development</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-700">Job Type</label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold focus:bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-700">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Remote / Chennai"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-700">Salary / Pay *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹15,000 / mo"
                    value={formData.salaryOrStipend}
                    onChange={(e) => setFormData({ ...formData, salaryOrStipend: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-700">Description & Key Skills *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Outline responsibilities, prerequisites, and candidate expectations..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
                />
              </div>

              <div className="pt-3 border-t border-zinc-100 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-orange-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ────────────────── EDIT JOB MODAL ────────────────── */}
      {editingJob && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-zinc-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-start border-b border-zinc-100 pb-3.5">
              <div>
                <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-widest block">
                  Listing Configuration
                </span>
                <h3 className="text-base font-black text-zinc-900">Edit Opportunity Details</h3>
              </div>
              <button 
                onClick={() => setEditingJob(null)}
                className="text-zinc-400 hover:text-zinc-700 p-1 font-bold cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {editError && (
              <div className="p-3.5 bg-rose-50 text-rose-800 border border-rose-200 rounded-2xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle size={16} className="text-rose-600 shrink-0" />
                <span>{editError}</span>
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-700">Job Title *</label>
                <input
                  type="text"
                  required
                  value={editingJob.title}
                  onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-700">Company Name</label>
                  <input
                    type="text"
                    required
                    value={editingJob.companyName}
                    onChange={(e) => setEditingJob({ ...editingJob, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-700">Domain Track</label>
                  <select
                    value={editingJob.domain}
                    onChange={(e) => setEditingJob({ ...editingJob, domain: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold focus:bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Python Development">Python Development</option>
                    <option value="Java Full Stack">Java Full Stack</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Android App Development">Android App Development</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-700">Job Type</label>
                  <select
                    value={editingJob.jobType}
                    onChange={(e) => setEditingJob({ ...editingJob, jobType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold focus:bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-700">Location</label>
                  <input
                    type="text"
                    required
                    value={editingJob.location}
                    onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-700">Salary / Pay</label>
                  <input
                    type="text"
                    required
                    value={editingJob.salaryOrStipend}
                    onChange={(e) => setEditingJob({ ...editingJob, salaryOrStipend: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-700">Listing Status</label>
                <select
                  value={editingJob.isActive ? "true" : "false"}
                  onChange={(e) => setEditingJob({ ...editingJob, isActive: e.target.value === "true" })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold focus:bg-white focus:outline-none cursor-pointer"
                >
                  <option value="true">Active (Accepting Candidates)</option>
                  <option value="false">Closed (Archived)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-700">Job Description & Requirements *</label>
                <textarea
                  required
                  rows={4}
                  value={editingJob.description}
                  onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
                />
              </div>

              <div className="pt-3 border-t border-zinc-100 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-orange-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {savingEdit ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}