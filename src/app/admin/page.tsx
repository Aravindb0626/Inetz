"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Plus, Trash2, UploadCloud, Save, Layers, Briefcase,
  FileText, Star, Loader2, ArrowLeft, Pencil, RefreshCw,
  BookOpen, Clock, IndianRupee, AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Program {
  _id: string;
  slug: string;
  title: string;
  subtitle?: string;
  duration?: string;
  price?: number;
  originalPrice?: number;
  heroImg?: string;
  pdfFileName?: string;
  syllabus?: { label: string; title: string; topics: string[]; tools: string[] }[];
  projects?: { title: string; tech: string[]; img?: string }[];
  reviews?: { name: string; role?: string; text: string; rating: number }[];
  updatedAt?: string;
}

type View = "list" | "form";

const DURATIONS = ["1 Week", "2 Weeks", "1 Month", "3 Months"];

const EMPTY_FORM = {
  title: "", slug: "", subtitle: "", duration: "1 Week",
  price: "", originalPrice: "", heroImg: "",
};

// ─── Sub-components ──────────────────────────────────────────────────────────

const SectionHeader = ({ label }: { label: string }) => (
  <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-5">{label}</h3>
);

const AdminInput = ({ placeholder, value, onChange, type = "text" }: {
  placeholder: string; value: string; onChange: (v: string) => void; type?: string;
}) => (
  <input
    type={type} placeholder={placeholder} value={value}
    onChange={e => onChange(e.target.value)}
    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm text-zinc-800 placeholder:text-zinc-300 outline-none focus:border-emerald-400 focus:bg-white transition-all"
  />
);

// ─── List View ───────────────────────────────────────────────────────────────

