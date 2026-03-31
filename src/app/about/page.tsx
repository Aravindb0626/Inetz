"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Award, 
  BookOpen, 
  Rocket, 
  CheckCircle2, 
  Code2, 
  Laptop, 
  Sparkles 
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Counter } from "@/components/ui/Counter";

export default function AboutPage() {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Curriculum",
      desc: "Stay ahead with our up-to-date and industry-relevant courses designed by tech veterans.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      icon: Users,
      title: "Experienced Instructors",
      desc: "Learn from seasoned professionals who bring real-world experience and professional advice.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: Laptop,
      title: "Flexible Learning",
      desc: "Convenience of both online and offline classes tailored to fit your professional schedule.",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      icon: Code2,
      title: "Real World Projects",
      desc: "Gain hands-on experience with 5 mini applications and 2 major industrial applications.",
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      icon: Rocket,
      title: "Career Support",
      desc: "Dedicated services including professional resume building and intensive job placement assistance.",
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    },
    {
      icon: Sparkles,
      title: "Placement Assistance",
      desc: "Personalized guidance ensuring you find the perfect job fit in top tier IT companies.",
      color: "text-teal-500",
      bg: "bg-teal-500/10"
    }
  ];

  return (
    <div className="bg-white dark:bg-zinc-950">
      {/* Hero Section */}
      <Section className="pt-20 pb-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8"
          >
            Our Mission
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight"
          >
            The Gold Standard in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-emerald-500">Software Training</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto"
          >
            Empower your career with Chennai's premier software training edtech company. 
            Join 5000+ professionals who transformed their future with Inetz Technologies.
          </motion.p>
        </div>
      </Section>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-[3rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-xl">
          {[
            { label: "Students Placed", val: 500, suffix: "+" },
            { label: "Successful Alumni", val: 5000, suffix: "+" },
            { label: "Project Focus", val: 100, suffix: "%" },
            { label: "Trust Score", val: 4.9, suffix: "/5" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-4">
              <div className="text-3xl md:text-4xl font-black text-emerald-600 mb-1">
                {typeof stat.val === 'number' && i < 3 ? (
                  <Counter to={stat.val} />
                ) : (
                  stat.val
                )}
                {stat.suffix}
              </div>
              <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Philosophy */}
      <Section className="bg-zinc-50 dark:bg-zinc-900/50 py-24 transition-colors relative">
        <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-white/5 [mask-image:radial-gradient(white,transparent)]" />
        
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto relative z-10">
          <div>
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 leading-tight">
              Why Inetz Technologies <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-emerald-500">Stands Apart</span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              Our well-regarded edtech program aims to prepare you for the workforce. 
              Give yourself the advantage of industry-relevant training and professional 
              advice to become a professional who is ready for a job!
            </p>
            
            <div className="space-y-4">
              {[
                "Real-time experts as trainers",
                "Practice on real-time projects",
                "Affordable fees & EMI options",
                "Dedicated career services team"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="font-bold text-zinc-700 dark:text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {features.slice(0, 4).map((feature, i) => (
              <Card key={i} className="p-6 border-zinc-200/60 dark:border-zinc-800/60 h-full">
                <div className={`h-12 w-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">{feature.title}</h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Values Grid */}
      <Section className="py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Master Every Skill</h2>
          <p className="text-zinc-600 dark:text-zinc-400">The gold standard in tech education and aspiring developer growth.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="outline" hover="scale" className="text-center p-8 border-zinc-200/60 dark:border-zinc-800/60 h-full">
                <div className={`mx-auto h-16 w-16 rounded-[2rem] ${feature.bg} flex items-center justify-center mb-6`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">{feature.title}</h4>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{feature.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
