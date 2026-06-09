// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Plus, Trash2, UploadCloud, Save, Layers, Briefcase, FileText, Star, 
//   Loader2, ArrowLeft, Pencil, RefreshCw, BookOpen, Clock, IndianRupee, 
//   AlertCircle, CreditCard, Printer, X
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface Program {
//   _id: string; slug: string; title: string; subtitle?: string; duration?: string;
//   price?: number; originalPrice?: number; heroImg?: string;
//   syllabus?: { label: string; title: string; topics: string[]; tools: string[] }[];
//   projects?: { title: string; tech: string[]; img?: string }[];
//   reviews?: { name: string; role?: string; text: string; rating: number }[];
//   updatedAt?: string;
// }

// type View = "list" | "form";

// const DURATIONS = ["1 Week", "2 Weeks", "1 Month", "3 Months"];
// const EMPTY_FORM = { title: "", slug: "", subtitle: "", duration: "1 Week", price: "", originalPrice: "", heroImg: "" };

// const SectionHeader = ({ label }: { label: string }) => (
//   <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-5">{label}</h3>
// );

// const AdminInput = ({ placeholder, value, onChange, type = "text", ...props }: any) => (
//   <input
//     type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
//     className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm text-zinc-800 placeholder:text-zinc-300 outline-none focus:border-emerald-400 focus:bg-white transition-all"
//     {...props}
//   />
// );

// // ─── Global Payment Dialog Popup (Fixed Z-Index Placement Over All Elements) ───
// const PaymentModal = ({ programs, onClose }: { programs: Program[]; onClose: () => void }) => {
//   const [form, setForm] = useState({ name: "", college: "", billing: "", courseId: "", total: "", paid: "", type: "Full Payment", method: "Cash", txn: "" });
//   const [isSaving, setIsSaving] = useState(false);

//   const selProg = programs.find(p => p._id === form.courseId);
//   const numTotal = Number(form.total) || 0;
//   const numPaid = Number(form.paid) || 0;
//   const balance = Math.max(0, numTotal - numPaid);

//   useEffect(() => {
//     setForm(f => ({ ...f, total: selProg?.price?.toString() || "" }));
//   }, [form.courseId, selProg]);

//   useEffect(() => {
//     if (form.type === "Full Payment" && form.total) setForm(f => ({ ...f, paid: f.total }));
//   }, [form.type, form.total]);

// const handleSavePayment = async () => {
//   if (!form.name.trim() || !form.college.trim() || !form.billing.trim() || !form.paid || !form.courseId) {
//     return alert("Please fulfill all track choices and identity boundaries.");
//   }
  
//   setIsSaving(true);
  
//   const dataPayload = {
//     name: form.name.trim(),
//     college: form.college.trim(),
//     courseName: selProg?.title || "Unknown Track",
//     totalCoursePayment: numTotal,
//     paidAmount: numPaid,
//     balanceAmount: balance,
//     paymentType: form.type,
//     paymentMethod: form.method,
//     transactionId: form.method === "GPay" ? form.txn.trim() : "N/A",
//     billingBy: form.billing.trim(),
//     dateTime: new Date().toLocaleString("en-IN")
//   };

//   try {
//     const webAppUrl = "https://script.google.com/macros/s/AKfycbzILhUcumhC-1aKA3fQwL5O8IZ4AJ_lKEo0WBaLua5NYCnQHso6gM6_gy6JtI6sRRqpbg/exec";

//     // Standard cross-origin configurations
//     await fetch(webAppUrl, {
//       method: "POST",
//       mode: "no-cors", // Tells browser to pass through redirects cleanly
//       headers: { 
//         "Content-Type": "text/plain" // Prevents browser preflight restrictions
//       },
//       body: JSON.stringify(dataPayload),
//     });

//     // With no-cors, the code assumes success if the promise resolves without crashing
//     alert("Payment metrics cleanly dispatched to Google Sheet!");
//     onClose();

//   } catch (error) {
//     console.error("Transmission Failure:", error);
//     alert("Network exception occurred while dispatching payment details.");
//   } finally {
//     setIsSaving(false);
//   }
// };
//   const handlePrint = () => {
//     if (!form.name.trim() || !form.courseId) return alert("Verify core Student Name and targeted course selection.");
//     const pWin = window.open("", "_blank");
//     if (!pWin) return alert("Pop-up engine blocked.");
//     pWin.document.write(`
//       <html><head><title>Receipt</title><style>
//         @page { size: A5 landscape; margin: 8mm; }
//         * { box-sizing: border-box; font-family: system-ui, sans-serif; }
//         body { margin: 0; padding: 0; color: #18181b; }
//         .box { border: 2px solid #e4e4e7; border-radius: 12px; padding: 16px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; }
//         .h { text-align: center; border-bottom: 2px dashed #e4e4e7; padding-bottom: 8px; margin-bottom: 12px; }
//         .g { display: grid; grid-template-cols: repeat(2, 1fr); row-gap: 8px; column-gap: 24px; font-size: 13px; }
//         .row { display: flex; align-items: baseline; }
//         .lbl { width: 130px; color: #71717a; }
//         .val { flex: 1; font-weight: 600; }
//         .f { border-top: 1px solid #e4e4e7; padding-top: 10px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #a1a1aa; }
//         .st { border: 1.5px dashed #10b981; color: #10b981; padding: 2px 10px; border-radius: 4px; font-weight: 800; font-size: 10px; text-transform: uppercase; }
//       </style></head><body><div class="box">
//         <div class="h"><h2 style="margin:0; font-size:20px; font-weight:900;">INETZ ACADEMY</h2><div style="font-size:11px; color:#71717a; text-transform:uppercase; font-weight:700;">Fee Receipt</div></div>
//         <div class="g">
//           <div class="row"><span class="lbl">Name</span><span style="width:15px;">:</span><span class="val">${form.name}</span></div>
//           <div class="row"><span class="lbl">Payment Type</span><span style="width:15px;">:</span><span class="val">${form.type}</span></div>
//           <div class="row"><span class="lbl">College</span><span style="width:15px;">:</span><span class="val">${form.college}</span></div>
//           <div class="row"><span class="lbl">Payment Method</span><span style="width:15px;">:</span><span class="val">${form.method}</span></div>
//           <div class="row"><span class="lbl">Course Name</span><span style="width:15px;">:</span><span class="val">${selProg?.title}</span></div>
//           <div class="row"><span class="lbl">Transaction ID</span><span style="width:15px;">:</span><span class="val">${form.method === "GPay" ? form.txn || "N/A" : "N/A"}</span></div>
//           <div class="row"><span class="lbl">Total Fee</span><span style="width:15px;">:</span><span class="val">₹${numTotal.toLocaleString()}</span></div>
//           <div class="row"><span class="lbl">Billing By</span><span style="width:15px;">:</span><span class="val">${form.billing}</span></div>
//           <div class="row"><span class="lbl">Paid Amount</span><span style="width:15px;">:</span><span class="val" style="color:#059669;">₹${numPaid.toLocaleString()}</span></div>
//           <div class="row"><span class="lbl">Balance Amount</span><span style="width:15px;">:</span><span class="val" style="${balance > 0 ? "color:#dc2626;" : ""}">₹${balance.toLocaleString()}</span></div>
//         </div>
//         <div class="f"><div>Date: ${new Date().toLocaleDateString("en-IN")}</div><div class="st">${balance === 0 ? "Fully Paid" : "Part Paid"}</div></div>
//       </div><script>window.onload = function() { window.print(); setTimeout(() => window.close(), 500); }</script></body></html>
//     `);
//     pWin.document.close();
//   };

//   return (
//     <div className="fixed inset-0 z-[999] bg-zinc-950/50 backdrop-blur-sm flex items-center justify-center p-4">
//       <div className="bg-white w-full max-w-2xl rounded-[2.5rem] border border-zinc-100 shadow-2xl flex flex-col max-h-[90vh]">
//         <div className="px-8 py-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
//           <div className="flex items-center gap-2">
//             <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><CreditCard size={14} /></span>
//             <h2 className="text-lg font-black text-zinc-900">Fee Registration Dashboard</h2>
//           </div>
//           <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-700 rounded-xl"><X size={18} /></button>
//         </div>
//         <div className="p-8 overflow-y-auto space-y-6 flex-1">
//           <div>
//             <SectionHeader label="Student Details" />
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <AdminInput placeholder="Student Full Name" value={form.name} onChange={(v: string) => setForm(f => ({ ...f, name: v }))} />
//               <AdminInput placeholder="College / University" value={form.college} onChange={(v: string) => setForm(f => ({ ...f, college: v }))} />
//               <select value={form.courseId} onChange={e => setForm(f => ({ ...f, courseId: e.target.value }))}
//                 className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm text-zinc-800 outline-none focus:border-emerald-400 focus:bg-white transition-all">
//                 <option value="">-- Choose Program Track --</option>
//                 {programs.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
//               </select>
//               <AdminInput placeholder="Admin Name or ID" value={form.billing} onChange={(v: string) => setForm(f => ({ ...f, billing: v }))} />
//             </div>
//           </div>
//           <hr className="border-zinc-100" />
//           <div>
//             <SectionHeader label="Payment Specifications" />
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <AdminInput placeholder="Total Cost" type="number" value={form.total} onChange={(v: string) => setForm(f => ({ ...f, total: v }))} />
//               <AdminInput placeholder="Amount Paid" type="number" value={form.paid} onChange={(v: string) => setForm(f => ({ ...f, paid: v }))} />
//               <div className={cn("w-full px-4 py-3 border rounded-2xl text-sm font-bold flex items-center bg-zinc-50", balance > 0 ? "border-red-100 text-red-600 bg-red-50/20" : "border-emerald-100 text-emerald-600 bg-emerald-50/20")}>
//                 ₹ {balance.toLocaleString("en-IN")}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               {([{ l: "Classification", k: "type", o: ["Full Payment", "Part Payment"] }, { l: "Channel Engine", k: "method", o: ["Cash", "GPay"] }] as const).map((cfg, i) => (
//                 <div key={i} className="bg-zinc-50/50 p-4 rounded-2xl border border-zinc-100 space-y-1">
//                   <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{cfg.l}</label>
//                   <div className="flex gap-4 mt-1">
//                     {cfg.o.map(opt => (
//                       <label key={opt} className="flex items-center gap-2 text-xs font-semibold text-zinc-700 cursor-pointer">
//                         <input type="radio" checked={(form as any)[cfg.k] === opt} onChange={() => setForm(f => ({ ...f, [cfg.k]: opt }))} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
//                         {opt}
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {form.method === "GPay" && (
//               <div className="mt-4 p-4 bg-emerald-50/20 border border-emerald-100/50 rounded-2xl space-y-1">
//                 <label className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider pl-1">UPI/GPay Transaction Token Reference</label>
//                 <AdminInput placeholder="Enter TXN ID / Reference Token" value={form.txn} onChange={(v: string) => setForm(f => ({ ...f, txn: v }))} />
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="px-8 py-5 border-t border-zinc-100 bg-zinc-50 flex gap-3 justify-end items-center">
//           <button onClick={onClose} className="px-5 py-3 rounded-xl text-xs font-bold text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100">Close</button>
//           <button onClick={handlePrint} className="px-5 py-3 border border-zinc-200 bg-white text-zinc-700 rounded-xl text-xs font-bold flex items-center gap-2"><Printer size={14} /> Print Receipt</button>
//           <button onClick={handleSavePayment} disabled={isSaving} className="px-8 py-3 bg-zinc-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 disabled:opacity-50">
//             {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Payment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Main Admin Module ───────────────────────────────────────────────────────
// const AdminPage = () => {
//   const [view, setView] = useState<View>("list");
//   const [programs, setPrograms] = useState<Program[]>([]);
//   const [listLoading, setListLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [formData, setFormData] = useState(EMPTY_FORM);
//   const [modules, setModules] = useState([{ label: "Day 01", title: "", topics: "", tools: "" }]);
//   const [projects, setProjects] = useState([{ title: "", tech: "", img: "" }]);
//   const [reviews, setReviews] = useState([{ name: "", role: "", text: "", rating: 5 }]);
//   const [isPayOpen, setIsPayOpen] = useState(false);

//   const fetchPrograms = useCallback(async () => {
//     setListLoading(true);
//     try {
//       const res = await fetch("/api/programs");
//       if (res.ok) setPrograms(await res.json());
//     } catch { /* silent */ }
//     finally { setListLoading(false); }
//   }, []);

//   useEffect(() => { fetchPrograms(); }, [fetchPrograms]);

//   const handleNew = () => {
//     setEditingId(null); setFormData(EMPTY_FORM); setSelectedFile(null);
//     setModules([{ label: "Day 01", title: "", topics: "", tools: "" }]);
//     setProjects([{ title: "", tech: "", img: "" }]); setReviews([{ name: "", role: "", text: "", rating: 5 }]);
//     setView("form");
//   };

//   const handleEdit = (p: Program) => {
//     setEditingId(p._id);
//     setFormData({ title: p.title || "", slug: p.slug || "", subtitle: p.subtitle || "", duration: p.duration || "1 Week", price: p.price?.toString() || "", originalPrice: p.originalPrice?.toString() || "", heroImg: p.heroImg || "" });
//     setModules(p.syllabus?.length ? p.syllabus.map(m => ({ ...m, topics: m.topics.join(", "), tools: m.tools.join(", ") })) : [{ label: "Day 01", title: "", topics: "", tools: "" }]);
//     setProjects(p.projects?.length ? p.projects.map(pr => ({ ...pr, tech: pr.tech.join(", "), img: pr.img || "" })) : [{ title: "", tech: "", img: "" }]);
//     setReviews(p.reviews?.length ? p.reviews.map(r => ({ name: r.name, role: r.role || "", text: r.text, rating: r.rating })) : [{ name: "", role: "", text: "", rating: 5 }]);
//     setSelectedFile(null); setView("form");
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Delete this track?")) return;
//     try {
//       const res = await fetch(`/api/programs/${id}`, { method: "DELETE" });
//       if (res.ok) setPrograms(prev => prev.filter(p => p._id !== id));
//     } catch { alert("Network error."); }
//   };

//   const handleSave = async () => {
//     if (!formData.title || !formData.slug) return alert("Title and Slug are required.");
//     setUploading(true);
//     const payload = {
//       slug: formData.slug, durationKey: formData.duration, reviews,
//       variant: {
//         title: formData.title, subtitle: formData.subtitle, price: Number(formData.price), originalPrice: Number(formData.originalPrice), heroImg: formData.heroImg,
//         syllabus: modules.map(m => ({ ...m, topics: m.topics.split(",").map(t => t.trim()).filter(Boolean), tools: m.tools.split(",").map(t => t.trim()).filter(Boolean) })),
//         projects: projects.map(p => ({ ...p, tech: p.tech.split(",").map(t => t.trim()).filter(Boolean) }))
//       }
//     };
//     const data = new FormData();
//     data.append("mainData", JSON.stringify(payload));
//     if (selectedFile) data.append("pdf", selectedFile); else data.append("skipPdf", "true");

//     try {
//       const res = await fetch("/api/programs/manual-save", { method: "POST", body: data });
//       if (res.ok) { await fetchPrograms(); setView("list"); }
//     } catch { alert("Network error."); }
//     finally { setUploading(false); }
//   };

//   const updateItem = (setter: any, state: any[], index: number, field: string, value: any) => {
//     const updated = [...state]; updated[index] = { ...updated[index], [field]: value }; setter(updated);
//   };

//   if (view === "list") {
//     return (
//       <div className="min-h-screen bg-zinc-50 p-6 md:p-12">
//         <div className="max-w-6xl mx-auto space-y-8">
//           <div className="flex flex-wrap justify-between items-center gap-4">
//             <div>
//               <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Track Management</h1>
//               <p className="text-zinc-400 text-sm mt-1">{programs.length} tracks published</p>
//             </div>
//             <div className="flex items-center gap-3">
//               <button onClick={fetchPrograms} className="p-3 rounded-2xl border border-zinc-200 text-zinc-400 hover:text-zinc-700"><RefreshCw size={16} className={listLoading ? "animate-spin" : ""} /></button>
//               <button onClick={() => setIsPayOpen(true)} className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-2 h-11"><CreditCard size={14} /> New Payment</button>
//               <button onClick={handleNew} className="bg-zinc-900 text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 h-11"><Plus size={14} /> New Track</button>
//             </div>
//           </div>

//           {listLoading ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(3)].map((_, i) => <div key={i} className="h-48 bg-white rounded-[2rem] border border-zinc-100 animate-pulse" />)}</div>
//           ) : programs.length === 0 ? (
//             <div className="text-center py-32"><BookOpen className="mx-auto text-zinc-300 mb-4" size={24} /><p className="font-bold text-zinc-400 text-sm">No tracks yet</p></div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {programs.map(p => (
//                 <div key={p._id} className="group bg-white rounded-[2rem] border border-zinc-100 hover:border-zinc-200 hover:shadow-xl transition-all overflow-hidden">
//                   <div className="h-36 bg-gradient-to-br from-zinc-100 to-zinc-50 flex items-center justify-center overflow-hidden">
//                     {p.heroImg ? <img src={p.heroImg} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-all" /> : <BookOpen className="text-zinc-200" size={32} />}
//                   </div>
//                   <div className="p-6">
//                     <div className="flex justify-between items-start gap-2 mb-3">
//                       <div><h2 className="font-black text-zinc-900 text-sm leading-tight">{p.title}</h2>{p.subtitle && <p className="text-zinc-400 text-[10px] line-clamp-1">{p.subtitle}</p>}</div>
//                       {p.duration && <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{p.duration}</span>}
//                     </div>
//                     <div className="flex gap-3 text-[10px] text-zinc-400 mb-5">
//                       {p.price != null && <span className="flex items-center gap-0.5"><IndianRupee size={10} /> {p.price}</span>}
//                       {p.syllabus?.length ? <span className="flex items-center gap-0.5"><Layers size={10} /> {p.syllabus.length} modules</span> : null}
//                     </div>
//                     <div className="flex gap-2">
//                       <button onClick={() => handleEdit(p)} className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl bg-zinc-900 text-white text-[9px] font-bold uppercase tracking-widest hover:bg-emerald-600"><Pencil size={11} /> Edit</button>
//                       <button onClick={() => handleDelete(p._id)} className="p-2.5 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white"><Trash2 size={13} /></button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         {isPayOpen && <PaymentModal programs={programs} onClose={() => setIsPayOpen(false)} />}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-zinc-50 p-6 md:p-12 pb-40">
//       <div className="max-w-6xl mx-auto space-y-10">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <button onClick={() => setView("list")} className="p-2.5 rounded-2xl border border-zinc-200 text-zinc-400 hover:text-zinc-700"><ArrowLeft size={16} /></button>
//             <div><h1 className="text-3xl font-black text-zinc-900 tracking-tight">{editingId ? "Edit Track" : "New Track"}</h1></div>
//           </div>
//           <button onClick={handleSave} disabled={uploading} className="bg-zinc-900 text-white px-10 py-4 rounded-2xl text-[10px] tracking-widest hover:bg-emerald-600 transition-all shadow-xl flex items-center gap-2 disabled:opacity-60">
//             {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={16} />}{uploading ? "Saving..." : "Publish Track"}
//           </button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
//           <div className="lg:col-span-4 space-y-8">
//             <section className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-4">
//               <SectionHeader label="Identity & Duration" />
//               <AdminInput placeholder="Course Title" value={formData.title} onChange={(v: string) => setFormData(f => ({ ...f, title: v }))} />
//               <AdminInput placeholder="Slug" value={formData.slug} onChange={(v: string) => setFormData(f => ({ ...f, slug: v }))} />
//               <select value={formData.duration} onChange={e => setFormData(f => ({ ...f, duration: e.target.value }))} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm text-zinc-800 outline-none">
//                 {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
//               </select>
//             </section>
//             <section className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-4">
//               <SectionHeader label="Commercials & Visuals" />
//               <AdminInput placeholder="Short Subtitle" value={formData.subtitle} onChange={(v: string) => setFormData(f => ({ ...f, subtitle: v }))} />
//               <AdminInput placeholder="Sale Price (₹)" type="number" value={formData.price} onChange={(v: string) => setFormData(f => ({ ...f, price: v }))} />
//               <AdminInput placeholder="Hero Image URL" value={formData.heroImg} onChange={(v: string) => setFormData(f => ({ ...f, heroImg: v }))} />
//             </section>
//           </div>

//           <div className="lg:col-span-8 space-y-8">
//             <div className="bg-white p-8 rounded-[3rem] border border-zinc-200 shadow-sm">
//               <div className="flex justify-between items-center mb-6">
//                 <div className="flex items-center gap-2"><Layers size={14} className="text-zinc-400" /><SectionHeader label="Curriculum" /></div>
//                 <button onClick={() => setModules(m => [...m, { label: `Day 0${m.length + 1}`, title: "", topics: "", tools: "" }])} className="p-2 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-600 hover:text-white"><Plus size={16} /></button>
//               </div>
//               <div className="space-y-4">
//                 {modules.map((m, i) => (
//                   <div key={i} className="p-6 bg-zinc-50 rounded-3xl space-y-3 relative group border border-transparent hover:border-zinc-200">
//                     <div className="flex gap-4">
//                       <input placeholder="Label" value={m.label} onChange={e => updateItem(setModules, modules, i, "label", e.target.value)} className="w-24 font-bold text-[10px] text-emerald-600 bg-transparent outline-none uppercase" />
//                       <input placeholder="Module Title" value={m.title} onChange={e => updateItem(setModules, modules, i, "title", e.target.value)} className="flex-1 font-bold text-zinc-900 bg-transparent outline-none border-b border-zinc-200" />
//                     </div>
//                     <input placeholder="Topics (comma separated)" value={m.topics} onChange={e => updateItem(setModules, modules, i, "topics", e.target.value)} className="w-full text-xs text-zinc-500 bg-transparent outline-none" />
//                     <button onClick={() => setModules(modules.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-zinc-300 hover:text-red-500"><Trash2 size={14} /></button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, Save, Layers, Pencil, RefreshCw, BookOpen, Clock, IndianRupee, ArrowLeft, Loader2, CreditCard } from "lucide-react";
import PaymentModal from "@/components/PaymentModel";

type View = "list" | "form";
const DURATIONS = ["1 Week", "2 Weeks", "1 Month", "3 Months"];
const EMPTY_FORM = { title: "", slug: "", subtitle: "", duration: "1 Week", price: "", originalPrice: "", heroImg: "" };

const SectionHeader = ({ label }: { label: string }) => (
  <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-5">{label}</h3>
);

const AdminInput = ({ placeholder, value, onChange, type = "text" }: any) => (
  <input
    type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm text-zinc-800 placeholder:text-zinc-300 outline-none focus:border-emerald-400 focus:bg-white transition-all"
  />
);

export default function AdminPage() {
  const [view, setView] = useState<View>("list");
  const [programs, setPrograms] = useState<any[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [modules, setModules] = useState([{ label: "Day 01", title: "", topics: "", tools: "" }]);
  const [isPayOpen, setIsPayOpen] = useState(false);

  const fetchPrograms = useCallback(async () => {
    setListLoading(true);
    try {
      const res = await fetch("/api/programs");
      if (res.ok) setPrograms(await res.json());
    } catch { /* silent */ }
    finally { setListLoading(false); }
  }, []);

  useEffect(() => { fetchPrograms(); }, [fetchPrograms]);

  const handleNew = () => {
    setEditingId(null); setFormData(EMPTY_FORM); setSelectedFile(null);
    setModules([{ label: "Day 01", title: "", topics: "", tools: "" }]);
    setView("form");
  };

  const handleEdit = (p: any) => {
    setEditingId(p._id);
    setFormData({ title: p.title || "", slug: p.slug || "", subtitle: p.subtitle || "", duration: p.duration || "1 Week", price: p.price?.toString() || "", originalPrice: p.originalPrice?.toString() || "", heroImg: p.heroImg || "" });
    setModules(p.syllabus?.length ? p.syllabus.map((m: any) => ({ ...m, topics: m.topics.join(", "), tools: m.tools.join(", ") })) : [{ label: "Day 01", title: "", topics: "", tools: "" }]);
    setSelectedFile(null); setView("form");
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
      slug: formData.slug, durationKey: formData.duration,
      variant: {
        title: formData.title, subtitle: formData.subtitle, price: Number(formData.price), originalPrice: Number(formData.originalPrice), heroImg: formData.heroImg,
        syllabus: modules.map(m => ({ ...m, topics: m.topics.split(",").map(t => t.trim()).filter(Boolean), tools: m.tools.split(",").map(t => t.trim()).filter(Boolean) }))
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

  if (view === "list") {
    return (
      <div className="min-h-screen bg-zinc-50 p-6 md:p-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Track Management</h1>
              <p className="text-zinc-400 text-sm mt-1">{programs.length} tracks published</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={fetchPrograms} className="p-3 rounded-2xl border border-zinc-200 text-zinc-400 hover:text-zinc-700"><RefreshCw size={16} className={listLoading ? "animate-spin" : ""} /></button>
              <button onClick={() => setIsPayOpen(true)} className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-2 h-11"><CreditCard size={14} /> New Payment</button>
              <button onClick={handleNew} className="bg-zinc-900 text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 h-11"><Plus size={14} /> New Track</button>
            </div>
          </div>

          {listLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(3)].map((_, i) => <div key={i} className="h-48 bg-white rounded-[2rem] border border-zinc-100 animate-pulse" />)}</div>
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
                      {p.duration && <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{p.duration}</span>}
                    </div>
                    <div className="flex gap-3 text-[10px] text-zinc-400 mb-5">
                      {p.price != null && <span className="flex items-center gap-0.5"><IndianRupee size={10} /> {p.price}</span>}
                      {p.syllabus?.length ? <span className="flex items-center gap-0.5"><Layers size={10} /> {p.syllabus.length} modules</span> : null}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(p)} className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl bg-zinc-900 text-white text-[9px] font-bold uppercase tracking-widest hover:bg-emerald-600"><Pencil size={11} /> Edit</button>
                      <button onClick={() => handleDelete(p._id)} className="p-2.5 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white"><Trash2 size={13} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {isPayOpen && <PaymentModal programs={programs} onClose={() => setIsPayOpen(false)} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-12 pb-40">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setView("list")} className="p-2.5 rounded-2xl border border-zinc-200 text-zinc-400 hover:text-zinc-700"><ArrowLeft size={16} /></button>
            <div><h1 className="text-3xl font-black text-zinc-900 tracking-tight">{editingId ? "Edit Track" : "New Track"}</h1></div>
          </div>
          <button onClick={handleSave} disabled={uploading} className="bg-zinc-900 text-white px-10 py-4 rounded-2xl text-[10px] tracking-widest hover:bg-emerald-600 transition-all shadow-xl flex items-center gap-2 disabled:opacity-60">
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
                <button onClick={() => setModules(m => [...m, { label: `Day 0${m.length + 1}`, title: "", topics: "", tools: "" }])} className="p-2 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-600 hover:text-white"><Plus size={16} /></button>
              </div>
              <div className="space-y-4">
                {modules.map((m, i) => (
                  <div key={i} className="p-6 bg-zinc-50 rounded-3xl space-y-3 relative group border border-transparent hover:border-zinc-200">
                    <div className="flex gap-4">
                      <input placeholder="Label" value={m.label} onChange={e => updateItem(setModules, modules, i, "label", e.target.value)} className="w-24 font-bold text-[10px] text-emerald-600 bg-transparent outline-none uppercase" />
                      <input placeholder="Module Title" value={m.title} onChange={e => updateItem(setModules, modules, i, "title", e.target.value)} className="flex-1 font-bold text-zinc-900 bg-transparent outline-none border-b border-zinc-200" />
                    </div>
                    <input placeholder="Topics (comma separated)" value={m.topics} onChange={e => updateItem(setModules, modules, i, "topics", e.target.value)} className="w-full text-xs text-zinc-500 bg-transparent outline-none" />
                    <button onClick={() => setModules(modules.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-zinc-300 hover:text-red-500"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}