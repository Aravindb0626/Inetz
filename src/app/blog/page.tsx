// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowUp, BookOpen, Award, Briefcase, HelpCircle, Mail, Check } from "lucide-react";
// import { categories, blogPosts } from "./data";

// const getAuthorAvatar = (author: string): string => {
//   const avatars: Record<string, string> = {
//     "Senthil Kumar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
//     "Vigneshwaran": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
//     "Amal": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
//     "Preethi": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
//     "Aravindh": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
//     "Boomika": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
//     "Sri Dhanalakshmi": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
//     "Anbu": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80"
//   };
//   return avatars[author] || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80";
// };

// const getPostDate = (postId: string, index: number): string => {
//   const baseDate = new Date("2026-03-15");
//   baseDate.setDate(baseDate.getDate() - (index * 2));
//   const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
//   return baseDate.toLocaleDateString('en-US', options);
// };

// export default function BlogClient() {
//   const [activeTag, setActiveTag] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const [visibleCount, setVisibleCount] = useState(12);
//   const [subscribed, setSubscribed] = useState(false);
//   const [openFaq, setOpenFaq] = useState<number | null>(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 300) {
//         setShowScrollTop(true);
//       } else {
//         setShowScrollTop(false);
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Reset pagination count when filters change
//   useEffect(() => {
//     setVisibleCount(12);
//   }, [activeTag, searchQuery]);

//   // Filter posts based on activeTag and search queries using a smart word-splitting search
//   const filteredPosts = blogPosts.filter(post => {
//     const matchesTag = activeTag === "All" || post.category === activeTag;

//     if (!searchQuery.trim()) {
//       return matchesTag;
//     }

//     const queryWords = searchQuery.toLowerCase().trim().split(/\s+/);

//     // Every searched word must match at least one of the fields
//     const matchesSearch = queryWords.every(word => {
//       return (
//         post.title.toLowerCase().includes(word) ||
//         post.excerpt.toLowerCase().includes(word) ||
//         post.content.toLowerCase().includes(word) ||
//         post.category.toLowerCase().includes(word) ||
//         post.author.toLowerCase().includes(word)
//       );
//     });

//     return matchesTag && matchesSearch;
//   });

//   const displayedPosts = filteredPosts.slice(0, visibleCount);

//   const loadMore = () => {
//     setVisibleCount(prev => prev + 12);
//   };

//   const handleSubscribe = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubscribed(true);
//     setTimeout(() => setSubscribed(false), 5000);
//   };

//   return (
//     <div className="min-h-screen bg-white font-sans text-gray-900 pb-20 relative">
//       {/* ── Top Hero Section ── */}
//       <div className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] pt-18 pb-20 px-6 overflow-hidden">
//         {/* Decorative blur shapes */}
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

//         <div className="max-w-[1200px] mx-auto text-center relative z-10">
//           <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-emerald-400 bg-emerald-500/10 uppercase mb-4 inline-block">
//             Inetz Knowledge Base
//           </span>
//           <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
//             Level Up Your Tech Skills with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Inetz Technologies</span>
//           </h1>
//           <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light">
//             Deep-dives into Java microservices, MERN full stack, Python OOPs, interview coding prep, and embedded IoT systems from our Vadapalani, Chennai team.
//           </p>

//           {/* Search bar inside hero */}
//           <div className="max-w-xl mx-auto relative mb-12">
//             <input
//               type="text"
//               placeholder="Search through 300+ technical guides..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all text-base shadow-lg"
//             />
//             <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
//               🔍
//             </span>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
//             <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl text-left transition-all hover:bg-white/10 hover:border-white/20">
//               <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
//                 <BookOpen className="w-5 h-5" />
//               </div>
//               <h3 className="text-white font-semibold text-lg mb-1">300+ Technical Guides</h3>
//               <p className="text-gray-400 text-sm">Java, MERN stack, DSA, DevOps, SQL, and hardware IoT guides.</p>
//             </div>

//             <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl text-left transition-all hover:bg-white/10 hover:border-white/20">
//               <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
//                 <Briefcase className="w-5 h-5" />
//               </div>
//               <h3 className="text-white font-semibold text-lg mb-1">Project-Aligned Learning</h3>
//               <p className="text-gray-400 text-sm">Every tutorial is mapped directly to our 5 mini and 2 major industry project standard.</p>
//             </div>

