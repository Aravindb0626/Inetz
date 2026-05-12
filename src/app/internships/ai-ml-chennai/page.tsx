import InternshipPrograms from "@/components/programs/programDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI & ML Internship Chennai | Data Science & Machine Learning",
  description: "Advanced AI & ML internship in Chennai. Master Deep Learning, Neural Networks, and Data Science with hands-on projects and industry mentorship at Inetz Technologies.",
  keywords: [
    "AI internship Chennai", 
    "ML internship Chennai", 
    "Data science internship Chennai", 
    "Machine Learning training Chennai", 
    "Artificial Intelligence course Chennai"
  ],
  alternates: {
    canonical: "https://inetztech.com/internships/ai-ml-chennai",
  },
};

export default function AIMLInternshipPage() {
  return <InternshipPrograms initialStack="datascience" />;
}
