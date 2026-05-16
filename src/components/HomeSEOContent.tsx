"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomeSEOContent() {
  const sections = [
    {
      title: "Best Internship Training in Chennai",
      content: "Inetz Technologies stands as the premier destination for students seeking the best internship training in Chennai. Our programs are meticulously designed to bridge the gap between academic theory and industrial practice. Whether you are a final-year student or a recent graduate, our internship provides the hands-on experience needed to excel in the competitive tech landscape.",
      keywords: ["Internship in Chennai", "Best Software Training Chennai", "Inetz Technologies Vadapalani"]
    },
    {
      title: "MERN Stack & Full Stack Training Chennai",
      content: "As the tech hub of Tamil Nadu, Chennai demands skilled developers. Our MERN Stack internship and Java Full Stack training in Chennai are built on a 'code-first' philosophy. We don't just teach syntax; we build scalable web applications. Our Full Stack course in Chennai covers everything from MongoDB and Express to React and Node.js, ensuring you are industry-ready.",
      keywords: ["Full Stack Training Chennai", "MERN Stack Internship", "Java Full Stack Course Chennai"]
    },
    {
      title: "AI, Data Science & Python Internship Chennai",
      content: "Step into the future with our specialized AI internship and Data Science training in Chennai. Our Python-based internship programs allow students to work on real-world datasets, building machine learning models and intelligent systems. If you're looking for an AI & ML internship in Chennai with placement support, Inetz is your perfect partner.",
      keywords: ["AI Internship Chennai", "Data Science Internship Chennai", "Python Training Chennai"]
    },
    {
      title: "Placement Training & Career Support",
      content: "What sets us apart is our dedicated placement training in Chennai. We don't just provide technical skills; we prepare you for the corporate world. Our mock interviews, resume building sessions, and soft skills training ensure that our students are top choices for our 200+ hiring partners across the software industry.",
      keywords: ["Placement Training Chennai", "Software Job Placements", "Career Support Chennai"]
    }
  ];

  return (
    <Section className="bg-white dark:bg-zinc-950 py-24 border-t border-zinc-100 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          <div className="space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6"
              >
                Why Inetz Technologies?
              </motion.div>
              <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-6">
                Leading Software Training Institute <br />
                <span className="text-emerald-600">in Vadapalani, Chennai</span>
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                Empowering students through project-driven learning and industrial mentorship.
                We transform aspiring developers into industry experts.
              </p>
            </div>

            <div className="grid gap-8">
              {sections.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="space-y-3"
                >
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {section.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    {section.content}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {section.keywords.map((kw, kidx) => (
                      <span key={kidx} className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        # {kw}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 space-y-8">
            <div className="p-8 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
              <div className="grid gap-4">
                {[
                  { label: "MERN Stack Internship Chennai", href: "/internships/mern-stack-chennai" },
                  { label: "Python & AI Internship Chennai", href: "/internships/ai-ml-chennai" },
                  { label: "Java Full Stack Internship Chennai", href: "/internships/java-chennai" },
                  { label: "Our Success Stories", href: "/#success-stories" },
                  { label: "Contact Our Center", href: "/contact" }
                ].map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 hover:border-emerald-500 transition-all group"
                  >
                    <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-emerald-600">{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-emerald-600 text-white shadow-xl shadow-emerald-600/20">
              <h3 className="text-2xl font-bold mb-4">Start Your Career Today</h3>
              <p className="text-emerald-50 opacity-90 text-sm mb-8 leading-relaxed font-medium">
                Don't settle for theoretical knowledge. Join Chennai's most practical internship program and build a portfolio that gets you hired.
              </p>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center py-4 bg-white text-emerald-600 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-all shadow-lg"
              >
                Request Admission Guide
              </Link>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}
