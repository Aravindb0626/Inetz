"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { Section } from "@/components/ui/Section";
import Script from "next/script";

type VideoTestimonial = {
  id: string;
  name: string;
  thumbnail: string;
  videoUrl: string;
  year: string;
};

const videoTestimonials: VideoTestimonial[] = [
  {
    id: "v1",
    name: "Harshini",
    thumbnail: "/thumbnail/studentthumbnail1.png",
    videoUrl: "https://www.instagram.com/reel/DOLsgFfCZbC/",
    year: "Batch of 2022"
  },
  {
    id: "v2",
    name: "Sneha Reddy",
    thumbnail: "/thumbnail/studentthumbnail2.png",
    videoUrl: "https://www.instagram.com/reel/DOWMXssiYhA/",
    year: "Batch of 2023",
  },
  {
    id: "v3",
    name: "Amjath Khan",
    thumbnail: "/thumbnail/studentthumbnail3.png  ",
    videoUrl: "https://www.instagram.com/reel/DW3S55Jk5ub/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    year: "Batch of 2024",
  }
];

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);

  useEffect(() => {
    if (activeVideo?.videoUrl.includes("instagram.com")) {
      const timer = setTimeout(() => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeVideo]);

  return (
    <>
      <Script src="https://www.instagram.com/embed.js" strategy="afterInteractive" />

      <Section className="bg-white dark:bg-[#080808] py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-100 mb-4"
          >
            Hear it from <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500">Our Students</span>
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
          {videoTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              onClick={() => setActiveVideo(testimonial)}
              className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
            >
              <img
                src={testimonial.thumbnail}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt={testimonial.name}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Play className="text-white fill-current w-5 h-5 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/98 backdrop-blur-xl"
              onClick={() => setActiveVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`relative w-full flex flex-col items-center ${activeVideo.videoUrl.includes("instagram.com")
                    ? "max-w-[400px]"
                    : "max-w-5xl"
                  }`}
              >
                <button
                  onClick={() => setActiveVideo(null)}
                  className="absolute -top-12 right-0 md:-right-12 text-white/70 hover:text-white transition-colors p-2"
                >
                  <X className="w-8 h-8" />
                </button>

                <div className="w-full max-h-[99vh] flex justify-center items-start overflow-y-auto scrollbar-hide">
                  {activeVideo.videoUrl.includes("instagram.com") ? (
                    <div className="w-full">
                      <blockquote
                        className="instagram-media"
                        data-instgrm-permalink={activeVideo.videoUrl}
                        data-instgrm-version="14"
                        style={{
                          width: '100%',
                          border: 'none',
                          borderRadius: '16px',
                          margin: '0 auto',
                          background: 'white'
                        }}
                      ></blockquote>
                    </div>
                  ) : (
                    <video
                      src={activeVideo.videoUrl}
                      controls
                      autoPlay
                      className="w-full rounded-xl shadow-2xl bg-black max-h-[75vh]"
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </>
  );
}

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}