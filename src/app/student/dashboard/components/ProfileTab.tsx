"use client";

import React, { useState, useMemo } from "react";
import {
  Upload,
  Save,
  Loader2,
  FileText,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Edit3,
  X,
  User,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Briefcase,
  Sparkles,
} from "lucide-react";

/* ────────────────── EMBEDDED BRAND SVGS ────────────────── */

function GithubIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/* ────────────────── EXPORTED TYPE INTERFACES ────────────────── */

export interface ProfileData {
  _id?: string;
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  domainTrack: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  image?: string;
  avatarUrl?: string;
}

export interface ProfileTabProps {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
  loadingProfile: boolean;
  onSaveProfile: (e: React.FormEvent) => Promise<void>;
  savingProfile: boolean;
  profileMsg: { type: "success" | "error"; text: string } | null;
  setProfileMsg: React.Dispatch<React.SetStateAction<{ type: "success" | "error"; text: string } | null>>;
  studentId?: string;
}

export default function ProfileTab({
  profile,
  setProfile,
  loadingProfile,
  onSaveProfile,
  savingProfile,
  profileMsg,
  setProfileMsg,
  studentId,
}: ProfileTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Profile Picture URL
  const profilePhoto = profile.image || profile.avatarUrl;

  // Calculate Profile Completion Score
  const completionStats = useMemo(() => {
    const fields = [
      { key: "fullName", weight: 15, label: "Full Name" },
      { key: "email", weight: 10, label: "Email Address" },
      { key: "phone", weight: 15, label: "Phone Number" },
      { key: "college", weight: 15, label: "College / Institution" },
      { key: "degree", weight: 10, label: "Degree" },
      { key: "domainTrack", weight: 10, label: "Primary Domain" },
      { key: "resumeUrl", weight: 15, label: "Resume (PDF)" },
      { key: "githubUrl", weight: 5, label: "GitHub Profile" },
      { key: "linkedinUrl", weight: 5, label: "LinkedIn Profile" },
    ];

    let score = 0;
    const missing: string[] = [];

    fields.forEach((f) => {
      const val = profile[f.key as keyof ProfileData];
      if (val && typeof val === "string" && val.trim() !== "") {
        score += f.weight;
      } else {
        missing.push(f.label);
      }
    });

    return { percentage: Math.min(100, score), missing };
  }, [profile]);

  const hasExistingDetails = useMemo(() => {
    return Boolean(profile.fullName && profile.phone && profile.college);
  }, [profile]);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      setProfileMsg({ type: "error", text: "Only PDF format documents are supported." });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setProfileMsg({ type: "error", text: "Resume file size must be less than 5MB." });
      return;
    }

    setUploadingFile(true);
    setProfileMsg(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const targetId = studentId || profile._id || profile.id || "";
      if (targetId) formData.append("studentId", targetId);
      if (profile.email) formData.append("email", profile.email);

      const res = await fetch("/api/students/upload-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.resumeUrl) {
        setProfile((prev) => ({ ...prev, resumeUrl: data.resumeUrl }));
        setProfileMsg({ type: "success", text: "Resume uploaded successfully!" });
      } else {
        setProfileMsg({ type: "error", text: data.error || "Failed to upload resume." });
      }
    } catch {
      setProfileMsg({ type: "error", text: "An unexpected network error occurred while uploading." });
    } finally {
      setUploadingFile(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    await onSaveProfile(e);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-900">Student Profile & Resume</h1>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">
            Manage your credentials and portfolio for campus recruitment drives.
          </p>
        </div>

        {!loadingProfile && (
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
              isEditing
                ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-300"
                : "bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white shadow-md shadow-orange-500/20"
            }`}
          >
            {isEditing ? (
              <>
                <X size={15} /> Cancel Editing
              </>
            ) : (
              <>
                <Edit3 size={15} /> Edit Profile
              </>
            )}
          </button>
        )}
      </div>

      {/* NOTIFICATIONS */}
      {profileMsg && (
        <div
          className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
            profileMsg.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {profileMsg.type === "success" ? (
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle size={16} className="text-rose-600 shrink-0" />
          )}
          {profileMsg.text}
        </div>
      )}

      {/* COHESIVE PROFILE COMPLETION CARD */}
      {!loadingProfile && (
        <div className="p-5 bg-white border border-zinc-200/90 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-orange-100 text-orange-600 rounded-lg">
                <Sparkles size={14} />
              </span>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-800">
                Profile Completeness
              </h3>
            </div>
            <span className="text-xs font-black text-orange-600">
              {completionStats.percentage}%
            </span>
          </div>

          <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/60">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                completionStats.percentage === 100
                  ? "bg-emerald-500"
                  : completionStats.percentage > 60
                  ? "bg-orange-500"
                  : "bg-amber-400"
              }`}
              style={{ width: `${completionStats.percentage}%` }}
            />
          </div>

          {completionStats.missing.length > 0 ? (
            <p className="text-[11px] text-zinc-500 font-medium">
              <strong className="text-zinc-700 font-semibold">Recommended to complete:</strong>{" "}
              {completionStats.missing.join(", ")}
            </p>
          ) : (
            <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1.5">
              <CheckCircle2 size={14} /> Your profile is 100% verified and optimized for hiring managers!
            </p>
          )}
        </div>
      )}

      {/* MAIN CONTENT */}
      {loadingProfile ? (
        <div className="flex items-center justify-center py-20 text-xs text-zinc-400 gap-2">
          <Loader2 className="animate-spin text-orange-500" size={18} /> Loading profile details...
        </div>
      ) : !isEditing && hasExistingDetails ? (
        
        /* ────────────────── VIEW MODE WITH PROFILE PICTURE ────────────────── */
        <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <div className="flex items-center gap-3.5">
              {/* Profile Photo Display */}
              {profilePhoto && !imgError ? (
                <img
                  src={profilePhoto}
                  alt={profile.fullName || "Student Profile"}
                  onError={() => setImgError(true)}
                  className="w-14 h-14 rounded-2xl object-cover border border-zinc-200 shadow-sm shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 font-black text-lg flex items-center justify-center border border-orange-100 shrink-0">
                  {profile.fullName.charAt(0) || "U"}
                </div>
              )}

              <div>
                <h3 className="text-base font-bold text-zinc-900">{profile.fullName}</h3>
                <p className="text-xs text-zinc-500 font-medium">{profile.degree} • {profile.domainTrack}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-50 border border-emerald-200/80 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-emerald-600" /> Ready for Placement
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-zinc-50/80 border border-zinc-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Mail size={13} className="text-zinc-500" /> Email Address
              </span>
              <p className="text-xs font-bold text-zinc-800">{profile.email || "—"}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50/80 border border-zinc-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Phone size={13} className="text-zinc-500" /> Phone Number
              </span>
              <p className="text-xs font-bold text-zinc-800">{profile.phone || "—"}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50/80 border border-zinc-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Building size={13} className="text-zinc-500" /> College / Institution
              </span>
              <p className="text-xs font-bold text-zinc-800">{profile.college || "—"}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50/80 border border-zinc-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <GraduationCap size={13} className="text-zinc-500" /> Degree Program
              </span>
              <p className="text-xs font-bold text-zinc-800">{profile.degree || "B.E / B.Tech"}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50/80 border border-zinc-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Briefcase size={13} className="text-zinc-500" /> Primary Skill Track
              </span>
              <p className="text-xs font-bold text-zinc-800">{profile.domainTrack || "Web Development"}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50/80 border border-zinc-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <FileText size={13} className="text-zinc-500" /> Uploaded Resume (PDF)
              </span>
              {profile.resumeUrl ? (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline flex items-center gap-1"
                >
                  View Attached CV <ExternalLink size={12} />
                </a>
              ) : (
                <p className="text-xs text-rose-500 font-semibold">No resume uploaded</p>
              )}
            </div>
          </div>

          {/* Social Links Bar */}
          <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center gap-3">
            {profile.githubUrl ? (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-colors shadow-sm"
              >
                <GithubIcon size={14} /> GitHub Repository
              </a>
            ) : (
              <span className="text-xs text-zinc-400 italic">No GitHub Profile Linked</span>
            )}

            {profile.linkedinUrl ? (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-colors shadow-sm"
              >
                <LinkedinIcon size={14} /> LinkedIn Profile
              </a>
            ) : (
              <span className="text-xs text-zinc-400 italic">No LinkedIn Profile Linked</span>
            )}
          </div>
        </div>
      ) : (
        
        /* ────────────────── EDIT / FORM MODE ────────────────── */
        <form onSubmit={handleFormSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200/90 shadow-sm space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-700">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
                <input
                  type="text"
                  required
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  placeholder="Rahul Sharma"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
                <input
                  type="email"
                  disabled
                  value={profile.email}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-100 border border-zinc-200 rounded-xl text-xs text-zinc-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-700">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-700">College / Institution *</label>
              <div className="relative">
                <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
                <input
                  type="text"
                  required
                  placeholder="e.g. Loyola College"
                  value={profile.college}
                  onChange={(e) => setProfile({ ...profile, college: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-700">Degree / Qualification</label>
              <select
                value={profile.degree}
                onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer"
              >
                <option value="B.E / B.Tech">B.E / B.Tech</option>
                <option value="B.Sc Computer Science">B.Sc Computer Science</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="M.Tech">M.Tech</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-700">Primary Skill Track</label>
              <select
                value={profile.domainTrack}
                onChange={(e) => setProfile({ ...profile, domainTrack: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer"
              >
                <option value="Web Development">Web Development (MERN)</option>
                <option value="Python Development">Python Development</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Java Full Stack">Java Full Stack</option>
                <option value="Cyber Security">Cyber Security</option>
              </select>
            </div>
          </div>

          {/* Upload Resume Form Group */}
          <div className="pt-3 border-t border-zinc-100 space-y-2">
            <label className="block text-xs font-bold text-zinc-700">Upload Resume (PDF format) *</label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <label className="cursor-pointer px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-800 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shrink-0">
                {uploadingFile ? <Loader2 size={16} className="animate-spin text-orange-500" /> : <Upload size={16} />}
                {uploadingFile ? "Uploading PDF..." : "Choose PDF Document"}
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  disabled={uploadingFile}
                  className="hidden"
                />
              </label>

              {profile.resumeUrl ? (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline flex items-center gap-1.5 truncate"
                >
                  <FileText size={15} /> View Attached Resume <ExternalLink size={12} />
                </a>
              ) : (
                <span className="text-xs text-zinc-400 italic">No file uploaded yet</span>
              )}
            </div>
          </div>

          {/* Social Links Form Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-100">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-700">GitHub Profile Link</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                  <GithubIcon size={15} />
                </div>
                <input
                  type="url"
                  placeholder="https://github.com/username"
                  value={profile.githubUrl}
                  onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-700">LinkedIn Profile Link</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                  <LinkedinIcon size={15} />
                </div>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={profile.linkedinUrl}
                  onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-3">
            {hasExistingDetails && (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 border border-zinc-200 text-zinc-600 rounded-xl text-xs font-bold hover:bg-zinc-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={savingProfile || uploadingFile}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-xl text-xs flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-md shadow-orange-500/20"
            >
              {savingProfile ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}