"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Sparkles, BookOpen, Clock, Users } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Course = {
  title: string;
  desc: string;
  tag: string;
  video: string;
  image?: string;
  color: string;
  details: string;
  duration: string;
  students: string;
};

export default function PremiumCoursesSection() {
  const [selected, setSelected] = useState<Course | null>(null);

  const courses: Course[] = [
    {
      title: "MERN Stack Development",
      desc: "Build modern web apps using React & Node.",
      tag: "Full Stack",
      video: "https://cdn.pixabay.com/video/2019/04/10/22616-330089849_large.mp4",
      color: "from-orange-500/20 to-orange-500/5",
      details: "Comprehensive training in MongoDB, Express, React, and Node.js. Includes real-world projects and deployment strategies.",
      duration: "4 Months",
      students: "1.2k+ Joined",
    },
    {
      title: "Java Fullstack Development",
      desc: "Enterprise apps using Spring Boot.",
      tag: "Backend Focus",
      video: "https://cdn.pixabay.com/video/2022/02/16/107936-678508493_large.mp4",
      color: "from-blue-600/20 to-blue-600/5",
      details: "Master Spring Boot, REST APIs, and microservices architecture with Java. Focus on enterprise-grade system design.",
      duration: "5 Months",
      students: "800+ Joined",
    },
    {
      title: "Python Fullstack Development",
      desc: "Build apps using Django & Flask.",
      tag: "Data Driven",
      video: "https://cdn.pixabay.com/video/2020/09/27/50868-462310862_large.mp4",
      color: "from-yellow-500/20 to-yellow-500/5",
      details: "Learn Python from scratch to advanced web development with Django and Flask. Includes integration with AI/ML tools.",
      duration: "4 Months",
      students: "1.5k+ Joined",
    },
    {
      title: "Data Science & AI",
      desc: "AI, ML, and data modeling.",
      tag: "Advanced Tech",
      video: "https://cdn.pixabay.com/video/2020/03/12/33580-398014022_large.mp4",
      color: "from-purple-600/20 to-purple-600/5",
      details: "Deep dive into statistical analysis, machine learning algorithms, and neural networks using Python and R.",
      duration: "6 Months",
      students: "600+ Joined",
    },
    {
      title: "Embedded Systems",
      desc: "IoT & real-time systems.",
      tag: "Hardware",
      video: "https://cdn.pixabay.com/video/2022/10/30/137021-766158022_large.mp4",
      color: "from-teal-600/20 to-teal-600/5",
      details: "Experience hardware-software co-design. Learn microcontrollers, RTOS, and industrial IoT protocols.",
      duration: "4 Months",
      students: "450+ Joined",
    },
    {
      title: "Data Analytics",
      desc: "Transform raw data into business insights.",
      tag: "Analytics",
      video: "https://cdn.pixabay.com/video/2023/07/22/172675-847844070_large.mp4",
      color: "from-sky-500/20 to-sky-500/5",
      details: "Master Excel, SQL, Tableau, and PowerBI. Learn to clean, analyze, and visualize data to drive strategic business decisions.",
      duration: "3 Months",
      students: "1.1k+ Joined",
    }
  ];

  return (
    <Section className="bg-white dark:bg-zinc-950 relative">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full" />

      {/* Header */}
      <div className="flex flex-col gap-6 mb-16">
        {/* Centered Badge + Heading */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="h-4 w-4" />
            Empower your future
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100">
            Industry Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-emerald-400">Learning Paths</span>
          </h2>
        </div>

        {/* Description + Button row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Our programs are designed by industry experts to get you from basics to professional level in months, not years. Use trending technologies through real-time projects to master every challenge.
          </p>
          <Button href="/programs" variant="ghost" size="lg" className="rounded-2xl border-2 shrink-0 self-start md:self-center bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 hover:border-emerald-700">
            Browse all programs
          </Button>
        </div>
      </div>

      {/* Grid */}
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
              className="p-4 border border-zinc-200/80 dark:border-zinc-800/80 transition-shadow duration-300 group h-full flex flex-col bg-white dark:bg-zinc-950 rounded-3xl shadow-sm hover:shadow-lg"
            >
              {/* Inset Video Container without gradients/badges */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <video
                  src={course.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Optional: Simple subtle inner shadow to mimic video container depth */}
                <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] rounded-2xl pointer-events-none" />
              </div>

              <div className="px-2 flex flex-col flex-1 pb-2">
                <h3 className="text-[20px] font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight leading-snug mb-3">
                  {course.title}
                </h3>
                <p className="text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  {course.details}
                </p>

                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                  <Link href="/programs" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold group/btn hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                    View more details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}