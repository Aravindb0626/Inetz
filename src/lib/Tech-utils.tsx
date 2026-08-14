export type TechStack = "MERN" | "Java" | "Python" | "DataScience" | "DataAnalytics" | "Embedded";

interface BrandInfo {
  color: string;
}

export const BRAND_DATA: Record<string, BrandInfo> = {
  python: { color: "#3776AB" },
  django: { color: "#092E20" },
  postgresql: { color: "#4169E1" },
  docker: { color: "#2496ED" },
  aws: { color: "#FF9900" },
  react: { color: "#61DAFB" },
  nodejs: { color: "#339933" },
  mongodb: { color: "#47A248" },
  javascript: { color: "#F7DF1E" },
  typescript: { color: "#3178C6" },
  git: { color: "#F05032" },
  html5: { color: "#E34F26" },
  css3: { color: "#1572B6" },
  tensorflow: { color: "#FF6F00" },
  pandas: { color: "#150458" },
  numpy: { color: "#013243" },
  express: { color: "#000000" },
  java: { color: "#ED8B00" },
  spring: { color: "#6DB33F" },
  powerbi: { color: "#F2C811" },
  excel: { color: "#217346" },
  c: { color: "#A8B9CC" },
  cpp: { color: "#00599C" },
  "spring-boot": { color: "#6DB33F" },
  mysql: { color: "#4479A1" },
  hibernate: { color: "#59666C" },
  tomcat: { color: "#F8DC75" },
  maven: { color: "#C71A36" },
  intellij: { color: "#000000" },
  postman: { color: "#FF6C37" },
};

export const DEVICON_MAP: Record<string, string> = {
  react: "devicon-react-original",
  nodejs: "devicon-nodejs-plain",
  mongodb: "devicon-mongodb-plain",
  express: "devicon-express-original",
  java: "devicon-java-plain",
  tomcat: "devicon-tomcat-line",
  "spring-boot": "devicon-spring-plain",
  spring: "devicon-spring-plain",
  mysql: "devicon-mysql-plain",
  intellij: "devicon-intellij-plain",
  hibernate: "devicon-hibernate-plain",
};

export const STACK_MAPPING: Record<string, string[]> = {
  python: ["python", "django", "postgresql", "docker", "aws"],
  mern: ["react", "nodejs", "mongodb", "javascript", "git"],
  java: ["java", "spring", "postgresql", "docker", "git"],
  datascience: ["python", "tensorflow", "pandas", "numpy", "git"],
  dataanalytics: ["excel", "postgresql", "python", "powerbi"],
  Embedded: ["c", "cpp", "python", "git"],
  default: ["html5", "css3", "javascript", "react"],
  ml: ["python", "scikit-learn", "pandas", "numpy", "matplotlib", "postgresql"],
  deeplearning: ["python", "pytorch", "tensorflow", "opencv", "cuda", "docker"],
  ai: ["python", "langchain", "openai_api", "pinecone", "huggingface", "git"],
  javascript: ["javascript"],
  react: ["react"],
};

export const MARKET_INSIGHTS: Record<string, { demand: string; trend: string }> = {
  python: { demand: "Critical", trend: "AI & Automation" },
  mern: { demand: "High", trend: "SaaS & Scalability" },
  java: { demand: "Stable", trend: "Enterprise FinTech" },
  datascience: { demand: "High", trend: "Machine Learning" },
  dataanalytics: { demand: "Rising", trend: "Business Intelligence" },
  Embedded: { demand: "Niche", trend: "IoT & Robotics" },
  default: { demand: "Rising", trend: "Modern Web" },
  ml: { demand: "Critical", trend: "Predictive Analytics & Automation" },
  deeplearning: { demand: "High", trend: "Computer Vision & Advanced Robotics" },
  ai: { demand: "Explosive", trend: "Generative AI & Agentic Workflows" },
  javascript: { demand: "High", trend: "Reliability & Scalable Production" },
  edge_ai: { demand: "Rising", trend: "IoT & On-Device Intelligence" },
};

export const getStackLogos = (stack: TechStack | string): string[] => {
  const key = String(stack).toLowerCase();
  return STACK_MAPPING[key] || STACK_MAPPING[stack] || STACK_MAPPING["default"];
};

export const getIconClass = (name: string): string => {
  const key = name.toLowerCase();
  return DEVICON_MAP[key] || `devicon-${key}-plain`;
};