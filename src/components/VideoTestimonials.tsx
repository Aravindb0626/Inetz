"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Quote, ArrowRight, User, Briefcase } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type VideoTestimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  thumbnail: string;
  videoUrl: string;
  previewText: string;
  year: string;
};

const videoTestimonials: VideoTestimonial[] = [
  {
    id: "v1",
    name: "Aravind Kumar",
    role: "Full Stack Developer",
    company: "TCS",
    thumbnail: "/thumbImg.jpeg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder
    previewText: "The mentorship at Inetz is industry-grade. I learned how to build production-scale apps from scratch.",
    year: "Batch of 2024"
  },
  {
    id: "v2",
    name: "Sneha Reddy",
    role: "Senior UI Designer",
    company: "Freshworks",
    thumbnail: "/thumbImg.jpeg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder
    previewText: "The internship process is unique. We work on real-world case studies that companies actually use.",
    year: "Batch of 2023"
  },
  {
    id: "v3",
    name: "David Miller",
    role: "Data Scientist",
    company: "Cognizant",
    thumbnail: "/thumbImg.jpeg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder
    previewText: "Transitioning into Data Science was hard until I joined the specialized track here. The curriculum is tight.",
    year: "Batch of 2024"
  }
];

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);

  return (
    <Section className="bg-zinc-50 dark:bg-zinc-950 transition-colors py-24 sm:py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            Voices of Impact
          </motion.div>
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-100 mb-4">
            Hear it from <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500">Our Students</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg font-medium max-w-2xl mx-auto">
             Real-world career transformations narrated by the students who lived them.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {videoTestimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div 
                onClick={() => setActiveVideo(testimonial)}
                className="relative aspect-[4/5] rounded-[3rem] overflow-hidden cursor-pointer bg-zinc-200 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-500 group-hover:shadow-[0_40px_80px_-15px_rgba(16,185,129,0.2)] group-hover:-translate-y-2"
              >
                {/* Thumbnail */}
                <img 
                  src={testimonial.thumbnail} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt={testimonial.name}
                />

                {/* Glass Overlays */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-[2rem] text-white">
                    <p className="text-xs font-bold mb-4 line-clamp-2 italic opacity-90 leading-relaxed">
                      "{testimonial.previewText}"
                    </p>
                    <div className="flex items-center justify-between">
                       <div>
                         <h4 className="text-lg font-black tracking-tight">{testimonial.name}</h4>
                         <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                           {testimonial.role}
                         </p>
                       </div>
                       <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
                         <Play className="w-4 h-4 fill-white" />
                       </div>
                    </div>
                  </div>
                </div>

                {/* Top Badge */}
                <div className="absolute top-6 right-6">
                   <div className="px-3 py-1.5 rounded-full bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border border-white/20 text-zinc-900 dark:text-white text-[9px] font-black uppercase tracking-widest shadow-xl">
                      {testimonial.year}
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex justify-center"
        >
          <button className="group flex items-center gap-4 px-10 py-5 rounded-full bg-emerald-600 text-white font-black uppercase tracking-widest text-xs hover:bg-emerald-700 hover:scale-105 transition-all shadow-xl shadow-emerald-500/20">
             View More Success Stories 
             <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-xl"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-video rounded-[3rem] overflow-hidden bg-black shadow-2xl"
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <video 
                src={activeVideo.videoUrl} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />

              <div className="absolute bottom-10 left-10 p-8 rounded-[2.5rem] bg-black/40 backdrop-blur-md border border-white/10 max-w-md hidden md:block">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center">
                       <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                       <h4 className="text-xl font-black text-white">{activeVideo.name}</h4>
                       <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                          <Briefcase className="w-3 h-3" /> {activeVideo.role} @ {activeVideo.company}
                       </div>
                    </div>
                 </div>
                 <p className="text-zinc-400 text-sm font-medium leading-relaxed italic">
                   "{activeVideo.previewText}"
                 </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
