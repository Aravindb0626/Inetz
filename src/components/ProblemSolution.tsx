"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle2, ArrowDown, MoveRight } from "lucide-react";

export default function ProblemSolution() {
  const problems = [
    "Struggling with technical rounds despite knowing the syntax? You need real-world placement training in Chennai.",
    "Watching endless tutorials but unable to build industry-scale projects from scratch? Theoretical learning has limits.",
    "Paying high fees for degrees and courses that don't teach modern tech stacks like MERN or Java Full Stack?",
    "Your portfolio lacks original, production-ready projects. Generic clones don't impress top tech recruiters anymore."
  ];

  const solutions = [
    "100% Guaranteed 'Build-from-Scratch' methodology for real internship training in Chennai.",
    "Direct 1-on-1 mentorship from Senior SDEs currently working in top-tier product companies.",
    "Master Full Stack Development by architecting scalable systems and dynamic user interfaces.",
    "Get your hands dirty with live deployments, cloud hosting (AWS/Azure), and CI/CD pipelines.",
    "Personalized career support, resume building, and placement training to bridge the corporate gap.",
    "Exclusive referral network to our hiring partners for high-paying software jobs in Chennai."
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

          <div className="text-center mb-12 mt-10 relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-medium mb-6">
              <span>Why Most Students Struggle</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-zinc-900 dark:text-white mb-6"
            >
              Courses alone are <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500">not enough.</span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto relative z-10">
            {problems.map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 600, damping: 20, delay: i * 0.05 }}
                className="group p-6 rounded-2xl bg-rose-50/30 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/30 hover:border-rose-400 hover:bg-rose-100/50 dark:hover:bg-rose-900/30 transition-all flex flex-col gap-4 shadow-sm hover:shadow-xl relative overflow-hidden cursor-crosshair"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none scale-150 group-hover:scale-100" />

                <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-900 flex items-center justify-center text-rose-500 border border-rose-200 dark:border-rose-800 shrink-0 group-hover:scale-105 group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition-all relative z-10 shadow-sm">
                  <XCircle className="w-5 h-5" />
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium leading-relaxed group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors relative z-10">
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

          <div className="text-center mb-16 relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium mb-6">
              <span>How iNetz Solves It</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-zinc-900 dark:text-white mb-4"
            >
              A real <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500">internship training system.</span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10">
            {solutions.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 600, damping: 20, delay: i * 0.05 }}
                className="group p-6 sm:p-8 rounded-2xl bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 hover:border-emerald-400 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30 transition-all duration-300 flex items-start gap-4 relative overflow-hidden cursor-pointer shadow-sm hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 scale-150 group-hover:scale-100 pointer-events-none" />

                <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-500 shrink-0 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all z-10 shadow-sm">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col justify-center pt-1.5 z-10">
                  <p className="text-zinc-700 dark:text-zinc-300 text-sm font-medium leading-relaxed group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold tracking-wide text-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Explore Our Programs
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <MoveRight className="w-4 h-4 ml-1" />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