//             <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl text-left transition-all hover:bg-white/10 hover:border-white/20">
//               <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
//                 <Award className="w-5 h-5" />
//               </div>
//               <h3 className="text-white font-semibold text-lg mb-1">100% Placement Guided</h3>
//               <p className="text-gray-400 text-sm">Master mock questions, real coding rounds, and interview tips for top Chennai MNCs.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Category Filter Area */}
//       <div className="w-full bg-gray-50/50 py-8 px-6 border-b border-gray-100 sticky top-16 z-30 backdrop-blur-md">
//         <div className="max-w-[1200px] mx-auto">
//           <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
//             {categories.map((cat) => (
//               <button
//                 key={cat.name}
//                 onClick={() => setActiveTag(cat.name)}
//                 className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTag === cat.name
//                     ? "bg-[#3C9657] text-white shadow-md scale-105"
//                     : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-900"
//                   }`}
//               >
//                 {cat.name} <span className="opacity-60 text-xs font-normal ml-1">({cat.count})</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Blog Grid Area */}
//       <div className="w-full bg-white pt-12 px-6">
//         <div className="max-w-[1200px] mx-auto">
//           {displayedPosts.length > 0 ? (
//             <div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {displayedPosts.map((post) => (
//                   <Link href={`/blog/${post.id}`} key={post.id} className="group flex flex-col h-full no-underline outline-none">
//                     <div className="flex flex-col h-full bg-white border border-[#E5E7EB] rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">

//                       {/* Clean Card Image with 1.6 aspect ratio */}
//                       <div className="relative aspect-[1.6] w-full bg-zinc-50 overflow-hidden border-b border-[#F3F4F6]">
//                         <Image
//                           src={post.image}
//                           alt={post.title}
//                           fill
//                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                           className="object-cover transition-transform duration-500 group-hover:scale-105"
//                         />
//                       </div>

//                       {/* Content Area with 24px padding */}
//                       <div className="p-6 flex flex-col flex-grow text-left">
//                         {/* Article Category Line */}
//                         <div className="text-[11px] font-bold tracking-wide mb-2.5 flex items-center">
//                           <span className="text-[#2563EB]">ARTICLE</span>
//                           <span className="text-gray-300 mx-2 font-normal">|</span>
//                           <span className="text-[#6B7280] font-normal">in {post.category}</span>
//                         </div>

//                         {/* Title */}
//                         <h3 className="text-[#1F2937] font-semibold text-[17px] leading-[1.4] mb-6 line-clamp-3 group-hover:text-[#2563EB] transition-colors duration-200 flex-grow">
//                           {post.title}
//                         </h3>

//                         {/* Footer Section */}
//                         <div className="flex items-center justify-between mt-auto">
//                           {/* Author Avatar & Name */}
//                           <div className="flex items-center gap-3">
//                             <div className="relative w-9 h-9 rounded-full overflow-hidden bg-zinc-100 border border-gray-100">
//                               <Image
//                                 src={getAuthorAvatar(post.author)}
//                                 alt={post.author}
//                                 fill
//                                 className="object-cover"
//                               />
//                             </div>
//                             <span className="text-[#4B5563] font-medium text-[13px]">{post.author}</span>
//                           </div>

//                           {/* Date */}
//                           <div className="text-[#9CA3AF] text-[12px] font-normal">
//                             {getPostDate(post.id, blogPosts.findIndex(p => p.id === post.id))}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>

//               {/* Load More Button */}
//               {filteredPosts.length > visibleCount && (
//                 <div className="text-center mt-14">
//                   <button
//                     onClick={loadMore}
//                     className="px-8 py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 duration-200 shadow-md text-sm cursor-pointer"
//                   >
//                     Load More Articles ({filteredPosts.length - visibleCount} remaining)
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="py-20 text-center text-gray-500 text-[15px]">
//               No posts found matching the query. Try searching for another topic.
//             </div>
//           )}
//         </div>
//       </div>

//       {/* FAQ Section */}
//       <div className="w-full bg-[#F8FAFC] py-20 px-6 border-t border-b border-gray-100 mt-20">
//         <div className="max-w-[800px] mx-auto">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
//               <HelpCircle className="w-4 h-4" /> FAQ
//             </div>
//             <h2 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
//             <p className="text-gray-500 mt-2">Find answers to common questions about our technical tutorials and training programs.</p>
//           </div>

