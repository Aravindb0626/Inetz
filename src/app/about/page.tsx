import AboutPageClient from "./AboutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Inetz Technologies - Leading Tech Training  in Chennai",
  description: "Learn about Inetz Technologies, our mission to bridge the skill gap, and our expert team providing top-tier software training and internships in Chennai.",
  keywords: [
    "About Inetz Technologies",
    "Software training  Vadapalani",
    "Best internship training Chennai",
    "Inetz Technologies team",
    "Tech education Chennai",
    "internship in chennai for freshers",
    "best companies for internship in chennai",
    "it companies in chennai for internship",
    "vadapalani internship company",
    "best software training  in chennai",
    "internship near me"
  ],
  alternates: {
    canonical: "https://inetztech.com/about",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
