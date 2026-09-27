export type Project = {
  name: string;
  description: string;
  href?: string;
  stack?: string[];
  status?: "Live" | "In progress" | "Archived";
};

/**
 * These are the projects named on the profile as deployed and live. The `href`
 * values are deliberately absent until there is a real URL for each one, so
 * nothing on the page is a link that goes nowhere. Add an `href` and the row
 * becomes clickable on its own.
 */
export const projects: Project[] = [
  {
    name: "Real-time Collaborative Docs",
    description:
      "A collaborative document platform where multiple people edit at the same time, with presence and sync handled live.",
    stack: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    status: "Live",
  },
  {
    name: "Chat Application",
    description:
      "A real-time messaging app with live message delivery rather than polling.",
    stack: ["React", "Node.js", "TypeScript"],
    status: "Live",
  },
  {
    name: "File Storage Solution",
    description:
      "A file upload and storage service with authenticated access to what belongs to each user.",
    stack: ["Node.js", "Express", "MySQL"],
    status: "Live",
  },
  {
    name: "Sticky Notes App",
    description:
      "A small cross-platform sticky notes app built with React Native.",
    stack: ["React Native", "TypeScript"],
    status: "Live",
  },
];