//           <div className="space-y-4">
//             {[
//               {
//                 q: "How do these blog guides support my placement preparation?",
//                 a: "All of our articles—spanning Java microservices, SQL queries, and Data Structures—are crafted based on actual coding tests and technical interview rounds conducted by top MNCs and IT start-ups in Vadapalani and across Chennai. They offer practical answers and codebase examples designed to match high-tier developer evaluations."
//               },
//               {
//                 q: "Can I get hands-on classroom training for these topics?",
//                 a: "Absolutely. Inetz Technologies offers structured, physical classroom programs and intensive 1-month/15-day internships at our state-of-the-art training facility in Vadapalani, Chennai. You will work on 5 mini-projects and 2 major industrial-grade applications under the direct guidance of senior tech lead trainers."
//               },
//               {
//                 q: "Do you offer placement support for freshers?",
//                 a: "Yes! We provide 100% comprehensive placement support, including structured mock interviews, coding assignments, LinkedIn/GitHub optimization, and direct placement drives with our network of hiring partners in Chennai."
//               }
//             ].map((item, idx) => (
//               <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
//                 <button
//                   onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
//                   className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-gray-800 hover:text-gray-950 transition-colors focus:outline-none"
//                 >
//                   <span>{item.q}</span>
//                   <span className="text-xl text-[#3C9657] font-bold">{openFaq === idx ? "−" : "+"}</span>
//                 </button>
//                 <div
//                   className={`transition-all duration-300 overflow-hidden ${openFaq === idx ? "max-h-[200px] border-t border-gray-50" : "max-h-0"
//                     }`}
//                 >
//                   <p className="px-6 py-5 text-gray-600 text-sm leading-relaxed bg-gray-50/30">
//                     {item.a}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Newsletter signup area */}
//       <div className="max-w-[1200px] mx-auto px-6 mt-20">
//         <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 py-12 px-8 md:p-16 text-center text-white shadow-xl">
//           {/* Decorative shapes */}
//           <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
//           <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

//           <div className="relative z-10 max-w-2xl mx-auto">
//             <Mail className="w-12 h-12 mx-auto mb-4 opacity-90" />
//             <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
//               Get Tech & Placement Alerts
//             </h2>
//             <p className="text-emerald-100 text-base md:text-lg mb-8 leading-relaxed">
//               Stay ahead of the competition. Receive weekly coding challenges, solved interview sheets, and exclusive software internship alerts from Vadapalani IT firms.
//             </p>

//             <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
//               <input
//                 type="email"
//                 required
//                 placeholder="Enter your email address"
//                 className="flex-grow px-5 py-3.5 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
//               />
//               <button
//                 type="submit"
//                 className="px-6 py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors text-sm shadow-md flex items-center justify-center gap-2"
//               >
//                 {subscribed ? (
//                   <>
//                     <Check className="w-4 h-4 text-emerald-400" />
//                     Subscribed!
//                   </>
//                 ) : (
//                   "Subscribe Now"
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Scroll to Top Button */}
//       {showScrollTop && (
//         <button
//           onClick={scrollToTop}
//           className="fixed bottom-8 right-8 z-50 p-4 bg-[#3C9657] text-white rounded-full shadow-lg hover:bg-[#2e7443] hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
//           aria-label="Scroll to top"
//         >
//           <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
//         </button>
//       )}
//     </div>
//   );
// }








































"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, BookOpen, Award, Briefcase, HelpCircle, Mail, Check, Search, X } from "lucide-react";
import { categories, blogPosts } from "./data";

const getAuthorAvatar = (author: string): string => {
  const avatars: Record<string, string> = {
    "Senthil Kumar": "/staffs/senthilkumar.jpg",
    "Vigneshwaran": "/staffs/vigneshwaran.jpg",
    "Amal": "/staffs/amal.jpeg",
    "Preethi": "/staffs/preethi.png",
    "Aravind": "/staffs/aravindh.png",
    "Boomika": "/staffs/boomika.png",
    "Sri Dhanalakshmi": "/staffs/sridhanalakshmi.png",
    "Anbu": "/staffs/anbu.png"
  };
  return avatars[author] || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80";
};

const getPostDate = (postId: string, index: number): string => {
  const baseDate = new Date("2026-03-15");
  baseDate.setDate(baseDate.getDate() - (index * 2));
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  return baseDate.toLocaleDateString('en-US', options);
};

