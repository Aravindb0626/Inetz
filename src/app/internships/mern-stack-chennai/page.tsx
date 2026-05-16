import InternshipPrograms from "@/components/programs/programDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MERN Stack Internship Chennai | Best Full Stack Training",
  description: "Join the best MERN stack internship in Chennai at Inetz Technologies. Master React, Node.js, Express, and MongoDB with real-world projects and placement support.",
  keywords: [
    "MERN Stack Internship Chennai", 
    "Full stack training Chennai", 
    "React JS internship Chennai", 
    "Node JS training Chennai", 
    "MongoDB course Chennai"
  ],
  alternates: {
    canonical: "https://inetztech.com/internships/mern-stack-chennai",
  },
};

export default function MernInternshipPage() {
  return <InternshipPrograms initialStack="mern" />;
}
