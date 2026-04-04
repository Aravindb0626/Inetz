// src/lib/program-data.ts

export type Duration = "1 Week" | "2 Weeks" | "1 Month" | "3 Months";

export interface SyllabusItem {
  label: string;
  title: string;
  tools: string[];
  topics: string[];
}

export interface ProgramDetails {
  title: string;
  subtitle: string;
  heroImg: string;
  syllabus: SyllabusItem[];
}

export const programData: Record<Duration, ProgramDetails> = {
  "1 Week": {
    title: "Web Development",
    subtitle: "5-Day Portfolio Sprint",
    heroImg: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2072",
    syllabus: [
      { label: "Day 1", title: "Semantic Structure & SEO", tools: ["html5"], topics: ["HTML5 Semantics", "Document Hierarchy", "SEO Basics", "Metadata"] },
      { label: "Day 2", title: "Visual Identity & Box Model", tools: ["css3"], topics: ["CSS Box Model", "Modern Typography", "CSS Variables", "Branding"] },
      { label: "Day 3", title: "Modern Layouts", tools: ["css3"], topics: ["Flexbox Mastery", "CSS Grid Systems", "Sticky Positioning", "Navigation"] },
      { label: "Day 4", title: "Responsive Design", tools: ["tailwind"], topics: ["Mobile-First Workflow", "Media Queries", "Micro-interactions", "Animations"] },
      { label: "Day 5", title: "Git & Global Deployment", tools: ["github"], topics: ["Git Workflow", "Remote Repos", "GitHub Pages", "CI/CD Basics"] },
    ]
  },
  "2 Weeks": {
    title: "Advanced Web Development",
    subtitle: "From Logic to Build",
    heroImg: "https://images.unsplash.com/photo-1579403174647-010476aa01e8?q=80&w=2072",
    syllabus: [
      { "label": "Day 1", "title": "Semantic Structure", "tools": ["html5"], "topics": ["Semantic HTML5 Tags", "Head vs Body", "Document Hierarchy", "Digital Business Card Task"] },
      { "label": "Day 2", "title": "Visual Identity", "tools": ["css3"], "topics": ["CSS Box Model", "Google Fonts Integration", "Custom Color Palettes", "Circular Image Styling"] },
      { "label": "Day 3", "title": "Modern Layouts", "tools": ["css3"], "topics": ["Flexbox Alignment", "Relative vs Absolute Position", "Navigation Bars", "Services Card Grid"] },
      { "label": "Day 4", "title": "Mobile-First Design", "tools": ["css3", "tailwind"], "topics": ["Media Queries", "Viewport Settings", "Responsive Card Stacking", "Breakpoint Logic"] },
      { "label": "Day 5", "title": "Modern UI Techniques", "tools": ["css3"], "topics": ["Box Shadows & Gradients", "CSS Transitions", "Hover Animations", "UI Clone Challenge"] },
      { "label": "Day 6", "title": "Programming Logic", "tools": ["javascript"], "topics": ["Variables (let/const)", "Data Types", "Template Literals", "Welcome Bot Script"] },
      { "label": "Day 7", "title": "Decision Making", "tools": ["javascript"], "topics": ["If/Else Statements", "Comparison Operators", "Arrow Functions", "Tip Calculator Project"] },
      { "label": "Day 8", "title": "DOM Interaction", "tools": ["javascript"], "topics": ["querySelector & getElementById", "Event Listeners", "Class Toggling", "Dark Mode Switcher"] },
      { "label": "Day 9", "title": "Working with Data", "tools": ["javascript"], "topics": ["Arrays & Objects", ".push() Method", ".forEach() Rendering", "Dynamic To-Do List"] },
      { "label": "Day 10", "title": "Capstone Project", "tools": ["javascript", "html5", "css3"], "topics": ["Full Tool Integration", "Measuring Logic", "Smart Tailor Calculator", "Final Build Summary"] }
    ]
  },
  "1 Month": {
    title: "Frontend Development",
    subtitle: "Foundations to Asynchronous Apps",
    heroImg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072",
    syllabus: [
      { "label": "Day 1", "title": "HTML5 & Semantic SEO", "tools": ["html5"], "topics": ["ARIA Accessibility", "Metadata Optimization", "Document Hierarchy", "Technical Doc Task"] },
      { "label": "Day 2", "title": "CSS Box Model Mastery", "tools": ["css3"], "topics": ["Border-Box Sizing", "Specificity Rules", "Margin vs Padding", "3D Hover Effects"] },
      { "label": "Day 3", "title": "Flexbox Architecture", "tools": ["css3"], "topics": ["Alignment & Justification", "Flex-Grow Logic", "Gap Property", "YouTube Nav Clone"] },
      { "label": "Day 4", "title": "Advanced CSS Grid", "tools": ["css3"], "topics": ["Template Areas", "FR Unit Sizing", "Implicit Grids", "Magazine Layout Task"] },
      { "label": "Day 5", "title": "Mobile-First Strategy", "tools": ["css3", "tailwind"], "topics": ["Viewport Settings", "Relative Units (REM/VH)", "Media Query Logic", "Responsive Magazine"] },
      { "label": "Day 6", "title": "Modern UI Animations", "tools": ["css3"], "topics": ["CSS Custom Variables", "Keyframe Timelines", "Transitions", "Slide-in Menu Build"] },
      { "label": "Day 7", "title": "Professional Forms", "tools": ["html5", "css3"], "topics": ["Pseudo-class Styling", "Validation States", "Input Management", "Tailor Booking Form"] },
      { "label": "Day 8", "title": "JavaScript Fundamentals", "tools": ["javascript"], "topics": ["Variable Scoping", "Template Literals", "Type Conversion", "Story Generator Task"] },
      { "label": "Day 9", "title": "Control Flow & Logic", "tools": ["javascript"], "topics": ["Logical Operators", "Switch Statement Case", "Truthiness Check", "Password Strength Tool"] },
      { "label": "Day 10", "title": "Functions & Scoping", "tools": ["javascript"], "topics": ["Arrow Function Syntax", "Return Value Logic", "Block vs Global", "Currency Converter"] },
      { "label": "Day 11", "title": "DOM Manipulation", "tools": ["javascript"], "topics": ["Query Selectors", "Event Listeners", "Inline Style Control", "Dark Mode Toggle"] },
      { "label": "Day 12", "title": "Array & List Logic", "tools": ["javascript"], "topics": ["Stack/Queue Methods", "Iteration Patterns", "Reference Types", "Live Shopping List"] },
      { "label": "Day 13", "title": "Objects & JSON Data", "tools": ["javascript"], "topics": ["Key-Value Mapping", "JSON Stringification", "Nested Data", "Customer Profile Object"] },
      { "label": "Day 14", "title": "High-Order Functions", "tools": ["javascript"], "topics": [".map() & .filter()", ".sort() Logic", "Functional Pipelines", "Product Filter Project"] },
      { "label": "Day 15", "title": "Persistence & Storage", "tools": ["javascript"], "topics": ["DOM Node Creation", "LocalStorage API", "State Preservation", "Persistent To-Do App"] },
      { "label": "Day 16", "title": "Asynchronous JS Basics", "tools": ["javascript"], "topics": ["The Event Loop", "Callback Patterns", "SetTimeout/Interval", "Real-time Clock Build"] },
      { "label": "Day 17", "title": "Promises & Fetch API", "tools": ["javascript"], "topics": ["API Request Cycle", "Then/Catch Chains", "Data Serialization", "Random User Dashboard"] },
      { "label": "Day 18", "title": "Modern Async/Await", "tools": ["javascript"], "topics": ["Async Syntax", "Try/Catch Handling", "Endpoint Integration", "Live Weather App"] },
      { "label": "Day 19", "title": "Tooling & Deployment", "tools": ["github"], "topics": ["Chrome DevTools", "Git Branching", "Netlify Hosting", "Bug Squashing Session"] },
      { "label": "Day 20", "title": "Final Residency Capstone", "tools": ["javascript", "html5", "css3"], "topics": ["Full Architecture", "Performance Tuning", "Live Deployment", "Final Presentation"] }
    ]
  },
  "3 Months": {
    title: "Full-Stack Development",
    subtitle: "System Architecture & Deployment",
    heroImg: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2072",
    syllabus: [
      { label: "Mon 1", title: "UI & Logic Foundation", tools: ["html5", "css3", "javascript"], topics: ["Advanced Flex/Grid Layouts", "Responsive Netflix Clone", "Smart Fabric Calculator", "DOM & LocalStorage"] },
      { label: "Mon 2", title: "Modern Frontend (React)", tools: ["react", "tailwind", "javascript"], topics: ["Hooks (useState/useEffect)", "API Data Fetching", "React Router Navigation", "Context API State"] },
      { label: "Mon 3", title: "Backend & Database", tools: ["node", "mongodb", "github"], topics: ["Express Server Routing", "Mongoose Schema Design", "RESTful CRUD APIs", "Full-Stack Cloud Deploy"] },
      { label: "Final", title: "Capstone: Enterprise App", tools: ["react", "node", "mongodb"], topics: ["Frontend-Backend Auth", "Database Integration", "Performance Testing", "Live System Launch"] }
    ]
  },
};