const ProgramListView = ({
  programs, loading, onNew, onEdit, onDelete, onRefresh,
}: {
  programs: Program[];
  loading: boolean;
  onNew: () => void;
  onEdit: (p: Program) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}) => (
  <div className="space-y-8">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Track Management</h1>
        <p className="text-zinc-400 text-sm mt-1">{programs.length} track{programs.length !== 1 ? "s" : ""} published</p>
      </div>
      <div className="flex gap-3">
        <button onClick={onRefresh} className="p-3 rounded-2xl border border-zinc-200 text-zinc-400 hover:text-zinc-700 hover:border-zinc-300 transition-all">
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </button>
        <button onClick={onNew}
          className="bg-zinc-900 text-white px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg flex items-center gap-2">
          <Plus size={14} /> New Track
        </button>
      </div>
    </div>

    {loading ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-48 bg-white rounded-[2rem] border border-zinc-100 animate-pulse" />
        ))}
      </div>
    ) : programs.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
          <BookOpen className="text-zinc-300" size={24} />
        </div>
        <p className="font-bold text-zinc-400 text-sm">No tracks yet</p>
        <p className="text-zinc-300 text-xs mt-1">Click "New Track" to publish your first one</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map(p => (
          <div key={p._id}
            className="group bg-white rounded-[2rem] border border-zinc-100 hover:border-zinc-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
            {p.heroImg ? (
              <div className="h-36 overflow-hidden">
                <img src={p.heroImg} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ) : (
              <div className="h-36 bg-gradient-to-br from-zinc-100 to-zinc-50 flex items-center justify-center">
                <BookOpen className="text-zinc-200" size={32} />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h2 className="font-black text-zinc-900 text-sm leading-tight">{p.title}</h2>
                  {p.subtitle && <p className="text-zinc-400 text-[10px] mt-0.5 line-clamp-1">{p.subtitle}</p>}
                </div>
                {p.duration && (
                  <span className="shrink-0 text-[9px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                    {p.duration}
                  </span>
                )}
              </div>

              <div className="flex gap-3 text-[10px] text-zinc-400 mb-5">
                {p.price != null && (
                  <span className="flex items-center gap-0.5">
                    <IndianRupee size={10} /> {p.price}
                  </span>
                )}
                {p.syllabus?.length ? (
                  <span className="flex items-center gap-0.5">
                    <Layers size={10} /> {p.syllabus.length} modules
                  </span>
                ) : null}
                {p.updatedAt && (
                  <span className="flex items-center gap-0.5 ml-auto">
                    <Clock size={10} /> {new Date(p.updatedAt).toLocaleDateString()}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button onClick={() => onEdit(p)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-zinc-900 text-white text-[9px] font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all">
                  <Pencil size={11} /> Edit
                </button>
                <button onClick={() => onDelete(p._id)}
                  className="p-2.5 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const AdminPage = () => {
  const [view, setView] = useState<View>("list");
  const [programs, setPrograms] = useState<Program[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [modules, setModules] = useState([{ label: "Day 01", title: "", topics: "", tools: "" }]);
  const [projects, setProjects] = useState([{ title: "", tech: "", img: "" }]);
  const [reviews, setReviews] = useState([{ name: "", role: "", text: "", rating: 5 }]);

  // ── Fetch list ──────────────────────────────────────────────────────────────
  const fetchPrograms = useCallback(async () => {
    setListLoading(true);
    try {
      const res = await fetch("/api/programs");
      if (res.ok) setPrograms(await res.json());
    } catch { /* silent */ }
    finally { setListLoading(false); }
  }, []);

  useEffect(() => { fetchPrograms(); }, [fetchPrograms]);

  // ── Open blank form ─────────────────────────────────────────────────────────
  const handleNew = () => {
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setModules([{ label: "Day 01", title: "", topics: "", tools: "" }]);
    setProjects([{ title: "", tech: "", img: "" }]);
    setReviews([{ name: "", role: "", text: "", rating: 5 }]);
    setSelectedFile(null);
    setView("form");
  };

  // ── Populate form for edit ──────────────────────────────────────────────────
  const handleEdit = (p: Program) => {
    setEditingId(p._id);
    setFormData({
      title:         p.title || "",
      slug:          p.slug || "",
      subtitle:      p.subtitle || "",
      duration:      p.duration || "1 Week",
      price:         p.price?.toString() || "",
      originalPrice: p.originalPrice?.toString() || "",
      heroImg:       p.heroImg || "",
    });
    setModules(
      p.syllabus?.length
        ? p.syllabus.map(m => ({ ...m, topics: m.topics.join(", "), tools: m.tools.join(", ") }))
        : [{ label: "Day 01", title: "", topics: "", tools: "" }]
    );
    setProjects(
      p.projects?.length
        ? p.projects.map(pr => ({ ...pr, tech: pr.tech.join(", "), img: pr.img || "" }))
        : [{ title: "", tech: "", img: "" }]
    );
    setReviews(
      p.reviews?.length
        ? p.reviews.map(r => ({ name: r.name, role: r.role || "", text: r.text, rating: r.rating }))
        : [{ name: "", role: "", text: "", rating: 5 }]
    );
    setSelectedFile(null);
    setView("form");
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this track? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/programs/${id}`, { method: "DELETE" });
      if (res.ok) setPrograms(prev => prev.filter(p => p._id !== id));
      else alert("Failed to delete track.");
    } catch { alert("Network error."); }
  };

  // ── Save / Update ───────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!formData.title || !formData.slug) return alert("Title and Slug are required.");
    if (!editingId && !selectedFile) return alert("A PDF is required for new tracks.");

    setUploading(true);

    const payload = {
      slug:        formData.slug,
      durationKey: formData.duration,
      variant: {
        title:         formData.title,
        subtitle:      formData.subtitle,
        price:         Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        heroImg:       formData.heroImg,
        syllabus: modules.map(m => ({
          ...m,
          topics: m.topics.split(",").map(t => t.trim()).filter(Boolean),
          tools:  m.tools.split(",").map(t => t.trim()).filter(Boolean),
        })),
        projects: projects.map(p => ({
          ...p,
          tech: p.tech.split(",").map(t => t.trim()).filter(Boolean),
        })),
      },
      reviews,
    };

    const data = new FormData();
    // If editing without a new PDF, send a dummy flag so the API skips GridFS
    if (selectedFile) data.append("pdf", selectedFile);
    else data.append("skipPdf", "true");
    data.append("mainData", JSON.stringify(payload));

    try {
      const res = await fetch("/api/programs/manual-save", { method: "POST", body: data });
      const result = await res.json();
      if (res.ok && result.success) {
        await fetchPrograms();
        setView("list");
      } else {
        alert(result.error || "Failed to save.");
      }
    } catch { alert("Network error."); }
    finally { setUploading(false); }
  };

  const updateItem = (setter: any, state: any[], index: number, field: string, value: any) => {
    const updated = [...state];
    updated[index] = { ...updated[index], [field]: value };
    setter(updated);
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  if (view === "list") {
    return (
      <div className="min-h-screen bg-zinc-50 p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          <ProgramListView
            programs={programs} loading={listLoading}
            onNew={handleNew} onEdit={handleEdit}
            onDelete={handleDelete} onRefresh={fetchPrograms}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-12 pb-40">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* TOP BAR */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setView("list")} className="p-2.5 rounded-2xl border border-zinc-200 text-zinc-400 hover:text-zinc-700 transition-all">
              <ArrowLeft size={16} />
            </button>
            <div>
              <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
                {editingId ? "Edit Track" : "New Track"}
              </h1>
              <p className="text-zinc-400 text-sm mt-0.5">
                {editingId ? `Editing: ${formData.slug}` : "Fill in the details and publish"}
              </p>
            </div>
          </div>
          <button onClick={handleSave} disabled={uploading}
            className="bg-zinc-900 text-white px-10 py-4 rounded-2xl text-[10px] tracking-widest hover:bg-emerald-600 transition-all shadow-xl flex items-center gap-2 disabled:opacity-60">
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={16} />}
            {uploading ? "Saving..." : editingId ? "Update Track" : "Publish Track"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT */}
          <div className="lg:col-span-4 space-y-8">

            <section className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-4">
              <SectionHeader label="Identity & Duration" />
              <AdminInput placeholder="Course Title (e.g. MERN STACK)" value={formData.title} onChange={v => setFormData(f => ({ ...f, title: v }))} />
              <AdminInput placeholder="Slug (e.g. mern-1-week)" value={formData.slug} onChange={v => setFormData(f => ({ ...f, slug: v }))} />
              <select value={formData.duration} onChange={e => setFormData(f => ({ ...f, duration: e.target.value }))}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm text-zinc-800 outline-none focus:border-emerald-400 transition-all">
                {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </section>

            <section className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-4">
              <SectionHeader label="Commercials & Visuals" />
              <AdminInput placeholder="Short Subtitle" value={formData.subtitle} onChange={v => setFormData(f => ({ ...f, subtitle: v }))} />
              <AdminInput placeholder="Sale Price (₹)" type="number" value={formData.price} onChange={v => setFormData(f => ({ ...f, price: v }))} />
              <AdminInput placeholder="Original Price (₹)" type="number" value={formData.originalPrice} onChange={v => setFormData(f => ({ ...f, originalPrice: v }))} />
              <AdminInput placeholder="Hero Image URL" value={formData.heroImg} onChange={v => setFormData(f => ({ ...f, heroImg: v }))} />
            </section>

            <section className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-4">
              <SectionHeader label="Syllabus PDF" />
              {editingId && !selectedFile && (
                <div className="flex items-center gap-2 px-4 py-3 bg-amber-50 border border-amber-100 rounded-2xl">
                  <AlertCircle size={13} className="text-amber-500 shrink-0" />
                  <p className="text-[10px] text-amber-600 font-medium">Leave empty to keep existing PDF</p>
                </div>
              )}
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-100 rounded-3xl hover:bg-zinc-50 cursor-pointer group transition-all">
                <div className="text-center p-4">
                  {selectedFile ? (
                    <div className="flex flex-col items-center">
                      <FileText className="text-emerald-500 mb-1" size={20} />
                      <p className="text-emerald-600 font-bold text-[10px] truncate max-w-[180px]">{selectedFile.name}</p>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="mx-auto text-zinc-300 group-hover:text-emerald-500 mb-1" size={22} />
                      <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Upload PDF</p>
                    </>
                  )}
                </div>
                <input type="file" className="hidden" accept=".pdf" onChange={e => e.target.files && setSelectedFile(e.target.files[0])} />
              </label>
            </section>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-8 space-y-8">

            {/* MODULES */}
            <div className="bg-white p-8 rounded-[3rem] border border-zinc-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-zinc-400" />
                  <SectionHeader label="Curriculum Roadmap" />
                </div>
                <button onClick={() => setModules(m => [...m, { label: `Day 0${m.length + 1}`, title: "", topics: "", tools: "" }])}
                  className="p-2 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-600 hover:text-white transition-all">
                  <Plus size={16} />
                </button>
              </div>
              <div className="space-y-4">
                {modules.map((m, i) => (
                  <div key={i} className="p-6 bg-zinc-50 rounded-3xl space-y-3 relative group border border-transparent hover:border-zinc-200 transition-all">
                    <div className="flex gap-4">
                      <input placeholder="Label" value={m.label}
                        onChange={e => updateItem(setModules, modules, i, "label", e.target.value)}
                        className="w-24 font-bold text-[10px] text-emerald-600 bg-transparent outline-none uppercase" />
                      <input placeholder="Module Title" value={m.title}
                        onChange={e => updateItem(setModules, modules, i, "title", e.target.value)}
                        className="flex-1 font-bold text-zinc-900 bg-transparent outline-none border-b border-zinc-200" />
                    </div>
                    <input placeholder="Topics (comma separated)" value={m.topics}
                      onChange={e => updateItem(setModules, modules, i, "topics", e.target.value)}
                      className="w-full text-xs text-zinc-500 bg-transparent outline-none" />
                    <input placeholder="Tools (comma separated)" value={m.tools}
                      onChange={e => updateItem(setModules, modules, i, "tools", e.target.value)}
                      className="w-full text-[9px] text-zinc-400 uppercase font-black bg-transparent outline-none" />
                    <button onClick={() => setModules(modules.filter((_, idx) => idx !== i))}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-zinc-300 hover:text-red-500 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* PROJECTS */}
              <div className="bg-white p-8 rounded-[3rem] border border-zinc-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <Briefcase size={14} className="text-zinc-400" />
                    <SectionHeader label="Practical Builds" />
                  </div>
                  <button onClick={() => setProjects(p => [...p, { title: "", tech: "", img: "" }])}
                    className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all">
                    <Plus size={16} />
                  </button>
                </div>
                {projects.map((p, i) => (
                  <div key={i} className="mb-4 p-5 bg-zinc-50 rounded-2xl space-y-2 relative group border border-transparent hover:border-zinc-200 transition-all">
                    <input placeholder="Project Name" value={p.title}
                      onChange={e => updateItem(setProjects, projects, i, "title", e.target.value)}
                      className="w-full font-bold text-xs bg-transparent outline-none" />
                    <input placeholder="Tech stack (comma separated)" value={p.tech}
                      onChange={e => updateItem(setProjects, projects, i, "tech", e.target.value)}
                      className="w-full text-[9px] text-zinc-400 bg-transparent outline-none uppercase font-bold" />
                    <button onClick={() => setProjects(projects.filter((_, idx) => idx !== i))}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-zinc-300 hover:text-red-500 transition-all">
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>

              {/* REVIEWS */}
              <div className="bg-white p-8 rounded-[3rem] border border-zinc-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-zinc-400" />
                    <SectionHeader label="Student Reviews" />
                  </div>
                  <button onClick={() => setReviews(r => [...r, { name: "", role: "", text: "", rating: 5 }])}
                    className="p-2 bg-amber-50 text-amber-600 rounded-full hover:bg-amber-600 hover:text-white transition-all">
                    <Plus size={16} />
                  </button>
                </div>
                {reviews.map((r, i) => (
                  <div key={i} className="p-5 bg-zinc-50 rounded-2xl space-y-2 relative group border border-transparent hover:border-zinc-200 transition-all">
                    <input placeholder="Student Name" value={r.name}
                      onChange={e => updateItem(setReviews, reviews, i, "name", e.target.value)}
                      className="w-full font-bold text-xs bg-transparent outline-none" />
                    <textarea placeholder="Review text" value={r.text} rows={2}
                      onChange={e => updateItem(setReviews, reviews, i, "text", e.target.value)}
                      className="w-full text-[10px] bg-transparent outline-none resize-none leading-relaxed text-zinc-500" />
                    <button onClick={() => setReviews(reviews.filter((_, idx) => idx !== i))}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-zinc-300 hover:text-red-500 transition-all">
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;