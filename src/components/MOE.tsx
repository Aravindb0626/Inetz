"use client";

import { motion } from "framer-motion";
import { 
  Building2,
  Target,
  GraduationCap,
  Network
} from "lucide-react";
import { Section } from "@/components/ui/Section";

const moeAdvantages = [
  {
    title: "Applied Skill Labs",
    desc: "We co-establish high-tech centers of excellence directly within campus premises.",
    icon: Building2
  },
  {
    title: "The Skill Delta",
    desc: "Curriculum structurally redesigned to bridge the gap between academia and industry.",
    icon: Target
  },
  {
    title: "Placement Bridge",
    desc: "Direct recruitment pipelines integrating with our 500+ global hiring partners.",
    icon: GraduationCap
  }
];

const institutionalPartners = [
  "Indian Institute of Technology", 
  "Anna University", 
  "VIT University", 
  "SRM Institute", 
  "BMS College of Engineering", 
  "JNTU Hyderabad",
  "College of Engineering Guindy", 
  "PSG Tech", 
  "Amrita Vishwa Vidyapeetham",
  "NIT Trichy", 
  "SASTRA University", 
  "SSN College of Engineering"
];

export function MOESection() {
  return (
    <Section className="relative bg-zinc-50/50 dark:bg-zinc-950/50 py-24" maxWidth="xl">
      {/* Refined Background Gradients to match Hero but subtly scaled down */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_circle_at_15%_0%,rgba(249,115,22,0.05),transparent_55%),radial-gradient(800px_circle_at_90%_20%,rgba(59,130,246,0.05),transparent_55%),linear-gradient(to_bottom,rgba(255,255,255,1),rgba(255,255,255,0.8))] dark:bg-[radial-gradient(1000px_circle_at_15%_0%,rgba(249,115,22,0.05),transparent_55%),radial-gradient(800px_circle_at_90%_20%,rgba(59,130,246,0.05),transparent_55%),linear-gradient(to_bottom,rgba(10,10,10,1),rgba(10,10,10,0.8))]"
      />

      <div className="relative z-10 w-full flex flex-col">
        
        {/* Sleek, Professional Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16 lg:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-white/50 dark:border-zinc-800 dark:bg-zinc-900/50 mb-6 backdrop-blur">
                <Network className="w-4 h-4 text-orange-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-锌-100">Institutional Network</span>
            </div>
            <h2 className="text-balance text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
                Strategic MOE <br className="lg:hidden" />
                <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500 bg-clip-text text-transparent">
                    Academic Partnerships
                </span>
            </h2>
            <p className="max-w-2xl text-sm sm:text-base leading-6 text-zinc-600 dark:text-zinc-300">
                Transforming theoretical foundations into industrial mastery. Our Memorandum of Engagement embeds industry-standard curriculum directly onto campus premises.
            </p>
        </div>

        {/* Modern Bento-Box Architecture */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column (8 cols): Advantage Grid */}
          <div className="col-span-1 lg:col-span-8 flex flex-col gap-6 lg:gap-8">
            
            {/* Featured Hero Card */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 group h-64 sm:h-80"
            >
              <div className="relative h-full w-full rounded-[1.8rem] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1541339907198-e08756ebafe1?auto=format&fit=crop&q=80&w=1200" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt="Academic Infrastructure"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-2">
                        The Infrastructure of Excellence
                    </h3>
                    <p className="text-sm text-zinc-300 max-w-lg leading-relaxed">
                        We invest directly into college ecosystems, building the physical and digital labs necessary for elite engineering.
                    </p>
                </div>
              </div>
            </motion.div>

            {/* 3 Advantage Cards Grid */}
            <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
                {moeAdvantages.map((item, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        key={i} 
                        className="flex flex-col gap-4 p-6 sm:p-8 rounded-[2rem] border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                    >
                        <div className="w-12 h-12 rounded-full border border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50 flex items-center justify-center text-zinc-900 dark:text-zinc-100 shadow-sm">
                            <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white mb-2">{item.title}</h4>
                            <p className="text-sm leading-6 text-zinc-500 dark:text-zinc-400">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
          </div>

          {/* Right Column (4 cols): Sleek Vertical List */}
          <div className="col-span-1 lg:col-span-4 relative h-[400px] lg:h-auto min-h-0 rounded-[2rem] border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden block">
             
             {/* Component Header (Remains in-flow to take up space) */}
             <div className="flex items-center justify-between p-6 sm:p-8 pb-5 border-b border-zinc-100 dark:border-zinc-800/50 z-20 bg-white dark:bg-zinc-900/50 shadow-[0_10px_10px_-10px_rgba(0,0,0,0.05)] relative w-full h-[88px]">
                 <h4 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white">Active MOU Partners</h4>
                 <div className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                    Trusted by 50+
                 </div>
             </div>

             {/* Out of flow elements below: */}
             {/* Fade masks for elegant scrolling */}
             <div className="absolute top-[88px] left-0 right-0 h-10 bg-gradient-to-b from-white dark:from-zinc-925 to-transparent z-10 pointer-events-none" />
             <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

             {/* Out of flow scrolling container ensuring 1:1 perfect height */}
             <div className="absolute top-[88px] bottom-0 left-0 right-0 overflow-hidden">
                 <div className="w-full h-full overflow-hidden relative group/scroller px-6 sm:px-8 mt-6 pb-20">
                     <div className="flex flex-col gap-5 animate-scroll-vertical group-hover/scroller:[animation-play-state:paused]">
                         {/* Tripled list for infinite seamless scroll */}
                         {[...institutionalPartners, ...institutionalPartners, ...institutionalPartners].map((name, i) => (
                             <div key={i} className="flex items-center gap-4 group/item">
                                 <div className="w-10 h-10 rounded-full border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-center shrink-0 text-zinc-400 dark:text-zinc-500 group-hover/item:text-orange-500 group-hover/item:border-orange-500/30 group-hover/item:bg-orange-500/5 transition-all">
                                     <Building2 className="w-4 h-4" />
                                 </div>
                                 <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover/item:text-zinc-900 dark:group-hover/item:text-white transition-colors">
                                     {name}
                                 </span>
                             </div>
                         ))}
                     </div>
                 </div>
             </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-33.33%); }
        }
        .animate-scroll-vertical {
          animation: scroll-vertical 40s linear infinite;
        }
      `}</style>
    </Section>
  );
}
