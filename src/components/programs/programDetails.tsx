"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table, BarChart3, BrainCircuit, Cpu, Code2, LayoutGrid,
  ArrowRight, CheckCircle2, Video, Mic2, ArrowUpRight,
  Sparkles, Quote, Star, Users, Lock, ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { programData, type Duration, type TechStack } from "@/lib/program-data";
import { useRouter } from "next/navigation";

// --- Sub-Component: TechLogo ---
const TechLogo = ({ name }: { name: string }) => {
  const key = name.toLowerCase();
  const brandColors: Record<string, string> = {
    html5: "#E34F26", css3: "#1572B6", javascript: "#F7DF1E", typescript: "#3178C6",
    react: "#61DAFB", node: "#339933", mongodb: "#47A248", postgresql: "#4169E1",
    github: "#181717", excel: "#217346", powerbi: "#F2C811", python: "#3776AB",
    tensorflow: "#FF6F00", pytorch: "#EE4C2C", arduino: "#00979D", stm32: "#03234B",
    esp32: "#E7352C", c: "#A8B9CC", java: "#ED8B00",
  };
  const iconColor = brandColors[key] || "#64748b";
  const deviconMapping: Record<string, string> = {
    html5: "devicon-html5-plain", css3: "devicon-css3-plain", javascript: "devicon-javascript-plain",
    typescript: "devicon-typescript-plain", react: "devicon-react-original", node: "devicon-nodejs-plain",
    python: "devicon-python-plain", java: "devicon-java-plain", github: "devicon-github-original",
  };
  return <i className={`${deviconMapping[key] || "devicon-github-original"} text-2xl`} style={{ color: iconColor }} />;
};

