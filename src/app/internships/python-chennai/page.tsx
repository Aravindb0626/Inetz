import InternshipPrograms from "@/components/programs/programDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Python Internship Chennai | AI & Backend Development Training",
  description: "Advanced Python internship in Chennai with focus on AI, Web Development, and Automation. Learn from industry experts and work on real-time projects at Inetz Technologies.",
  keywords: [
    "Python Internship Chennai", 
    "Python training Chennai", 
    "AI internship Chennai", 
    "Django training Chennai", 
    "Backend development course Chennai"
  ],
  alternates: {
    canonical: "https://inetztech.com/internships/python-chennai",
  },
};

export default function PythonInternshipPage() {
  return <InternshipPrograms initialStack="python" />;
}
