export const site = {
  name: "M.H. Vinay",
  shortName: "Vinay",
  domain: "mhvinay.pages.dev",
  url: "https://mhvinay.pages.dev",
  role: "Software Engineer",
  email: "mhvinay5@gmail.com",
  location: "India",
  tagline:
    "Fullstack and mobile developer. React, Next.js and Node on one side, C# and the Microsoft stack on the other.",
  // One line, not a paragraph. The Experience section below carries the detail.
  summary: "Fullstack and mobile engineer. React, Next.js, Node, C#, Dynamics 365.",
  description:
    "Software engineer building fullstack web and mobile products with React, Next.js, TypeScript and Node, plus enterprise work on C#, ASP.NET and the Microsoft Power Platform.",
} as const;

export type Social = {
  label: string;
  href: string;
  icon: SocialIcon;
};

export type SocialIcon =
  | "linkedin"
  | "github"
  | "x"
  | "youtube"
  | "leetcode"
  | "tryhackme"
  | "instagram"
  | "email";

export const socials: Social[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mhvinay", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/vinay10000", icon: "github" },
  { label: "Instagram", href: "https://www.instagram.com/m.h.vinay", icon: "instagram" },
  { label: "LeetCode", href: "https://leetcode.com/vinay10000", icon: "leetcode" },
  { label: "TryHackMe", href: "https://tryhackme.com/p/Dotsh", icon: "tryhackme" },
  { label: "Email", href: `mailto:${site.email}`, icon: "email" },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
] as const;

export const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/education", label: "Education" },
  { href: "/gears", label: "Gears" },
  { href: "/movies", label: "Movies" },
  { href: "/feed.xml", label: "RSS Feed", external: true },
] as const;

export const quotes: { text: string; author: string }[] = [
  {
    text: "When going through hell, one must keep going.",
    author: "Musashi",
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    text: "A man who is master of patience is master of everything else.",
    author: "George Savile",
  },
  {
    text: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of actions.",
    author: "Bhagavad Gita",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
];
