"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TechStack, catalogItems } from "@/lib/program-data";
import CourseCard from "@/components/programs/courseCard";
import InternshipPrograms from "@/components/programs/programDetails";
import { Sparkles, ArrowLeft } from "lucide-react"; 
import Image from "next/image"; 
import backgroundAsset from "../../../public/programs.png"; 

const ProgramsMainPage = () => {
  const [selectedStack, setSelectedStack] = useState<TechStack | null>(null);

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedStack]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <AnimatePresence mode="wait">
        {!selectedStack ? (
          <motion.div
            key="catalog"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            // Balanced top padding
            className="max-w-7xl mx-auto px-6"
          >
            {/* --- Seamless Professional Header --- */}
            <div className="relative w-full overflow-hidden mb-10 lg:mb-16">
              {/* 1. Background Image Layer */}
              <div className="absolute inset-0 z-0">
                <motion.div
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }} // 30% Opacity for professional depth
                  transition={{ duration: 1.2 }}
                  className="w-full h-full"
                >
                  <Image
                    src={backgroundAsset}
                    alt="Programs Background"
                    fill
                    priority
                    className="object-cover" 
                  />
                </motion.div>

                {/* 2. Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white to-white dark:from-zinc-950/60 dark:via-zinc-950 dark:to-zinc-950" />
              </div>

              {/* 3. Content Layer */}
              <div className="relative z-10 text-center max-w-4xl mx-auto pt-10 pb-6 lg:pt-16 lg:pb-10 px-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Industry Ready Internships
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white tracking-tighter leading-[0.9] mb-6 uppercase">
                  Elevate Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
                    Professional
                  </span>{" "}
                  Career
                </h1>
                {/* --- Typographic Quote (Minimalist) --- */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-lg mx-auto border-t border-zinc-100 dark:border-zinc-800 pt-8"
                >
                  <p className="text-sm md:text-base italic font-bold text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    "Stop searching for jobs—start building the skills they
                    search for. Your first professional commit starts here."
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <div className="h-px w-8 bg-emerald-500/30" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-500">
                      Success Mindset
                    </span>
                    <div className="h-px w-8 bg-emerald-500/30" />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* --- Programs Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {catalogItems.map((item, index) => (
                <motion.div
                  key={item.stack}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CourseCard
                    {...item}
                    onSelect={(stack) => setSelectedStack(stack)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* Overlay Back Button */}

            <InternshipPrograms
              initialStack={selectedStack}
              onBack={() => setSelectedStack(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProgramsMainPage;