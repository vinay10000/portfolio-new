export type Project = {
  name: string;
  description: string;
  href?: string;
  stack?: string[];
  status?: "Live" | "In progress" | "Archived";
};

/**
 * These are the projects named on the profile as deployed and live. A project
 * with an `href` becomes clickable and opens in a new tab; one without stays a
 * plain row, so nothing on the page is a link that goes nowhere.
 */
export const projects: Project[] = [
  {
    name: "Real-time Collaborative Docs",
    description:
      "A collaborative document platform where multiple people edit at the same time, with presence and sync handled live.",
    href: "https://docscollab.vercel.app/",
    stack: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    status: "Live",
  },
  {
    name: "Chat Application",
    description:
      "A real-time messaging app with live message delivery rather than polling.",
    href: "https://chat-app-p3ge.onrender.com/",
    stack: ["React", "Node.js", "TypeScript"],
    status: "Live",
  },
  {
    name: "File Storage Solution",
    description:
      "A file upload and storage service with authenticated access to what belongs to each user.",
    href: "https://storage-management-f4npfl8h1-vinay0001s-projects.vercel.app/sign-in",
    stack: ["Node.js", "Express", "MySQL"],
    status: "Live",
  },
  {
    name: "Sticky Notes App",
    description:
      "A small cross-platform sticky notes app built with React Native.",
    href: "https://sticky-notes-puce.vercel.app/",
    stack: ["React Native", "TypeScript"],
    status: "Live",
  },
];
