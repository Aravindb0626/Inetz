"use client";

import Link from "next/link";
import {
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const footerLinks = {
  company: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  programs: [
    { label: "Career Gap Program", href: "/programs#career-gap-program" },
    { label: "Evolve Program", href: "/programs#evolve-program" },
    { label: "Accelerator", href: "/programs#accelerator" },
    { label: "Placement Assistance", href: "/programs#placement-assistance" },
    { label: "Corporate Training", href: "/programs#corporate-training" },
  ],
  support: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Help Center", href: "/help" },
  ]
};

function InetzLogo() {
  return (
    <div className="relative h-12 w-40 flex items-center group">
      <Image 
        src="/logo.png" 
        alt="Inetz Technologies Logo" 
        fill
        className="object-contain transition-transform group-hover:scale-105"
      />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900">
      <Section className="py-20 lg:pt-24 lg:pb-12">
        <div className="grid gap-12 lg:grid-cols-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/">
              <InetzLogo />
            </Link>
            <p className="mt-8 text-lg text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed font-medium">
              Leading the way in tech education and high-impact career placement. We transform students into industry-ready professionals.
            </p>
            
            <div className="flex gap-4 mt-10">
              {[
                { icon: FaFacebook, href: "#", hover: "hover:bg-[#1877F2] hover:border-[#1877F2]" },
                { icon: FaYoutube, href: "#", hover: "hover:bg-[#FF0000] hover:border-[#FF0000]" },
                { icon: FaLinkedin, href: "#", hover: "hover:bg-[#0A66C2] hover:border-[#0A66C2]" },
                { icon: FaInstagram, href: "#", hover: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-[#dc2743]" }
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className={cn(
                    "h-12 w-12 flex items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 hover:text-white transition-all shadow-sm",
                    social.hover
                  )}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
             <div>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-8 flex items-center gap-2">
                    Company
                </h4>
                <ul className="space-y-4">
                    {footerLinks.company.map((link) => (
                        <li key={link.label}>
                            <Link href={link.href} className="text-zinc-500 dark:text-zinc-400 hover:text-orange-500 transition-colors flex items-center group font-medium">
                                <ArrowRight className="h-3 w-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
             </div>
             <div>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-8">
                    Programs
                </h4>
                <ul className="space-y-4">
                    {footerLinks.programs.map((link) => (
                        <li key={link.label}>
                            <Link href={link.href} className="text-zinc-500 dark:text-zinc-400 hover:text-orange-500 transition-colors font-medium">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
             </div>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4">
             <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-8">
                Get in Touch
             </h4>
             <div className="space-y-6">
                <div className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-orange-500/5 flex items-center justify-center text-orange-500">
                        <MapPin className="h-5 w-5" />
                    </div>
                    <a 
                      href="https://maps.google.com/?q=No.+159,+3rd+Floor,+KP+Towers,+Arcot+Road,+Opp.+Nexus+Vijaya+Mall,+Vadapalani,+Chennai+-+600026" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium hover:text-orange-500 transition-colors"
                    >
                        No. 159, 3rd Floor, KP Towers, Arcot Road <br/> 
                        Opp. Nexus Vijaya Mall, Vadapalani, <br/> 
                        Chennai - 600026
                    </a>
                </div>
                <div className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-orange-500/5 flex items-center justify-center text-orange-500">
                        <Phone className="h-5 w-5" />
                    </div>
                    <div className="text-zinc-500 dark:text-zinc-400 text-sm font-medium flex flex-col space-y-1">
                        <a href="tel:+919840234475" className="hover:text-orange-500 transition-colors">+91 98402 34475</a>
                        <a href="tel:+919884468682" className="hover:text-orange-500 transition-colors">+91 98844 68682</a>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-orange-500/5 flex items-center justify-center text-orange-500">
                        <Mail className="h-5 w-5" />
                    </div>
                    <a href="mailto:info@inetztech.com" className="text-zinc-500 dark:text-zinc-400 text-sm font-medium hover:text-orange-500 transition-colors">
                        info@inetztech.com
                    </a>
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-400 dark:text-zinc-600 text-sm font-semibold tracking-wide">
            © 2026 Inetz Technology. Built with passion for excellence.
          </p>
          
          <div className="flex gap-8">
            {footerLinks.support.map((link) => (
                <Link key={link.label} href={link.href} className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600 hover:text-orange-500 transition-colors">
                    {link.label}
                </Link>
            ))}
          </div>
        </div>
      </Section>
    </footer>
  );
}