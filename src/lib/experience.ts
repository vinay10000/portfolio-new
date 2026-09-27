export type Tech = {
  name: string;
  /**
   * Only used when there is no real brand mark for this tool. Muted, never a
   * loud brand colour, so a fallback never pretends to be a logo.
   */
  tint?: string;
};

export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  mode?: "On-Site" | "Remote" | "Hybrid";
  current?: boolean;
  summary: string;
  tech: Tech[];
  bullets: string[];
  links?: { label: string; href: string }[];
};

/** Grouped by the kind of work each tool does, for /education. */
export const skillGroups: { title: string; items: Tech[] }[] = [
  {
    title: "Frontend",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "React Native" },
      { name: "Tailwind CSS" },
      { name: "HTML" },
      { name: "CSS" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "C#" },
      { name: "ASP.NET" },
      { name: "PHP" },
    ],
  },
  {
    title: "Data & Cloud",
    items: [
      { name: "SQL Server" },
      { name: "MySQL" },
      { name: "Supabase" },
      { name: "AWS" },
      { name: "Oracle Cloud" },
    ],
  },
  {
    title: "Microsoft Stack",
    items: [
      { name: "Microsoft Dynamics 365" },
      { name: "Power Apps" },
      { name: "Power Automate" },
    ],
  },
];

export const experiences: Experience[] = [
  {
    company: "Cognizant",
    role: "Programming Analyst",
    start: "November 2025",
    end: "Present",
    location: "Bengaluru, India",
    current: true,
    summary:
      "Enterprise application development and workflow automation on the Microsoft stack.",
    tech: [
      { name: "C#" },
      { name: "ASP.NET" },
      { name: "SQL Server" },
      { name: "Microsoft Dynamics 365" },
      { name: "Power Apps" },
      { name: "Power Automate" },
    ],
    bullets: [
      "Completed intensive training on the full software development lifecycle and enterprise application development.",
      "Developed applications using C#, ASP.NET MVC, SQL Server, and ADO.NET.",
      "Built solutions on Microsoft Dynamics 365 and Power Platform with Power Apps and Power Automate.",
      "Implemented workflow automation and business process solutions using low-code platforms.",
    ],
  },
  {
    company: "Gladxe Software Pvt Ltd",
    role: "Web Development Intern",
    start: "May 2024",
    end: "October 2024",
    location: "India",
    summary:
      "Fullstack web work across a Laravel storefront and an Express API layer.",
    tech: [
      { name: "Laravel" },
      { name: "PHP" },
      { name: "Express" },
      { name: "MySQL" },
      { name: "JavaScript" },
    ],
    bullets: [
      "Built and deployed a personal portfolio website using HTML, CSS, JavaScript, and PHP.",
      "Developed a functional e-commerce website on Laravel with product listings, a shopping cart, user authentication, and order management.",
      "Built and optimised RESTful APIs using Express and MySQL.",
    ],
  },
  {
    company: "hmi engineering services",
    role: "Data Science Intern",
    start: "May 2023",
    end: "June 2023",
    location: "India",
    summary:
      "Trained and evaluated machine learning models for early detection of mental illness.",
    tech: [{ name: "Python" }, { name: "scikit-learn" }],
    bullets: [
      "Developed and trained a machine learning model for the early detection of mental illness.",
      "Used Random Forest and SVM, along with data preprocessing, feature engineering, and model evaluation.",
    ],
  },
];

/** How many roles the home page shows before linking to /work. */
export const recentExperienceCount = 2;

export type Education = {
  school: string;
  degree: string;
  field: string;
  score?: string;
  start: string;
  end: string;
  location: string;
};

export const education: Education = {
  school: "NSRIT (Autonomous)",
  degree: "Bachelor of Technology",
  field: "Computer Science and Engineering",
  start: "2021",
  end: "2025",
  location: "Andhra Pradesh, India",
};

export type Certification = {
  name: string;
  issuer: string;
  href?: string;
};

export const certifications: Certification[] = [
  {
    name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
  },
  {
    name: "AWS Academy Graduate - AWS Academy Cloud Architecting",
    issuer: "Amazon Web Services",
  },
  {
    name: "EHE-112-52: Ethical Hacking Essentials",
    issuer: "EHE",
  },
  {
    name: "Frontend Developer React",
    issuer: "React",
  },
];
