"use client";

import React, { useState } from "react";
import {
  Upload,
  Save,
  Loader2,
  FileText,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  domainTrack: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}

interface ProfileTabProps {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
  loadingProfile: boolean;
  onSaveProfile: (e: React.FormEvent) => Promise<void>;
  savingProfile: boolean;
  profileMsg: { type: "success" | "error"; text: string } | null;
  setProfileMsg: React.Dispatch<React.SetStateAction<{ type: "success" | "error"; text: string } | null>>;
}

export default function ProfileTab({
  profile,
  setProfile,
  loadingProfile,
  onSaveProfile,
  savingProfile,
  profileMsg,
  setProfileMsg,
}: ProfileTabProps) {
  const [uploadingFile, setUploadingFile] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setProfileMsg({ type: "error", text: "Please select a valid PDF document." });
      return;
    }

    setUploadingFile(true);
    setProfileMsg(null);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch("/api/student/upload-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.resumeUrl) {
        setProfile((prev) => ({ ...prev, resumeUrl: data.resumeUrl }));
        setProfileMsg({
          type: "success",
          text: "Resume uploaded successfully! Click 'Save Details' to complete.",
        });
      } else {
        setProfileMsg({ type: "error", text: data.error || "Failed to upload resume file." });
      }
    } catch {
      setProfileMsg({ type: "error", text: "Error uploading file. Please try again." });
    } finally {
      setUploadingFile(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Student Profile & Resume</h1>
        <p className="text-xs text-zinc-500 mt-1">
          Keep your details updated so employers can review your qualifications when applying.
        </p>
      </div>

      {profileMsg && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
            profileMsg.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {profileMsg.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {profileMsg.text}
        </div>
      )}

      {loadingProfile ? (
        <div className="flex items-center justify-center py-20 text-xs text-zinc-400 gap-2">
          <Loader2 className="animate-spin" size={18} /> Loading your saved profile...
        </div>
      ) : (
        <form onSubmit={onSaveProfile} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Email Address</label>
              <input
                type="email"
                disabled
                value={profile.email}
                className="w-full px-3.5 py-2.5 bg-zinc-100 border border-zinc-200 rounded-xl text-xs text-zinc-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 9876543210"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">College / Institution *</label>
              <input
                type="text"
                required
                placeholder="e.g. SRM Institute of Technology"
                value={profile.college}
                onChange={(e) => setProfile({ ...profile, college: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Degree / Qualification</label>
              <select
                value={profile.degree}
                onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                <option value="B.E / B.Tech">B.E / B.Tech</option>
                <option value="B.Sc Computer Science">B.Sc Computer Science</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="M.Tech">M.Tech</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Primary Skill Domain</label>
              <select
                value={profile.domainTrack}
                onChange={(e) => setProfile({ ...profile, domainTrack: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                <option value="Web Development">Web Development (MERN)</option>
                <option value="Python Development">Python Development</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Android App Development">Android App Development</option>
              </select>
            </div>
          </div>

          {/* Direct File Upload */}
          <div className="pt-3 border-t border-zinc-100 space-y-2">
            <label className="block text-xs font-bold text-zinc-700">Upload Resume (PDF format) *</label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <label className="cursor-pointer px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 flex items-center gap-2 transition-colors shrink-0">
                {uploadingFile ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                {uploadingFile ? "Uploading PDF..." : "Choose File"}
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={uploadingFile}
                  className="hidden"
                />
              </label>

              {profile.resumeUrl ? (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1.5 truncate"
                >
                  <FileText size={15} /> View Uploaded Resume <ExternalLink size={12} />
                </a>
              ) : (
                <span className="text-xs text-zinc-400 italic">No file selected yet</span>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-100">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">GitHub Profile Link</label>
              <input
                type="url"
                placeholder="https://github.com/username"
                value={profile.githubUrl}
                onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">LinkedIn Profile Link</label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={profile.linkedinUrl}
                onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={savingProfile}
              className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {savingProfile ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Details
            </button>
          </div>
        </form>
      )}
    </div>
  );
}