const InternshipPrograms = ({ initialStack = "Python", onBack }: { initialStack?: TechStack; onBack?: () => void }) => {
  const router = useRouter();
  const [activeStack, setActiveStack] = useState<TechStack>(initialStack);
  const [activeDuration, setActiveDuration] = useState<Duration>("1 Week");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  
  // Lead Capture States
  const [leadForm, setLeadForm] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        setIsLoggedIn(res.ok);
      } catch { setIsLoggedIn(false); }
    };
    checkAuth();
    if (localStorage.getItem(`unlocked_${activeStack}`) === "true") setIsUnlocked(true);
  }, [activeStack]);

  const handleLeadSubmit = async () => {
    if (!leadForm.name || !leadForm.phone) return alert("Please enter both Name and Phone");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/send-lead", {
        method: "POST",
        body: JSON.stringify({ ...leadForm, stack: activeStack }),
      });
      if (res.ok) {
        setIsUnlocked(true);
        localStorage.setItem(`unlocked_${activeStack}`, "true");
      }
    } catch (err) { alert("Failed to unlock. Please try again."); }
    finally { setIsSubmitting(false); }
  };

 const handleApply = () => {
  // Construct the apply URL with parameters
  const applyUrl = `/apply?track=${activeStack}&duration=${activeDuration}`;
  
  if (isLoggedIn) {
    router.push(applyUrl);
  } else {
    // encodeURIComponent ensures special characters (? and =) don't break the URL
    const encodedCallback = encodeURIComponent(applyUrl);
    router.push(`/login?callback=${encodedCallback}`);
  }
};

  const current = programData[activeStack]?.[activeDuration];
  const durations: Duration[] = ["1 Week", "2 Weeks", "1 Month", "3 Months"];
  const isAccessible = isLoggedIn || isUnlocked;

  if (!current) return <div className="p-20 text-center text-zinc-400">Syncing track...</div>;

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      
      {/* Navigation Top Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <button 
          onClick={onBack || (() => router.back())}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalogue
        </button>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative w-full py-16 overflow-hidden border-b border-zinc-100 bg-zinc-50/50">
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900 mb-6">
            {current.title} <span className="text-emerald-600">Track</span>
          </h1>
          <div className="inline-flex gap-1 p-1 bg-white rounded-xl border border-zinc-200 shadow-xl mx-auto">
            {durations.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDuration(d)}
                className={cn(
                  "relative px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all z-10",
                  activeDuration === d ? "text-white" : "text-zinc-400 hover:text-zinc-600"
                )}
              >
                {activeDuration === d && (
                  <motion.div layoutId="durTab" className="absolute inset-0 bg-[#fb8500] rounded-lg -z-10" />
                )}
                {d}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-12">
          
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-emerald-500" /> Technical Roadmap
              </h2>
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-full">
                {current.syllabus.length} Modules
              </span>
            </div>

            <div className="relative border border-zinc-200 rounded-[2rem] bg-white shadow-lg shadow-zinc-200/20 overflow-hidden">
              <div className="p-6 md:p-10 space-y-0 relative">
                <div className="absolute left-[34px] md:left-[65px] top-[50px] w-[1.5px] bg-gradient-to-b from-emerald-500 via-emerald-200 to-transparent h-full z-0" />

                {(isAccessible ? current.syllabus : current.syllabus.slice(0, 2)).map((item, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="relative flex gap-6 pb-10 last:pb-0">
                    <div className="min-w-[50px] h-10 rounded-xl border-2 border-white shadow-sm flex items-center justify-center text-[9px] font-bold text-zinc-400 z-10 bg-white">
                      {item.label}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <h4 className="text-md font-bold text-zinc-800">{item.title}</h4>
                      <div className="flex gap-2.5 mt-2 mb-3">
                        {item.tools.map(t => <TechLogo key={t} name={t} />)}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-white/50 p-5 rounded-2xl border border-zinc-100">
                        {item.topics.map((topic, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-zinc-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> {topic}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {!isAccessible && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4 relative z-10">
                    <div className="bg-zinc-900 rounded-[2rem] p-8 md:p-10 text-white overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 text-center md:text-left text-zinc-400">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase mb-4">
                            <Lock className="w-3 h-3" /> Premium Content
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2 leading-tight">Unlock the full Roadmap</h3>
                          <p className="text-xs font-medium max-w-xs">Access all remaining professional modules and the PDF guide.</p>
                        </div>
                        <div className="w-full md:w-auto min-w-[300px] space-y-3">
                          <input 
                            type="text" placeholder="Full Name" value={leadForm.name}
                            onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                            className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500">+91</span>
                            <input 
                              type="tel" placeholder="WhatsApp Number" value={leadForm.phone}
                              onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
                              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                          </div>
                          <button 
                            onClick={handleLeadSubmit}
                            className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg flex items-center justify-center gap-2"
                          >
                            {isSubmitting ? "Unlocking..." : "Unlock Full Syllabus"} <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {isAccessible && (
                <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Syllabus Fully Unlocked
                  </p>
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-md">
                    Download PDF <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* CAREER TRAINING */}
          <section className="space-y-6 pt-6 border-t border-zinc-100">
            <h2 className="text-xl font-bold flex items-center gap-2"><Cpu className="w-5 h-5" /> Career Training</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="group rounded-2xl bg-white border border-zinc-200 p-1.5 shadow-sm hover:shadow-lg transition-all">
                <div className="h-40 relative rounded-xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Technical Sync" />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[8px] font-bold uppercase flex items-center gap-1.5"><Video className="w-3 h-3 text-emerald-600" /> Industry Sync</div>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-bold text-zinc-900">Industry Expert Sync</h4>
                  <p className="text-[11px] text-zinc-400 italic mt-0.5">Direct reviews with Senior FAANG SDEs.</p>
                </div>
              </div>
              <div className="group rounded-2xl bg-zinc-900 p-6 text-white relative overflow-hidden flex flex-col justify-between h-full border border-zinc-800 shadow-xl">
                <div>
                  <Mic2 className="w-8 h-8 text-emerald-400 mb-4" />
                  <h4 className="text-md font-bold italic uppercase">Communication Lab</h4>
                  <p className="text-[11px] text-zinc-400 mt-1">Mastering technical storytelling & PR etiquette.</p>
                </div>
                <button className="w-full mt-6 py-3 rounded-lg bg-white text-zinc-950 font-bold text-[8px] uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
                  Review Modules <ArrowUpRight className="w-3 h-3 inline ml-1" />
                </button>
              </div>
            </div>
          </section>

          {/* PROJECTS SECTION */}
          <section className="space-y-6 pt-6 border-t border-zinc-100">
            <h2 className="text-xl font-bold flex items-center gap-2"><Code2 className="w-5 h-5" /> Student Builds</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {current.projects.map((proj) => (
                <div key={proj.title} className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-lg transition-all">
                  <div className="h-40 overflow-hidden"><img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /></div>
                  <div className="p-5 flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900">{proj.title}</h4>
                      <div className="flex gap-1.5 mt-1.5">
                        {proj.tech.map((t) => (
                          <span key={t} className="text-[7px] font-bold uppercase tracking-widest text-zinc-400 border border-zinc-100 px-1.5 py-0.5 rounded-md">{t}</span>
                        ))}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-300 group-hover:text-emerald-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* REVIEWS SECTION */}
          <section className="space-y-6 pt-6 border-t border-zinc-100">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" /> Student Experience
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {current.reviews.map((rev, i) => (
                <div key={i} className="p-6 rounded-[1.5rem] bg-zinc-50 border border-zinc-100 relative group hover:bg-white hover:shadow-xl transition-all duration-500">
                  <Quote className="absolute top-4 right-5 w-6 h-6 text-zinc-200 group-hover:text-emerald-100 transition-colors" />
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-[13px] leading-relaxed text-zinc-600 mb-4 italic">"{rev.text}"</p>
                  <div>
                    <h5 className="text-[13px] font-bold text-zinc-900">{rev.name}</h5>
                    <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">{rev.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 3. SIDEBAR WITH PRICING */}
<aside className="lg:col-span-4">
  <div className="sticky top-24 space-y-5">
    <div className="bg-white rounded-[2rem] p-8 border border-blue-100 shadow-xl shadow-blue-500/5 relative overflow-hidden group">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/5 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
      
      <div className="relative z-10 text-center">
        <Sparkles className="w-8 h-8 text-blue-600 mx-auto mb-4 animate-pulse" />
        
        <h3 className="text-xl font-bold mb-1 tracking-tight font-sans">
          Start Learning <span className="text-blue-600">Today</span>
        </h3>
        
        {/* --- PRICING SECTION --- */}
        <div className="my-6">
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-black text-zinc-900">
              ₹{current.price}
            </span>
            <span className="text-sm text-zinc-400 line-through font-medium">
              ₹{current.originalPrice}
            </span>
          </div>
          <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-1">
            Save {Math.round(((current.originalPrice - current.price) / current.originalPrice) * 100)}% Today
          </p>
        </div>

        <button
          onClick={handleApply}
          disabled={isLoggedIn === null}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoggedIn === null ? "Checking..." : <>Enroll in {activeStack} Track <ArrowRight className="w-3.5 h-3.5" /></>}
        </button>

        <div className="mt-6 py-3 px-3 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-center gap-2">
          <Users className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">
            Limited batch: Only 8/20 seats left
          </span>
        </div>
        
        <p className="mt-4 text-[9px] text-zinc-400 italic">
          * 7-day money-back guarantee if not satisfied.
        </p>
      </div>
    </div>
  </div>
</aside>
      </main>
    </div>
  );
};

export default InternshipPrograms;