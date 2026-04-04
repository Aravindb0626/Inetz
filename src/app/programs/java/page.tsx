"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowUpRight,
  ShieldCheck,
  Video,
  Mic2,
  ArrowRight,
  Sparkles,
  Trophy,
  Activity,
  CheckCircle2,
  BookOpen,
  Award,
  Users,
  Globe,
  Code2,
  LayoutGrid,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { programData, type Duration } from "@/lib/program-data";

// Animation Variants
const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const TechLogo = ({ name }: { name: string }) => {
  const iconMapping: Record<string, string> = {
    html5: "devicon-html5-plain",
    css3: "devicon-css3-plain",
    javascript: "devicon-javascript-plain",
    typescript: "devicon-typescript-plain",
    react: "devicon-react-original",
    nextjs: "devicon-nextjs-plain",
    tailwind: "devicon-tailwindcss-original",
    node: "devicon-nodejs-plain",
    mongodb: "devicon-mongodb-plain",
    postgresql: "devicon-postgresql-plain",
    github: "devicon-github-original",
    aws: "devicon-amazonwebservices-original",
    docker: "devicon-docker-plain",
    redis: "devicon-redis-plain",
    spring: "devicon-spring-plain",
    java: "devicon-java-plain",
  };

  const brandColors: Record<string, string> = {
    html5: "#E34F26", css3: "#1572B6", javascript: "#F7DF1E",
    typescript: "#3178C6", react: "#61DAFB", nextjs: "#000000",
    tailwind: "#06B6D4", node: "#339933", mongodb: "#47A248",
    postgresql: "#4169E1", github: "#181717", aws: "#FF9900",
    docker: "#2496ED", redis: "#DC382D", spring: "#6DB33F", java: "#ED8B00",
  };

  const slug = name.toLowerCase();
  const iconClass = iconMapping[slug];
  const color = brandColors[slug] || "#fb8500";

  if (!iconClass) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 bg-white rounded-xl border border-zinc-100 shadow-sm flex items-center justify-center cursor-pointer"
      style={{ color: color }}
    >
      <i className={cn(iconClass, "text-xl")}></i>
    </motion.div>
  );
};

