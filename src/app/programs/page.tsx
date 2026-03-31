"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck, Zap, Users, GraduationCap, Building2, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const courses = [
  {
    title: "MERN Stack Development",
    desc: "Build modern web apps using React & Node.",
    tag: "Full Stack",
    video: "https://cdn.pixabay.com/video/2019/04/10/22616-330089849_large.mp4",
    color: "from-orange-500/20 to-orange-500/5",
    details: "Comprehensive training in MongoDB, Express, React, and Node.js. Includes real-world projects and deployment strategies.",
    duration: "4 Months",
  },
  {
    title: "Java Fullstack Development",
    desc: "Enterprise apps using Spring Boot.",
    tag: "Backend Focus",
    video: "https://cdn.pixabay.com/video/2022/02/16/107936-678508493_large.mp4",
    color: "from-blue-600/20 to-blue-600/5",
    details: "Master Spring Boot, REST APIs, and microservices architecture with Java. Focus on enterprise-grade system design.",
    duration: "5 Months",
  },
  {
    title: "Python Fullstack Development",
    desc: "Build apps using Django & Flask.",
    tag: "Data Driven",
    video: "https://cdn.pixabay.com/video/2020/09/27/50868-462310862_large.mp4",
    color: "from-yellow-500/20 to-yellow-500/5",
    details: "Learn Python from scratch to advanced web development with Django and Flask. Includes integration with AI/ML tools.",
    duration: "4 Months",
  },
  {
    title: "Data Science & AI",
    desc: "AI, ML, and data modeling.",
    tag: "Advanced Tech",
    video: "https://cdn.pixabay.com/video/2020/03/12/33580-398014022_large.mp4",
    color: "from-purple-600/20 to-purple-600/5",
    details: "Deep dive into statistical analysis, machine learning algorithms, and neural networks using Python and R.",
    duration: "6 Months",
  },
  {
    title: "Embedded Systems",
    desc: "IoT & real-time systems.",
    tag: "Hardware",
    video: "https://cdn.pixabay.com/video/2022/10/30/137021-766158022_large.mp4",
    color: "from-teal-600/20 to-teal-600/5",
    details: "Experience hardware-software co-design. Learn microcontrollers, RTOS, and industrial IoT protocols.",
    duration: "4 Months",
  },
  {
    title: "Data Analytics",
    desc: "Transform raw data into business insights.",
    tag: "Analytics",
    video: "https://cdn.pixabay.com/video/2023/07/22/172675-847844070_large.mp4",
    color: "from-sky-500/20 to-sky-500/5",
    details: "Master Excel, SQL, Tableau, and PowerBI. Learn to clean, analyze, and visualize data to drive strategic business decisions.",
    duration: "3 Months",
  }
];

const specializedPrograms = [
  {
    title: "Career Gap Program",
    desc: "Bridging the gap for professionals return to the workforce after a hiatus.",
    icon: GraduationCap,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Evolve Program",
    desc: "Upskilling existing IT professionals with the latest modern tech stacks.",
    icon: Zap,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Accelerator",
    desc: "Fast-track intensive training for high-performance students.",
    icon: ShieldCheck,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Placement Assistance",
    desc: "Dedicated resume building, mock interviews, and reference connections.",
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Corporate Training",
    desc: "Customized training solutions for organizations and tech teams.",
    icon: Building2,
    color: "text-sky-500",
    bg: "bg-sky-500/10",
  }
];

