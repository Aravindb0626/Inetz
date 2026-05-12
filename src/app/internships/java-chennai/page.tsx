import InternshipPrograms from "@/components/programs/programDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Java Full Stack Internship Chennai | Enterprise Development",
  description: "Master Enterprise Application Development with our Java Full Stack Internship in Chennai. Expert training in Spring Boot, Microservices, and Cloud Deployment.",
  keywords: [
    "Java Internship Chennai", 
    "Java full stack course Chennai", 
    "Spring Boot training Chennai", 
    "Enterprise Java training Chennai", 
    "Java developer internship Chennai"
  ],
  alternates: {
    canonical: "https://inetztech.com/internships/java-chennai",
  },
};

export default function JavaInternshipPage() {
  return <InternshipPrograms initialStack="java" />;
}
