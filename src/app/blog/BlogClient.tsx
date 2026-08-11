"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Award, Briefcase, HelpCircle, Check, Search, Calendar, Clock, ChevronLeft, ChevronRight, PlayCircle, Star, Send } from "lucide-react";

export default function BlogClient() {
  const [activeTag, setActiveTag] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [dbJournals, setDbJournals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchJournals = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/journal");
        if (res.ok) {
          const data = await res.json();
          setDbJournals(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchJournals();
  }, []);

  const MOCK_JOURNALS = [
    {
      _id: "m1",
      title: "Building a Real-World Web Application During Our Internship",
      excerpt: "Our interns built a full-stack web application from scratch using React, Node.js and MongoDB. Here's how we planned, designed and deployed our project successfully.",
      category: "Projects",
      date: "2026-08-08T00:00:00.000Z",
      readTime: "6 min read",
      isFeatured: true,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    },
    {
      _id: "m2",
      title: "SEO Workshop: Keyword Research to Ranking",
      category: "Data Science",
      date: "2026-08-06T00:00:00.000Z",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    },
    {
      _id: "m3",
      title: "Full-Stack E-Commerce Website Development (MERN Stack)",
      category: "Projects",
      date: "2026-08-05T00:00:00.000Z",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    },
    {
      _id: "m4",
      title: "Interns Talk: Our Experience So Far in Java Training",
      category: "Java Full Stack",
      date: "2026-08-03T00:00:00.000Z",
      readTime: "4 min read",
      videoUrl: "yes",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
    },
    {
      _id: "m5",
      title: "Team Building Activities and Office Fun",
      category: "Python Full Stack",
      date: "2026-08-01T00:00:00.000Z",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=600",
    },
    {
      _id: "m6",
      title: "AWS Cloud Certifications Earned by Our DevOps Interns",
      category: "Achievements",
      date: "2026-07-30T00:00:00.000Z",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?auto=format&fit=crop&q=80&w=600",
    },
    {
      _id: "m7",
      title: "UI/UX Design Workshop with Figma for Frontend Devs",
      category: "MERN Stack",
      date: "2026-07-28T00:00:00.000Z",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=600",
    },
    {
      _id: "m8",
      title: "Java Spring Boot API Project Implementation",
      category: "Projects",
      date: "2026-07-25T00:00:00.000Z",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    },
    {
      _id: "m9",
      title: "Python Machine Learning Workshop: From Data to Model",
      category: "Python Full Stack",
      date: "2026-07-20T00:00:00.000Z",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    },
    {
      _id: "m10",
      title: "Interns Cracking Data Science Roles with Python",
      category: "Achievements",
      date: "2026-07-18T00:00:00.000Z",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?auto=format&fit=crop&q=80&w=600",
    },
    {
      _id: "m11",
      title: "Data Structures & Algorithms (DSA) Mastery Hackathon",
      category: "Java Full Stack",
      date: "2026-07-15T00:00:00.000Z",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
    },
    {
      _id: "m12",
      title: "Embedded Systems & IoT Hardware Prototyping",
      category: "Projects",
      date: "2026-07-10T00:00:00.000Z",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    },
    {
      _id: "m13",
      title: "Advanced DevOps and Docker Deployment Workshop",
      category: "Java Full Stack",
      date: "2026-07-05T00:00:00.000Z",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=600",
    },
    {
      _id: "m14",
      title: "A Day in the Life of a Tech Intern in Chennai",
      category: "MERN Stack",
      date: "2026-07-01T00:00:00.000Z",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=600",
    },
    {
      _id: "m15",
      title: "Full-Stack Development Bootcamp Graduation",
      category: "MERN Stack",
      date: "2026-06-25T00:00:00.000Z",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
    },
    {
      _id: "m16",
      title: "Database Optimization with MongoDB and PostgreSQL",
      category: "Data Science",
      date: "2026-06-20T00:00:00.000Z",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    },
    {
      _id: "m17",
      title: "Building Real-Time Chat Apps with Socket.io (MERN)",
      category: "Projects",
      date: "2026-06-15T00:00:00.000Z",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    },
    {
      _id: "m18",
      title: "Interns Placed at Top Tech Companies",
      category: "Achievements",
      date: "2026-06-10T00:00:00.000Z",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?auto=format&fit=crop&q=80&w=600",
    },
    {
      _id: "m19",
      title: "Weekly Code Reviews and Refactoring Sessions",
      category: "Python Full Stack",
      date: "2026-06-05T00:00:00.000Z",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=600",
    },
    {
      _id: "m20",
      title: "Software Engineering Best Practices and Agile",
      category: "Java Full Stack",
      date: "2026-06-01T00:00:00.000Z",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=600",
    },
    {
      _id: "m21",
      title: "Our Weekly Friday Fun and Gaming Tournaments",
      category: "Data Science",
      date: "2026-05-25T00:00:00.000Z",
      readTime: "2 min read",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=600",
    },
  ];

  const MOCK_LATEST_UPDATES = [
    { _id: "u1", date: "2026-08-08T00:00:00.000Z", title: "New Web Development Project Completed" },
    { _id: "u2", date: "2026-08-06T00:00:00.000Z", title: "Digital Marketing & SEO Workshop Conducted" },
    { _id: "u3", date: "2026-08-03T00:00:00.000Z", title: "Java & Python Intern Presentation Day" },
    { _id: "u4", date: "2026-08-01T00:00:00.000Z", title: "MERN Stack Training Session Kickoff" }
  ];

  const MOCK_GALLERY = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600"
  ];

  const MOCK_CATEGORIES = [
    { name: "Projects", count: 12, match: "PROJECTS" },
    { name: "Achievements", count: 10, match: "ACHIEVEMENTS" },
    { name: "Java Full Stack", count: 8, match: "JAVA FULL STACK" },
    { name: "Python Full Stack", count: 7, match: "PYTHON FULL STACK" },
    { name: "MERN Stack", count: 9, match: "MERN STACK" },
    { name: "Data Science", count: 6, match: "DATA SCIENCE" },
  ];

  const allJournals = [...dbJournals, ...MOCK_JOURNALS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Filtering
  const filteredPosts = allJournals.filter(post => {
    let matchesTag = true;
    if (activeTag !== "All") {
      const activeCat = MOCK_CATEGORIES.find(c => c.name === activeTag);
      matchesTag = post.category?.toUpperCase() === activeCat?.match || post.category === activeTag;
    }
    const matchesSearch = post.title.toLowerCase().includes(searchInput.toLowerCase()) || 
                          (post.excerpt && post.excerpt.toLowerCase().includes(searchInput.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  // Extract featured post and latest updates
  const featuredPost = filteredPosts.find(p => p.isFeatured) || filteredPosts[0];
  const regularPosts = featuredPost ? filteredPosts.filter(p => p._id !== featuredPost._id) : filteredPosts;
  
  const latestUpdates = [...dbJournals, ...MOCK_LATEST_UPDATES].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);

  // Extract all gallery images, fallback to mock if DB empty
  const galleryImages = dbJournals.flatMap(post => post.galleryImages || []).length > 0 
    ? dbJournals.flatMap(post => post.galleryImages || []).slice(0, 6) 
    : MOCK_GALLERY;

  const categories = [{ name: "All", count: allJournals.length }, ...MOCK_CATEGORIES];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFE] font-sans text-gray-900 pb-20">
      
      {/* ── Top Hero Section ── */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-6 relative z-10">
        <div className="w-full bg-gradient-to-r from-[#0E1F4C] to-[#122A6B] rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-lg">
          <div className="md:w-1/2 text-left space-y-4 p-10 md:p-14 relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-400/30 bg-white/5 text-blue-200 text-[10px] font-semibold tracking-widest uppercase mb-2">
              <BookOpen size={12} className="text-blue-300" />
              OUR JOURNEY
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              Internship Journal
            </h1>
            <p className="text-lg font-semibold text-blue-400">
              Learn. Grow. Build. Succeed.
            </p>
            <p className="text-gray-300 text-sm max-w-sm leading-relaxed mt-2">
              Explore our interns' projects, learning experiences, workshops, events and achievements.
            </p>
            
            <div className="flex items-center gap-4 pt-4">
              <button className="px-5 py-2.5 bg-[#1C51F9] hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 text-sm shadow-md">
                Explore Stories <ArrowRight size={14} />
              </button>
              <button className="px-5 py-2.5 bg-transparent border border-gray-500 hover:border-gray-300 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 text-sm">
                Watch Videos <PlayCircle size={14} />
              </button>
            </div>
          </div>

          <div className="md:w-1/2 w-full h-[300px] md:h-full absolute right-0 bottom-0 md:static">
            <div className="absolute inset-0 bg-gradient-to-r from-[#122A6B] to-transparent z-10 hidden md:block w-32" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#122A6B] to-transparent z-10 block md:hidden h-32 bottom-0" />
            <Image 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
              alt="Students collaborating" 
              fill
              className="object-cover object-left"
            />
          </div>
        </div>
      </div>

      {/* ── Search & Filter Bar ── */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 mt-8 relative z-20 flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-full md:w-[280px] shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search internship stories..." 
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm text-gray-700"
          />
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setActiveTag(cat.name)}
              className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTag === cat.name 
                  ? "bg-[#1C51F9] text-white shadow-md" 
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 shadow-sm"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (Main Posts) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Featured Post */}
            {featuredPost && (
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col md:flex-row group transition-all hover:shadow-md h-auto">
                <div className="md:w-[45%] relative min-h-[250px] md:min-h-auto overflow-hidden">
                  <Image 
                    src={featuredPost.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"} 
                    alt={featuredPost.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="md:w-[55%] p-6 md:p-8 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EEF2FF] text-[#1C51F9] text-[9px] font-bold tracking-wider uppercase mb-3 w-fit">
                    <Star size={10} className="fill-[#1C51F9]" /> FEATURED STORY
                  </div>
                  <h2 className="text-xl md:text-[22px] font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#1C51F9] transition-colors">
                    <Link href={`/blog/${featuredPost.slug || featuredPost._id}`}>{featuredPost.title}</Link>
                  </h2>
                  <p className="text-gray-500 text-[13px] mb-5 line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt || (featuredPost.content?.replace(/<[^>]+>/g, '').substring(0, 150) + "...")}
                  </p>
                  
                  <div className="flex items-center gap-4 text-[11px] text-gray-500 font-medium mb-5">
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1.5"><BookOpen size={12} /> {featuredPost.category}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {featuredPost.readTime || "6 min read"}</span>
                  </div>
                  
                  <Link href={`/blog/${featuredPost.slug || featuredPost._id}`} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1C51F9] text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors w-fit shadow-md">
                    Read Full Story <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )}

            {/* Grid of regular posts (3 columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {regularPosts.map((post) => (
                <div key={post._id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm group hover:shadow-md transition-all flex flex-col h-full">
                  <Link href={`/blog/${post.slug || post._id}`} className="relative h-[150px] overflow-hidden block shrink-0">
                    <Image 
                      src={post.image || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600"} 
                      alt={post.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {post.videoUrl && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/50 shadow-lg">
                          <PlayCircle size={20} className="fill-transparent text-white" strokeWidth={1.5} />
                        </div>
                      </div>
                    )}
                  </Link>
                  
                  <div className="p-4 flex flex-col flex-1">
                    <div className="inline-flex px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[8px] font-bold tracking-wider uppercase mb-2 w-fit">
                      {post.category}
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1.5 leading-snug group-hover:text-[#1C51F9] transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug || post._id}`}>{post.title}</Link>
                    </h3>
                    
                    <div className="mt-auto pt-3 flex items-center justify-between text-[10px] text-gray-400 font-medium">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1"><Calendar size={10} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                        <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime || "5 min read"}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 pt-2 border-t border-gray-50">
                      <Link href={`/blog/${post.slug || post._id}`} className="inline-flex items-center gap-1 text-[#1C51F9] text-[11px] font-bold hover:text-blue-800 transition-colors">
                        {post.videoUrl ? "Watch Video" : "Read More"} <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center pt-2">
              <button className="px-6 py-2.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm flex items-center gap-2 transition-colors">
                Load More Stories <ChevronRight size={14} className="rotate-90" />
              </button>
            </div>
            
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Latest Updates */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-[15px] font-bold text-gray-900 mb-5">Latest Updates</h3>
              <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[11px] before:translate-x-[1px] before:h-full before:w-px before:bg-gray-100">
                {latestUpdates.map((update, i) => (
                  <div key={update._id} className="relative flex items-start gap-4 mb-5 last:mb-0">
                    <div className={`w-[22px] h-[22px] rounded-full border-4 border-white shrink-0 z-10 flex items-center justify-center mt-0.5 shadow-sm
                      ${i === 0 ? 'bg-[#1C51F9]' : i === 1 ? 'bg-emerald-400' : i === 2 ? 'bg-orange-400' : 'bg-purple-500'}`} 
                    />
                    <div className="flex-1 pb-1 flex gap-3">
                      <div className="flex flex-col items-center shrink-0">
                        <span className="text-[14px] font-bold text-gray-900 leading-none">{new Date(update.date).getDate().toString().padStart(2, '0')}</span>
                        <span className="text-[8px] font-bold text-gray-400 uppercase mt-1">{new Date(update.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                      </div>
                      <h4 className="text-[13px] font-medium text-gray-800 leading-snug hover:text-[#1C51F9] cursor-pointer transition-colors line-clamp-2 pt-0.5">
                        <Link href={`/blog/${update.slug || update._id}`}>{update.title}</Link>
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-3 border-t border-gray-50 flex justify-center">
                <Link href="#" className="text-[11px] font-bold text-[#1C51F9] hover:text-blue-800 flex items-center gap-1 transition-colors">
                  View All Updates <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-[15px] font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-1">
                {categories.filter(c => c.name !== "All").map(cat => {
                  let Icon = BookOpen;
                  if (cat.name === "Projects") Icon = Briefcase;
                  else if (cat.name === "Achievements") Icon = Award;
                  else if (cat.name === "Java Full Stack") Icon = BookOpen;
                  else if (cat.name === "Python Full Stack") Icon = BookOpen;
                  else if (cat.name === "MERN Stack") Icon = BookOpen;
                  else if (cat.name === "Data Science") Icon = BookOpen;

                  return (
                    <div key={cat.name} onClick={() => setActiveTag(cat.name)} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group">
                      <div className="flex items-center gap-3">
                        <Icon size={14} className="text-gray-400 group-hover:text-[#1C51F9] transition-colors" />
                        <span className="text-[13px] font-medium text-gray-700">{cat.name}</span>
                      </div>
                      <span className="bg-gray-50 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-100">
                        {String(cat.count).padStart(2, '0')}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Start Your Journey CTA */}
            <div className="bg-[#0B1A3F] rounded-2xl p-7 relative overflow-hidden text-white shadow-xl">
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-gradient-to-tl from-[#1C51F9]/40 to-transparent rounded-tl-full pointer-events-none"></div>
              
              <h3 className="text-lg font-bold mb-2 relative z-10">Start Your Journey</h3>
              <p className="text-gray-300 text-xs mb-6 relative z-10 max-w-[180px] leading-relaxed">
                Join our internship program and build your future with us.
              </p>
              
              <Link href="/apply" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0B1A3F] text-[11px] font-bold rounded-lg hover:bg-gray-100 transition-colors relative z-10 shadow-sm">
                Join Internship <ArrowRight size={12} />
              </Link>
              
              <div className="absolute -right-2 bottom-4 opacity-90 text-white drop-shadow-md z-0">
                <Image src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'><path fill='%23ffffff' d='M32 10L4 24l28 14 24-12v18h4V24L32 10zm-6 29.8v10.4c0 1.1 4.5 3.8 6 3.8s6-2.7 6-3.8V39.8l-6 3-6-3z'/></svg>" alt="Graduation Cap" width={70} height={70} />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Internship Moments (Gallery Carousel) ── */}
      {galleryImages.length > 0 && (
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 mt-16 bg-[#FAFBFF] py-10 rounded-3xl border border-gray-100 mb-10 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#EEF2FF] rounded-lg flex items-center justify-center text-[#1C51F9]">
                <Image src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%231c51f9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect width='18' height='18' x='3' y='3' rx='2' ry='2'/><circle cx='9' cy='9' r='2'/><path d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/></svg>" alt="Camera" width={18} height={18} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">Internship Moments</h3>
                <p className="text-[11px] text-gray-500 font-medium">Glimpses from our journey</p>
              </div>
            </div>
            <Link href="#" className="text-[11px] font-bold text-[#1C51F9] hover:text-blue-800 flex items-center gap-1 transition-colors">
              View Full Gallery <ArrowRight size={12} />
            </Link>
          </div>
          
          <div className="relative group px-4">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4">
              {galleryImages.map((img, i) => (
                <div key={i} className="w-[180px] h-[130px] md:w-[220px] md:h-[150px] relative rounded-xl overflow-hidden snap-center shrink-0 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <Image 
                    src={img} 
                    alt={`Moment ${i+1}`} 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                  />
                  {i % 3 === 1 && ( 
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none">
                      <PlayCircle size={32} className="text-white/90 fill-black/30" strokeWidth={1} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Nav Buttons */}
            <button className="absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#1C51F9] opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft size={16} />
            </button>
            <button className="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#1C51F9] opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── Newsletter Subscribe ── */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 mt-10">
        <div className="bg-[#EEF2FF] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1C51F9] rounded-full flex items-center justify-center shrink-0 shadow-md">
              <Send size={20} className="text-white ml-[-2px] mt-[2px]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1 leading-snug">Stay Updated with Our Journey</h3>
              <p className="text-gray-600 text-xs max-w-sm leading-relaxed">
                Subscribe to get the latest updates on our internships, projects, events and achievements.
              </p>
            </div>
          </div>
          
          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <input 
              type="email" 
              required
              placeholder="Enter your email" 
              className="w-full sm:w-[260px] px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-xs outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
            />
            <button 
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#1C51F9] text-white font-bold rounded-lg hover:bg-blue-700 transition-colors text-xs shadow-md flex items-center justify-center gap-2"
            >
              {subscribed ? <><Check size={14} /> Subscribed</> : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
