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
      <CTASection/>
    </div>
  );
}
