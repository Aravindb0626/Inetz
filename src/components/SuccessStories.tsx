"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Arjun Sharma",
    role: "Software Engineer",
    company: "Zoho",
    text: "The real-time project experience at Inetz helped me clear my technical rounds at Zoho effortlessly. Highly recommended!",
    image: "/thumbImg2.jpeg",
    border: "border-amber-500/40",
    roleColor: "text-amber-600",
  },
  {
    name: "Priya Verma",
    role: "Full Stack Architect",
    company: "Infosys",
    text: "Excellent mentors who explain concepts with real-world scenarios. The placement support is genuine and active.",
    image: "/thunbImg3.jpeg",
    border: "border-indigo-500/40",
    roleColor: "text-indigo-600",
  },
  {
    name: "Rahul Das",
    role: "Java Tech Lead",
    company: "TCS",
    text: "Flexible timings allowed me to manage college while gaining professional skills. Truly the best in Chennai!",
    image: "/student.jpeg",
    border: "border-emerald-500/40",
    roleColor: "text-emerald-600",
  },
  {
    name: "Sowmya Reddy",
    role: "UI/UX Designer",
    company: "Freshworks",
    text: "The design immersive program at Inetz changed my perspective on user-centric design. Got placed with an amazing package!",
    image: "/student.jpeg",
    border: "border-rose-500/40",
    roleColor: "text-rose-600",
  },
  {
    name: "Karthik Raja",
    role: "Data Scientist",
    company: "Amazon",
    text: "Comprehensive curriculum and hands-on ML projects. The mock interviews were incredibly close to the actual process.",
    image: "/student.jpeg",
    border: "border-sky-500/40",
    roleColor: "text-sky-600",
  },
  {
    name: "Anitha Krish",
    role: "DevOps Engineer",
    company: "Accenture",
    text: "Mastered Docker, K8s and CI/CD pipelines here. The instructors are industry veterans who know exactly what's needed.",
    image: "  https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    border: "border-violet-500/40",
    roleColor: "text-violet-600",
  },
  {
    name: "Vignesh Kumar",
    role: "Cloud Architect",
    company: "Google Cloud",
    text: "High-quality infrastructure and specialized labs. Passing my AWS certification was a breeze after the training.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    border: "border-blue-500/40",
    roleColor: "text-blue-600",
  },
  {
    name: "Deepa Mani",
    role: "MERN Developer",
    company: "Cognizant",
    text: "Focused mentorship help me build a strong portfolio. I received multiple offers within a month of completion.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    border: "border-teal-500/40",
    roleColor: "text-teal-600",
  },
  {
    name: "Siddharth Nair",
    role: "Python Specialist",
    company: "HCL",
    text: "The Python track is very well structured. Building a complete automation suite for my final project was the highlight.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    border: "border-orange-500/40",
    roleColor: "text-orange-600",
  },
];

export default function SuccessStories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 450;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Section className="bg-white dark:bg-zinc-950 py-24 overflow-hidden relative">
      {/* Premium dark mode glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full hidden dark:block" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full hidden dark:block" />

      <div className="flex flex-col gap-6 mb-16 px-6 max-w-[1400px] mx-auto relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
            Success Stories
          </div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-100 mb-4">
            Our Students <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500">Success Stories</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-zinc-600 dark:text-zinc-400 text-lg font-medium max-w-2xl">
            Join 5000+ professionals who transformed their careers with Inetz Technologies. Explore their journeys and envision your future.
          </p>
          <div className="flex gap-4 shrink-0">
            <button
              onClick={() => scroll("left")}
              className="h-12 w-12 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-emerald-500 transition-all text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 shadow-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="h-12 w-12 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-emerald-500 transition-all text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 shadow-sm"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar pb-12 px-6 max-w-[1400px] mx-auto snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="min-w-[85%] sm:min-w-[45%] lg:min-w-[calc(33.333%-1rem)] snap-start group"
          >
            <Card className={cn(
              "p-0 border bg-white dark:bg-zinc-900/50 rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.1)] transition-all duration-500",
              item.border
            )}>
              {/* Image Area */}
              <div className="relative h-[280px] m-4 overflow-hidden rounded-[1.5rem] bg-zinc-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                
                {/* Review Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                  <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white/10">
                    <p className="text-xs font-bold text-zinc-800 dark:text-zinc-100 leading-relaxed italic">
                      "{item.text}"
                    </p>
                  </div>
                </div>

                {/* Gradient fallback */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Info Area */}
              <div className="px-8 pb-8 pt-2 text-center">
                <h4 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mb-1 transition-colors group-hover:text-orange-500">
                  {item.name}
                </h4>
                <p className="text-xs font-bold text-orange-500 uppercase tracking-widest">
                  {item.role} @ {item.company}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </Section>
  );
}