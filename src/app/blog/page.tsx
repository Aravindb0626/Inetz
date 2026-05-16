"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Tag,
  ChevronRight,
  User,
  Rocket,
  Target,
  Zap,
  Globe,
  Code2,
  Cpu,
  Trophy,
  Users2,
  Briefcase,
  PlayCircle,
  BarChart3,
  CheckCircle2,
  Calendar,
  Sparkles,
  Plus,
  Minus,
  Check,
  Search,
  MessageSquare,
  ShieldCheck,
  TrendingUp
} from "lucide-react";

// Content Data
const roadmapSections = [
  {
    phase: "PAST",
    years: "2005 - 2015",
    title: "Foundation Era",
    desc: "Starting as a specialized training center focusing on core software engineering and basic web development.",
    icon: Clock,
    color: "blue",
    items: ["Small training center foundation", "Core Java & .NET focus", "Local community building"]
  },
  {
    phase: "PRESENT",
    years: "2016 - 2026",
    title: "Expansion & Innovation",
    desc: "Transforming into a full-scale tech ecosystem with AI-powered learning and real-time industry internships.",
    icon: Zap,
    color: "emerald",
    items: ["MERN & Python Mastery", "AI-Integrated Learning", "Guaranteed Internships"]
  },
  {
    phase: "FUTURE",
    years: "2027 - 2030",
    title: "Global Vision",
    desc: "Scaling to a global learning platform and startup incubator, fostering 10,000+ developers worldwide.",
    icon: Rocket,
    color: "purple",
    items: ["AI Development Academy", "Global Learning Platform", "Startup Incubation"]
  }
];

const stats = [
  { label: "Students Benefited", value: "64,500+", icon: Users2 },
  { label: "Schemes Assisted", value: "120+", icon: Target },
  { label: "Active Members", value: "15,000+", icon: ShieldCheck },
  { label: "Income Increase", value: "28%", icon: TrendingUp },
];

const steps = [
  { id: "01", title: "Submit Details", desc: "Share your name and career goals to verify eligibility for our programs." },
  { id: "02", title: "Choose Program", desc: "Select the internship or training plan that fits your professional trajectory." },
  { id: "03", title: "Skill Verification", desc: "Complete basic assessments to unlock personalized mentorship and benefits." },
  { id: "04", title: "Start Your Career", desc: "Begin your industry journey with expert guidance and live production projects." }
];

const faqData = [
  {
    q: "What is the iNetz Internship Program?",
    a: "Our internship program is a career-accelerator that provides students with real-time project experience, industry mentorship, and direct placement assistance with top tech firms."
  },
  {
    q: "What are the eligibility requirements to join?",
    a: "Anyone with a basic technical foundation and a passion for engineering can join. We provide bridge courses for students transitioning from other fields."
  },
  {
    q: "How much can I earn after completion?",
    a: "Most of our graduates secure packages ranging from ₹4.5 LPA to ₹15 LPA, depending on their specialization and project mastery during the program."
  },
  {
    q: "Do you provide scholarship assistance?",
    a: "Our internship program is a career-accelerator that provides students in Chennai with real-time project experience, industry mentorship, and direct placement assistance with top tech firms in Vadapalani and beyond."
  },
  {
    q: "Do you offer 1 month internship in Chennai with certificate?",
    a: "Yes, we provide specialized 1 month and 15 days internship programs for college students in Chennai, focusing on Full Stack, Python, and AI with industry-recognized certification."
  },
  {
    q: "Are there free internships with stipend in Chennai?",
    a: "We offer both free and paid internship opportunities in Chennai depending on the skill level. Top performers often secure monthly stipends while working on production-ready software projects."
  },
  {
    q: "Where is your training institute located in Vadapalani?",
    a: "Inetz Technologies is located at K.P Towers, Arcot Road, Vadapalani, right opposite Nexus Vijaya Mall, making it easily accessible for students across Chennai."
  }
];

