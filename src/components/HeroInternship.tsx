"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, ChevronRight, Star, ShieldCheck, Zap, Briefcase, GraduationCap } from "lucide-react";

const slides = [
  {
    type: "video",
    title: "Stop Learning Only in Theory. Start Building",
    highlight: "Real Projects",
    desc: "Join a project-driven internship program where students code daily, complete real tasks, work on practical applications, and gain the confidence to attend interviews.",
    media: "/intro-vdo.mp4",
  },
  {
    type: "image",
    title: "Fill your empty mind with",
    highlight: "positive thoughts",
    desc: "What do you want to learn?",
    media: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=1200", // Student with laptop/tablet vibe
  },
  {
    type: "image",
    title: "Fill your empty mind with",
    highlight: "positive thoughts",
    desc: "What do you want to learn?",
    media: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=1200", // Another student portrait
  }
];

export function HeroInternship() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered]);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  const currentSlide = slides[currentIndex];

  return (
    <section
      className="relative overflow-hidden min-h-[100dvh] lg:h-screen flex flex-col items-center justify-center py-20 lg:py-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_circle_at_15%_0%,rgba(249,115,22,0.28),transparent_55%),radial-gradient(800px_circle_at_90%_20%,rgba(59,130,246,0.22),transparent_55%),linear-gradient(to_bottom,rgba(255,255,255,0.9),rgba(255,255,255,0.7))] dark:bg-[radial-gradient(1200px_circle_at_15%_0%,rgba(249,115,22,0.18),transparent_55%),radial-gradient(800px_circle_at_90%_20%,rgba(59,130,246,0.16),transparent_55%),linear-gradient(to_bottom,rgba(10,10,10,0.82),rgba(10,10,10,0.65))]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 min-h-[66vh]">

          {/* ── Left Content ── */}
          <div className="flex flex-col justify-center h-full lg:h-full lg:min-h-[66vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
                  {currentSlide.title}
                  <span className="block bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500 bg-clip-text text-transparent">
                    {currentSlide.highlight}
                  </span>
                </h1>
                <p className="max-w-prose text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {currentSlide.desc}
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <a href="/programs" className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-bold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-lg hover:scale-105 active:scale-95">View all courses</a>
                  <a href="/contact" className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-8 text-sm font-bold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-100 dark:hover:bg-zinc-900/30 shadow-md hover:scale-105 active:scale-95">Request a call</a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Right Content ── */}
          <div className="relative h-[450px] sm:h-[500px] lg:h-full lg:min-h-[66vh] group/right">
            {/* Outer glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[3rem] bg-gradient-to-r from-orange-500/25 via-sky-500/20 to-fuchsia-500/20 blur-xl opacity-70 group-hover/right:opacity-100 transition-opacity duration-500"
            />
            {/* Pulse ring */}
            <div
              aria-hidden="true"
              className="absolute -inset-1 rounded-[2.4rem] border-2 border-orange-400/30 animate-pulse"
            />

            {/* Card wrapper */}
            <div className="relative h-full rounded-[2rem] border border-zinc-200 bg-white/70 p-3 shadow-xl backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/45 flex flex-col transition-all duration-500">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  className="relative flex-1 overflow-hidden rounded-[1.4rem] min-h-0"
                >
                  {/* SLIDE TYPE: VIDEO */}
                  {currentSlide.type === "video" && (
                    <div className="relative h-full w-full bg-black group">
                      <video
                        ref={videoRef}
                        src={currentSlide.media}
                        muted
                        autoPlay
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 h-full w-full object-cover rounded-[1.4rem]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-[1.4rem]" />
                      <div className="absolute left-3 top-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          Live Training
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-lg backdrop-blur transition-all duration-200 group-hover:scale-110 ${playing ? "opacity-0" : "opacity-100"}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 translate-x-0.5"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </button>
                    </div>
                  )}

                  {/* SLIDE TYPE: IMAGE */}
                  {currentSlide.type === "image" && (
                    <div className="relative h-full w-full bg-zinc-100 dark:bg-zinc-900">
                      <img
                        src={currentSlide.media}
                        className="absolute inset-0 h-full w-full object-cover rounded-[1.4rem]"
                        alt="Mentorship"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-[1.4rem]" />
                      <div className="absolute left-3 top-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur uppercase tracking-widest">
                          Expert Guidance
                        </span>
                      </div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <h4 className="text-white font-black text-xl uppercase tracking-tighter leading-none">Industrial Mentorship</h4>
                      </div>
                    </div>
                  )}

                  {/* SLIDE TYPE: FORM */}
                  {currentSlide.type === "form" && (
                    <div className="h-full w-full bg-zinc-50 dark:bg-zinc-950 p-6 flex flex-col">
                      <div className="mb-6">
                        <h3 className="text-zinc-900 dark:text-white font-black text-2xl uppercase tracking-tighter mb-1">Reserve Your Seat</h3>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Limited spots for batch 2024</p>
                      </div>

                      <div className="space-y-4">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                          <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors dark:text-white"
                          />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                          <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors dark:text-white"
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                          <input
                            type="tel"
                            placeholder="Contact Number"
                            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors dark:text-white"
                          />
                        </div>

                        <button className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                          Submit Application
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="mt-auto text-[10px] text-zinc-400 text-center font-bold uppercase tracking-widest">
                        Join 2000+ engineers today
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Manual Dot Navigation - Premium Indicators */}
        <div className="mt-12 flex items-center justify-center gap-4 relative z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="group relative flex items-center justify-center p-2 transition-all"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`transition-all duration-500 rounded-full cursor-pointer ${currentIndex === index
                  ? "w-10 h-2 bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                  : "w-2.5 h-2.5 bg-zinc-300 dark:bg-zinc-800 group-hover:bg-zinc-400 group-hover:scale-110"
                  }`}
              />
              {currentIndex === index && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute inset-0 rounded-full bg-orange-500/10 blur-md scale-[2.5]"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
