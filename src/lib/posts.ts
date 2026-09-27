import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  readingTime: string;
};

export type Post = PostMeta & { body: string };

function parse(file: string): Post {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? "1970-01-01"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    category: String(data.category ?? "Notes"),
    readingTime: readingTime(content).text.replace("read", "read").trim(),
    body: content,
  };
}

function allFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
}

/** Newest first. */
export function getAllPosts(): PostMeta[] {
  return allFiles()
    .map(parse)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      date: p.date,
      tags: p.tags,
      category: p.category,
      readingTime: p.readingTime,
    }));
}

export function getPostBySlug(slug: string): Post | null {
  const file = `${slug}.mdx`;
  if (!allFiles().includes(file)) return null;
  return parse(file);
}

export function getRecentPosts(count: number): PostMeta[] {
  return getAllPosts().slice(0, count);
}

export function getRelatedPosts(slug: string, count = 3): PostMeta[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.filter((p) => p.slug !== slug).slice(0, count);
  const scored = all
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      p,
      score: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1));
  return scored.slice(0, count).map((s) => s.p);
}

export type CategoryCount = { name: string; count: number };

export function getCategories(): CategoryCount[] {
  const all = getAllPosts();
  const map = new Map<string, number>();
  for (const p of all) map.set(p.category, (map.get(p.category) ?? 0) + 1);
  return [{ name: "All", count: all.length }].concat(
    [...map.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
  );
}

export type SearchDoc = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  tags: string[];
  /** Flattened body text so search can match inside paragraphs. */
  body: string;
};

let cache: SearchDoc[] | null = null;

export function getSearchIndex(): SearchDoc[] {
  if (cache) return cache;
  cache = allFiles().map((f) => {
    const p = parse(f);
    return {
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: p.category,
      date: p.date,
      tags: p.tags,
      body: p.body
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/`[^`]*`/g, " ")
        .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/[#>*_~-]/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    };
  });
  return cache;
}
