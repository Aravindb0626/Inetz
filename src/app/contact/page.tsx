"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Layers, Clock, Building2 } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      details: "+91 98402 34475 / +91 98844 68682",
      description: "Mon-Sat from 9am to 6pm.",
      action: "tel:+919840234475"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: "info@inetztech.com",
      description: "Our friendly team is here to help.",
      action: "mailto:info@inetztech.com"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      details: "Vadapalani, Chennai",
      description: "Come say hello at our headquarters.",
      action: "https://maps.google.com/?q=KP+Towers+Vadapalani+Chennai"
    }
  ];

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden pt-24 pb-20">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full hidden dark:block" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-sky-500/10 blur-[120px] rounded-full hidden dark:block" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <MessageSquare className="h-4 w-4" />
            Get in touch
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 tracking-tight"
          >
            Let&apos;s Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-emerald-500">Future Together</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
          >
            Have a question about our programs? Want to enroll? 
            Fill out the form below and our admissions team will get back to you within 24 hours.
          </motion.p>
        </div>

         {/* Location Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-28 grid gap-10 md:grid-cols-2 lg:gap-16 items-stretch"
        >
          {/* ───── LEFT IMAGE ───── */}
          <div className="relative h-full min-h-[350px]">
            <img
              src="/office.jpg"
              alt="Our Office"
              className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-xl"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl" />

            {/* Label */}
            <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg flex items-center gap-2 border border-zinc-200/50 dark:border-zinc-800/50">
              <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                Vadapalani, Chennai
              </span>
            </div>
          </div>

          {/* ───── RIGHT CONTENT ───── */}
          <div className="space-y-4">
            {/* Top Card */}
            <div className="flex flex-col sm:flex-row gap-4 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl p-5 shadow-sm">
              <div className="flex shrink-0 h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-inner">
                <MapPin className="h-6 w-6" />
              </div>

              <div>
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-0.5">
                  📍 KP Towers, Vadapalani, Chennai
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Located opposite Nexus Vijaya Mall, our center provides a <span className="font-bold text-emerald-600 dark:text-emerald-400">professional ecosystem</span> for your career growth.
                </p>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid gap-3 sm:grid-cols-2">
              {/* Card 1 */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <Layers className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mb-2" />
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-0.5">
                  Professional Environment
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Experience working in a premium office space
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mb-2" />
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-0.5">
                  Fulltime Guidance
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Direct interaction with industry experts
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mb-2" />
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-0.5">
                  Prime Location
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Accessible via Vadapalani Metro Station
                </p>
              </div>

              {/* Card 4 */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <Building2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mb-2" />
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-0.5">
                  Premium Infrastructure
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  State-of-the-art labs and meeting rooms
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mt-20">
          
          {/* Left Column - Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-10"
          >
            {contactMethods.map((method, idx) => (
              <div key={idx} className="group flex gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm group-hover:scale-110 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-all duration-300">
                  {method.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{method.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-2">{method.description}</p>
                  <a 
                    href={method.action} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline transition-all"
                  >
                    {method.details}
                  </a>
                </div>
              </div>
            ))}

            {/* Support Box */}
            <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">Looking for Enterprise Training?</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                We also provide customized corporate training solutions for businesses looking to upskill their teams.
              </p>
              <a href="mailto:info@inetztech.com" className="inline-flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300">
                Contact Corporate Team &rarr;
              </a>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-10 shadow-xl shadow-zinc-200/50 dark:shadow-none">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full h-14 px-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-zinc-900 dark:text-white transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-14 px-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-zinc-900 dark:text-white transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-14 px-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-zinc-900 dark:text-white transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full h-14 px-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-zinc-900 dark:text-white transition-all"
                      placeholder="Course Inquiry"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-zinc-900 dark:text-white transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full h-14 flex items-center justify-center gap-2 rounded-2xl text-white font-semibold transition-all duration-300 ${
                    isSubmitted 
                      ? "bg-emerald-600 scale-[0.98]" 
                      : "bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-[0.98]"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Sending...
                    </div>
                  ) : isSubmitted ? (
                    "Message Sent Successfully!"
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
          
        </div>

       

      </div>
    </div>
  );
}
