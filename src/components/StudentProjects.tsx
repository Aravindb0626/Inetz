"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoveUpRight,
  X,
  CheckCircle2,
  Rocket,
  Globe,
  Layout,
  Search,
  BarChart3,
  ArrowRight,
  Shield,
  Zap,
  Cpu,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
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
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  title: string;
  label: string;
  domain: string;
  desc: string;
  gradient: string;
  icon: any;
  techIcons: any[];
  cardTech: string[];
  accentColor: string;
  borderColor: string;
  image: string;
  modalContent: {
    overview: string;
    challenge: string;
    solution: string;
    features: string[];
    techStack: string[];
    result: string;
    stats: { label: string; value: string }[];
  };
};

const studentProjects: Project[] = [
  {
    id: "01",
    title: "Global Weather App",
    label: "Web Architecture",
    domain: "MERN Stack Development",
    desc: "Build highly scalable production-ready web applications using the popular MERN stack from the ground up.",
    gradient: "from-orange-500/20 to-transparent",
    icon: SiReact,
    techIcons: [SiReact, SiTailwindcss, SiNodedotjs],
    cardTech: ["React & Node.js Core", "MongoDB & Express", "Tailwind CSS Design"],
    accentColor: "text-orange-500",
    borderColor: "group-hover:border-orange-500/50",
    image: "https://images.unsplash.com/photo-1592210633461-80dcc6875249?auto=format&fit=crop&q=80&w=1200",
    modalContent: {
      overview: "Comprehensive masterclass on building full-stack applications with MongoDB, Express, React, and Node.js.",
      challenge: "Managing shared state across complex UI components while keeping the server response time under 100ms.",
      solution: "Implemented Redux Toolkit for global state and optimized MongoDB aggregations for fast data retrieval.",
      features: ["Real-time Data Sync", "Advanced JWT Auth", "Dynamic Dashboarding", "Cloud Deployment"],
      techStack: ["React.js", "Node.js", "MongoDB", "Express", "JWT", "Redux"],
      result: "Mastered end-to-end development of modern, highly interactive web platforms.",
      stats: [
        { label: "Performance", value: "98/100" },
        { label: "Stability", value: "99.9%" }
      ]
    }
  },
  {
    id: "02",
    title: "Enterprise Dashboard",
    label: "Enterprise Computing",
    domain: "Java Fullstack Development",
    desc: "Architect robust mission-critical systems & microservices using Java and modern frontend frameworks.",
    gradient: "from-blue-600/20 to-transparent",
    icon: SiPostgresql,
    techIcons: [SiPostgresql, SiNextdotjs],
    cardTech: ["Spring Boot Core", "Microservices Arch", "PostgreSQL Engine"],
    accentColor: "text-blue-500",
    borderColor: "group-hover:border-blue-500/50",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    modalContent: {
      overview: "Advanced training in building secure, distributed enterprise systems with Spring Boot and Java.",
      challenge: "Coordinating data consistency across multiple microservices in a high-concurrency environment.",
      solution: "Adopted SAGA patterns and Kafka messaging for reliable event-driven communication between services.",
      features: ["SAGA Patterns", "Kafka Messaging", "Role-Based RBAC", "Optimized Querying"],
      techStack: ["Java", "Spring Boot", "Hibernate", "React", "PostgreSQL", "Docker"],
      result: "Acquired the skills to lead large-scale backend engineering for financial and corporate tech.",
      stats: [
        { label: "Scale", value: "10k+ Req/s" },
        { label: "Security", value: "Enterprise" }
      ]
    }
  },
  {
    id: "03",
    title: "Premium Portfolio",
    label: "Rapid Innovation",
    domain: "Python Fullstack Development",
    desc: "Harness the power of Python to develop sophisticated web backends and data-driven frontend experiences.",
    gradient: "from-yellow-400/20 to-transparent",
    icon: SiPython,
    techIcons: [SiPython, SiTailwindcss],
    cardTech: ["Django & Flask Hub", "Python Automation", "RESTful API Flow"],
    accentColor: "text-yellow-500",
    borderColor: "group-hover:border-yellow-500/50",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    modalContent: {
      overview: "Deep dive into web development using Django and Flask, combined with modern JavaScript tools.",
      challenge: "Building a flexible CMS that handles dynamic schema changes without database migrations.",
      solution: "Utilized Django's polymorphic models and NoSQL integration for high flexibility.",
      features: ["Polymorphic Models", "NoSQL Integration", "Automated Pipelines", "ML Pre-processing"],
      techStack: ["Python", "Django", "JavaScript", "PostgreSQL", "Redis"],
      result: "Built multiple high-traffic applications with clean, maintainable Pythonic code.",
      stats: [
        { label: "Build Time", value: "-40%" },
        { label: "Efficiency", value: "High" }
      ]
    }
  },
  {
    id: "04",
    title: "Inventory SaaS",
    label: "Backend Architecture",
    domain: "Python Fullstack Development",
    desc: "Master the algorithms behind machine learning, predictive modeling, and AI-driven automation.",
    gradient: "from-blue-500/20 to-transparent",
    icon: SiNodedotjs,
    techIcons: [SiNodedotjs, SiMongodb],
    cardTech: ["Node.js Backend", "MongoDB Schema", "JWT Security"],
    accentColor: "text-blue-500",
    borderColor: "group-hover:border-blue-500/50",
    image: "https://images.unsplash.com/photo-1586769852044-692d6e3703a0?auto=format&fit=crop&q=80&w=1200",
    modalContent: {
      overview: "A robust inventory management system designed for small to medium logistics operations.",
      challenge: "Processing massive real-time datasets and achieving model accuracy above 90% for inventory tasks.",
      solution: "Optimized data processing using asynchronous workers and indexed database queries.",
      features: ["Batch Management", "Real-time Tracking", "Low Stock Alerts", "Invoicing Engine"],
      techStack: ["Node.js", "Express", "MongoDB", "Tailwind"],
      result: "Developed production-ready management systems capable of handling enterprise-scale logistics.",
      stats: [
        { label: "Uptime", value: "100%" },
        { label: "Response", value: "<50ms" }
      ]
    }
  },
  {
    id: "05",
    title: "Predictive Analytics",
    label: "Intelligent Systems",
    domain: "Data Science & AI",
    desc: "Master the algorithms behind machine learning, predictive modeling, and AI-driven automation.",
    gradient: "from-purple-500/20 to-transparent",
    icon: SiPython,
    techIcons: [SiPython, SiNodedotjs],
    cardTech: ["PyTorch & TensorFlow", "Pandas & Numpy", "Predictive ML Tech"],
    accentColor: "text-purple-500",
    borderColor: "group-hover:border-purple-500/50",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1200",
    modalContent: {
      overview: "Focus on statistical modeling, neural networks, and deploying models to production environments.",
      challenge: "Processing massive real-time datasets and achieving model accuracy above 90% for predictive tasks.",
      solution: "Optimized model training using GPU acceleration and ensemble learning techniques.",
      features: ["Neural Networks", "NLP Processing", "Big Data Cleaning", "Model Versioning"],
      techStack: ["Python", "TensorFlow", "PyTorch", "Scikit-Learn", "FastAPI"],
      result: "Developed production-ready models capable of handling enterprise-scale data analysis.",
      stats: [
        { label: "Accuracy", value: "94.2%" },
        { label: "Data Cap", value: "1TB+" }
      ]
    }
  },
  {
    id: "06",
    title: "EMS Institution",
    label: "Industrial Infrastructure",
    domain: "Embedded Systems",
    desc: "Develop low-level software that bridges hardware and code, powering next-gen smart devices and IoT.",
    gradient: "from-teal-500/20 to-transparent",
    icon: Cpu,
    techIcons: [Cpu, Zap],
    cardTech: ["Arduino / ESP32 Core", "C++ / Embedded C", "MQTT & IoT Protocols"],
    accentColor: "text-teal-500",
    borderColor: "group-hover:border-teal-500/50",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    modalContent: {
      overview: "An institution management system designed for high-performance and scalability.",
      challenge: "Synthesizing contradictory data sources into a single, unified executive dashboard.",
      solution: "Built robust ETL pipelines and used advanced DAX patterns for dynamic visualization.",
      features: ["Attendance Suite", "Grade Portal", "RBAC System", "Event Timeline"],
      techStack: ["PostgreSQL", "React", "NestJS", "Tailwind"],
      result: "Enabled data-driven decision making for industrial partners through automated management tools.",
      stats: [
        { label: "Latency", value: "Real-time" },
        { label: "Uptime", value: "99.9%" }
      ]
    }
  },
];

