import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Career Insights | Inetz Technologies",
  description: "Explore the latest insights, tutorials, and career guidance for software developers in Chennai. Learn Front-end, Back-end, DevOps, AI, and more.",
  keywords: ["Software Training Chennai", "Inetz Technologies Blog", "DevOps Training", "Web Development Tutorial", "Internships Chennai", "Prompt Engineering"],
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
