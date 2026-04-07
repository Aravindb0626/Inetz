"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
  Building2,
  Briefcase,
  Zap,
  TrendingUp,
  Map,
  Users,
  Target,
  Rocket
} from "lucide-react";
import {
  SiGoogle,
  SiMicrosoft,
  SiAws,
  SiAtlassian,
  SiUber,
  SiMeta,
  SiOpenai,
  SiNvidia,
  SiIntel,
  SiSiemens,
  SiQualcomm,
  SiStripe,
  SiPostman,
  SiAccenture
} from "react-icons/si";

type Sector = {
  title: string;
  label: string;
  image: string;
  desc: string;
  highlight: string;
  badge: string;
  modalContent: {
    about: string;
    companies: { name: string; icon: any; domain?: string }[];
    surviving: string;
    growth: string;
    pathway: string[];
  };
};

const sectors: Sector[] = [
  {
    title: "Product Companies",
    label: "Top-Tier Products",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
    desc: "Work at cutting-edge product-based companies as a Software Developer, building real-world applications at scale.",
    highlight: "500+ alumni placed",
    badge: "Most Placed",
    modalContent: {
      about: "Product companies focus on building software solutions, platforms, and applications that scale to millions of users. The work involves deep problem-solving, system design, and continuous iteration.",
      companies: [
        { name: "Google", icon: SiGoogle, domain: "google.com" },
        { name: "Microsoft", icon: SiMicrosoft, domain: "microsoft.com" },
        { name: "Amazon", icon: SiAws, domain: "amazon.com" },
        { name: "Atlassian", icon: SiAtlassian, domain: "atlassian.com" },
        { name: "Uber", icon: SiUber, domain: "uber.com" },
        { name: "Meta", icon: SiMeta, domain: "meta.com" }
      ],
      surviving: "Focus heavily on Data Structures & Algorithms, System Design, and writing highly optimized code. You must understand the product lifecycle.",
      growth: "A+",
      pathway: ["SDE I (Junior)", "SDE II (Mid-Level)", "Senior Engineer", "Staff Engineer"]
    }
  },
  {
    title: "IT Services & MNCs",
    label: "Enterprise IT",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
    desc: "Join top IT service companies delivering technology solutions across banking, retail, and enterprise clients globally.",
    highlight: "Leading MNC placements",
    badge: "High Demand",
    modalContent: {
      about: "IT Services and Consulting firms provide technology solutions to other businesses. They handle diverse, large-scale projects across domains like banking and healthcare.",
      companies: [
        { name: "Accenture", icon: SiAccenture, domain: "accenture.com" },
        { name: "TCS", icon: Building2, domain: "tcs.com" },
        { name: "Infosys", icon: Building2, domain: "infosys.com" },
        { name: "Capgemini", icon: Building2, domain: "capgemini.com" },
        { name: "Cognizant", icon: Building2, domain: "cognizant.com" }
      ],
      surviving: "Adaptability is key. Learn new tech stacks quickly as client projects demand. Strong communication skills are vital for success.",
      growth: "B+",
      pathway: ["Assoc. Engineer", "System Engineer", "Technology Analyst", "Solution Architect"]
    }
  },
  {
    title: "AI & Data Science",
    label: "Future of Tech",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1000",
    desc: "Step into the fast-growing AI, ML and Data Analytics space. Work on real datasets and intelligent systems.",
    highlight: "Highest salary bracket",
    badge: "Trending",
    modalContent: {
      about: "This industry leverages data to predict trends, build generative models, and automate complex decisions. High focus on mathematics and logic.",
      companies: [
        { name: "OpenAI", icon: SiOpenai, domain: "openai.com" },
        { name: "NVIDIA", icon: SiNvidia, domain: "nvidia.com" },
        { name: "DeepMind", icon: SiGoogle, domain: "deepmind.google" },
        { name: "Anthropic", icon: Building2, domain: "anthropic.ai" }
      ],
      surviving: "Master Python and Statistics. Keep up with rapidly evolving research papers and master frameworks like PyTorch.",
      growth: "Exponential",
      pathway: ["Data Analyst", "Applied Scientist", "ML Engineer", "Head of AI"]
    }
  },
  {
    title: "FinTech & Startups",
    label: "Fast Growth",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1000",
    desc: "Accelerate your career at innovative startups and fintech companies where you own features end-to-end from day one.",
    highlight: "Equity & growth roles",
    badge: "Hot Sector",
    modalContent: {
      about: "Startups operate at blistering speeds. You will wear multiple hats, push code daily, and work directly with founders.",
      companies: [
        { name: "Stripe", icon: SiStripe, domain: "stripe.com" },
        { name: "Razorpay", icon: Building2, domain: "razorpay.com" },
        { name: "Postman", icon: SiPostman, domain: "postman.com" },
        { name: "Zerodha", icon: Building2, domain: "zerodha.com" }
      ],
      surviving: "Extreme ownership is required. Move fast, break things, and fix them faster. Product thinking is just as important as code.",
      growth: "High",
      pathway: ["Founding Engineer", "Tech Lead", "VP Engineering", "CTO"]
    }
  },
  {
    title: "Embedded & IoT",
    label: "Hardware Meets Code",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    desc: "Build the future of smart devices. Work on microcontrollers, real-time systems, and industrial IoT applications.",
    highlight: "Niche, high-demand roles",
    badge: "Specialized",
    modalContent: {
      about: "Programming hardware directly. From consumer smart appliances to industrial robotics, you work at the hardware-software junction.",
      companies: [
        { name: "Intel", icon: SiIntel, domain: "intel.com" },
        { name: "Qualcomm", icon: SiQualcomm, domain: "qualcomm.com" },
        { name: "NVIDIA", icon: SiNvidia, domain: "nvidia.com" },
        { name: "Siemens", icon: SiSiemens, domain: "siemens.com" }
      ],
      surviving: "Master C, C++, and Rust. Understand memory management intrinsically. Optimized, bug-free code is non-negotiable.",
      growth: "Moderate",
      pathway: ["Firmware Engineer", "Embedded Systems Dev", "IoT Architect", "Systems Lead"]
    }
  },
];