export default function StudentProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Section className="bg-white dark:bg-zinc-950 transition-colors overflow-hidden py-8 relative">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full hidden dark:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-4 mb-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Rocket className="h-4 w-4" />
              Industrial Benchmarks
            </div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-100 mb-4">
              Industrial Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500">Student Projects</span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
              We build production-ready applications that solve real business problems, using the exact tech stacks used by top-tier engineering teams. Use trending technologies through real-time projects to master every challenge.
            </p>
            <Button variant="ghost" size="lg" className="rounded-2xl border-2 shrink-0 self-start md:self-center bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 hover:border-emerald-700">
              View more projects
            </Button>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col lg:flex-row items-stretch bg-zinc-50/50 dark:bg-zinc-900/30 rounded-[2.5rem] overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 shadow-2xl min-h-[350px] backdrop-blur-sm"
            >
              {/* Left Column: Image & Hero Title */}
              <div className="lg:w-1/2 relative overflow-hidden group">
                <div className="absolute inset-0 bg-zinc-900">
                  <motion.img
                    src={studentProjects[currentIndex].image}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                    alt={studentProjects[currentIndex].title}
                  />
                </div>
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                {/* Floating Title - Unique & Modern */}
                <div className="absolute bottom-12 left-12 right-12 z-20">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-emerald-500/20 mb-4">
                      Project {studentProjects[currentIndex].id}
                    </span>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                      {studentProjects[currentIndex].title.split(' ').map((word, i) => (
                        <span key={i} className={i % 2 === 1 ? "text-emerald-500" : ""}>{word} </span>
                      ))}
                    </h3>
                  </motion.div>
                </div>

                {/* Technical Icons Preview */}
                <div className="absolute top-12 left-12 flex gap-3 z-20">
                  {studentProjects[currentIndex].techIcons.map((Tech, i) => (
                    <div key={i} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
                      <Tech className="w-5 h-5 text-white" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Narrative & Navigation */}
              <div className="lg:w-1/2 p-6 lg:p-10 flex flex-col justify-between relative bg-white dark:bg-zinc-900/40">
                {/* Decorative background number */}
                <div className="absolute top-0 right-0 p-8 text-[8rem] font-black text-zinc-100 dark:text-zinc-800/30 leading-none select-none -z-10">
                  {studentProjects[currentIndex].id}
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-2">
                      {studentProjects[currentIndex].label}
                    </h4>
                    <p className="text-lg text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
                      {studentProjects[currentIndex].desc}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Technologies Used</h5>
                    <div className="grid grid-cols-1 gap-3">
                      {studentProjects[currentIndex].cardTech.map((tech, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pb-4 flex flex-wrap gap-4">
                    <Button
                      onClick={() => setSelectedProject(studentProjects[currentIndex])}
                      variant="ghost"
                      className="rounded-2xl border-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-emerald-600 hover:text-white border-zinc-900 dark:border-white hover:border-emerald-600 px-6 h-12 font-bold uppercase text-[10px] tracking-widest"
                    >
                      Learn More...
                    </Button>
                    <div className="flex h-12 items-center gap-2 px-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Project:</span>
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                        {studentProjects[currentIndex].title}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Slider Navigation */}
                <div className="mt-8 lg:mt-0 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-zinc-900 dark:text-white leading-none">
                      {studentProjects[currentIndex].id}
                    </span>
                    <span className="text-zinc-400 font-bold text-xs uppercase tracking-widest pt-1">
                      / {studentProjects.length.toString().padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentIndex((prev) => (prev === 0 ? studentProjects.length - 1 : prev - 1))}
                      className="w-12 h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition-all text-zinc-400 active:scale-95"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentIndex((prev) => (prev === studentProjects.length - 1 ? 0 : prev + 1))}
                      className="w-12 h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition-all text-zinc-400 active:scale-95"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-zinc-950/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[2.5rem] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col md:flex-row"
            >
              {/* Modal Left: Rich Data Image & Stats */}
              <div className="md:w-5/12 relative h-64 md:h-auto border-r border-zinc-100 dark:border-zinc-800">
                <img src={selectedProject.image} className="absolute inset-0 w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="grid grid-cols-2 gap-4">
                    {selectedProject.modalContent.stats.map((stat, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white">
                        <p className="text-[8px] font-bold uppercase tracking-widest text-zinc-300 mb-1">{stat.label}</p>
                        <p className="text-xl font-black">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Right: Detailed Project Data */}
              <div className="md:w-7/12 p-8 md:p-12 overflow-y-auto hide-scrollbar bg-zinc-50/50 dark:bg-zinc-900/10">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className={cn("p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl", selectedProject.accentColor)}>
                      <selectedProject.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Case Study ID {selectedProject.id}</p>
                      <h3 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight uppercase leading-none">{selectedProject.title}</h3>
                    </div>
                  </div>
                  <button onClick={() => setSelectedProject(null)} className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                        <Shield className="w-3 h-3" /> The Challenge
                      </h4>
                      <p className="text-sm font-bold text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {selectedProject.modalContent.challenge}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                        <Zap className="w-3 h-3" /> The Solution
                      </h4>
                      <p className="text-sm font-bold text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {selectedProject.modalContent.solution}
                      </p>
                    </div>
                  </div>

                  {/* New Key Innovations Section in Modal */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                        <Rocket className="w-3.5 h-3.5" /> Key Innovations
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                        {selectedProject.modalContent.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200">{feature}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-[2rem] bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                    <h4 className="text-[10px] font-bold text-zinc-900 dark:text-white uppercase tracking-widest mb-4">Core Technology Output</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.modalContent.techStack.map((tech, i) => (
                        <div key={i} className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold text-zinc-500">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Industrial Impact</h4>
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                      <Rocket className="w-5 h-5 text-emerald-500" />
                      <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 leading-tight">
                        {selectedProject.modalContent.result}
                      </p>
                    </div>
                  </div>
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