const blogPosts = [
  {
    id: "subsidies",
    title: "Top 5 Career Benefits Students Are Missing — And How We Help You Claim Them",
    excerpt: "Most students lose out on valuable professional subsidies every year. Learn how our partners help you apply correctly.",
    category: "Career Guidance",
    date: "Feb 2025",
    author: "iNetz Expert",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "advisory",
    title: "How Expert Mentorship Increased Placement Success by 22% ",
    excerpt: "Real case studies showing how project-based advisory helps students reduce learning time and maximize skills.",
    category: "Success Stories",
    date: "Feb 2025",
    author: "Senior Architect",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "business",
    title: "How Partners Earn ₹18,000–₹65,000 Monthly: Real Breakdown",
    excerpt: "Detailed earnings from student onboarding, corporate training services, and regional placement support.",
    category: "Partner Insights",
    date: "Jan 2025",
    author: "Growth Lead",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop"
  }
];

const officeImages = [
  { title: "Innovation Hub", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" },
  { title: "Collaborative Space", url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop" },
  { title: "Mentorship Zone", url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" },
  { title: "Tech Lab", url: "https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=2070&auto=format&fit=crop" },
  { title: "Focus Pods", url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" },
  { title: "Cafeteria & Lounge", url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop" }
];

export default function BlogPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">

      {/* ── 1. Hero Section (Fixed Background Parallax) ── */}
      <section className="relative pt-32 pb-40 overflow-hidden bg-zinc-950 border-b border-white/10 isolate">
        <div
          className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
          style={{
            backgroundImage: "url('students.png')",
            backgroundAttachment: "fixed"
          }}
        />
        <div className="absolute inset-0 bg-zinc-800/45 z-10" />

        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.1em] mb-6 border border-emerald-500/20 backdrop-blur-sm"
            >
              <Sparkles className="h-3 w-3" />
              Your Trusted Career Partner
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-black text-white leading-[1.1] mb-6 tracking-tight"
            >
              Best Software Training Institute <br />
              & <span className="text-emerald-500">Internship Training</span> in Chennai.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base text-zinc-300 mb-8 leading-relaxed font-medium"
            >
              Accelerate your tech career with Inetz Technologies, the leading provider of software internships in Chennai. Whether you're looking for Python, MERN, or AI training, we give you the tools to grow faster and earn more.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/about" className="px-6 py-3.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 text-[11px] uppercase tracking-wide">
                Know More About Us
              </Link>
              <Link href="/register" className="px-6 py-3.5 bg-white border border-zinc-200 text-zinc-900 font-bold rounded-lg hover:bg-zinc-50 transition-all text-[11px] uppercase tracking-wide shadow-sm">
                Join the Moment
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. Floating Stats Bar (Overlapping) ── */}
      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden shadow-2xl">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="bg-white p-6 flex flex-col items-center text-center group"
            >
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black text-zinc-900 tracking-tighter mb-1">{stat.value}</div>
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 3. Intro Section (Cuts the Nonsense) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 mb-6 leading-tight tracking-tight">
                iNetz cuts the nonsense and gives students what they <span className="text-orange-500">actually need in Chennai.</span>
              </h2>
              <p className="text-zinc-600 text-sm mb-8 leading-relaxed font-medium">
                As a leading internship company in Vadapalani, we provide direct access to high-impact software training, expert career advisory, and placement support. From Ramapuram to Kodambakkam, college students choose iNetz for real-world projects and 100% placement training.
              </p>
              <Link href="/programs" className="inline-flex items-center gap-2 text-emerald-600 font-bold uppercase text-[10px] tracking-widest group">
                Get Your Benefits Now
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { title: "Scholarship Assistance", desc: "Stop missing career benefits. We help you apply correctly and on time.", icon: Target },
                { title: "Alumni Network Membership", desc: "Get exclusive resources, priority support, and income-boosting tools.", icon: ShieldCheck },
                { title: "Expert Career Advisory", desc: "Get actionable advice based on your skills, industry trends, and portfolio needs.", icon: MessageSquare }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-xl bg-zinc-50 border border-zinc-100 flex gap-5 hover:shadow-lg transition-all">
                  <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center shrink-0 text-emerald-600 shadow-sm">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 mb-1">{feature.title}</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Process Section (Simple & Fast) ── */}
      <section className="py-20 bg-zinc-50 border-y border-zinc-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 mb-4 tracking-tight">Simple and Fast Setup</h2>
            <p className="text-zinc-500 text-sm font-medium">Follow these steps to get industry-linked support, expert advisory, and genuine internship opportunities.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                <div className="text-5xl font-black text-zinc-200 mb-4 group-hover:text-emerald-500/20 transition-colors">{step.id}</div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">{step.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed font-medium">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-zinc-200 z-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Parallax Background Section (Scroll Effect) ── */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden isolate">
        <div
          className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')",
            backgroundAttachment: "fixed"
          }}
        />
        <div className="absolute inset-0 bg-zinc-950/60 z-10" />

        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-md"
          >
            Mission-Driven Growth
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl font-black text-white mb-6 tracking-tighter leading-tight"
          >
            Transforming Ambition Into <br />
            <span className="text-emerald-500 italic uppercase font-black">Global Success.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-zinc-300 font-medium max-w-xl mx-auto leading-relaxed"
          >
            Our infrastructure is built to support the next generation of tech talent. From deep-tech training to global placements, we bridge the gap.
          </motion.p>
        </div>
      </section>

      {/* ── 6. Proven Results Section (Mosaic Grid Style) ── */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 leading-[1.1] tracking-tight">
                  <span className="text-emerald-600">Proven Tech Support</span> that delivers real results
                </h2>
              </div>

              <div className="space-y-4 text-zinc-500 text-sm font-medium leading-relaxed mb-10">
                <p>
                  iNetz isn&apos;t about promises — it&apos;s about outcomes. Students across diverse backgrounds rely on our platform for accurate guidance, timely mentorship, and reliable placement support because we deliver where others fail.
                </p>
                <p>
                  Backed by industry experts, data-driven recommendations, and a strong professional network, we help students avoid common pitfalls, increase productivity, and make smarter career decisions every single day.
                </p>
              </div>

              <div className="flex flex-wrap gap-8">
                {[
                  { label: "Placement Rate", value: "95%", icon: TrendingUp },
                  { label: "Completion Rate", value: "80%", icon: Target },
                  { label: "Alumni Engagement", value: "70%", icon: Users2 }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xl font-black text-zinc-900">{stat.value}</div>
                      <div className="text-[9px] font-black text-zinc-400 uppercase tracking-widest leading-none">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
              <div className="flex flex-col gap-3">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl"
                >
                  <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop" alt="Office 1" fill className="object-cover" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="relative aspect-square rounded-[2rem] overflow-hidden shadow-xl"
                >
                  <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="Office 2" fill className="object-cover" />
                </motion.div>
              </div>
              <div className="flex flex-col gap-3 mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="relative aspect-square rounded-[2rem] overflow-hidden shadow-xl"
                >
                  <Image src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" alt="Office 3" fill className="object-cover" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl"
                >
                  <Image src="https://images.unsplash.com/photo-1543269664-76bc3997d9ea?q=80&w=2070&auto=format&fit=crop" alt="Office 4" fill className="object-cover" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Video Testimonial (Real Stories) ── */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group max-w-xl mx-auto lg:mx-0">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border-4 border-zinc-50">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop"
                  alt="Students"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-zinc-900/40 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-2xl hover:scale-110 transition-transform">
                    <PlayCircle className="w-8 h-8 ml-1" />
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
            </div>

            <div>
              <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 mb-6 leading-tight tracking-tight">
                See How iNetz Transforms <br />
                <span className="text-emerald-600">Careers.</span>
              </h2>
              <p className="text-zinc-600 text-sm mb-8 leading-relaxed font-medium">
                Watch real students share how iNetz helped them secure internships, access affordable training, improve technical skills, and increase their employability with smart support and expert guidance.
              </p>
              <Link href="/register" className="px-8 py-4 bg-zinc-900 text-white font-bold rounded-lg hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/20 text-xs uppercase tracking-wide">
                Join iNetz Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ Section (Accordions) ── */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 mb-4 tracking-tight">Common Questions</h2>
            <p className="text-zinc-500 text-sm font-medium">Everything you need to know about starting, learning, and growing with iNetz.</p>
          </div>

          <div className="space-y-3">
            {faqData.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors"
                >
                  <span className="text-base font-bold text-zinc-800">{faq.q}</span>
                  {openFaq === i ? <Minus className="w-4 h-4 text-emerald-600" /> : <Plus className="w-4 h-4 text-zinc-400" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-zinc-500 text-sm leading-relaxed font-medium">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Office Life Section (Visual Gallery) ── */}
      <section className="py-20 bg-zinc-50 border-y border-zinc-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 mb-4 tracking-tight">Inside iNetz: Life at the Hub</h2>
            <p className="text-zinc-500 text-sm font-medium leading-relaxed">Where innovation meets collaboration. Explore our modern workspace designed for the next generation of tech leaders.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officeImages.map((image, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-white"
              >
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-zinc-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="text-white font-bold text-base translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                    {image.title}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Latest Insights (News Cards) ── */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 mb-4 tracking-tight leading-tight">News, Insights & Updates</h2>
              <p className="text-zinc-500 text-sm font-medium">Stay updated with scholarship announcements, career tips, industry insights, and growth strategies.</p>
            </div>
            <Link href="/blog" className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 text-[10px] uppercase tracking-widest whitespace-nowrap">
              Explore All News
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest rounded-md shadow-lg">
                    {post.category}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-400 mb-4 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-emerald-500" /> {post.author}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-200" />
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-emerald-500" /> {post.date}</span>
                  </div>
                  <h3 className="text-lg font-black text-zinc-900 mb-4 leading-tight group-hover:text-emerald-600 transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-zinc-500 text-xs mb-6 line-clamp-2 font-medium leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.id}`} className="text-[10px] font-black uppercase tracking-widest text-zinc-900 flex items-center gap-2 group/link">
                    Read More
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover/link:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── 10. Latest Insights (News Cards) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 mb-4 tracking-tight leading-tight">News, Insights & Career Hub</h2>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                Stay updated with scholarship announcements, career tips, and software developer internship opportunities in Chennai. From Hadoop training to embedded systems insights, we cover everything freshers need for high-growth careers in IT.
              </p>
            </div>
            <Link href="/blog" className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 text-[10px] uppercase tracking-widest whitespace-nowrap">
              Explore All News
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest rounded-md shadow-lg">
                    {post.category}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-400 mb-4 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-emerald-500" /> {post.author}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-200" />
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-emerald-500" /> {post.date}</span>
                  </div>
                  <h3 className="text-lg font-black text-zinc-900 mb-4 leading-tight group-hover:text-emerald-600 transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-zinc-500 text-xs mb-6 line-clamp-2 font-medium leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.id}`} className="text-[10px] font-black uppercase tracking-widest text-zinc-900 flex items-center gap-2 group/link">
                    Read More
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover/link:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="py-24 px-6 bg-zinc-950 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#10b981,transparent_50%)]" />
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black mb-6 leading-[1.1] tracking-tighter">
            Let&apos;s Build Your <br />
            <span className="text-emerald-500 italic">Future Together.</span>
          </h2>
          <div className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-10 opacity-70">
            3rd Floor, K.P Towers, Arcot Road, Opposite Nexus Vijaya Mall, Vadapalani, Chennai 600026
          </div>
          <p className="text-zinc-400 text-base mb-10 max-w-xl mx-auto font-medium opacity-80 leading-relaxed">
            Join the best software training institute in Chennai. From 1 month internships in Vadapalani to placement-ready career paths in Python, AI, and MERN, Inetz Technologies is your trusted partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/programs" className="px-8 py-4 bg-emerald-600 text-white font-black rounded-lg hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-500/40 text-[10px] uppercase tracking-[0.2em]">
              Join Our Programs
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-lg hover:bg-white/10 transition-all text-[10px] uppercase tracking-[0.2em]">
              Kickstart Your Career
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
