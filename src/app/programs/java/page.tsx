"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  ChevronDown, 
  ArrowUpRight,
  ShieldCheck,
  Video,
  Mic2,
  Code2,
  Database,
  Terminal,
  Box,
  Layout
} from "lucide-react";
import { cn } from "@/lib/utils";

type Duration = "1 Week" | "2 Weeks" | "1 Month" | "3 Months";

const InternshipPrograms = () => {
  const [activeDuration, setActiveDuration] = useState<Duration>("1 Month");
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(true), []);

  const durations: Duration[] = ["1 Week", "2 Weeks", "1 Month", "3 Months"];

  const programData: Record<Duration, any> = {
    "1 Month": {
      title: "Full Stack Residency",
      heroImg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072",
      curriculum: [
        {
          title: "Modern Frontend Engineering",
          label: "Week 1-2",
          icon: <Layout className="w-5 h-5" />,
          img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=600",
          syllabus: ["React Functional Components", "State Management (Redux/Context)", "Tailwind Design Systems"],
          project: { name: "E-Commerce Dash", tech: "Next.js + Stripe" }
        },
        {
          title: "Enterprise Backend Architecture",
          label: "Week 3",
          icon: <Terminal className="w-5 h-5" />,
          img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600",
          syllabus: ["Spring Boot Microservices", "REST API Optimization", "JWT Security Layers"],
          project: { name: "Banking API", tech: "Java Spring + MySQL" }
        },
        {
          title: "Distributed Data Systems",
          label: "Week 4",
          icon: <Database className="w-5 h-5" />,
          img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600",
          syllabus: ["Relational vs NoSQL", "Redis Caching", "Hibernate ORM"],
          project: { name: "Inventory Sync", tech: "PostgreSQL + Docker" }
        }
      ]
    },
    "1 Week": {
      title: "Architecture Sprint",
      heroImg: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070",
      curriculum: [
        {
          title: "System Design Foundations",
          label: "Intensive",
          icon: <Box className="w-5 h-5" />,
          img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600",
          syllabus: ["Scalability Patterns", "Load Balancing", "Cloud Infrastructure"],
          project: { name: "System Blueprint", tech: "AWS + Terraform" }
        }
      ]
    },
    "2 Weeks": { title: "Frontend Focus", heroImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070", curriculum: [] },
    "3 Months": { title: "Executive Residency", heroImg: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070", curriculum: [] },
  };

  const current = programData[activeDuration];

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#020617] text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500/20">
      
      {/* 1. Cinematic Hero Section - Reduced Height (35vh) */}
      <section className="relative w-full h-[35vh] overflow-hidden bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.img 
            key={activeDuration}
            src={current.heroImg} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fcfcfd] dark:to-[#020617]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-12">
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-indigo-500" />
            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em]">Official Curriculum</span>
            <span className="h-[1px] w-8 bg-indigo-500" />
          </motion.div>
          <motion.h1 
             key={`title-${activeDuration}`}
             initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
             className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white"
          >
            {current.title}
          </motion.h1>

          <div className="mt-8 flex gap-1.5 p-1 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-md rounded-full border border-slate-200 dark:border-slate-800">
            {durations.map((d) => (
              <button
                key={d}
                onClick={() => { setActiveDuration(d); setOpenModule(0); }}
                className={cn(
                  "px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider transition-all",
                  activeDuration === d 
                    ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm border border-slate-200 dark:border-slate-700" 
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Main Content - Wider Max Width (1600px) and Balanced Gaps */}
      <main className="max-w-[1600px] mx-auto px-8 lg:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Syllabus & Projects Area */}
          <div className="lg:col-span-8 space-y-10">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-8">
              <h2 className="text-2xl font-bold tracking-tight italic">Roadmap Overview</h2>
              <button className="text-[10px] font-black bg-indigo-500/10 text-indigo-600 px-4 py-2 rounded-full uppercase tracking-widest border border-indigo-500/20">
                Syllabus PDF
              </button>
            </div>

            <div className="space-y-5">
              {current.curriculum.map((module: any, idx: number) => (
                <div 
                  key={idx}
                  className={cn(
                    "group border rounded-[2rem] transition-all duration-500 overflow-hidden",
                    openModule === idx ? "border-indigo-500 bg-white dark:bg-slate-900 shadow-2xl shadow-indigo-500/5" : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  )}
                >
                  <button 
                    onClick={() => setOpenModule(openModule === idx ? null : idx)}
                    className="w-full flex items-center gap-6 p-6 md:p-10 text-left"
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                      openModule === idx ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                    )}>
                      {module.icon}
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{module.label}</span>
                      <h4 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">{module.title}</h4>
                    </div>
                    <ChevronDown className={cn("w-5 h-5 transition-transform", openModule === idx ? "rotate-180 text-indigo-600" : "text-slate-300")} />
                  </button>

                  <AnimatePresence>
                    {openModule === idx && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="px-10 pb-12"
                      >
                        <div className="flex flex-col md:flex-row gap-12 border-t border-slate-100 dark:border-slate-800 pt-10">
                          {/* Left: Syllabus List */}
                          <div className="flex-1 space-y-6">
                            <h5 className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Technical Modules</h5>
                            <ul className="space-y-4">
                              {module.syllabus.map((item: string, i: number) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                                  <Code2 className="w-4 h-4 text-indigo-500" /> {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Right: Module Project Card */}
                          <div className="w-full md:w-80 bg-slate-50 dark:bg-slate-950 rounded-[1.8rem] p-7 border border-slate-100 dark:border-white/5 shadow-inner">
                            <h5 className="text-[10px] font-black uppercase text-indigo-500 tracking-widest mb-4">Milestone Project</h5>
                            <div className="aspect-video rounded-xl overflow-hidden mb-4 shadow-md">
                               <img src={module.img} className="w-full h-full object-cover" alt="" />
                            </div>
                            <p className="font-bold text-sm mb-1">{module.project.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-tighter">{module.project.tech}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Visual Sidebar - Translucent & Compact */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 px-1">Exclusive Access</h3>
            
            {/* Experts Card */}
            <div className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 shadow-xl">
              <div className="h-40 relative rounded-2xl overflow-hidden m-2 grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=600" className="w-full h-full object-cover" alt="" />
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-2 shadow-inner">
                  <Video className="w-3 h-3 text-indigo-600" /> Live Interaction
                </div>
              </div>
              <div className="p-8 pt-2">
                <h5 className="text-lg font-bold mb-2">Industry Expert Sync</h5>
                <p className="text-xs text-slate-500 leading-relaxed">Weekly architecture reviews and technical critiques from Tier-1 engineers.</p>
              </div>
            </div>

            {/* Comms Lab Card */}
            <div className="rounded-3xl bg-slate-950 p-8 text-white relative overflow-hidden group border border-white/5 shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[80px]" />
              <div className="flex justify-between items-start mb-10 relative z-10">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-indigo-400 border border-white/10">
                  <Mic2 className="w-5 h-5" />
                </div>
                <div className="bg-indigo-500 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Mandatory</div>
              </div>
              <h5 className="text-lg font-bold mb-2 relative z-10">Communication Drills</h5>
              <p className="text-xs text-slate-400 leading-relaxed mb-8 relative z-10">Mastering technical storytelling and corporate PR review etiquette.</p>
              <button className="w-full py-4 rounded-2xl bg-white text-slate-950 font-bold text-[10px] uppercase tracking-widest transition-all hover:bg-indigo-500 hover:text-white active:scale-95 shadow-lg shadow-white/5">
                Apply to Residency
              </button>
            </div>

            {/* Accreditation */}
            <div className="flex items-center gap-4 p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-0.5 tracking-tighter">Certified Path</p>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">ISO 9001:2026 Accredited</p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 text-center opacity-40">
        <div className="max-w-[1600px] mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-4 font-bold text-[9px] uppercase tracking-[0.4em]">
          <div>Inetz Academy © 2026</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InternshipPrograms;