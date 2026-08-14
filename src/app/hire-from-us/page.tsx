"use client";

import React from "react";
import Link from "next/link";
import { Building2, ArrowRight, Sparkles, CheckCircle2, Briefcase } from "lucide-react";
import InteractiveProcessSection from "./components/InteractiveProcessSection";

/* ────────────────── OFFICIAL TECH BRAND LOGO SVGS ────────────────── */

function ReactMernLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
    </svg>
  );
}

function JavaLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M8.85 18.56s-.92.23-2.23.23c-2.43 0-2.07-1.65-2.07-1.65 0 0 .54.12 1.35.12 1.77 0 2.95-.7 2.95-.7s-.96-.12-1.9-.58c-1.12-.56-1.51-1.43-1.51-1.43s.68.25 1.58.25c1.47 0 2.27-.46 2.27-.46s-.98-.33-1.77-1.08c-.95-.91-.9-2.06-.9-2.06s.52.42 1.51.51c1.23.11 2.38-.42 2.38-.42s-1.16-.49-1.39-1.6c-.27-1.29.83-2.32.83-2.32s.04.83.92 1.48c1.08.8 2.58.8 2.58.8s.21-.86-.24-1.88c-.54-1.22-1.78-2.22-1.78-2.22s1.42.42 2.12 1.63c.69 1.18.42 2.37.42 2.37s1.02-1.03 2.12-1.03c1.23 0 1.83 1.13 1.83 1.13s-.42-.32-1.13-.32c-.93 0-1.52.75-1.52 1.75 0 1.52 1.25 2.22 1.25 2.22s-.88-.12-1.68-.82c-.88-.78-1.22-1.88-1.22-1.88s-.38 1.12.38 2.38c.88 1.48 2.52 2.08 2.52 2.08s-1.22.18-2.32-.48c-1.28-.78-1.78-1.92-1.78-1.92s-.22 1.18.68 2.38c1.02 1.38 2.68 1.68 2.68 1.68s-1.58.32-2.98-.38c-1.62-.82-2.12-2.18-2.12-2.18s-.28 1.28.62 2.58c1.08 1.58 2.88 1.88 2.88 1.88s-1.82.42-3.48-.38c-1.88-.92-2.38-2.48-2.38-2.48s-.18 1.38.88 2.78c1.28 1.68 3.28 1.88 3.28 1.88s-2.18.58-4.18-.38z" fill="#E76F00"/>
    </svg>
  );
}

function PythonLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M11.896 2c-5.187 0-4.84 2.253-4.84 2.253l.006 2.33h4.908v.693H5.111S2 6.945 2 12.115c0 5.172 2.716 4.981 2.716 4.981h1.623v-2.3c0-1.85 1.558-3.328 3.483-3.328h4.902c1.7 0 3.08-1.382 3.08-3.082V5.08C17.804 3.38 16.42 2 14.72 2h-2.824zm-2.48 1.488a.952.952 0 1 1 0 1.904.952.952 0 0 1 0-1.904z" fill="#3776AB"/>
      <path d="M12.104 22c5.187 0 4.84-2.253 4.84-2.253l-.006-2.33h-4.908v-.693h6.859S22 17.055 22 11.885c0-5.172-2.716-4.981-2.716-4.981h-1.623v2.3c0 1.85-1.558 3.328-3.483 3.328H9.276c-1.7 0-3.08 1.382-3.08 3.082v3.328C6.196 20.62 7.58 22 9.28 22h2.824zm2.48-1.488a.952.952 0 1 1 0-1.904.952.952 0 0 1 0 1.904z" fill="#FFD43B"/>
    </svg>
  );
}

function KotlinLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M22 22H2L12 12L22 22Z" fill="#7F52FF"/>
      <path d="M22 2H2V22L12 12L22 2Z" fill="url(#kotlin-grad)"/>
      <defs>
        <linearGradient id="kotlin-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E44857"/>
          <stop offset="0.46" stopColor="#C711E1"/>
          <stop offset="1" stopColor="#7F52FF"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ────────────────── TALENT DOMAINS CONFIGURATION ────────────────── */