export default function ProgramsPage() {
  const [step, setStep] = useState<"courses" | "duration">("courses");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const durations = [
    { label: "1 Week", value: "1week", desc: "Intensive crash course & orientation" },
    { label: "2 Weeks", value: "2weeks", desc: "Project-based mini internship" },
    { label: "1 Month", value: "1month", desc: "Structured build & mentor review" },
    { label: "3 Months", value: "3months", desc: "Full career-track comprehensive internship" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero Header */}
      <section className="relative py-24 overflow-hidden border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
        
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             key={step}
          >
            {step === "courses" ? (
              <>
                <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 font-serif tracking-tight">
                  Our Professional <br/>
                  <span className="text-emerald-600">Learning Ecosystem</span>
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                  From foundational technologies to specialized executive programs, we provide the structured paths needed to navigate the ever-evolving tech landscape.
                </p>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setStep("courses")}
                  className="flex items-center gap-2 text-emerald-600 font-bold mb-4 hover:gap-3 transition-all"
                >
                    <ArrowLeft className="h-4 w-4" /> Re-select Program
                </button>
                <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 font-serif tracking-tight">
                  Select Internship <br/>
                  <span className="text-emerald-600">Duration for {selectedCourse}</span>
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                  Choose the duration that best fits your learning goals and schedule. All programs include certification.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <div className="relative min-h-[600px]">
        <AnimatePresence mode="wait">
          {step === "courses" ? (
            <motion.div
              key="courses-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Section className="py-20">
                <div className="flex items-center gap-3 mb-12">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                        <LayoutGrid className="h-5 w-5" />
                    </div>
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Technical Specializations</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {courses.map((course, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        variant="outline" 
                        hover="lift" 
                        onClick={() => {
                          setSelectedCourse(course.title);
                          setStep("duration");
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="p-4 border border-zinc-200/80 dark:border-zinc-800/80 transition-shadow duration-300 group h-full flex flex-col bg-white dark:bg-zinc-950 rounded-3xl shadow-sm hover:shadow-lg cursor-pointer"
                      >
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                          <video
                            src={course.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] rounded-2xl pointer-events-none" />
                        </div>
                        
                        <div className="px-2 flex flex-col flex-1 pb-2">
                          <h3 className="text-[20px] font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight leading-snug mb-3">
                            {course.title}
                          </h3>
                          <p className="text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {course.details}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </Section>
            </motion.div>
          ) : (
            <motion.div
              key="duration-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Section className="py-20">
                 <div className="max-w-4xl mx-auto">
                    <div className="grid gap-6 md:grid-cols-2">
                        {durations.map((d, index) => (
                            <motion.div
                                key={d.value}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link 
                                    href={`/checkout?course=${encodeURIComponent(selectedCourse || "")}&duration=${d.value}`}
                                    className="block group"
                                >
                                    <Card className="p-8 border-2 border-zinc-100 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300 relative overflow-hidden bg-white dark:bg-zinc-900">
                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 transition-colors">
                                                    {d.label}
                                                </h3>
                                                <div className="h-10 w-10 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                                    <ArrowRight className="h-5 w-5" />
                                                </div>
                                            </div>
                                            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                                                {d.desc}
                                            </p>
                                            <div className="mt-6 flex items-center gap-2 text-emerald-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                                Proceed to Payment <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </div>
                                        {/* Background accent */}
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 -translate-y-1/2 translate-x-1/2 rounded-full group-hover:scale-150 transition-transform duration-700" />
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 p-8 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Secure Enrollment</h4>
                                <p className="text-sm text-zinc-500 font-medium">Your data and payment details are encrypted.</p>
                            </div>
                        </div>
                        <p className="text-xs text-zinc-400 max-w-xs md:text-right">
                            By proceeding, you agree to the Inetz Internship Terms of Service and Refund Policy.
                        </p>
                    </div>
                 </div>
              </Section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Secondary / Career Focused Programs */}
      <section className="bg-zinc-900 py-24 text-white">
        <Section>
            <div className="mb-16">
                <div className="text-emerald-500 font-bold text-sm tracking-widest uppercase mb-4">Strategic Paths</div>
                <h2 className="text-3xl md:text-5xl font-bold font-serif">Specialized Career Support</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {specializedPrograms.map((program, idx) => {
                    const sectionId = program.title.toLowerCase().replace(/\s+/g, '-');
                    return (
                        <motion.div
                            key={idx}
                            id={sectionId}
                            className="scroll-mt-32"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="bg-white/5 border-white/10 p-8 h-full hover:bg-white/[0.08] transition-all group">
                                <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-6", program.bg, program.color)}>
                                <program.icon className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{program.title}</h3>
                            <p className="text-zinc-400 leading-relaxed font-medium">
                                {program.desc}
                            </p>
                            <div className="mt-8 pt-6 border-t border-white/5">
                                <Link href="/contact" className="text-emerald-400 font-bold text-sm inline-flex items-center gap-2 hover:text-emerald-300 transition-colors">
                                    Learn More <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </Card>
                    </motion.div>
                );
                })}
            </div>
        </Section>
      </section>

      
    </div>
  );
}