export default function IndustrySectors() {
  const [active, setActive] = useState<number | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<Sector | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -380 : 380,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 py-24 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col gap-6 mb-14">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
              Where Our Alumni Work
            </div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-100 mb-4">
              Industry Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">Global Sectors</span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <p className="text-zinc-600 dark:text-zinc-400 text-lg font-medium max-w-2xl">
              Select any sector card to explore career opportunities our graduates have seized across the tech ecosystem.
            </p>
            <div className="flex gap-4 shrink-0">
              <button
                onClick={() => scroll("left")}
                className="h-12 w-12 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-emerald-500 transition-all text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 shadow-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="h-12 w-12 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-emerald-500 transition-all text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 shadow-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar"
        >
          {sectors.map((sector, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={i}
                layout
                onClick={() => setActive(isActive ? null : i)}
                animate={{ width: isActive ? 520 : 270, minWidth: isActive ? 520 : 270 }}
                transition={{ type: "spring", stiffness: 280, damping: 30 }}
                className="relative rounded-3xl overflow-hidden cursor-pointer snap-start shrink-0 select-none group"
                style={{ height: 420 }}
              >
                <img
                  src={sector.image}
                  alt={sector.title}
                  draggable={false}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isActive ? "scale-110" : "group-hover:scale-105"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
                    {sector.badge}
                  </span>
                </div>

                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-0 left-0 right-0 p-7 pointer-events-none"
                    >
                      <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-2">
                        {sector.label}
                      </p>
                      <h3 className="text-white font-bold text-2xl leading-none uppercase tracking-tight">
                        {sector.title}
                      </h3>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 16 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-4"
                    >
                      <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                        {sector.label}
                      </span>
                      <h3 className="text-white font-black text-3xl leading-none uppercase tracking-tighter">
                        {sector.title}
                      </h3>
                      <p className="text-zinc-300 text-sm leading-relaxed max-w-sm font-medium">
                        {sector.desc}
                      </p>
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">
                          ✦ {sector.highlight}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIndustry(sector);
                          }}
                          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-xs font-black uppercase transition-all hover:bg-emerald-400 shadow-lg"
                        >
                          Explore Guide <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Explore Strategy Modal */}
      <AnimatePresence>
        {selectedIndustry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedIndustry(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-[2.5rem] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden hide-scrollbar"
            >
              <div className="h-40 relative">
                <img src={selectedIndustry.image} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
                <button
                  onClick={() => setSelectedIndustry(null)}
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-zinc-950 transition-all z-[101]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 md:p-12 -mt-10 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-10 mb-10">
                  <div>
                    <div className="inline-flex px-3 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4 border border-emerald-500/20">
                      {selectedIndustry.label}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white leading-none uppercase tracking-tighter">
                      {selectedIndustry.title}
                    </h3>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Market Growth</p>
                      <p className="text-2xl font-black text-emerald-500 leading-none">{selectedIndustry.modalContent.growth}</p>
                    </div>
                    <div className="w-px h-10 bg-zinc-200 dark:bg-zinc-800" />
                    <div className="text-right">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Opportunity</p>
                      <p className="text-2xl font-black text-emerald-500 leading-none">{selectedIndustry.badge}</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-10">
                    <div>
                      <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-500" /> Executive Overview
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg font-medium">
                        {selectedIndustry.modalContent.about}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-500" /> Recruiting Titans
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedIndustry.modalContent.companies.map((company, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 group hover:border-emerald-500/30 transition-all cursor-pointer">
                            {company.icon ? <company.icon className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 transition-colors" /> : <Building2 className="w-4 h-4 text-zinc-400" />}
                            <span className="text-xs font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-tighter">{company.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div className="p-8 rounded-[2.5rem] bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10">
                      <h4 className="text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4" /> Selection Strategy
                      </h4>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-bold">
                        {selectedIndustry.modalContent.surviving}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Map className="w-4 h-4 text-emerald-500" /> Career Roadmap
                      </h4>
                      <div className="space-y-4">
                        {selectedIndustry.modalContent.pathway.map((step, i) => (
                          <div key={i} className="flex items-center gap-4 group">
                            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black shrink-0 transition-transform group-hover:scale-125">
                              {i + 1}
                            </div>
                            <div className="h-px flex-grow bg-zinc-200 dark:bg-zinc-800 group-hover:bg-emerald-500/50 transition-colors" />
                            <span className="text-[11px] font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
