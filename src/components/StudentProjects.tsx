"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveUpRight, Code2, Rocket, Laptop, Database, Globe, BarChart, Settings, X, CheckCircle2, Cpu, Smartphone } from "lucide-react";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiMongodb, 
  SiPython, 
  SiPostgresql,
  SiTypescript,
  SiFramer,
  SiPrisma
} from "react-icons/si";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  title: string;
  label: string;
  desc: string;
  gradient: string;
  icon: any;
  techIcons: any[];
  accentColor: string;
  borderColor: string;
  modalContent: {
    overview: string;
    features: string[];
    techStack: string[];
    result: string;
  };
};

const studentProjects: Project[] = [
  {
    id: "01",
    title: "Global Weather App",
    label: "Frontend mastery",
    desc: "A sleek real-time weather tracking application that fetches global data with dynamic visual changes based on conditions.",
    gradient: "from-orange-500/10 to-transparent",
    icon: SiReact,
    techIcons: [SiReact, SiTailwindcss],
    accentColor: "text-orange-500",
    borderColor: "group-hover:border-orange-500/30",
    modalContent: {
      overview: "Students build a highly responsive Weather Application that utilizes OpenWeather API to provide real-time updates for any city globally.",
      features: ["Geolocation Integration", "Dynamic Weather Icons", "UV Index & Humidity Tracking", "5-Day Forecast View"],
      techStack: ["React.js", "OpenWeather API", "Tailwind CSS", "Axios"],
      result: "Mastered API integration, asynchronous programming, and conditional rendering based on external data inputs."
    }
  },
  {
    id: "02",
    title: "Enterprise Dashboard",
    label: "Fullstack Architecture",
    desc: "A comprehensive enterprise-grade dashboard for managing users, tracking analytics, and visualizing complex data sets.",
    gradient: "from-sky-500/10 to-transparent",
    icon: SiNextdotjs,
    techIcons: [SiNextdotjs, SiTypescript, SiPrisma],
    accentColor: "text-sky-500",
    borderColor: "group-hover:border-sky-500/30",
    modalContent: {
      overview: "A complex data management system designed to handle large datasets and provide actionable insights through visual representation.",
      features: ["Interactive Data Charts", "User Role Management", "Light/Dark Mode Support", "Custom Analytics Widgets"],
      techStack: ["Next.js", "Recharts", "Prisma ORM", "TypeScript"],
      result: "Learned complex state management, database schema design, and enterprise-level UI/UX principles."
    }
  },
  {
    id: "03",
    title: "Premium Portfolio",
    label: "Motion & UI Design",
    desc: "A high-performance personal brand showcase featuring glassmorphism design, smooth animations, and optimized SEO.",
    gradient: "from-emerald-500/10 to-transparent",
    icon: SiFramer,
    techIcons: [SiNextdotjs, SiFramer],
    accentColor: "text-emerald-500",
    borderColor: "group-hover:border-emerald-500/30",
    modalContent: {
      overview: "A premium personal portfolio for developers to showcase their skills, projects, and professional journey with a focus on web performance.",
      features: ["Framer Motion Animations", "Responsive Grid Layout", "Optimized Asset Loading", "Contact Form Integration"],
      techStack: ["Next.js", "Framer Motion", "Three.js", "Resend API"],
      result: "Mastered high-end animations, performance optimization (Lighthouse 90+), and personal brand storytelling."
    }
  },
  {
    id: "04",
    title: "Inventory SaaS",
    label: "Backend Scalability",
    desc: "A full-stack CRUD application for business logistics, featuring real-time stock alerts and secure database management.",
    gradient: "from-blue-500/10 to-transparent",
    icon: SiNodedotjs,
    techIcons: [SiNodedotjs, SiMongodb],
    accentColor: "text-blue-500",
    borderColor: "group-hover:border-blue-500/30",
    modalContent: {
      overview: "A robust backend-driven system that allows businesses to track inventory levels, sales, and supply chains in real-time.",
      features: ["Real-time Stock Tracking", "PDF Invoice Generation", "Authentication System", "Inventory Search & Filter"],
      techStack: ["Node.js", "Express", "MongoDB", "JWT Auth"],
      result: "Deep understanding of RESTful API architecture, JWT authentication, and NoSQL database management."
    }
  },
  {
    id: "05",
    title: "Predictive Analytics",
    label: "Data Engineering",
    desc: "A specialized data processing engine that transforms raw CSV data into interactive visual reports with predictive insights.",
    gradient: "from-indigo-500/10 to-transparent",
    icon: SiPython,
    techIcons: [SiPython, SiReact],
    accentColor: "text-indigo-500",
    borderColor: "group-hover:border-indigo-500/30",
    modalContent: {
      overview: "A data-science focused web tool that processes large CSV/JSON files to generate statistical insights and predictions.",
      features: ["CSV Bulk Upload", "Trend Prediction Graphs", "Exportable Data Reports", "Custom Filter Engine"],
      techStack: ["Python", "Pandas", "React", "Chart.js"],
      result: "Learned data cleaning, statistical modeling, and bridge communication between Python backends and React frontends."
    }
  },
  {
    id: "06",
    title: "EMS Institution Platform",
    label: "Relational Systems",
    desc: "A scalable Education Management System for tracking student performance, attendance, and assignment submissions.",
    gradient: "from-purple-500/10 to-transparent",
    icon: SiPostgresql,
    techIcons: [SiNextdotjs, SiPostgresql],
    accentColor: "text-purple-500",
    borderColor: "group-hover:border-purple-500/30",
    modalContent: {
      overview: "A multi-role platform for students, teachers, and admins to manage the entire lifecycle of an educational institution.",
      features: ["Attendance Tracker", "Assignment Submission Portal", "Grade Management", "Event Messaging"],
      techStack: ["PostgreSQL", "React", "NestJS", "Docker"],
      result: "Mastered relational database design, complex role-based access control (RBAC), and containerization."
    }
  },
];