const InternshipPrograms = () => {
  const [activeDuration, setActiveDuration] = useState<Duration>("1 Week");
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(true);

  const durations: Duration[] = ["1 Week", "2 Weeks", "1 Month", "3 Months"];
  const current = programData[activeDuration];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-emerald-100">
      {/* 1. HERO SECTION */}
      <section className="relative w-full py-24 overflow-hidden border-b border-zinc-100 bg-zinc-50/50">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" 
        />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-6 shadow-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Verified Technical Residency • 2026
            </span>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-6 font-serif"
          >
            {current.title} <span className="text-emerald-600">Program</span>
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            {current.subtitle} — Master industry-standard workflows with our specialized career tracks.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-white rounded-2xl border border-zinc-200 shadow-xl max-w-fit mx-auto">
            {durations.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDuration(d)}
                className={cn(
                  "relative px-7 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 z-10",
                  activeDuration === d ? "text-white" : "text-zinc-400 hover:text-zinc-600",
                )}
              >
                {activeDuration === d && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#fb8500] rounded-xl -z-10 shadow-lg shadow-orange-500/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {d}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="lg:col-span-8 space-y-16"
          >
            {/* Live Status Ticker */}
            <div className="flex items-center gap-6 overflow-hidden py-3 border-y border-zinc-100">
              <span className="shrink-0 flex items-center gap-2 text-[9px] font-black text-emerald-600 uppercase tracking-widest">
                <Activity className="w-3.5 h-3.5 animate-pulse" /> Residency Online
              </span>
              <div className="flex gap-12 text-[11px] text-zinc-400 italic whitespace-nowrap">
                <motion.span 
                  animate={{ x: [0, -20, 0] }} 
                  transition={{ duration: 4, repeat: Infinity }}
                >• March 2026 Batch Entry: Open</motion.span>
                <span className="flex items-center gap-1.5"><Users className="w-3 h-3" /> 142 Active Residents</span>
              </div>
            </div>

            {/* 01. SYLLABUS SECTION */}
            <section className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                    <LayoutGrid className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Technical Roadmap</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg"
                >
                  <ArrowRight className="w-4 h-4 rotate-90" /> Download PDF
                </motion.button>
              </div>

              <motion.div 
                layout
                className={cn(
                  "border rounded-3xl overflow-hidden bg-white shadow-sm transition-shadow duration-500",
                  isSyllabusOpen ? "border-emerald-500/20 shadow-2xl shadow-emerald-500/5" : "border-zinc-200"
                )}
              >
                <button
                  onClick={() => setIsSyllabusOpen(!isSyllabusOpen)}
                  className="w-full flex items-center justify-between p-8 text-left bg-white"
                >
                  <div className="flex items-center gap-5">
                    <motion.div
                      animate={{ rotate: isSyllabusOpen ? 0 : -10 }}
                      className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-sm",
                        isSyllabusOpen ? "bg-emerald-600 text-white" : "bg-zinc-100 text-zinc-400",
                      )}
                    >
                      <BookOpen className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Interactive Curriculum</span>
                      <h3 className="text-lg font-bold text-zinc-900">Detailed {activeDuration} Syllabus</h3>
                    </div>
                  </div>
                  <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", isSyllabusOpen ? "rotate-180 text-emerald-600" : "text-zinc-300")} />
                </button>

                <AnimatePresence>
                  {isSyllabusOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                    >
                      <div className="px-8 pb-10 pt-4 space-y-10 border-t border-zinc-50 bg-white">
                        {current.syllabus.map((item: any, idx: number) => (
                          <motion.div 
                            key={idx}
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative flex gap-8 group"
                          >
                            {idx !== current.syllabus.length - 1 && (
                              <div className="absolute left-[19px] top-10 w-[1px] h-full bg-zinc-100" />
                            )}
                            <div className="relative z-10 w-10 h-10 shrink-0 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-[10px] font-black text-zinc-400 group-hover:border-emerald-500 group-hover:text-emerald-600 transition-all shadow-sm">
                              {item.label}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                                <h4 className="text-md font-bold text-zinc-800">{item.title}</h4>
                                <div className="flex gap-2 mt-2 md:mt-0">
                                  {item.tools.map((t: string) => <TechLogo key={t} name={t} />)}
                                </div>
                              </div>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {item.topics.map((topic: string, i: number) => (
                                  <li key={i} className="flex items-center gap-2 text-xs text-zinc-500 font-medium group-hover:text-zinc-700 transition-colors">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {topic}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </section>

            {/* 02. DELIVERABLES SECTION */}
            <section className="space-y-8 pt-8 border-t border-zinc-100">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-900 shadow-inner">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Program Deliverables</h2>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  <ShieldCheck className="w-3 h-3" /> Career Ready
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: <Award className="text-emerald-600" />, title: "Verified Credential", desc: "Shareable on LinkedIn & Portfolios" },
                  { icon: <Code2 className="text-zinc-400" />, title: "Live Repositories", desc: "Production-ready build history" },
                  { icon: <Trophy className="text-zinc-400" />, title: "Placement Channel", desc: "Direct referral to hiring network" },
                ].map((d, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -10 }}
                    className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 flex flex-col gap-3 group hover:bg-white hover:shadow-xl transition-all"
                  >
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-zinc-100 group-hover:scale-110 transition-transform">
                      {d.icon}
                    </div>
                    <h4 className="font-bold text-sm text-zinc-900">{d.title}</h4>
                    <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">{d.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>
            <section className="space-y-8 pt-8 border-t border-zinc-100">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-900 shadow-inner">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Career Training</h2>
                </div>
                <div className="flex items-center gap-2 text-zinc-500 font-bold text-[10px] uppercase tracking-wider bg-zinc-50 px-3 py-1 rounded-full border border-zinc-100">
                  <Users className="w-3 h-3 text-zinc-400" /> Mentor Led
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Expert Sync Card */}
                <motion.div whileHover={{ y: -5 }} className="group rounded-3xl bg-white border border-zinc-200 p-2 shadow-sm transition-all hover:shadow-xl shadow-zinc-100">
                  <div className="h-44 relative rounded-2xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Technical Sync" />
                    <div className="absolute inset-0 bg-emerald-900/5" />
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm">
                      <Video className="w-3 h-3 text-emerald-600" /> Industry Sync
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-base font-bold mb-1 text-zinc-900">Industry Expert Sync</h4>
                    <p className="text-xs text-zinc-400 italic leading-relaxed font-medium">Direct reviews with Senior FAANG SDEs.</p>
                  </div>
                </motion.div>

                {/* Communication Lab Card */}
                <motion.div whileHover={{ y: -5 }} className="group rounded-3xl bg-zinc-900 p-8 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between border border-zinc-800">
                  <div className="relative z-10">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400 border border-white/10 mb-6 group-hover:rotate-12 transition-transform">
                      <Mic2 className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold mb-2 italic uppercase tracking-tighter">Communication Lab</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-medium">Mastering technical storytelling & PR etiquette.</p>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative z-10 w-full py-3.5 rounded-xl bg-white text-zinc-950 font-black text-[9px] uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-white transition-all shadow-lg shadow-white/5">
                    Review Modules <ArrowUpRight className="w-3 h-3 inline ml-1" />
                  </motion.button>
                  {/* Glowing Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                </motion.div>
              </div>
            </section>
          </motion.div>


          {/* ONBOARDING SIDEBAR */}
          <aside className="lg:col-span-4 space-y-6">
            <motion.div 
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="sticky top-28 space-y-6"
            >
              <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-200 shadow-2xl shadow-zinc-100 relative overflow-hidden group">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 right-0 p-8 opacity-5"
                >
                  <Sparkles className="w-32 h-32 text-emerald-600" />
                </motion.div>
                <div className="relative z-10 space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold tracking-tight italic">Onboarding Port</h3>
                    <p className="text-[11px] text-zinc-400 italic flex items-center gap-2">
                      <Activity className="w-3 h-3 text-emerald-500 animate-pulse" /> System Online — Batch March 16
                    </p>
                  </div>
                  <div className="space-y-3.5">
                    <input className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-inner" placeholder="Candidate Name" />
                    <input className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-inner" placeholder="Work Email" />
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 w-full bg-[#00a6fb] hover:bg-[#0088cc] text-white font-bold text-[10px] uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-blue-500/20 transition-all"
                  >
                    Book My Seats <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-zinc-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group border border-zinc-800"
              >
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <Trophy className="w-8 h-8 mb-4 opacity-50 text-emerald-500" />
                <h4 className="text-lg font-bold mb-2">Corporate Referrals</h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-medium">Direct routing to our FAANG and Fintech network post-certification.</p>
              </motion.div>
            </motion.div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-zinc-100 py-12 text-center mt-12 bg-white">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          <div>Inetz Academy © 2026 Residency Portal</div>
          <div className="flex gap-8">
            <a className="hover:text-emerald-600 transition-colors cursor-pointer">Privacy</a>
            <a className="hover:text-emerald-600 transition-colors cursor-pointer">Security</a>
            <a className="hover:text-emerald-600 transition-colors cursor-pointer">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InternshipPrograms;