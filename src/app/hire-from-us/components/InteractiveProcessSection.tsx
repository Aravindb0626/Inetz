"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { 
  UserPlus, 
  FileText, 
  Users, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight, 
  Globe, 
  ShieldCheck,
  Star,
  Sparkles
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Register Employer Account",
    subtitle: "Quick Corporate Onboarding",
    description:
      "Create your free corporate account in under 2 minutes. Fill in your organization profile, hiring goals, and key contacts to unlock direct access to our candidate portal.",
    icon: UserPlus,
    badge: "Instant Verification",
    mockup: (
      <div className="w-full h-full bg-gradient-to-br from-white via-orange-50/40 to-zinc-50 rounded-3xl border border-zinc-200 p-6 md:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl" />

        <div className="flex items-center justify-between border-b border-zinc-200/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-orange-500/20">
              <UserPlus size={18} />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-zinc-900">Enterprise Onboarding</h4>
              <p className="text-[11px] text-zinc-500 font-medium">Step 1 of 4 • Free Profile Setup</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-extrabold flex items-center gap-1">
            <ShieldCheck size={12} /> Verified
          </span>
        </div>

        <div className="space-y-3.5 my-auto">
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">
              Company Name
            </label>
            <div className="p-3 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 shadow-sm flex items-center gap-2">
              <Globe size={14} className="text-orange-500" />
              <span>Acme Software Solutions Ltd.</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">
                Work Email
              </label>
              <div className="p-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 truncate">
                talent@acme.com
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">
                Hiring Scale
              </label>
              <div className="p-2.5 bg-orange-50 border border-orange-200 rounded-xl text-xs font-bold text-orange-700">
                5-10 Developers
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <div className="w-full py-3 bg-zinc-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg">
            <span>Complete Registration</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    ),
  },
  {
    step: "02",
    title: "Post Job Listings",
    subtitle: "Custom Requirement Studio",
    description:
      "Publish full-time vacancies or internship tracks in minutes. Define domain skills (MERN, Java, Python), compensation, and candidate criteria.",
    icon: FileText,
    badge: "Smart Skill Tagging",
    mockup: (
      <div className="w-full h-full bg-gradient-to-br from-white via-zinc-50 to-orange-50/30 rounded-3xl border border-zinc-200 p-6 md:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-200/80 pb-4">
          <div>
            <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-wider">
              Job Publishing Studio
            </span>
            <h4 className="text-base font-extrabold text-zinc-900">Post Vacancy Requirement</h4>
          </div>
          <span className="px-2.5 py-1 bg-orange-100 text-orange-800 font-bold rounded-lg text-[10px]">
            Live Feed
          </span>
        </div>

        <div className="space-y-3.5 my-auto">
          <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="text-sm font-bold text-zinc-900">Junior Full-Stack Developer</h5>
                <p className="text-[11px] text-zinc-500 font-medium">MERN & Next.js Track • Remote / On-Site</p>
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-md">
                ₹4.5 - ₹6.5 LPA
              </span>
            </div>

            <div className="pt-2 flex flex-wrap gap-1.5">
              <span className="px-2 py-1 bg-zinc-100 text-zinc-700 font-bold text-[10px] rounded-md">
                #React
              </span>
              <span className="px-2 py-1 bg-zinc-100 text-zinc-700 font-bold text-[10px] rounded-md">
                #Node.js
              </span>
              <span className="px-2 py-1 bg-orange-100 text-orange-800 font-bold text-[10px] rounded-md">
                #NextJS
              </span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-zinc-900 text-white rounded-xl text-xs font-bold text-center shadow-md">
          Publish Vacancy to 500+ Verified Students
        </div>
      </div>
    ),
  },
  {
    step: "03",
    title: "Review Verified Applicants",
    subtitle: "Real GitHub & Project Proof",
    description:
      "Browse live student applications, inspect source code repositories, live demo URLs, and performance scores before inviting candidates to interview.",
    icon: Users,
    badge: "100% Code Validated",
    mockup: (
      <div className="w-full h-full bg-gradient-to-br from-white via-emerald-50/30 to-zinc-50 rounded-3xl border border-zinc-200 p-6 md:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3">
          <div className="flex items-center gap-2">
            <Users className="text-orange-500" size={18} />
            <h4 className="text-sm font-extrabold text-zinc-900">Applicant Candidate Feed</h4>
          </div>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-extrabold text-[10px] rounded-full">
            18 Applicants Ready
          </span>
        </div>

        <div className="space-y-2.5 my-auto">
          {[
            { name: "Rahul Sharma", domain: "Full Stack (MERN)", score: "98% Capstone" },
            { name: "Ananya Patel", domain: "Java & Spring Boot", score: "95% Capstone" },
          ].map((c, i) => (
            <div
              key={i}
              className="p-3 bg-white border border-zinc-200/90 rounded-2xl shadow-sm flex items-center justify-between text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <strong className="font-bold text-zinc-900">{c.name}</strong>
                  <Star size={12} className="text-amber-500 fill-amber-500" />
                </div>
                <p className="text-[10px] text-zinc-500 font-medium">{c.domain}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-md">
                  {c.score}
                </span>
                <span className="p-1.5 bg-zinc-900 text-white rounded-lg inline-flex items-center justify-center">
                  {/* <Github size={12} /> */}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-2.5 bg-zinc-100 text-zinc-700 text-[11px] font-bold text-center rounded-xl border border-zinc-200">
          Filter by Technical Stack & Assessment Score
        </div>
      </div>
    ),
  },
  {
    step: "04",
    title: "Interview & Onboard",
    subtitle: "Direct Offers Without Agency Fees",
    description:
      "Shortlist top candidates directly through your dashboard, run technical rounds, and release placement offers with zero recruitment commission.",
    icon: UserCheck,
    badge: "Zero Markup Charges",
    mockup: (
      <div className="w-full h-full bg-gradient-to-br from-white via-zinc-50 to-emerald-50/40 rounded-3xl border border-zinc-200 p-6 md:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
        <div className="text-center space-y-2 my-auto">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 size={30} />
          </div>
          <h4 className="text-lg font-black text-zinc-900">Placement Offer Released</h4>
          <p className="text-xs text-zinc-500 font-medium max-w-xs mx-auto">
            Direct onboarding initiated with selected candidate.
          </p>
        </div>

        <div className="p-4 bg-white border border-zinc-200 rounded-2xl text-xs space-y-2 shadow-sm">
          <div className="flex justify-between items-center text-zinc-600">
            <span>Agency Commission:</span>
            <strong className="text-emerald-600 font-extrabold text-sm">₹0 (Free)</strong>
          </div>
          <div className="flex justify-between items-center text-zinc-600">
            <span>Joining Schedule:</span>
            <strong className="text-zinc-900 font-bold">Immediate Availability</strong>
          </div>
        </div>

        <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-extrabold text-center shadow-lg shadow-emerald-600/20">
          Candidate Onboarded Successfully
        </div>
      </div>
    ),
  },
];

export default function InteractiveProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

 useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      let stepIndex = 0;

      if (latest < 0.32) {
        stepIndex = 0; // Step 01 remains active longer (0% to 32% scroll progress)
      } else if (latest < 0.58) {
        stepIndex = 1; // Step 02 (32% to 58%)
      } else if (latest < 0.82) {
        stepIndex = 2; // Step 03 (58% to 82%)
      } else {
        stepIndex = 3; // Step 04 (82% to 100%)
      }

      setActiveStep(stepIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);
  
  return (
    <section ref={containerRef} className="relative bg-zinc-50/90 py-20 border-y border-zinc-200/80">
      
      {/* SECTION HEADER */}
      <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto px-4">
        <span className="px-3.5 py-1 bg-orange-100 text-orange-700 rounded-full text-[11px] font-black uppercase tracking-widest inline-flex items-center gap-1.5">
          <Sparkles size={13} /> Hiring Workflow
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight">
          How Hiring Works on Inetz
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 font-medium">
          Scroll down to see the real-time hiring flow in action.
        </p>

        {/* STEP CONTROLLER PILLS */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {steps.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeStep === idx
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                  : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
              }`}
            >
              Step {s.step}
            </button>
          ))}
        </div>
      </div>

      {/* ────────────────── STICKY VIEWPORT CONTAINER ────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
        
        {/* LEFT COLUMN: SCROLLABLE CARDS */}
        <div className="lg:col-span-6 space-y-24 py-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStep === idx;

            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0.35 }}
                animate={{ opacity: isActive ? 1 : 0.35, scale: isActive ? 1 : 0.97 }}
                transition={{ duration: 0.25 }}
                onClick={() => setActiveStep(idx)}
                className={`p-8 rounded-3xl border transition-all duration-300 bg-white cursor-pointer ${
                  isActive
                    ? "border-orange-500 shadow-xl shadow-orange-500/10 ring-2 ring-orange-500/20"
                    : "border-zinc-200/90 hover:border-zinc-300"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-black font-mono text-zinc-300">
                    {s.step}
                  </span>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                      isActive
                        ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                        : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    <Icon size={22} />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-600">
                    {s.subtitle}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded-md">
                    {s.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mb-2">{s.title}</h3>

                <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                  {s.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ────────────────── RIGHT COLUMN: STICKY DISPLAY ────────────────── */}
        <div className="hidden lg:block lg:col-span-6 sticky top-28 h-fit z-20 self-start">
          <div className="relative w-full aspect-[4/3.2] max-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.96 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-full"
              >
                {steps[activeStep].mockup}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}