export default function StudentProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Section className="bg-white dark:bg-zinc-950 transition-colors overflow-hidden py-16 sm:py-24 relative">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full hidden dark:block" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full hidden dark:block" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            What Students Build Here
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tight text-zinc-900 dark:text-white leading-[1] max-w-4xl mx-auto">
            Project-first learning that <br className="hidden md:block" />
            makes <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">students stand out.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studentProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative"
                onClick={() => setSelectedProject(project)}
              >
                <div 
                  className={cn(
                    "relative flex flex-col h-full p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-500 cursor-pointer overflow-hidden",
                    project.borderColor
                  )}
                >
                  <div className={cn(
                    "absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
                    project.gradient
                  )} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className={cn("p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 group-hover:scale-110 transition-transform shadow-sm", project.accentColor)}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em]">{project.id}</div>
                    </div>

                    <div className="mb-2">
                       <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                         {project.label}
                       </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors uppercase tracking-tight">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-6 flex-grow">
                      {project.desc}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
                      <div className="flex gap-2">
                        {project.techIcons.map((Tech, i) => (
                           <Tech key={i} className="w-4 h-4 text-zinc-400 dark:text-zinc-600" />
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[10px] font-black uppercase tracking-widest group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-emerald-400 group-hover:text-white transition-all shadow-sm">
                        Case Study <MoveUpRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
{/* 
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-20 relative z-20"
        >
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/programs" 
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 text-white font-black text-xl hover:shadow-[0_10px_40px_rgba(16,185,129,0.3)] transition-all cursor-pointer group"
          >
            Explore Our Programs 
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <MoveUpRight className="w-5 h-5" />
            </motion.div>
          </motion.a>
        </motion.div> */}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[3rem] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-8 md:p-12 hide-scrollbar"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition-colors shadow-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-5 mb-10">
                <div className={cn("p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-inner", selectedProject.accentColor)}>
                  <selectedProject.icon className="w-10 h-10" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-1">
                    Student Case Study {selectedProject.id}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight leading-none uppercase">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-12">
                <div>
                  <h4 className="text-sm font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-orange-500" /> Executive Overview
                  </h4>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg font-medium">
                    {selectedProject.modalContent.overview}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-sm font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <span className="w-8 h-[1px] bg-emerald-500" /> Key Features
                    </h4>
                    <ul className="space-y-4">
                      {selectedProject.modalContent.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-zinc-600 dark:text-zinc-300 font-bold text-sm">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <span className="w-8 h-[1px] bg-blue-500" /> Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.modalContent.techStack.map((tech, i) => (
                        <span key={i} className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-black uppercase tracking-tighter">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden group/result">
                   <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/5 blur-3xl rounded-full" />
                  <h4 className="text-sm font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-orange-500" />
                    Industrial Impact
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-bold text-lg">
                    {selectedProject.modalContent.result}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </Section>
  );
}
