"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle2, ArrowDown, MoveRight } from "lucide-react";

export default function ProblemSolution() {
  const problems = [
    "Watching endless tutorials but unable to write code from scratch.",
    "Paying lakhs for degrees that don't teach modern industry tech stacks.",
    "Projects are strictly cloned from YouTube, lacking original architecture.",
    "Struggling to clear technical rounds even after learning language syntax."
  ];

  const solutions = [
    "100% Guaranteed Build-from-Scratch engineering methodology",
    "Direct continuous mentorship from actual industry Senior Engineers",
    "Architecting highly scalable backend & dynamic frontend systems",
    "Live server deployments, cloud hosting, and robust CI/CD pipelines",
    "Personalized engineering resume & elite GitHub portfolio building",
    "Exclusive Hiring-partner referral network and placement assistance"
  ];

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden transition-colors duration-500 isolate">
      {/* Multi-layered Vibrant Gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_circle_at_50%_-10%,rgba(244,63,194,0.2),transparent_65%),radial-gradient(800px_circle_at_100%_40%,rgba(59,130,246,0.15),transparent_60%),radial-gradient(1000px_circle_at_50%_110%,rgba(16,185,129,0.18),transparent_65%),linear-gradient(to_bottom,rgba(255,255,255,0.97),rgba(255,255,255,0.92))] dark:bg-[radial-gradient(1000px_circle_at_50%_-10%,rgba(244,63,94,0.12),transparent_65%),radial-gradient(800px_circle_at_100%_40%,rgba(99,102,241,0.12),transparent_60%),radial-gradient(1000px_circle_at_50%_110%,rgba(16,185,129,0.1),transparent_65%),linear-gradient(to_bottom,rgba(9,9,11,0.92),rgba(9,9,11,0.85))]"
      />
      <div className="absolute top-0 right-0 w-full h-[50vh] bg-gradient-to-b from-rose-500/5 dark:from-rose-950/20 to-transparent pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-emerald-500/5 dark:from-emerald-950/20 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 w-full flex flex-col items-center">
        
        {/* Phase 1: The Struggle */}
        <div className="w-full mb-16 relative">
          <div className="absolute inset-0 bg-rose-500/5 blur-[100px] pointer-events-none" />
          
          <div className="text-center mb-12 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest mb-6">
              Why Most Students Struggle
            </div>
            <h2 className="text-balance text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
              Courses alone are <span className="text-rose-500 underline decoration-rose-500/30 underline-offset-8">not enough.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto relative z-10">
            {problems.map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.03 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 400, damping: 25, delay: i * 0.1 }}
                className="group p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/50 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-all flex flex-col gap-4 shadow-xl backdrop-blur-md cursor-crosshair overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none scale-150 group-hover:scale-100" />
                
                <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20 shrink-0 group-hover:scale-110 group-hover:bg-rose-500/20 transition-all relative z-10">
                  <XCircle className="w-5 h-5 text-rose-500" />
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium leading-relaxed group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors relative z-10">
                  {problem}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Transition Axis */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="my-10 relative z-20 flex flex-col items-center group"
        >
          <motion.div 
            className="w-[1px] h-16 bg-gradient-to-b from-rose-500/50 via-zinc-700 to-emerald-500/50 group-hover:from-rose-400 group-hover:to-emerald-400 transition-colors duration-500" 
          />
          <motion.div 
            whileHover={{ scale: 1.25, rotate: 180 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-14 h-14 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.15)] z-10 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:border-emerald-500/50 hover:shadow-[0_0_50px_rgba(52,211,153,0.4)] transition-all"
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowDown className="w-6 h-6 text-emerald-400" />
            </motion.div>
          </motion.div>
          <motion.div 
            className="w-[1px] h-16 bg-gradient-to-b from-emerald-500/50 via-zinc-700 to-transparent group-hover:from-emerald-400 transition-colors duration-500" 
          />
        </motion.div>

        {/* Phase 2: The Solution */}
        <div className="w-full relative">
          <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] pointer-events-none" />
          
          <div className="text-center mb-16 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
              How iNetz Solves It
            </div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-zinc-900 dark:text-white mb-6">
              How iNetz Solves It <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500 font-bold">A real internship training system.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10">
            {solutions.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.03 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 400, damping: 25, delay: i * 0.1 }}
                className="group p-8 rounded-[2rem] bg-white/70 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/60 hover:shadow-[0_0_40px_rgba(52,211,153,0.25)] hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all duration-300 flex items-start gap-5 relative overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150 group-hover:scale-100 pointer-events-none" />
                
                <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center border border-zinc-100 dark:border-zinc-800 group-hover:border-emerald-500/50 shrink-0 group-hover:bg-emerald-500/10 transition-colors z-10">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="flex flex-col justify-center pt-2 z-10">
                  <p className="text-zinc-700 dark:text-zinc-200 font-medium text-md leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-50 transition-colors">
                    {solution}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex justify-center mt-16 relative z-20"
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/programs" 
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500 text-white font-black uppercase tracking-widest text-sm hover:shadow-[0_20px_40px_-10px_rgba(249,115,22,0.4)] transition-all cursor-pointer group"
            >
              Explore Our Programs 
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
