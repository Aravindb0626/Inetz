"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Tag, ChevronRight, User } from "lucide-react";

// Dummy data for blog posts and company stories
const featuredStory = {
  id: "featured-1",
  title: "The Genesis of INetz: Transforming Internship Experiences",
  excerpt: "Discover how we started INetz Technologies with a vision to bridge the gap between academic learning and industry requirements. Our journey from a small idea to a robust platform.",
  author: "Aravind B",
  date: "Oct 24, 2026",
  readTime: "8 min read",
  category: "Company Story",
  imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop",
};

const stories = [
  {
    id: "story-1",
    title: "Why Mentorship Matters in Early Careers",
    excerpt: "Exploring the pivotal role mentors play in shaping the career trajectories of young professionals and how our platform facilitates these connections.",
    author: "Sarah Jenkins",
    date: "Oct 18, 2026",
    readTime: "5 min read",
    category: "Insights",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "story-2",
    title: "Building Scalable Architecture: A Technical Deep Dive",
    excerpt: "An inside look at how our engineering team designed the scalable, microservices-based architecture that powers the INetz internship platform.",
    author: "Tech Team",
    date: "Oct 12, 2026",
    readTime: "12 min read",
    category: "Engineering",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "story-3",
    title: "Navigating the Transition from Campus to Corporate",
    excerpt: "Actionable advice for recent graduates on adapting to the corporate workplace, understanding office dynamics, and making a lasting impact.",
    author: "Priya Sharma",
    date: "Oct 05, 2026",
    readTime: "6 min read",
    category: "Career Advice",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "story-4",
    title: "The Future of Remote Internships",
    excerpt: "How remote work paradigms are reshaping internships. Are virtual internships here to stay? We analyze current trends and future possibilities.",
    author: "David Chen",
    date: "Sep 28, 2026",
    readTime: "7 min read",
    category: "Trends",
    imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop",
  }
];

const timelineEvents = [
  { year: "2024", title: "The Inception", desc: "INetz was founded with a mission to democratize premium tech education and real-world experience." },
  { year: "2025", title: "First 1,000 Interns", desc: "We successfully placed over 1,000 interns across top-tier partner companies globally." },
  { year: "2026", title: "Boutique Platform Launch", desc: "Launched our state-of-the-art 'Boutique' learning management platform, revolutionizing candidate experience." },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20 pt-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-8 max-w-7xl mx-auto mb-20">
        <div className="absolute inset-0 bg-orange-500/5 dark:bg-orange-500/10 blur-[120px] rounded-full -z-10" />
        <div className="text-center max-w-3xl mx-auto pt-10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold text-sm mb-6"
          >
            <BookOpen className="w-4 h-4" />
            <span>Our Journal & Stories</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6"
          >
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Company Stories</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-zinc-600 dark:text-zinc-400"
          >
            Discover the narrative that drives INetz Technologies. Dive into deep insights, engineering marvels, and the human stories behind our boutique platform.
          </motion.p>
        </div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl hover:border-orange-500/30 transition-all duration-500"
        >
          <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl w-full">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent z-10" />
            <Image
              src={featuredStory.imageUrl}
              alt={featuredStory.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute bottom-4 left-4 z-20 flex gap-2">
               <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-orange-500 text-white rounded-full">
                  Featured
               </span>
               <span className="px-3 py-1 text-xs font-semibold bg-white/20 backdrop-blur-md text-white rounded-full">
                  {featuredStory.category}
               </span>
            </div>
          </div>
          
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {featuredStory.date}
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <div>{featuredStory.readTime}</div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-orange-500 transition-colors duration-300">
              {featuredStory.title}
            </h2>
            
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
              {featuredStory.excerpt}
            </p>
            
            <div className="pt-4 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{featuredStory.author}</div>
                  <div className="text-xs text-zinc-500">Co-Founder, INetz</div>
                </div>
              </div>
              
              <Link href={`/blog/${featuredStory.id}`} className="inline-flex items-center gap-2 text-orange-500 font-semibold group/btn hover:text-orange-600 transition-colors">
                Read Story
                <span className="p-1 rounded-full bg-orange-100 dark:bg-orange-500/20 group-hover/btn:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* The INetz Journey / Timeline Section */}
      <section className="bg-white dark:bg-zinc-900 py-24 mb-20 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Our Journey So Far</h3>
            <p className="text-zinc-600 dark:text-zinc-400">The milestones that define our path forward.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={event.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 hover:border-orange-500/50 transition-colors"
              >
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 to-zinc-400 dark:from-zinc-700 dark:to-zinc-800 mb-4 opacity-50 absolute right-8 top-8">
                  {event.year}
                </div>
                <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 relative z-10">{event.title}</div>
                <p className="text-zinc-600 dark:text-zinc-400 relative z-10">{event.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid of Latest Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Latest from the Desk</h3>
            <p className="text-zinc-600 dark:text-zinc-400">Fresh insights and updates from our team.</p>
          </div>
          <Link href="/blog/categories" className="hidden md:flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-orange-500 transition-colors">
            View all categories <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {stories.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col sm:flex-row gap-6 bg-white dark:bg-zinc-900 rounded-3xl p-4 border border-zinc-200 dark:border-zinc-800 hover:shadow-xl hover:border-orange-500/30 transition-all duration-300"
            >
              <div className="relative w-full sm:w-48 aspect-video sm:aspect-square flex-shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="flex flex-col flex-1 justify-center py-2 pr-2">
                <div className="flex items-center gap-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
                  <span className="flex items-center gap-1 text-orange-500">
                    <Tag className="w-3 h-3" /> {post.category}
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-orange-500 transition-colors mb-2 line-clamp-2">
                  <Link href={`/blog/${post.id}`} className="focus:outline-none">
                    <span className="absolute inset-0 z-10" aria-hidden="true" />
                    {post.title}
                  </Link>
                </h4>
                
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500">
                  <span className="font-medium text-zinc-900 dark:text-zinc-300">{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Newsletter / CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 mt-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-zinc-900 dark:bg-zinc-800 rounded-[2.5rem] p-10 md:p-16 overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-transparent opacity-50" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay in the Loop</h3>
            <p className="text-zinc-400 mb-8">Get the latest stories, insights, and updates from INetz Technologies delivered directly to your inbox. No spam, just value.</p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-zinc-500 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                required
              />
              <button 
                type="submit" 
                className="bg-orange-500 text-white font-bold rounded-full px-8 py-3 hover:bg-orange-600 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
