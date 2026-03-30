import React, { useState } from 'react';

const JavaFullStackCourse = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const modules = [
    {
      icon: 'html',
      time: 'Week 1',
      title: 'Foundations of the Web',
      phase: 'Phase 1',
      desc: 'Introduction to Web architecture, HTML5 semantic tags, CSS3 layouts (Flexbox/Grid), and basic UI/UX design principles.',
      topics: ['Responsive Design', 'Semantic HTML', 'CSS Transitions', 'Web Accessibility']
    },
    {
      icon: 'javascript',
      time: 'Week 2',
      title: 'JavaScript Essentials',
      phase: 'Phase 1',
      desc: 'Mastering DOM Manipulation, ES6+ features, Asynchronous JS, and building interactive web components.',
      topics: ['ES6 Modules', 'Promises & Async/Await', 'API Integration (Fetch)', 'Event Bubbling']
    },
    {
      icon: 'terminal',
      time: 'Month 1',
      title: 'Core Java Foundation',
      phase: 'Foundation',
      desc: 'Deep dive into Java fundamentals, Object-Oriented Programming (OOP) concepts, Collections Framework, and Exception Handling.',
      topics: ['Inheritance & Polymorphism', 'Java Streams & Lambda', 'Multithreading', 'Generic Programming']
    },
    {
      icon: 'database',
      time: 'Month 3',
      title: 'Advanced Backend Development',
      phase: 'Advanced',
      desc: 'Database connectivity with JDBC, Web application development using Servlets, JSP, and introduction to Spring Framework & RESTful APIs.',
      topics: ['SQL & Relational DBs', 'Spring MVC Architecture', 'REST Controllers', 'Maven & Dependency Mgmt']
    },
    {
      icon: 'rocket_launch',
      time: 'Month 6',
      title: 'Microservices & Full Stack Mastery',
      phase: 'Expert',
      isHighlight: true,
      desc: 'Building Spring Boot Microservices, Hibernate ORM, Frontend integration with React, and Final Capstone Project deployment on AWS/Azure.',
      topics: ['React Hooks & Redux', 'API Gateway & Eureka', 'Docker Containerization', 'Final Capstone Project']
    }
  ];

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#101622] text-slate-900 dark:text-slate-100 font-['Lexend'] antialiased">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#101622]/80 backdrop-blur-md px-6 md:px-20 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white bg-[#135bec]">
                <span className="material-symbols-outlined text-xl">code</span>
              </div>
              <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">Inetz Technologies</h2>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              {['Courses', 'Placements', 'About Us', 'Contact'].map((item) => (
                <a key={item} href="#" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-[#135bec] transition-colors">
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 border border-transparent focus-within:border-[#135bec]/50 transition-all">
              <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
              <input 
                className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-slate-400" 
                placeholder="Search courses..." 
                type="text" 
              />
            </div>
            <button className="bg-[#135bec] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#135bec]/90 transition-all shadow-sm">
              Login
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-20 py-10 w-full">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <a className="hover:text-[#135bec]" href="#">Home</a>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <a className="hover:text-[#135bec]" href="#">Courses</a>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-slate-900 dark:text-white font-medium">Java Full Stack Mastery</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <section>
              {/* Hero Banner */}
              <div className="relative rounded-2xl overflow-hidden aspect-[21/9] mb-8 group shadow-xl">
                <img 
                  alt="Software Development" 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                  <span className="bg-[#135bec] text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">BEST SELLER</span>
                  <h1 className="text-white text-4xl font-extrabold leading-tight">Java Full Stack Mastery</h1>
                  <p className="text-slate-200 mt-2 text-lg">From zero to production-ready enterprise developer in 6 months.</p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-2 bg-[#135bec]/10 text-[#135bec] px-4 py-2 rounded-full border border-[#135bec]/20">
                  <span className="material-symbols-outlined text-lg">schedule</span>
                  <span className="text-sm font-semibold italic">Duration: 6 Months</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700">
                  <span className="material-symbols-outlined text-lg">trending_up</span>
                  <span className="text-sm font-semibold">Level: Beginner to Pro</span>
                </div>
              </div>

              {/* Timeline Path */}
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#135bec]">analytics</span>
                    Detailed Learning Path
                  </h3>
                  <button className="text-[#135bec] text-sm font-semibold flex items-center gap-1 hover:underline">
                    <span className="material-symbols-outlined text-sm">download</span>
                    Download Syllabus PDF
                  </button>
                </div>

                <div className="relative space-y-8 before:absolute before:left-[19px] before:top-[40px] before:bottom-0 before:w-[2px] before:bg-slate-200 dark:before:bg-slate-700">
                  {modules.map((module, idx) => (
                    <div key={idx} className="relative pl-14">
                      <div className="absolute left-0 top-0 w-10 h-10 bg-white dark:bg-slate-800 rounded-full border-2 border-[#135bec] flex items-center justify-center z-10 shadow-sm">
                        <span className="material-symbols-outlined text-[#135bec] text-xl">{module.icon}</span>
                      </div>
                      <div className={`bg-white dark:bg-slate-800 p-6 rounded-xl border transition-all hover:shadow-md ${module.isHighlight ? 'border-[#135bec]/40 shadow-lg ring-4 ring-[#135bec]/5' : 'border-slate-200 dark:border-slate-700'}`}>
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white">{module.time}: {module.title}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${module.isHighlight ? 'bg-[#135bec] text-white' : 'text-slate-400 border border-slate-200 dark:border-slate-700'}`}>
                            {module.phase}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{module.desc}</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {module.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-center gap-2 text-sm text-slate-500">
                              <span className="material-symbols-outlined text-[14px] text-[#135bec]">check_circle</span> 
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm sticky top-24">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Enroll Today</h3>
                <p className="text-slate-500 text-sm mt-1">Next Batch: <span className="text-[#135bec] font-bold text-base">March 09</span></p>
              </div>
              
              <form className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                  <input 
                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-[#135bec] focus:ring-[#135bec] text-sm py-2.5" 
                    placeholder="John Doe" 
                    type="text" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                  <input 
                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-[#135bec] focus:ring-[#135bec] text-sm py-2.5" 
                    placeholder="john@example.com" 
                    type="email" 
                  />
                </div>
                <button 
                  type="button"
                  className="w-full bg-[#135bec] text-white font-bold py-3.5 rounded-lg hover:bg-[#135bec]/90 shadow-lg shadow-[#135bec]/20 transition-all active:scale-[0.98] mt-2"
                >
                  Start Application
                </button>
              </form>

              <hr className="my-6 border-slate-100 dark:border-slate-700" />
              
              {/* Features List */}
              <div className="space-y-5">
                {[
                  { icon: 'badge', title: 'Professional Certificate', sub: 'Industry Recognized', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' },
                  { icon: 'cases', title: '100% Placement Support', sub: 'Top MNC Network', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/20' },
                  { icon: 'support_agent', title: '1-on-1 Mentorship', sub: 'Doubt Clearing Sessions', color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/20' }
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-9 h-9 ${feat.bg} ${feat.color} rounded-lg flex items-center justify-center`}>
                      <span className="material-symbols-outlined text-xl">{feat.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{feat.title}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-medium">{feat.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101622] px-6 md:px-20 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 bg-[#135bec] rounded flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-sm">code</span>
              </div>
              <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">Inetz Technologies</h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empowering next-generation developers with industry-standard skills and hands-on training.
            </p>
          </div>
          {/* Quick Links / Support columns could be mapped here */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-5 uppercase tracking-[0.2em]">Support</h4>
            <p className="text-slate-500 text-sm">support@inetztech.com</p>
            <p className="text-slate-500 text-sm mt-1 font-medium">+1 (800) 123-4567</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 font-medium">© 2026 Inetz Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default JavaFullStackCourse;