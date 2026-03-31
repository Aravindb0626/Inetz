"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const sectors = [
  {
    title: "Product Companies",
    label: "Top-Tier Products",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
    desc: "Work at cutting-edge product-based companies as a Software Developer, building real-world applications at scale.",
    highlight: "500+ alumni placed",
    badge: "Most Placed",
  },
  {
    title: "IT Services & Consulting",
    label: "Enterprise IT",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
    desc: "Join top IT service companies delivering technology solutions across banking, retail, and enterprise clients globally.",
    highlight: "Leading MNC placements",
    badge: "High Demand",
  },
  {
    title: "AI & Data Science",
    label: "Future of Tech",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1000",
    desc: "Step into the fast-growing AI, ML and Data Analytics space. Work on real datasets and intelligent systems.",
    highlight: "Highest salary bracket",
    badge: "Trending",
  },
  {
    title: "Startups & FinTech",
    label: "Fast Growth",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1000",
    desc: "Accelerate your career at innovative startups and fintech companies where you own features end-to-end from day one.",
    highlight: "Equity & growth roles",
    badge: "Hot Sector",
  },
  {
    title: "Embedded & IoT",
    label: "Hardware Meets Code",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    desc: "Build the future of smart devices. Work on microcontrollers, real-time systems, and industrial IoT applications.",
    highlight: "Niche, high-demand roles",
    badge: "Specialized",
  },
  {
    title: "Digital Marketing",
    label: "Brand & Growth",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    desc: "Drive digital strategy, SEO, paid media, and analytics for leading brands across industries.",
    highlight: "Creative + technical roles",
    badge: "Cross-Industry",
  },
];

export default function IndustrySectors() {
  const [active, setActive] = useState<number | null>(null);
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
    <section className="bg-zinc-50 dark:bg-zinc-950 py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">

        <div className="flex flex-col gap-6 mb-14">
          {/* Centered Badge + Heading */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
              Where Our Alumni Work
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
              Industry Domains <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-emerald-400">You&apos;ll Break Into</span>
            </h2>
          </div>

          {/* Description + Nav Buttons row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <p className="text-zinc-600 dark:text-zinc-400 text-lg font-medium max-w-2xl">
              Click any sector card to explore career opportunities our graduates have seized across the tech ecosystem.
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

        {/* Horizontal Scroll Cards */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {sectors.map((sector, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={i}
                layout
                onClick={() => setActive(isActive ? null : i)}
                animate={{ width: isActive ? 520 : 300, minWidth: isActive ? 520 : 300 }}
                transition={{ type: "spring", stiffness: 280, damping: 30 }}
                className="relative rounded-[2rem] overflow-hidden cursor-pointer snap-start shrink-0 select-none group"
                style={{ height: 450 }}
              >
                {/* Background Image */}
                <img
                  src={sector.image}
                  alt={sector.title}
                  draggable={false}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isActive ? "scale-110" : "group-hover:scale-105"}`}
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                {/* Badge top-left */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest">
                    {sector.badge}
                  </span>
                </div>

                {/* Collapsed state — label at bottom */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-0 left-0 right-0 p-7"
                    >
                      <p className="text-white/55 text-[10px] font-bold uppercase tracking-widest mb-2">
                        {sector.label}
                      </p>
                      <h3 className="text-white font-bold text-2xl leading-snug">
                        {sector.title}
                      </h3>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded state — rich content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 16 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-4"
                    >
                      <span className="text-white/55 text-[10px] font-bold uppercase tracking-widest">
                        {sector.label}
                      </span>
                      <h3 className="text-white font-black text-3xl leading-tight">
                        {sector.title}
                      </h3>
                      <p className="text-white/75 text-sm leading-relaxed max-w-sm">
                        {sector.desc}
                      </p>
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-emerald-400 text-xs font-bold">
                          ✦ {sector.highlight}
                        </span>
                        <Link
                          href="/programs"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 backdrop-blur text-white text-xs font-bold hover:bg-emerald-500 transition-colors"
                        >
                          Explore <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* <p className="text-center text-zinc-400 dark:text-zinc-600 text-sm mt-4 italic">
          Use the arrows or scroll to explore all sectors · Click a card to expand
        </p> */}
      </div>
    </section>
  );
}
