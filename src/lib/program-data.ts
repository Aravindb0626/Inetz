export type Duration = "1 Week" | "2 Weeks" | "1 Month" | "3 Months";
export type TechStack =
  | "MERN"
  | "Java"
  | "Python"
  | "DataScienceAI"
  | "DataAnalytics"
  | "Embedded";

export interface SyllabusItem {
  label: string;
  title: string;
  tools: string[];
  topics: string[];
}

export interface ProjectItem {
  title: string;
  tech: string[];
  img: string;
}

export interface ReviewItem {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface ProgramDetails {
  title: string;
  price: number;
  originalPrice: number;
  subtitle: string;
  heroImg: string;
  syllabus: SyllabusItem[];
  projects: ProjectItem[]; // Added
  reviews: ReviewItem[]; // Added
}

// src/lib/program-data.ts

// ... keep your existing types and programData object ...

export interface CatalogItem {
  stack: TechStack;
  title: string;
  description: string;
  image: string;
  modules: number;
}

export const catalogItems = [
  {
    stack: "MERN" as TechStack,
    title: "Full-Stack Web Development",
    description:
      "Master MongoDB, Express, React, and Node.js to build scalable web applications.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800",
    modules: 12,
  },
  {
    stack: "Java" as TechStack,
    title: "Java Full-Stack Development",
    description:
      "Master enterprise-grade Java, Spring Boot, and SQL for high-performance systems.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800",
    modules: 14,
  },
  {
    stack: "Python" as TechStack,
    title: "Python & Automation",
    description:
      "Learn Python from scratch to advanced automation and scripting for real-world tasks.",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800",
    modules: 10,
  },
  {
    stack: "DataAnalytics" as TechStack, // Fixed: Linked to DataAnalytics track
    title: "Data Analytics & BI",
    description:
      "Master Excel, SQL, and Power BI to transform raw data into actionable business insights.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
    modules: 11,
  },
  {
    stack: "DataScienceAI" as TechStack,
    title: "Data Science & AI",
    description:
      "Explore machine learning, deep learning, and predictive modeling with industry tools.",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800",
    modules: 15,
  },
  {
    stack: "Embedded" as TechStack, // Fixed: Linked to Embedded track
    title: "Embedded Systems & IoT",
    description:
      "Bridge the gap between hardware and software using C, C++, and microcontroller systems.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800",
    modules: 13,
  },
];

export const programData: Record<
  TechStack,
  Record<Duration, ProgramDetails>
> = {
  MERN: {
    "1 Week": {
      price: 1500,
      originalPrice: 2000,
      title: "MERN Stack Sprint",
      subtitle: "5-Day Full-Stack Portfolio Sprint",
      heroImg:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2072",
      syllabus: [
        {
          label: "Day 1",
          title: "Semantic Structure & SEO",
          tools: ["html5"],
          topics: [
            "HTML5 Semantics",
            "Document Hierarchy",
            "SEO Basics",
            "Metadata",
          ],
        },
        {
          label: "Day 2",
          title: "Visual Identity & Box Model",
          tools: ["css3"],
          topics: [
            "CSS Box Model",
            "Modern Typography",
            "CSS Variables",
            "Branding",
          ],
        },
        {
          label: "Day 3",
          title: "Modern Layouts",
          tools: ["css3"],
          topics: [
            "Flexbox Mastery",
            "CSS Grid Systems",
            "Sticky Positioning",
            "Navigation",
          ],
        },
        {
          label: "Day 4",
          title: "Responsive Design",
          tools: ["tailwind"],
          topics: [
            "Mobile-First Workflow",
            "Media Queries",
            "Micro-interactions",
            "Animations",
          ],
        },
        {
          label: "Day 5",
          title: "Git & Global Deployment",
          tools: ["github"],
          topics: [
            "Git Workflow",
            "Remote Repos",
            "GitHub Pages",
            "CI/CD Basics",
          ],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
    "2 Weeks": {
      price: 2500,
      originalPrice: 3500,
      title: "Advanced MERN Development",
      subtitle: "From Logic to Full-Stack Build",
      heroImg:
        "https://images.unsplash.com/photo-1579403174647-010476aa01e8?q=80&w=2072",
      syllabus: [
        {
          label: "Day 1",
          title: "Semantic Structure",
          tools: ["html5"],
          topics: [
            "Semantic HTML5 Tags",
            "Head vs Body",
            "Document Hierarchy",
            "Digital Business Card Task",
          ],
        },
        {
          label: "Day 2",
          title: "Visual Identity",
          tools: ["css3"],
          topics: [
            "CSS Box Model",
            "Google Fonts Integration",
            "Custom Color Palettes",
            "Circular Image Styling",
          ],
        },
        {
          label: "Day 3",
          title: "Modern Layouts",
          tools: ["css3"],
          topics: [
            "Flexbox Alignment",
            "Relative vs Absolute Position",
            "Navigation Bars",
            "Services Card Grid",
          ],
        },
        {
          label: "Day 4",
          title: "Mobile-First Design",
          tools: ["css3", "tailwind"],
          topics: [
            "Media Queries",
            "Viewport Settings",
            "Responsive Card Stacking",
            "Breakpoint Logic",
          ],
        },
        {
          label: "Day 5",
          title: "Modern UI Techniques",
          tools: ["css3"],
          topics: [
            "Box Shadows & Gradients",
            "CSS Transitions",
            "Hover Animations",
            "UI Clone Challenge",
          ],
        },
        {
          label: "Day 6",
          title: "Programming Logic",
          tools: ["javascript"],
          topics: [
            "Variables (let/const)",
            "Data Types",
            "Template Literals",
            "Welcome Bot Script",
          ],
        },
        {
          label: "Day 7",
          title: "Decision Making",
          tools: ["javascript"],
          topics: [
            "If/Else Statements",
            "Comparison Operators",
            "Arrow Functions",
            "Tip Calculator Project",
          ],
        },
        {
          label: "Day 8",
          title: "DOM Interaction",
          tools: ["javascript"],
          topics: [
            "querySelector & getElementById",
            "Event Listeners",
            "Class Toggling",
            "Dark Mode Switcher",
          ],
        },
        {
          label: "Day 9",
          title: "Working with Data",
          tools: ["javascript"],
          topics: [
            "Arrays & Objects",
            ".push() Method",
            ".forEach() Rendering",
            "Dynamic To-Do List",
          ],
        },
        {
          label: "Day 10",
          title: "Capstone Project",
          tools: ["javascript", "html5", "css3"],
          topics: [
            "Full Tool Integration",
            "Measuring Logic",
            "Smart Tailor Calculator",
            "Final Build Summary",
          ],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
    "1 Month": {
      price: 2500,
      originalPrice: 3500,
      title: "MERN Frontend Specialist",
      subtitle: "Foundations to Asynchronous Apps",
      heroImg:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072",
      syllabus: [
        {
          label: "Day 1",
          title: "HTML5 & Semantic SEO",
          tools: ["html5"],
          topics: [
            "ARIA Accessibility",
            "Metadata Optimization",
            "Document Hierarchy",
            "Technical Doc Task",
          ],
        },
        {
          label: "Day 2",
          title: "CSS Box Model Mastery",
          tools: ["css3"],
          topics: [
            "Border-Box Sizing",
            "Specificity Rules",
            "Margin vs Padding",
            "3D Hover Effects",
          ],
        },
        {
          label: "Day 3",
          title: "Flexbox Architecture",
          tools: ["css3"],
          topics: [
            "Alignment & Justification",
            "Flex-Grow Logic",
            "Gap Property",
            "YouTube Nav Clone",
          ],
        },
        {
          label: "Day 4",
          title: "Advanced CSS Grid",
          tools: ["css3"],
          topics: [
            "Template Areas",
            "FR Unit Sizing",
            "Implicit Grids",
            "Magazine Layout Task",
          ],
        },
        {
          label: "Day 5",
          title: "Mobile-First Strategy",
          tools: ["css3", "tailwind"],
          topics: [
            "Viewport Settings",
            "Relative Units (REM/VH)",
            "Media Query Logic",
            "Responsive Magazine",
          ],
        },
        {
          label: "Day 6",
          title: "Modern UI Animations",
          tools: ["css3"],
          topics: [
            "CSS Custom Variables",
            "Keyframe Timelines",
            "Transitions",
            "Slide-in Menu Build",
          ],
        },
        {
          label: "Day 7",
          title: "Professional Forms",
          tools: ["html5", "css3"],
          topics: [
            "Pseudo-class Styling",
            "Validation States",
            "Input Management",
            "Tailor Booking Form",
          ],
        },
        {
          label: "Day 8",
          title: "JavaScript Fundamentals",
          tools: ["javascript"],
          topics: [
            "Variable Scoping",
            "Template Literals",
            "Type Conversion",
            "Story Generator Task",
          ],
        },
        {
          label: "Day 9",
          title: "Control Flow & Logic",
          tools: ["javascript"],
          topics: [
            "Logical Operators",
            "Switch Statement Case",
            "Truthiness Check",
            "Password Strength Tool",
          ],
        },
        {
          label: "Day 10",
          title: "Functions & Scoping",
          tools: ["javascript"],
          topics: [
            "Arrow Function Syntax",
            "Return Value Logic",
            "Block vs Global",
            "Currency Converter",
          ],
        },
        {
          label: "Day 11",
          title: "DOM Manipulation",
          tools: ["javascript"],
          topics: [
            "Query Selectors",
            "Event Listeners",
            "Inline Style Control",
            "Dark Mode Toggle",
          ],
        },
        {
          label: "Day 12",
          title: "Array & List Logic",
          tools: ["javascript"],
          topics: [
            "Stack/Queue Methods",
            "Iteration Patterns",
            "Reference Types",
            "Live Shopping List",
          ],
        },
        {
          label: "Day 13",
          title: "Objects & JSON Data",
          tools: ["javascript"],
          topics: [
            "Key-Value Mapping",
            "JSON Stringification",
            "Nested Data",
            "Customer Profile Object",
          ],
        },
        {
          label: "Day 14",
          title: "High-Order Functions",
          tools: ["javascript"],
          topics: [
            ".map() & .filter()",
            ".sort() Logic",
            "Functional Pipelines",
            "Product Filter Project",
          ],
        },
        {
          label: "Day 15",
          title: "Persistence & Storage",
          tools: ["javascript"],
          topics: [
            "DOM Node Creation",
            "LocalStorage API",
            "State Preservation",
            "Persistent To-Do App",
          ],
        },
        {
          label: "Day 16",
          title: "Asynchronous JS Basics",
          tools: ["javascript"],
          topics: [
            "The Event Loop",
            "Callback Patterns",
            "SetTimeout/Interval",
            "Real-time Clock Build",
          ],
        },
        {
          label: "Day 17",
          title: "Promises & Fetch API",
          tools: ["javascript"],
          topics: [
            "API Request Cycle",
            "Then/Catch Chains",
            "Data Serialization",
            "Random User Dashboard",
          ],
        },
        {
          label: "Day 18",
          title: "Modern Async/Await",
          tools: ["javascript"],
          topics: [
            "Async Syntax",
            "Try/Catch Handling",
            "Endpoint Integration",
            "Live Weather App",
          ],
        },
        {
          label: "Day 19",
          title: "Tooling & Deployment",
          tools: ["github"],
          topics: [
            "Chrome DevTools",
            "Git Branching",
            "Netlify Hosting",
            "Bug Squashing Session",
          ],
        },
        {
          label: "Day 20",
          title: "Final Residency Capstone",
          tools: ["javascript", "html5", "css3"],
          topics: [
            "Full Architecture",
            "Performance Tuning",
            "Live Deployment",
            "Final Presentation",
          ],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
    "3 Months": {
      price: 12000,
      originalPrice: 15000,
      title: "MERN Full-Stack Development",
      subtitle: "System Architecture & Deployment",
      heroImg:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2072",
      syllabus: [
        {
          label: "Mon 1",
          title: "UI & Logic Foundation",
          tools: ["html5", "css3", "javascript"],
          topics: [
            "Advanced Flex/Grid Layouts",
            "Responsive Netflix Clone",
            "Smart Fabric Calculator",
            "DOM & LocalStorage",
          ],
        },
        {
          label: "Mon 2",
          title: "Modern Frontend (React)",
          tools: ["react", "tailwind", "javascript"],
          topics: [
            "Hooks (useState/useEffect)",
            "API Data Fetching",
            "React Router Navigation",
            "Context API State",
          ],
        },
        {
          label: "Mon 3",
          title: "Backend & Database",
          tools: ["node", "mongodb", "github"],
          topics: [
            "Express Server Routing",
            "Mongoose Schema Design",
            "RESTful CRUD APIs",
            "Full-Stack Cloud Deploy",
          ],
        },
        {
          label: "Final",
          title: "Capstone: Enterprise App",
          tools: ["react", "node", "mongodb"],
          topics: [
            "Frontend-Backend Auth",
            "Database Integration",
            "Performance Testing",
            "Live System Launch",
          ],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
  },
  Java: {
    "1 Week": {
      price: 1500,
      originalPrice: 2000,
      title: "Java Fundamentals",
      subtitle: "Core Basics & Problem Solving",
      heroImg:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070",
      syllabus: [
        {
          label: "Day 1-2",
          title: "Java Introduction & Basics",
          tools: ["java"],
          topics: [
            "What is Java",
            "JDK, JRE, JVM",
            "Hello World Program",
            "Data Types & Variables",
            "Type Casting",
            "Print Statements",
            "Simple Calculations",
          ],
        },
        {
          label: "Day 3",
          title: "Operators",
          tools: ["java"],
          topics: [
            "Arithmetic Operators",
            "Relational Operators",
            "Logical Operators",
            "Increment / Decrement",
            "Swap Two Numbers",
            "Simple Calculator",
          ],
        },
        {
          label: "Day 4",
          title: "Conditional Statements",
          tools: ["java"],
          topics: [
            "if Statement",
            "if-else",
            "else-if Ladder",
            "switch Case",
            "Even/Odd Program",
            "Largest of 3 Numbers",
            "Grade System",
          ],
        },
        {
          label: "Day 5",
          title: "Loops",
          tools: ["java"],
          topics: [
            "for Loop",
            "while Loop",
            "do-while Loop",
            "break & continue",
            "Factorial Program",
            "Fibonacci Series",
            "Palindrome Number",
          ],
        },
        {
          label: "Day 6",
          title: "Arrays",
          tools: ["java"],
          topics: [
            "1D Arrays",
            "Array Traversing",
            "Basic Array Operations",
            "Maximum & Minimum",
            "Sum of Array",
            "Reverse Array",
          ],
        },
        {
          label: "Day 7",
          title: "Methods",
          tools: ["java"],
          topics: [
            "Method Syntax",
            "Parameters",
            "Return Types",
            "Method Overloading (Basic)",
            "Prime Number Program",
            "Palindrome using Method",
          ],
        },
      ],
      projects: [
        {
          title: "Student Marks Calculator",
          tech: ["Java"],
          img: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800",
        },
        {
          title: "Number Utility App",
          tech: ["Java"],
          img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Rahul Sharma",
          role: "Java Developer Intern",
          text: "This foundation week helped me master core Java concepts and logic building.",
          rating: 5,
        },
      ],
    },
    "2 Weeks": {
      price: 2500,
      originalPrice: 3500,
      title: "Java Core to OOP",
      subtitle: "Complete Foundation + OOP Mastery",
      heroImg:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
      syllabus: [
        {
          label: "Day 1-2",
          title: "Java Introduction & Basics",
          tools: ["java"],
          topics: [
            "What is Java",
            "JDK, JRE, JVM",
            "Hello World Program",
            "Data Types & Variables",
            "Type Casting",
            "Print Details",
            "Simple Calculations",
          ],
        },
        {
          label: "Day 3",
          title: "Operators",
          tools: ["java"],
          topics: [
            "Arithmetic Operators",
            "Relational Operators",
            "Logical Operators",
            "Increment / Decrement",
            "Swap 2 Numbers",
            "Simple Calculator",
          ],
        },
        {
          label: "Day 4",
          title: "Conditional Statements",
          tools: ["java"],
          topics: [
            "if",
            "if-else",
            "else-if",
            "switch",
            "Even/Odd",
            "Largest of 3 Numbers",
            "Grade System",
          ],
        },
        {
          label: "Day 5",
          title: "Loops",
          tools: ["java"],
          topics: [
            "for Loop",
            "while Loop",
            "do-while",
            "break & continue",
            "Factorial",
            "Fibonacci",
            "Palindrome Number",
          ],
        },
        {
          label: "Day 6",
          title: "Arrays",
          tools: ["java"],
          topics: [
            "1D Array",
            "Traversing",
            "Basic Operations",
            "Max/Min",
            "Sum of Array",
            "Reverse Array",
          ],
        },
        {
          label: "Day 7",
          title: "Methods",
          tools: ["java"],
          topics: [
            "Method Syntax",
            "Parameters",
            "Return Type",
            "Method Overloading",
            "Prime Number",
            "Palindrome using Method",
          ],
        },
        {
          label: "Day 8-9",
          title: "OOP Concepts",
          tools: ["java"],
          topics: [
            "Class & Object",
            "Constructor",
            "this Keyword",
            "Encapsulation (Getter/Setter)",
            "Student Class Practice",
            "Employee Class Practice",
          ],
        },
        {
          label: "Day 10",
          title: "Inheritance",
          tools: ["java"],
          topics: [
            "Single Inheritance",
            "Method Overriding",
            "Animal-Dog Example",
          ],
        },
        {
          label: "Day 11",
          title: "Polymorphism",
          tools: ["java"],
          topics: ["Compile-time (Overloading)", "Runtime (Overriding)"],
        },
        {
          label: "Day 12",
          title: "Abstraction",
          tools: ["java"],
          topics: ["Abstract Class", "Interface (Basic)"],
        },
        {
          label: "Day 13",
          title: "Exception Handling",
          tools: ["java"],
          topics: [
            "try-catch-finally",
            "throw & throws",
            "Divide by Zero Handling",
            "Custom Error Message",
          ],
        },
        {
          label: "Day 14",
          title: "Strings",
          tools: ["java"],
          topics: [
            "String Methods",
            "StringBuilder",
            "Reverse String",
            "Remove Duplicates",
          ],
        },
      ],
      projects: [
        {
          title: "Student Management System",
          tech: ["Java"],
          img: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800",
        },
        {
          title: "Banking Console App",
          tech: ["Java"],
          img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Karthik R",
          role: "Java Developer Intern",
          text: "This roadmap gave me strong OOP clarity and real coding confidence.",
          rating: 5,
        },
      ],
    },
    "1 Month": {
      price: 2500,
      originalPrice: 3500,
      title: "Core Java Mastery",
      subtitle: "From Basics to Collections Framework",
      heroImg:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2070",
      syllabus: [
        {
          label: "Day 1",
          title: "Java Introduction",
          tools: ["java"],
          topics: [
            "Java Editions",
            "JVM Basics",
            "JDK Setup",
            "IDE Setup",
            "PATH Configuration",
          ],
        },
        {
          label: "Day 2",
          title: "Java Structure",
          tools: ["java"],
          topics: [
            "Syntax Basics",
            "Program Structure",
            "main() Method",
            "Class Format",
          ],
        },
        {
          label: "Day 3",
          title: "Java Internals",
          tools: ["java"],
          topics: ["JDK vs JRE vs JVM", "JIT Compiler"],
        },
        {
          label: "Day 4",
          title: "Tokens & Operators",
          tools: ["java"],
          topics: [
            "Java Tokens",
            "Arithmetic Operators",
            "Logical Operators",
            "Relational Operators",
          ],
        },
        {
          label: "Day 5",
          title: "Variables & Data Types",
          tools: ["java"],
          topics: ["Variable Naming", "Primitive Data Types", "Type Casting"],
        },
        {
          label: "Day 6",
          title: "Strings",
          tools: ["java"],
          topics: ["equals()", "substring()", "replace()", "String Methods"],
        },
        {
          label: "Day 7",
          title: "Arrays",
          tools: ["java"],
          topics: ["1D Arrays", "2D Arrays", "Traversal", "Array Operations"],
        },

        {
          label: "Day 8",
          title: "Number Programming",
          tools: ["java"],
          topics: ["Palindrome", "Factorial", "Number Logic"],
        },
        {
          label: "Day 9",
          title: "Conditionals & Loops",
          tools: ["java"],
          topics: ["if/else", "switch", "for Loop", "while Loop"],
        },
        {
          label: "Day 10",
          title: "Methods",
          tools: ["java"],
          topics: [
            "Method Creation",
            "Parameters",
            "Return Types",
            "Method Overloading",
          ],
        },
        {
          label: "Day 11",
          title: "Static Concepts",
          tools: ["java"],
          topics: ["Static Keyword", "Non-Static Methods", "Memory Behavior"],
        },
        {
          label: "Day 12",
          title: "Practice Day",
          tools: ["java"],
          topics: ["Arrays Practice", "Strings Practice", "Pattern Programs"],
        },
        {
          label: "Day 13",
          title: "Classes & Objects",
          tools: ["java"],
          topics: ["Class Design", "Object Creation", "Real-world Modeling"],
        },
        {
          label: "Day 14",
          title: "Constructors",
          tools: ["java"],
          topics: [
            "Default Constructor",
            "Parameterized Constructor",
            "Constructor Overloading",
          ],
        },

        {
          label: "Day 15",
          title: "Memory & this",
          tools: ["java"],
          topics: ["Heap vs Stack", "this Keyword Usage"],
        },
        {
          label: "Day 16",
          title: "Encapsulation",
          tools: ["java"],
          topics: ["Getters & Setters", "Access Modifiers"],
        },
        {
          label: "Day 17",
          title: "Inheritance",
          tools: ["java"],
          topics: ["Inheritance Types", "super Keyword"],
        },
        {
          label: "Day 18",
          title: "Polymorphism",
          tools: ["java"],
          topics: [
            "Method Overloading",
            "Method Overriding",
            "Abstract Classes",
          ],
        },
        {
          label: "Day 19",
          title: "Interfaces",
          tools: ["java"],
          topics: ["Interface Basics", "Implementation"],
        },
        {
          label: "Day 20",
          title: "OOP Practice",
          tools: ["java"],
          topics: ["OOP Design Problems", "Mini Projects"],
        },

        {
          label: "Day 21",
          title: "Packages",
          tools: ["java"],
          topics: ["Packages", "Import Statements"],
        },
        {
          label: "Day 22",
          title: "Object Class",
          tools: ["java"],
          topics: ["toString()", "equals()", "hashCode()"],
        },
        {
          label: "Day 23",
          title: "String Handling",
          tools: ["java"],
          topics: ["StringBuffer", "StringBuilder", "Differences"],
        },
        {
          label: "Day 24",
          title: "Wrapper Classes",
          tools: ["java"],
          topics: ["Primitive Wrappers", "Autoboxing", "Unboxing"],
        },
        {
          label: "Day 25",
          title: "Wrapper Practice",
          tools: ["java"],
          topics: ["Parsing", "Wrapper in Collections"],
        },

        {
          label: "Day 26",
          title: "Exception Handling",
          tools: ["java"],
          topics: ["try-catch-finally", "Checked vs Unchecked"],
        },
        {
          label: "Day 27",
          title: "Custom Exceptions",
          tools: ["java"],
          topics: ["User-defined Exceptions", "Input Validation"],
        },
        {
          label: "Day 28",
          title: "Collections Overview",
          tools: ["java"],
          topics: ["Collection Framework", "List vs Set vs Map"],
        },
        {
          label: "Day 29",
          title: "List & Set",
          tools: ["java"],
          topics: ["ArrayList", "LinkedList", "HashSet"],
        },
        {
          label: "Day 30",
          title: "Map & Queue",
          tools: ["java"],
          topics: ["HashMap", "PriorityQueue"],
        },
      ],
      projects: [
        {
          title: "Library Management System",
          tech: ["Java"],
          img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800",
        },
        {
          title: "Student Record System",
          tech: ["Java"],
          img: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Suresh Kumar",
          role: "Java Backend Trainee",
          text: "This roadmap gave me complete clarity from basics to collections with strong coding practice.",
          rating: 5,
        },
      ],
    },
    "3 Months": {
      price: 12000,
      originalPrice: 15000,
      title: "Java Full-Stack Internship",
      subtitle: "Java + Spring Boot + Frontend + Deployment",
      heroImg:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
      syllabus: [
        {
          label: "Day 1-5",
          title: "Java Basics",
          tools: ["java"],
          topics: [
            "Java Intro",
            "JDK/JRE/JVM",
            "Syntax",
            "Data Types",
            "Variables",
            "Operators",
          ],
        },
        {
          label: "Day 6-10",
          title: "Control Flow & Arrays",
          tools: ["java"],
          topics: ["if-else", "switch", "Loops", "Arrays", "Pattern Programs"],
        },
        {
          label: "Day 11-15",
          title: "Methods & Strings",
          tools: ["java"],
          topics: ["Methods", "Overloading", "String Methods", "StringBuilder"],
        },
        {
          label: "Day 16-20",
          title: "OOP Concepts",
          tools: ["java"],
          topics: [
            "Classes",
            "Objects",
            "Constructors",
            "Encapsulation",
            "this Keyword",
          ],
        },
        {
          label: "Day 21-25",
          title: "Advanced OOP",
          tools: ["java"],
          topics: ["Inheritance", "Polymorphism", "Abstraction", "Interfaces"],
        },
        {
          label: "Day 26-30",
          title: "Core Java Advanced",
          tools: ["java"],
          topics: [
            "Exception Handling",
            "Collections Framework",
            "Wrapper Classes",
          ],
        },
        {
          label: "Day 31-35",
          title: "Database & JDBC",
          tools: ["java", "mysql"],
          topics: ["SQL Basics", "CRUD", "Joins", "JDBC Connectivity"],
        },
        {
          label: "Day 36-40",
          title: "Spring Boot Basics",
          tools: ["spring"],
          topics: [
            "Spring Boot Setup",
            "Project Structure",
            "REST APIs",
            "Controllers",
          ],
        },
        {
          label: "Day 41-45",
          title: "Spring Boot Advanced",
          tools: ["spring"],
          topics: ["JPA/Hibernate", "Entity Mapping", "Service Layer", "DTO"],
        },
        {
          label: "Day 46-50",
          title: "Backend Project",
          tools: ["spring", "mysql"],
          topics: [
            "Full CRUD API",
            "Validation",
            "Exception Handling",
            "API Testing",
          ],
        },

        {
          label: "Day 51-55",
          title: "HTML & CSS",
          tools: ["html5", "css3"],
          topics: [
            "HTML Structure",
            "Forms",
            "CSS Styling",
            "Flexbox",
            "Responsive Design",
          ],
        },
        {
          label: "Day 56-60",
          title: "JavaScript Basics",
          tools: ["javascript"],
          topics: ["Variables", "Functions", "DOM", "Events", "Validation"],
        },
        {
          label: "Day 61-65",
          title: "Advanced JavaScript",
          tools: ["javascript"],
          topics: ["Arrays", "Objects", "ES6", "Fetch API", "Async/Await"],
        },
        {
          label: "Day 66-70",
          title: "React Basics",
          tools: ["react"],
          topics: ["Components", "Props", "State", "Hooks", "Routing"],
        },
        {
          label: "Day 71-75",
          title: "React Advanced",
          tools: ["react"],
          topics: [
            "API Integration",
            "Forms",
            "Context API",
            "State Management",
          ],
        },
        {
          label: "Day 76-80",
          title: "Frontend Project",
          tools: ["react", "css3"],
          topics: ["Build UI App", "Connect APIs", "Responsive UI"],
        },
        {
          label: "Day 81-85",
          title: "Full Stack Integration",
          tools: ["react", "spring"],
          topics: [
            "Frontend + Backend Integration",
            "CRUD UI",
            "Error Handling",
          ],
        },
        {
          label: "Day 86-90",
          title: "Deployment & GitHub",
          tools: ["github"],
          topics: [
            "Git Basics",
            "Push Code",
            "Frontend Deployment",
            "Backend Deployment",
            "Final Project Presentation",
          ],
        },
      ],
      projects: [
        {
          title: "Student Management System",
          tech: ["React", "Spring Boot", "MySQL"],
          img: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800",
        },
        {
          title: "E-Commerce Web App",
          tech: ["React", "Spring Boot"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Praveen Kumar",
          role: "Full Stack Intern",
          text: "This roadmap helped me build real-world Java full-stack projects and crack interviews.",
          rating: 5,
        },
      ],
    },
  },
  Python: {
    "1 Week": {
      price: 1500,
      originalPrice: 2000,
      title: "Python Quickstart",
      subtitle: "Automation & Scripts",
      heroImg:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070",
      syllabus: [
        {
          label: "Day 1",
          title: "Python Basics",
          tools: ["python"],
          topics: [
            "Variables",
            "Data Types",
            "Input/Output",
            "Indentation Logic",
          ],
        },
        {
          label: "Day 2",
          title: "Data Structures",
          tools: ["python"],
          topics: ["Lists", "Dictionaries", "Tuples", "List Comprehension"],
        },
        {
          label: "Day 3",
          title: "Functional Python",
          tools: ["python"],
          topics: [
            "Functions",
            "Modules",
            "Pip Packages",
            "Local/Global Scope",
          ],
        },
        {
          label: "Day 4",
          title: "File & Error Handling",
          tools: ["python"],
          topics: [
            "Try/Except",
            "File I/O",
            "Regular Expressions",
            "JSON Parsing",
          ],
        },
        {
          label: "Day 5",
          title: "Scripting & Automation",
          tools: ["python"],
          topics: [
            "BeautifulSoup Intro",
            "OS Module",
            "Github basics",
            "Final Script Demo",
          ],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
    "2 Weeks": {
      price: 2500,
      originalPrice: 3500,
      title: "Python Data Specialist",
      subtitle: "Logic to Data Science",
      heroImg:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
      syllabus: [
        {
          label: "Week 1",
          title: "OOP Python",
          tools: ["python"],
          topics: [
            "Classes & Methods",
            "Inheritance",
            "Decorators",
            "Iterators",
          ],
        },
        {
          label: "Week 2",
          title: "Data Analysis Intro",
          tools: ["python"],
          topics: [
            "NumPy Basics",
            "Pandas Dataframes",
            "Data Cleaning",
            "Matplotlib Visualization",
          ],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
    "1 Month": {
      price: 2500,
      originalPrice: 3500,
      title: "Web Developer (Python)",
      subtitle: "Django & Flask Specialist",
      heroImg:
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2070",
      syllabus: [
        {
          label: "Phase 1",
          title: "Flask Web Apps",
          tools: ["python"],
          topics: [
            "Routing",
            "Jinja2 Templates",
            "Request Handling",
            "Small Web App",
          ],
        },
        {
          label: "Phase 2",
          title: "Django Framework",
          tools: ["python"],
          topics: [
            "MTV Architecture",
            "Models & ORM",
            "Django Admin",
            "Authentication",
          ],
        },
        {
          label: "Phase 3",
          title: "Deployment",
          tools: ["github"],
          topics: [
            "PostgreSQL Integration",
            "Heroku/Railway",
            "Gunicorn",
            "API Integration",
          ],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
    "3 Months": {
      price: 12000,
      originalPrice: 15000,
      title: "Python Full-Stack Mastery",
      subtitle: "AI, Data & Web Systems",
      heroImg:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070",
      syllabus: [
        {
          label: "Month 1",
          title: "Web Backend (Django)",
          tools: ["python", "postgresql"],
          topics: [
            "Advanced Django ORM",
            "REST Framework (DRF)",
            "Middleware",
            "Celery Tasks",
          ],
        },
        {
          label: "Month 2",
          title: "Data & AI Intro",
          tools: ["python"],
          topics: [
            "Pandas Deep Dive",
            "Scikit-Learn Basics",
            "Predictive Modeling",
            "API Deployment",
          ],
        },
        {
          label: "Month 3",
          title: "Full-Stack & Cloud",
          tools: ["react", "python"],
          topics: [
            "React Frontend",
            "FastAPI Intro",
            "Dockerizing Apps",
            "Cloud Infrastructure",
          ],
        },
        {
          label: "Final",
          title: "Enterprise Capstone",
          tools: ["python", "react", "aws"],
          topics: [
            "System Architecture",
            "Security Audit",
            "Production Release",
            "Portfolio Presentation",
          ],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
  },
  DataAnalytics: {
    "1 Week": {
      price: 1500,
      originalPrice: 2000,
      title: "Data Analytics Foundations",
      subtitle: "Excel & Statistics Sprint",
      heroImg:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
      syllabus: [
        {
          label: "Day 1",
          title: "Advanced Excel",
          tools: ["excel"],
          topics: [
            "Pivot Tables",
            "VLOOKUP/XLOOKUP",
            "Data Cleaning",
            "Power Query",
          ],
        },
        {
          label: "Day 2",
          title: "Business Statistics",
          tools: ["excel"],
          topics: [
            "Descriptive Stats",
            "Probability",
            "Hypothesis Testing",
            "Outliers",
          ],
        },
        {
          label: "Day 3",
          title: "SQL for Data",
          tools: ["postgresql"],
          topics: [
            "SELECT & WHERE",
            "JOIN Operations",
            "GROUP BY Aggregates",
            "Subqueries",
          ],
        },
        {
          label: "Day 4",
          title: "Data Visualization",
          tools: ["powerbi"],
          topics: [
            "Chart Selection",
            "Dashboard Layout",
            "DAX Basics",
            "Slicers",
          ],
        },
        {
          label: "Day 5",
          title: "Capstone Project",
          tools: ["powerbi"],
          topics: [
            "Data Storytelling",
            "Executive Reporting",
            "Live Dashboard Build",
            "Presentation",
          ],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
    "2 Weeks": {
      price: 2500,
      originalPrice: 3500,
      title: "SQL & BI Mastery",
      subtitle: "Relational Data & Dashboards",
      heroImg:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
      syllabus: [
        {
          label: "Week 1",
          title: "Advanced SQL",
          tools: ["postgresql"],
          topics: [
            "Window Functions",
            "CTEs",
            "Views & Indexes",
            "Database Normalization",
          ],
        },
        {
          label: "Week 2",
          title: "Power BI / Tableau",
          tools: ["powerbi"],
          topics: [
            "Data Modeling",
            "Calculated Columns",
            "Row-Level Security",
            "Automated Refresh",
          ],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
    "1 Month": {
      price: 2500,
      originalPrice: 3500,
      title: "Professional Data Analyst",
      subtitle: "Python for Data Analysis",
      heroImg:
        "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070",
      syllabus: [
        {
          label: "Phase 1",
          title: "Python Basics",
          tools: ["python"],
          topics: [
            "Lists & Dictionaries",
            "Loops",
            "Functions",
            "Error Handling",
          ],
        },
        {
          label: "Phase 2",
          title: "Pandas & NumPy",
          tools: ["python"],
          topics: [
            "DataFrame Operations",
            "Vectorized Math",
            "Data Merging",
            "Missing Value Treatment",
          ],
        },
        {
          label: "Phase 3",
          title: "Exploratory Data Analysis",
          tools: ["python"],
          topics: [
            "Seaborn Charts",
            "Correlation Analysis",
            "Statistical Visualization",
            "Reporting",
          ],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
    "3 Months": {
      price: 12000,
      originalPrice: 15000,
      title: "Data Analytics Mastery",
      subtitle: "End-to-End Analytics Engineering",
      heroImg:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
      syllabus: [
        {
          label: "Mon 1",
          title: "SQL & Data Modeling",
          tools: ["postgresql"],
          topics: [
            "Star Schema",
            "Snowflake Schema",
            "ETL Pipelines",
            "Data Warehousing",
          ],
        },
        {
          label: "Mon 2",
          title: "Advanced BI & Python",
          tools: ["powerbi", "python"],
          topics: [
            "Python in Power BI",
            "Advanced DAX",
            "Predictive Analytics",
            "Data Governance",
          ],
        },
        {
          label: "Mon 3",
          title: "Big Data Tools",
          tools: ["python"],
          topics: [
            "Spark Intro",
            "Cloud Data Basics (AWS/Azure)",
            "Automation Scripts",
            "A/B Testing",
          ],
        },
        {
          label: "Final",
          title: "Enterprise Capstone",
          tools: ["powerbi", "python", "postgresql"],
          topics: [
            "Real-world Dataset",
            "Automated ETL",
            "Interactive Story",
            "SDR Review",
          ],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
  },
  DataScienceAI: {
    "1 Week": {
      price: 1500,
      originalPrice: 2000,
      title: "AI & ML Quickstart",
      subtitle: "Core Concept Crash Course",
      heroImg:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070",
      syllabus: [
        {
          label: "Day 1",
          title: "Math for AI",
          tools: ["python"],
          topics: ["Linear Algebra", "Calculus Basics", "Matrices", "Vectors"],
        },
        {
          label: "Day 2",
          title: "Scikit-Learn Basics",
          tools: ["python"],
          topics: [
            "Regression",
            "Classification",
            "Train/Test Split",
            "Feature Scaling",
          ],
        },
        {
          label: "Day 3",
          title: "Clustering & Patterns",
          tools: ["python"],
          topics: [
            "K-Means",
            "PCA",
            "Customer Segmentation",
            "Anomaly Detection",
          ],
        },
        {
          label: "Day 4",
          title: "Neural Networks Intro",
          tools: ["tensorflow"],
          topics: ["Perceptrons", "Activation Functions", "Layers", "Weights"],
        },
        {
          label: "Day 5",
          title: "AI Model Demo",
          tools: ["python"],
          topics: [
            "Model Training",
            "Prediction API",
            "Validation",
            "Live Testing",
          ],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
    "2 Weeks": {
      price: 2500,
      originalPrice: 3500,
      title: "Machine Learning Specialist",
      subtitle: "Algorithm Deep Dive",
      heroImg:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069",
      syllabus: [
        {
          label: "Week 1",
          title: "Supervised Learning",
          tools: ["python"],
          topics: [
            "Random Forests",
            "XGBoost",
            "SVMs",
            "Hyperparameter Tuning",
          ],
        },
        {
          label: "Week 2",
          title: "Deep Learning Intro",
          tools: ["pytorch"],
          topics: [
            "Backpropagation",
            "Gradient Descent",
            "CNNs",
            "Computer Vision Basics",
          ],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
    "1 Month": {
      price: 2500,
      originalPrice: 3500,
      title: "Deep Learning Engineer",
      subtitle: "Vision & Language Systems",
      heroImg:
        "https://images.unsplash.com/photo-1676277791608-ac54525aa94d?q=80&w=2070",
      syllabus: [
        {
          label: "Phase 1",
          title: "Computer Vision",
          tools: ["pytorch"],
          topics: [
            "Image Processing",
            "Object Detection",
            "YOLO",
            "Transfer Learning",
          ],
        },
        {
          label: "Phase 2",
          title: "Natural Language Processing",
          tools: ["python"],
          topics: [
            "Tokenization",
            "RNNs",
            "Word Embeddings",
            "Sentiment Analysis",
          ],
        },
        {
          label: "Phase 3",
          title: "Model Deployment",
          tools: ["flask", "docker"],
          topics: [
            "Model Serialization",
            "API Endpoints",
            "Dockerization",
            "Cloud Setup",
          ],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
    "3 Months": {
      price: 12000,
      originalPrice: 15000,
      title: "AI & GenAI Mastery",
      subtitle: "Large Language Models & MLOps",
      heroImg:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070",
      syllabus: [
        {
          label: "Mon 1",
          title: "Advanced ML Pipeline",
          tools: ["python", "postgresql"],
          topics: [
            "Feature Stores",
            "Data Engineering",
            "Ensemble Methods",
            "Model Tracking",
          ],
        },
        {
          label: "Mon 2",
          title: "LLM Foundations",
          tools: ["pytorch"],
          topics: [
            "Transformer Architecture",
            "Attention Mechanisms",
            "HuggingFace",
            "BERT/GPT Intro",
          ],
        },
        {
          label: "Mon 3",
          title: "Generative AI",
          tools: ["pytorch"],
          topics: [
            "Prompt Engineering",
            "Fine-tuning LLMs",
            "LangChain",
            "Vector Databases",
          ],
        },
        {
          label: "Final",
          title: "Capstone: Intelligent App",
          tools: ["pytorch", "aws"],
          topics: [
            "End-to-End AI System",
            "Scaling Inference",
            "Live Monitoring",
            "Final Portfolio",
          ],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
  },
  Embedded: {
    "1 Week": {
      price: 1500,
      originalPrice: 2000,
      title: "Electronics 101",
      subtitle: "Hardware Foundations",
      heroImg:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070",
      syllabus: [
        {
          label: "Day 1",
          title: "Circuit Basics",
          tools: ["multimeter"],
          topics: [
            "Ohm's Law",
            "Components (Resistors/LEDs)",
            "Voltage/Current",
            "Breadboarding",
          ],
        },
        {
          label: "Day 2",
          title: "Microcontroller Intro",
          tools: ["arduino"],
          topics: [
            "Arduino IDE",
            "Digital I/O",
            "Analog Signals",
            "Blink/Serial",
          ],
        },
        {
          label: "Day 3",
          title: "Sensors & Actuators",
          tools: ["arduino"],
          topics: [
            "Ultrasonic Sensors",
            "Servos",
            "LCD Screens",
            "Potentiometers",
          ],
        },
        {
          label: "Day 4",
          title: "Protocols",
          tools: ["arduino"],
          topics: [
            "I2C Communication",
            "SPI Interface",
            "UART Serial",
            "Device Interfacing",
          ],
        },
        {
          label: "Day 5",
          title: "Mini Project",
          tools: ["arduino"],
          topics: ["Circuit Assembly", "Code Integration", "Debugging", "Demo"],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
    "2 Weeks": {
      price: 2500,
      originalPrice: 3500,
      title: "Embedded C Mastery",
      subtitle: "Firmware Development",
      heroImg:
        "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070",
      syllabus: [
        {
          label: "Week 1",
          title: "C for Embedded",
          tools: ["c"],
          topics: [
            "Bitwise Operations",
            "Pointers",
            "Memory Mapping",
            "Register Access",
          ],
        },
        {
          label: "Week 2",
          title: "STM32 Basics",
          tools: ["stm32"],
          topics: [
            "ARM Cortex M4",
            "HAL Drivers",
            "Timers & Interrupts",
            "DMA Control",
          ],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
    "1 Month": {
      price: 2500,
      originalPrice: 3500,
      title: "IoT Systems Engineer",
      subtitle: "Connected Devices & Wireless",
      heroImg:
        "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070",
      syllabus: [
        {
          label: "Phase 1",
          title: "ESP32 & Wi-Fi",
          tools: ["esp32"],
          topics: ["TCP/IP", "Webservers", "OTA Updates", "Deep Sleep Modes"],
        },
        {
          label: "Phase 2",
          title: "IoT Protocols",
          tools: ["esp32"],
          topics: ["MQTT", "HTTP/REST", "JSON Parsing", "AWS IoT Core"],
        },
        {
          label: "Phase 3",
          title: "Bluetooth & Mesh",
          tools: ["esp32"],
          topics: [
            "BLE (Bluetooth Low Energy)",
            "Mesh Networks",
            "Security",
            "Phone Connectivity",
          ],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
    "3 Months": {
      price: 12000,
      originalPrice: 15000,
      title: "Embedded Product Mastery",
      subtitle: "RTOS & Advanced Firmware",
      heroImg:
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069",
      syllabus: [
        {
          label: "Mon 1",
          title: "Real-Time OS (RTOS)",
          tools: ["freertos"],
          topics: ["Task Management", "Semaphores", "Mutexes", "Queues"],
        },
        {
          label: "Mon 2",
          title: "Embedded Linux",
          tools: ["raspberrypi"],
          topics: [
            "Kernel Basics",
            "Device Drivers",
            "Yocto Project",
            "Shell Scripting",
          ],
        },
        {
          label: "Mon 3",
          title: "PCB Design",
          tools: ["kicad"],
          topics: [
            "Schematic Design",
            "Layout Routing",
            "Gerber Files",
            "Component Sourcing",
          ],
        },
        {
          label: "Final",
          title: "Hardware Capstone",
          tools: ["stm32", "freertos"],
          topics: [
            "Custom PCB Build",
            "Firmware Logic",
            "Production Testing",
            "Launch Presentation",
          ],
        },
      ],
      projects: [
        {
          title: "E-Commerce OS",
          tech: ["React", "Node", "MongoDB"],
          img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        },
        {
          title: "SaaS Dashboard",
          tech: ["Next.js", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        },
      ],
      reviews: [
        {
          name: "Arjun Mehta",
          role: "SDE Intern @ Google",
          text: "The MERN roadmap is incredibly dense and practical.",
          rating: 5,
        },
      ],
    },
  },
};