export default function BlogClient() {
  const [activeTag, setActiveTag] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);

  const executeSearch = (query: string) => {
    setSearchQuery(query);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visibleCount, setVisibleCount] = useState(21);
  const [subscribed, setSubscribed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset pagination count when filters change
  useEffect(() => {
    setVisibleCount(21);
  }, [activeTag, searchInput]);

  // Filter AND sort posts by relevance: title matches first, then excerpt, then content
  const filteredPosts = blogPosts
    .map(post => {
      const matchesTag = activeTag === "All" || post.category === activeTag;
      if (!searchInput.trim()) return { post, score: 0, matchesTag };

      const query = searchInput.toLowerCase().trim();
      const plainContent = post.content.replace(/<[^>]+>/g, ' ').toLowerCase();
      const title = post.title.toLowerCase();
      const excerpt = post.excerpt.toLowerCase();
      const category = post.category.toLowerCase();
      const author = post.author.toLowerCase();

      let score = 0;
      if (title.includes(query)) score += 100;
      if (excerpt.includes(query)) score += 50;
      if (category.includes(query)) score += 40;
      if (author.includes(query)) score += 30;
      if (plainContent.includes(query)) score += 10;

      // Individual word fallback scoring
      const words = query.split(/\s+/).filter(Boolean);
      words.forEach(word => {
        if (title.includes(word)) score += 20;
        if (excerpt.includes(word)) score += 10;
        if (category.includes(word)) score += 8;
        if (author.includes(word)) score += 6;
        if (plainContent.includes(word)) score += 2;
      });

      return { post, score, matchesTag };
    })
    .filter(({ score, matchesTag }) => {
      if (!searchInput.trim()) return matchesTag;
      return matchesTag && score > 0;
    })
    .sort((a, b) => b.score - a.score)
    .map(({ post }) => post);

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prev => prev + 21);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20 relative">
      {/* ── Top Hero Section ── */}
      <div className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] pt-16 md:pt-16 pb-16 md:pb-20 px-4 md:px-6 overflow-hidden">
        {/* Decorative blur shapes */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <span className="px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-semibold tracking-wider text-emerald-400 bg-emerald-500/10 uppercase mb-4 inline-block">
            Inetz Technologies Blog
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 md:mb-6 tracking-tight leading-tight">
            Best Software Training &amp; Internship<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">in Chennai</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed font-light">
            Training resources, study materials, and technical guides from Inetz Technologies, Vadapalani, Chennai — covering Java, MERN Stack, Python, AI/ML, and programming courses in Tamil. The perfect starting point for your Non-IT to IT career switch.
          </p>

          {/* Search bar inside hero */}
          <div className="max-w-xl mx-auto relative mb-12">
            <input
              type="text"
              placeholder="Search through technical guides..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  executeSearch(searchInput);
                }
              }}
              className="w-full px-4 md:px-6 py-3 md:py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all text-sm md:text-base shadow-lg pr-20 md:pr-24"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchInput && (
                <button
                  onClick={() => {
                    setSearchInput("");
                    setSearchQuery("");
                  }}
                  className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => executeSearch(searchInput)}
                className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition-colors cursor-pointer shadow-md"
                aria-label="Execute search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl text-left transition-all hover:bg-white/10 hover:border-white/20">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">300+ Technical Guides</h3>
              <p className="text-gray-400 text-sm">Java, MERN stack, DSA, DevOps, SQL, and hardware IoT guides.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl text-left transition-all hover:bg-white/10 hover:border-white/20">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">Project-Aligned Learning</h3>
              <p className="text-gray-400 text-sm">Every tutorial is mapped directly to our 5 mini and 2 major industry project standard.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl text-left transition-all hover:bg-white/10 hover:border-white/20">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">100% Placement Guided</h3>
              <p className="text-gray-400 text-sm">Master mock questions, real coding rounds, and interview tips for top Chennai MNCs.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Area */}
      <div className="w-full bg-gray-50/50 py-6 md:py-8 px-4 md:px-6 border-b border-gray-100 top-16 z-30 backdrop-blur-md ">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveTag(cat.name)}
                className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${activeTag === cat.name
                    ? "bg-[#3C9657] text-white shadow-md scale-105"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                {cat.name} <span className="opacity-60 text-xs font-normal ml-1">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Blog Grid Area */}
      <div ref={gridRef} className="w-full bg-white pt-8 px-4 md:px-6">
        <div className="max-w-[1200px] mx-auto">

          {/* Search results summary */}
          {searchInput.trim() && (
            <div className="mb-8 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#3C9657]" />
                <span className="text-gray-700 font-medium text-sm">
                  {filteredPosts.length > 0
                    ? <><span className="text-[#3C9657] font-bold">{filteredPosts.length}</span> result{filteredPosts.length !== 1 ? 's' : ''} for <span className="text-gray-900 font-semibold">&ldquo;{searchInput}&rdquo;</span></>
                    : <>No results found for <span className="text-gray-900 font-semibold">&ldquo;{searchInput}&rdquo;</span></>}
                </span>
              </div>
              <button
                onClick={() => setSearchInput('')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 text-xs font-medium transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5" /> Clear search
              </button>
            </div>
          )}
          {displayedPosts.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {displayedPosts.map((post) => (
                  <Link href={`/blog/${post.id}`} key={post.id} className="group flex flex-col h-full no-underline outline-none">
                    <div className="flex flex-col h-full bg-white border border-[#E5E7EB] rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">

                      {/* Clean Card Image with 1.6 aspect ratio */}
                      <div className="relative aspect-[1.6] w-full bg-zinc-50 overflow-hidden border-b border-[#F3F4F6]">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Content Area with responsive padding */}
                      <div className="p-5 md:p-6 flex flex-col flex-grow text-left">
                        {/* Article Category Line */}
                        <div className="text-[11px] font-bold tracking-wide mb-2.5 flex items-center">
                          <span className="text-[#2563EB]">ARTICLE</span>
                          <span className="text-gray-300 mx-2 font-normal">|</span>
                          <span className="text-[#6B7280] font-normal">in {post.category}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-[#1F2937] font-semibold text-base md:text-[17px] leading-[1.4] mb-4 md:mb-6 line-clamp-3 group-hover:text-[#2563EB] transition-colors duration-200 flex-grow">
                          {post.title}
                        </h3>

                        {/* Footer Section */}
                        <div className="flex items-center justify-between mt-auto">
                          {/* Author Avatar & Name */}
                          <div className="flex items-center gap-3">
                            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-zinc-100 border border-gray-100">
                              <Image
                                src={getAuthorAvatar(post.author)}
                                alt={post.author}
                                fill
                                className="object-cover object-top"
                              />
                            </div>
                            <span className="text-[#4B5563] font-medium text-[13px]">{post.author}</span>
                          </div>

                          {/* Date */}
                          <div className="text-[#9CA3AF] text-[12px] font-normal">
                            {getPostDate(post.id, blogPosts.findIndex(p => p.id === post.id))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Load More Button */}
              {filteredPosts.length > visibleCount && (
                <div className="text-center mt-14">
                  <button
                    onClick={loadMore}
                    className="px-6 md:px-8 py-3 md:py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 duration-200 shadow-md text-sm cursor-pointer"
                  >
                    Load More Articles ({filteredPosts.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-20 text-center text-gray-500 text-[15px]">
              No posts found matching the query. Try searching for another topic.
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full bg-[#F8FAFC] py-16 md:py-20 px-4 md:px-6 border-t border-b border-gray-100 mt-12 md:mt-20">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
              <HelpCircle className="w-4 h-4" /> FAQ
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">Find answers to common questions about our technical tutorials and training programs.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How do these blog guides support my placement preparation?",
                a: "All of our articles—spanning Java microservices, SQL queries, and Data Structures—are crafted based on actual coding tests and technical interview rounds conducted by top MNCs and IT start-ups in Vadapalani and across Chennai. They offer practical answers and codebase examples designed to match high-tier developer evaluations."
              },
              {
                q: "Can I get hands-on classroom training for these topics?",
                a: "Absolutely. Inetz Technologies offers structured, physical classroom programs, intensive 1-month/15-day internships, and a job-ready full stack bootcamp at our state-of-the-art training facility in Vadapalani, Chennai. We also provide specialized IT job training for beginners where you will work on 5 mini-projects and 2 major industrial-grade applications."
              },
              {
                q: "Do you offer placement support for freshers?",
                a: "Yes! We provide 100% comprehensive placement support, including structured mock interviews, coding assignments, LinkedIn/GitHub optimization, and direct placement drives with our network of hiring partners in Chennai."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-gray-800 hover:text-gray-950 transition-colors focus:outline-none"
                >
                  <span>{item.q}</span>
                  <span className="text-xl text-[#3C9657] font-bold">{openFaq === idx ? "−" : "+"}</span>
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${openFaq === idx ? "max-h-[200px] border-t border-gray-50" : "max-h-0"
                    }`}
                >
                  <p className="px-6 py-5 text-gray-600 text-sm leading-relaxed bg-gray-50/30">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter signup area */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 mt-12 md:mt-20">
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 py-10 px-6 md:py-12 md:px-16 text-center text-white shadow-xl">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <Mail className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 md:mb-4">
              Stay Updated with Inetz Training
            </h2>
            <p className="text-emerald-100 text-sm md:text-base lg:text-lg mb-6 md:mb-8 leading-relaxed">
              Get notified about new training materials, coding exercises, and placement preparation resources shared exclusively by our trainers at Inetz Technologies.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="flex-grow px-5 py-3.5 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors text-sm shadow-md flex items-center justify-center gap-2"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    Subscribed!
                  </>
                ) : (
                  "Subscribe Now"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-4 md:left-8 z-50 p-4 bg-[#3C9657] text-white rounded-full shadow-lg hover:bg-[#2e7443] hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </div>
  );
}
