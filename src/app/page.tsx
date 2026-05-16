import CoursesSection from "@/components/CourseSection";
import CTASection from "@/components/CTA";
import CertificateSection from "@/components/CertificateSection";
import { HeroInternship } from "@/components/HeroInternship";
import HiringPartners from "@/components/HiringPartners";
import IndustrySectors from "@/components/IndustrySectors";
import InternshipProcess from "@/components/InternshipProcess";
import { MOESection } from "@/components/MOE";
import SuccessStories from "@/components/SuccessStories";
import ProblemSolution from "@/components/ProblemSolution";
import StudentProjects from "@/components/StudentProjects";
import VideoTestimonials from "@/components/VideoTestimonials";
import Quotes from "@/components/Quotes";
import { EnrollmentActionSection } from "@/components/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Internship Training in Chennai with Placement | Inetz Technologies",
  description: "Accelerate your career with industry-leading internship training in Chennai. Full stack, MERN, Java, AI, and Data Science courses with 100% placement support.",
  keywords: [
    "Internship training in Chennai",
    "Full stack training Chennai",
    "MERN stack internship Chennai",
    "Java full stack course Chennai",
    "AI internship Chennai",
    "Data science internship Chennai",
    "Placement training Chennai",
    "Best software training institute in Chennai"
  ],
  alternates: {
    canonical: "https://inetztech.com",
  },
};


export default function Home() {
  return (
    // Server component wrapper so the hero doesn't require client JS.
    // Navbar + theme are already handled globally in the root layout.
    <div className="min-h-[calc(100vh-4rem)]">
      <HeroInternship />
      <ProblemSolution />
      <InternshipProcess/>
      <HiringPartners/>
      <MOESection />
      <IndustrySectors/>
      <CoursesSection/>   
      <StudentProjects />
      <Quotes />
      <VideoTestimonials />
      <CertificateSection/>
      <SuccessStories/>
      <EnrollmentActionSection/>
    </div>
  );
}
