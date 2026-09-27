import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function generateMetadata() {
  return {
    title: `${site.name} - RSS Feed`,
    alternates: { types: { "application/rss+xml": "/feed.xml" } },
  };
}

// A static export has no server to run this on, so the feed is written to a
// plain file at build time and served as a static asset. Without this, Next
// treats the handler as dynamic and refuses to export the site.
export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();
  const updated = posts[0]?.date ?? new Date().toISOString().slice(0, 10);

  const items = posts
    .map((p) => {
      const url = `${site.url}/blog/${p.slug}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${p.date}T09:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
      ${p.tags.map((t) => `<category>${esc(t)}</category>`).join("\n      ")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)}</title>
    <link>${site.url}</link>
    <description>${esc(site.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date(`${updated}T09:00:00Z`).toUTCString()}</lastBuildDate>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
