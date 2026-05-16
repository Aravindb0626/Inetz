"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, ChevronRight, Star, ShieldCheck, Zap, Briefcase, GraduationCap } from "lucide-react";
import { Counter } from "@/components/ui/Counter";

const slides = [
  {
    type: "video",
    title: "Stop Learning Only in Theory. Start Building ",
    highlight: "Real-Time Projects",
    desc: "Join a project-driven internship program where students code daily, complete real tasks, work on practical applications, and gain the confidence to attend interviews.",
    media: "/intro-vdo.mp4",
  },
  {
    type: "image",
    title: "Learn. Practice. Build.",
    highlight: "Get Ready for Your Career",
    desc: "Inetz Technologies is the best software training institute in Chennai, offering specialized internship programs for freshers and college students.",
    media: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=1200",
  },
  {
    type: "image",
    title: "Learn Beyond the Classroom.",
    highlight: "Positive Thoughts",
    desc: "Get real-world development experience through project-based internship programs built for future software professionals at Inetz Technologies.",
    media: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=1200",
  }
];

export function HeroInternship() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = slides.length - 1;
      if (nextIndex >= slides.length) nextIndex = 0;
      return nextIndex;
    });
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
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
      className="relative min-h-[110dvh] lg:h-screen flex flex-col items-center justify-center py-20 lg:py-0 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_15%_0%,rgba(249,115,22,0.28),transparent_55%),radial-gradient(800px_circle_at_90%_20%,rgba(59,130,246,0.22),transparent_55%),linear-gradient(to_bottom,rgba(255,255,255,0.9),rgba(255,255,255,0.7))] dark:bg-[radial-gradient(1200px_circle_at_15%_0%,rgba(249,115,22,0.18),transparent_55%),radial-gradient(800px_circle_at_90%_20%,rgba(59,130,246,0.16),transparent_55%),linear-gradient(to_bottom,rgba(10,10,10,0.82),rgba(10,10,10,0.65))]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 min-h-[66vh]">

          {/* ── Left Content ── */}
          <div className="flex flex-col justify-center h-full lg:h-full lg:min-h-[66vh]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
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
                <div className="flex flex-wrap gap-4 pt-16">
                  <a href="/programs" className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-bold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-lg hover:scale-105 active:scale-95">View all courses</a>
                  <a href="/contact" className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-8 text-sm font-bold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-100 dark:hover:bg-zinc-900/30 shadow-md hover:scale-105 active:scale-95">Request a call</a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Right Content ── */}
          <div className="relative h-[450px] sm:h-[500px] lg:h-full lg:min-h-[66vh]">
            {/* Card wrapper */}
            <div className="relative h-full rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 flex flex-col transition-shadow duration-500 hover:shadow-md group">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0.5 }}
                    animate={{ x: "0%", opacity: 1 }}
                    exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0.5 }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute inset-0 flex-1 min-h-0"
                  >
                    {/* SLIDE TYPE: VIDEO */}
                    {currentSlide.type === "video" && (
                      <div className="relative h-full w-full bg-black group/video">
                        <video
                          ref={videoRef}
                          src={currentSlide.media}
                          muted
                          autoPlay
                          loop
                          playsInline
                          preload="metadata"
                          className="absolute inset-0 h-full w-full object-cover rounded-2xl"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl" />
                        <div className="absolute left-6 top-6">
                          <span className="inline-flex items-center gap-1.5 rounded bg-white/10 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-md border border-white/20">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
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
                      <div className="relative h-full w-full bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden">
                        <img
                          src={currentSlide.media}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[10s] hover:scale-105"
                          alt="Mentorship"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute left-6 top-6">
                          <span className="inline-flex items-center gap-1.5 rounded bg-white/10 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-md border border-white/20 uppercase tracking-widest">
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
        </div>

        {/* Manual Dot Navigation - Premium Indicators */}
        <div className="mt-6 mb-16 flex items-center justify-center gap-3 relative z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className="group relative flex items-center justify-center p-2 transition-all outline-none"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`transition-all duration-300 rounded cursor-pointer ${currentIndex === index
                  ? "w-8 h-1.5 bg-zinc-900 dark:bg-white"
                  : "w-2 h-1.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600"
                  }`}
              />
            </button>
          ))}
        </div>

        {/* 6 Grid Stat Boxes - Matching Uploaded Image Style Overlapping 2 Sections */}
        <div className="absolute -bottom-[90px] left-0 right-0 z-40 w-full pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto hide-scrollbar pointer-events-auto pb-6 pt-4">
            <div className="flex justify-start lg:justify-center items-center gap-4 sm:gap-6 min-w-max">
              {[
                { val: 200, suffix: "+", label: "Partner Companies" },
                { val: 90, suffix: "%", label: "Placement Rate" },
                { val: 1500, suffix: "+", label: "Professionals Placed" },
                // { val: 50, suffix: "+", label: "Expert Mentors" },
                { val: 100, suffix: "+", label: "Live Projects" },
                { val: 24, suffix: "/7", label: "Career Support" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-zinc-900 rounded-2xl w-[140px] sm:w-[160px] h-[110px] sm:h-[130px] flex flex-col items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-zinc-100/50 dark:border-zinc-800 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/40"
                >
                  <div className="text-3xl sm:text-4xl font-black mb-1 sm:mb-2 text-[#A7825A] dark:text-[#C59B6D] tracking-tight flex justify-center items-center">
                    <Counter to={stat.val} />{stat.suffix}
                  </div>
                  <div className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium px-2 text-center leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
