"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Plus, Trash2, Save, Layers, Pencil, RefreshCw, 
  BookOpen, Clock, IndianRupee, ArrowLeft, Loader2, 
  CreditCard, LayoutDashboard, History, Settings, LogOut 
} from "lucide-react";
import TransactionsList from "@/components/TransactionLists";
import PaymentModal from "@/components/PaymentModel";
type SidebarTab = "tracks" | "transactions";
type FormView = "list" | "form";

const DURATIONS = ["1 Week", "2 Weeks", "1 Month", "3 Months"];
const EMPTY_FORM = { title: "", slug: "", subtitle: "", duration: "1 Week", price: "", originalPrice: "", heroImg: "" };

const SectionHeader = ({ label }: { label: string }) => (
  <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-5 select-none">{label}</h3>
);

const AdminInput = ({ placeholder, value, onChange, type = "text" }: any) => (
  <input
    type={type} 
    placeholder={placeholder} 
    value={value} 
    onChange={e => onChange(e.target.value)}
    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm text-zinc-800 placeholder:text-zinc-300 outline-none focus:border-emerald-400 focus:bg-white transition-all"
  />
);

export default function AdminPage() {
  // Navigation Layout State Drivers
  const [activeTab, setActiveTab] = useState<SidebarTab>("tracks");
  const [view, setView] = useState<FormView>("list");
  
  // Data Matrices Registry States
  const [programs, setPrograms] = useState<any[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [modules, setModules] = useState([{ label: "Day 01", title: "", topics: "", tools: "" }]);
  const [isPayOpen, setIsPayOpen] = useState(false);

  // Fetch Tracks Data Pipeline
  const fetchPrograms = useCallback(async () => {
    setListLoading(true);
    try {
      const res = await fetch("/api/programs");
      if (res.ok) setPrograms(await res.json());
    } catch { /* silent */ }
    finally { setListLoading(false); }
  }, []);

  useEffect(() => { 
    fetchPrograms(); 
  }, [fetchPrograms]);

  // Form Management Actions Logic Handlers
  const handleNew = () => {
    setEditingId(null); 
    setFormData(EMPTY_FORM); 
    setSelectedFile(null);
    setModules([{ label: "Day 01", title: "", topics: "", tools: "" }]);
    setView("form");
  };

  const handleEdit = (p: any) => {
    setEditingId(p._id);
    setFormData({ 
      title: p.title || "", 
      slug: p.slug || "", 
      subtitle: p.subtitle || "", 
      duration: p.duration || "1 Week", 
      price: p.price?.toString() || "", 
      originalPrice: p.originalPrice?.toString() || "", 
      heroImg: p.heroImg || "" 
    });
    setModules(p.syllabus?.length ? p.syllabus.map((m: any) => ({ ...m, topics: m.topics.join(", "), tools: m.tools.join(", ") })) : [{ label: "Day 01", title: "", topics: "", tools: "" }]);
    setSelectedFile(null); 
    setView("form");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this track?")) return;
    try {
      const res = await fetch(`/api/programs/${id}`, { method: "DELETE" });
      if (res.ok) setPrograms(prev => prev.filter(p => p._id !== id));
    } catch { alert("Network error."); }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.slug) return alert("Title and Slug are required.");
    setUploading(true);
    const payload = {
      slug: formData.slug, 
      durationKey: formData.duration,
      variant: {
        title: formData.title, 
        subtitle: formData.subtitle, 
        price: Number(formData.price), 
        originalPrice: Number(formData.originalPrice), 
        heroImg: formData.heroImg,
        syllabus: modules.map(m => ({ 
          ...m, 
          topics: m.topics.split(",").map(t => t.trim()).filter(Boolean), 
          tools: m.tools.split(",").map(t => t.trim()).filter(Boolean) 
        }))
      }
    };
    const data = new FormData();
    data.append("mainData", JSON.stringify(payload));
    if (selectedFile) data.append("pdf", selectedFile); else data.append("skipPdf", "true");

    try {
      const res = await fetch("/api/programs/manual-save", { method: "POST", body: data });
      if (res.ok) { await fetchPrograms(); setView("list"); }
    } catch { alert("Network error."); }
    finally { setUploading(false); }
  };

  // FIXED: Implementation of the dynamic inline Curriculum content matrix compiler
  const handleUpdateModuleField = (index: number, key: string, value: string) => {
    setModules(prev => prev.map((item, idx) => {
      if (idx !== index) return item;
      return { ...item, [key]: value };
    }));
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans">
      
      {/* =========================================================================
          PART 1: PERSISTENT SIDEBAR NAVIGATION COMPONENT
         ========================================================================= */}
      <aside className="w-64 bg-zinc-900 text-zinc-400 p-6 flex flex-col justify-between shrink-0 hidden md:flex border-r border-zinc-800">
        <div className="space-y-8">
          {/* Corporate Branding Identity Wrapper Header */}
          <div className="flex items-center gap-3 px-2">
            <span className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-600/20">
              <LayoutDashboard size={20} />
            </span>
            <div>
              <h1 className="text-white text-sm font-black uppercase tracking-wider">iNetz Console</h1>
              <p className="text-[10px] text-zinc-500 font-bold tracking-tight mt-0.5">ADMIN ENVIRONMENT</p>
            </div>
          </div>

          {/* Nav Item Actions Navigation Stream Panels */}
          <nav className="space-y-1.5">
            <button
              onClick={() => { setActiveTab("tracks"); setView("list"); }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "tracks" 
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/10" 
                  : "hover:bg-zinc-800 hover:text-zinc-200"
              }`}
            >
              <BookOpen size={16} /> Track Management
            </button>

            <button
              onClick={() => { setActiveTab("transactions"); setView("list"); }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "transactions" 
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/10" 
                  : "hover:bg-zinc-800 hover:text-zinc-200"
              }`}
            >
              <History size={16} /> Audit Collections
            </button>
          </nav>
        </div>

        {/* Footer Meta Operations Navigation Bars */}
        <div className="space-y-4 pt-6 border-t border-zinc-800/60 text-[11px] font-medium px-2">
          <div className="flex items-center gap-2 hover:text-zinc-200 cursor-pointer transition-colors"><Settings size={14} /> System Parameters</div>
          <div className="flex items-center gap-2 text-red-400 hover:text-red-300 cursor-pointer transition-colors"><LogOut size={14} /> Kill Session</div>
        </div>
      </aside>

      {/* =========================================================================
          PART 2: INTERACTIVE DASHBOARD VIEWPORTS CONTAINER
         ========================================================================= */}
      <main className="flex-1 overflow-y-auto h-screen p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          
          {/* VIEWPORT CHANNEL A: TRACK MANAGEMENT TAB PANELS */}
          {activeTab === "tracks" && (
            <>
              {view === "list" ? (
                <div className="space-y-8">
                  {/* Tab Top Title Section Component */}
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Track Management</h1>
                      <p className="text-zinc-400 text-sm mt-1">{programs.length} tracks published</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={fetchPrograms} className="p-3 rounded-2xl border border-zinc-200 bg-white text-zinc-400 hover:text-zinc-700 transition-colors"><RefreshCw size={16} className={listLoading ? "animate-spin" : ""} /></button>
                      <button onClick={() => setIsPayOpen(true)} className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-2 h-11"><CreditCard size={14} /> New Payment</button>
                      <button onClick={handleNew} className="bg-zinc-900 text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 h-11"><Plus size={14} /> New Track</button>
                    </div>
                  </div>

                  {/* Render Loader / Empty Content Cards Block */}
                  {listLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(3)].map((_, i) => <div key={i} className="h-48 bg-white rounded-[2rem] border border-zinc-100 animate-pulse" />)}
                    </div>
                  ) : programs.length === 0 ? (
                    <div className="text-center py-32"><BookOpen className="mx-auto text-zinc-300 mb-4" size={24} /><p className="font-bold text-zinc-400 text-sm">No tracks yet</p></div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {programs.map(p => (
                        <div key={p._id} className="group bg-white rounded-[2rem] border border-zinc-100 hover:border-zinc-200 hover:shadow-xl transition-all overflow-hidden">
                          <div className="h-36 bg-gradient-to-br from-zinc-100 to-zinc-50 flex items-center justify-center overflow-hidden">
                            {p.heroImg ? <img src={p.heroImg} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-all" /> : <BookOpen className="text-zinc-200" size={32} />}
                          </div>
                          <div className="p-6">
                            <div className="flex justify-between items-start gap-2 mb-3">
                              <div><h2 className="font-black text-zinc-900 text-sm leading-tight">{p.title}</h2>{p.subtitle && <p className="text-zinc-400 text-[10px] line-clamp-1">{p.subtitle}</p>}</div>
                              {p.duration && <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full h-fit shrink-0">{p.duration}</span>}
                            </div>
                            <div className="flex gap-3 text-[10px] text-zinc-400 mb-5">
                              {p.price != null && <span className="flex items-center gap-0.5"><IndianRupee size={10} /> {p.price}</span>}
                              {p.syllabus?.length ? <span className="flex items-center gap-0.5"><Layers size={10} /> {p.syllabus.length} modules</span> : null}
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => handleEdit(p)} className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl bg-zinc-900 text-white text-[9px] font-bold uppercase tracking-widest hover:bg-emerald-600"><Pencil size={11} /> Edit</button>
                              <button onClick={() => handleDelete(p._id)} className="p-2.5 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={13} /></button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* SECTION 2: NEW TRACK EDIT / CREATION CONFIGURATION FORM INTERFACE */
                <div className="space-y-10">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setView("list")} className="p-2.5 rounded-2xl border border-zinc-200 bg-white text-zinc-400 hover:text-zinc-700 transition-colors"><ArrowLeft size={16} /></button>
                      <div><h1 className="text-3xl font-black text-zinc-900 tracking-tight">{editingId ? "Edit Track" : "New Track"}</h1></div>
                    </div>
                    <button onClick={handleSave} disabled={uploading} className="bg-zinc-900 text-white px-10 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl flex items-center gap-2 disabled:opacity-60">
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={16} />}{uploading ? "Saving..." : "Publish Track"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-4 space-y-8">
                      <section className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-4">
                        <SectionHeader label="Identity & Duration" />
                        <AdminInput placeholder="Course Title" value={formData.title} onChange={(v: string) => setFormData(f => ({ ...f, title: v }))} />
                        <AdminInput placeholder="Slug" value={formData.slug} onChange={(v: string) => setFormData(f => ({ ...f, slug: v }))} />
                        <select value={formData.duration} onChange={e => setFormData(f => ({ ...f, duration: e.target.value }))} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm text-zinc-800 outline-none">
                          {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </section>
                      <section className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-4">
                        <SectionHeader label="Commercials & Visuals" />
                        <AdminInput placeholder="Short Subtitle" value={formData.subtitle} onChange={(v: string) => setFormData(f => ({ ...f, subtitle: v }))} />
                        <AdminInput placeholder="Sale Price (₹)" type="number" value={formData.price} onChange={(v: string) => setFormData(f => ({ ...f, price: v }))} />
                        <AdminInput placeholder="Hero Image URL" value={formData.heroImg} onChange={(v: string) => setFormData(f => ({ ...f, heroImg: v }))} />
                      </section>
                    </div>

                    <div className="lg:col-span-8 space-y-8">
                      <div className="bg-white p-8 rounded-[3rem] border border-zinc-200 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                          <div className="flex items-center gap-2"><Layers size={14} className="text-zinc-400" /><SectionHeader label="Curriculum" /></div>
                          <button onClick={() => setModules(m => [...m, { label: `Day ${String(m.length + 1).padStart(2, "0")}`, title: "", topics: "", tools: "" }])} className="p-2 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-600 hover:text-white transition-colors"><Plus size={16} /></button>
                        </div>
                        <div className="space-y-4">
                          {modules.map((m, i) => (
                            <div key={i} className="p-6 bg-zinc-50 rounded-3xl space-y-3 relative group border border-transparent hover:border-zinc-200">
                              <div className="flex gap-4">
                                <input placeholder="Label" value={m.label} onChange={e => handleUpdateModuleField(i, "label", e.target.value)} className="w-24 font-bold text-[10px] text-emerald-600 bg-transparent outline-none uppercase" />
                                <input placeholder="Module Title" value={m.title} onChange={e => handleUpdateModuleField(i, "title", e.target.value)} className="flex-1 font-bold text-zinc-900 bg-transparent outline-none border-b border-zinc-200" />
                              </div>
                              <input placeholder="Topics (comma separated)" value={m.topics} onChange={e => handleUpdateModuleField(i, "topics", e.target.value)} className="w-full text-xs text-zinc-500 bg-transparent outline-none" />
                              <button onClick={() => setModules(modules.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-zinc-300 hover:text-red-500 transition-opacity"><Trash2 size={14} /></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* VIEWPORT CHANNEL B: REAL-TIME AUDIT TRANSACTIONS REGISTER TAB */}
          {activeTab === "transactions" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
                <div>
                  <h1 className="text-2xl font-black text-zinc-900 tracking-tight">Financial Audit Panel</h1>
                  <p className="text-zinc-400 text-sm mt-0.5">Real-time verification ledger records</p>
                </div>
                <button onClick={() => setIsPayOpen(true)} className="bg-zinc-900 text-white px-5 py-3 rounded-xl text-xs font-semibold hover:bg-emerald-600 transition-all flex items-center gap-2"><Plus size={14} /> New Payment</button>
              </div>
              <TransactionsList />
            </div>
          )}

        </div>
      </main>

      {/* FEE ENTRY MODAL OVERLAY TRIGGER */}
      {isPayOpen && (
        <PaymentModal programs={programs} onClose={() => setIsPayOpen(false)} />
      )}

    </div>
  );
}