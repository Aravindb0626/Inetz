import dynamic from "next/dynamic";
import { HeroInternship } from "@/components/HeroInternship";

// Dynamically import components that are below the fold to improve initial load time
const ProblemSolution = dynamic(() => import("@/components/ProblemSolution"), { ssr: true });
const InternshipProcess = dynamic(() => import("@/components/InternshipProcess"), { ssr: true });
const HiringPartners = dynamic(() => import("@/components/HiringPartners"), { ssr: true });
const MOESection = dynamic(() => import("@/components/MOE").then((mod) => mod.MOESection), { ssr: true });
const IndustrySectors = dynamic(() => import("@/components/IndustrySectors"), { ssr: true });
const CoursesSection = dynamic(() => import("@/components/CourseSection"), { ssr: true });
const StudentProjects = dynamic(() => import("@/components/StudentProjects"), { ssr: true });
const Quotes = dynamic(() => import("@/components/Quotes"), { ssr: true });
const VideoTestimonials = dynamic(() => import("@/components/VideoTestimonials"), { ssr: true });
const CertificateSection = dynamic(() => import("@/components/CertificateSection"), { ssr: true });
const SuccessStories = dynamic(() => import("@/components/SuccessStories"), { ssr: true });
const EnrollmentActionSection = dynamic(() => import("@/components/register").then((mod) => mod.EnrollmentActionSection), { ssr: true });
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
    "Best software training  in Chennai",
    "Software internship in Chennai",
    "Internship companies in Chennai",
    "1 month internship in Chennai for students",
    "IT companies in Chennai for internship",
    "Internship in Chennai for freshers",
    "Internship in Vadapalani",
    "Best internship companies in Chennai",
    "Vadapalani internship company",
    "Best IT training  in Chennai with placement"
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
      <InternshipProcess />
      <HiringPartners />
      <MOESection />
      <IndustrySectors />
      <CoursesSection />
      <StudentProjects />
      <Quotes />
      <VideoTestimonials />
      <CertificateSection />
      <SuccessStories />
      <EnrollmentActionSection />
    </div>
  );
}
