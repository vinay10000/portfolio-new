import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

const STATIC_ROUTES = [
  { path: "", priority: 1, freq: "weekly" as const },
  { path: "/work", priority: 0.9, freq: "monthly" as const },
  { path: "/blog", priority: 0.9, freq: "weekly" as const },
  { path: "/resume", priority: 0.9, freq: "monthly" as const },
  { path: "/projects", priority: 0.8, freq: "monthly" as const },
  { path: "/education", priority: 0.7, freq: "yearly" as const },
  { path: "/movies", priority: 0.6, freq: "monthly" as const },
  { path: "/gears", priority: 0.6, freq: "monthly" as const },
];

// Required for `output: "export"`. The build cannot prove `new Date()` and
// `site.url` are static, so without this Next treats the route as dynamic.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const statics = STATIC_ROUTES.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  const posts = getAllPosts().map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(`${p.date}T00:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...statics, ...posts];
}