const domains = [
  { name: "MERN / Next.js Full Stack", icon: ReactMernLogo, count: "120+ Candidates Ready" },
  { name: "Java Enterprise & Spring Boot", icon: JavaLogo, count: "90+ Candidates Ready" },
  { name: "Python & Data Engineering", icon: PythonLogo, count: "80+ Candidates Ready" },
  { name: "Android Application Dev (Kotlin)", icon: KotlinLogo, count: "60+ Candidates Ready" },
];

export default function HireFromUsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      
      {/* HERO SECTION */}

<section className="relative py-24 lg:py-32 px-4 sm:px-8 bg-white border-b border-zinc-200/80 overflow-hidden">
  
  {/* Background Visual Accents (Grid Overlay + Subtle Ambient Glows) */}
  <div 
    className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" 
  />
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-orange-500/10 via-amber-500/5 to-transparent blur-3xl rounded-full pointer-events-none" />

  <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">


    {/* Primary Hero Heading */}
    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-zinc-900 leading-[1.1]">
      Recruit Industry-Tested Engineers. <br />
      <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
        Zero Commission Fees.
      </span>
    </h1>

    {/* Subtitle / Value Proposition */}
    <p className="text-base sm:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed font-medium">
      Access pre-screened full-stack developers and data analysts trained on real-world industrial projects. Hire verified talent with zero recruitment agency markup.
    </p>

    {/* Action CTAs */}
    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link
        href="/employer/register"
        className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-extrabold rounded-2xl text-sm inline-flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-orange-500/25 hover:shadow-orange-500/35 cursor-pointer"
      >
        <Building2 size={18} /> Register as Employer <ArrowRight size={16} />
      </Link>

      <a
        href="#hiring-process"
        className="w-full sm:w-auto px-8 py-4 bg-zinc-100 hover:bg-zinc-200/80 text-zinc-800 font-bold rounded-2xl text-sm transition-all border border-zinc-200/90 text-center"
      >
        Explore How It Works
      </a>
    </div>

    {/* Integrated Metrics & Trust Indicators */}
    <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-zinc-200/80 max-w-4xl mx-auto">
      <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-200/60 text-center space-y-0.5">
        <h3 className="text-2xl sm:text-3xl font-black text-zinc-900">500+</h3>
        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Trained Engineers</p>
      </div>

      <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-200/60 text-center space-y-0.5">
        <h3 className="text-2xl sm:text-3xl font-black text-emerald-600">100%</h3>
        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Project Verified</p>
      </div>

      <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-200/60 text-center space-y-0.5">
        <h3 className="text-2xl sm:text-3xl font-black text-orange-500">48h</h3>
        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Avg. Shortlist Time</p>
      </div>

      <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-200/60 text-center space-y-0.5">
        <h3 className="text-2xl sm:text-3xl font-black text-zinc-900">₹0</h3>
        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Agency Markup</p>
      </div>
    </div>

  </div>
</section>

      {/* STICKY INTERACTIVE PROCESS SECTION */}
      <InteractiveProcessSection />

      {/* SPECIALIZED TALENT POOLS WITH OFFICIAL TECH LOGOS */}
      <section className="py-20 px-4 sm:px-8 bg-white border-b border-zinc-200/80">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">Specialized Developer Talent Pools</h2>
            <p className="text-xs text-zinc-500">Candidates complete multi-week industrial training with practical source code verification.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {domains.map((d) => {
              const LogoIcon = d.icon;
              return (
                <div
                  key={d.name}
                  className="p-6 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-4 hover:bg-white hover:border-zinc-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200/80 shadow-sm flex items-center justify-center">
                      <LogoIcon className="w-7 h-7" />
                    </div>
                    <h4 className="text-sm font-bold text-zinc-800 leading-snug">{d.name}</h4>
                  </div>
                  <p className="text-[11px] font-extrabold text-emerald-600 flex items-center gap-1.5 pt-2 border-t border-zinc-200/60">
                    <CheckCircle2 size={13} /> {d.count}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="bg-zinc-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-[10px] font-black uppercase tracking-widest">
              Get Started Now
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Ready to Hire Your Next Developer?</h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium">
              Register your company profile on Inetz Console to publish job vacancies and evaluate pre-screened student candidates.
            </p>
          </div>

          <Link
            href="/employer/register"
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-2xl text-sm inline-flex items-center gap-2.5 shadow-xl shadow-orange-500/20 cursor-pointer"
          >
            <Briefcase size={18} /> Register Employer Account <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}