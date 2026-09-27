import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";
import { PostRow } from "@/components/post-row";
import { IconArrowLeft, IconClock } from "@/components/icons";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 2);

  return (
    <article className="pb-4">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-[13px] text-[var(--muted-foreground)] transition-colors duration-150 hover:text-[var(--foreground)]"
      >
        <IconArrowLeft width={13} height={13} />
        Back to Blog
      </Link>

      <header className="mt-4">
        <h1 className="text-[28px] font-bold leading-9 tracking-tight text-[var(--heading-ink)] sm:text-[32px] sm:leading-[40px]">
          {post.title}
        </h1>
        {post.description ? (
          <p className="mt-2 max-w-[60ch] text-[15px] leading-6 text-[var(--muted-foreground)]">
            {post.description}
          </p>
        ) : null}
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-[var(--muted-foreground)]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <IconClock width={12} height={12} />
            {post.readingTime}
          </span>
          <span aria-hidden="true">·</span>
          <span>{post.category}</span>
        </div>
        <div className="mt-5 border-t border-[var(--border)]" />
      </header>

      <div className="mt-6 max-w-[68ch]">
        <Mdx source={post.body} />
      </div>

      <section className="mt-14">
        <h2 className="pb-1 text-[20px] font-bold leading-7 text-[var(--heading-ink)]">
          Related Posts
        </h2>
        {related.length > 0 ? (
          <ul>
            {related.map((p) => (
              <PostRow key={p.slug} post={p} />
            ))}
          </ul>
        ) : (
          <p className="text-[14px] text-[var(--muted-foreground)]">
            Nothing closely related yet.{" "}
            <Link
              href="/blog"
              className="rounded-[var(--radius)] text-[var(--foreground)] underline decoration-[var(--border)] underline-offset-2 transition-colors duration-150 hover:decoration-[var(--foreground)]"
            >
              Back to all writing
            </Link>
            .
          </p>
        )}
      </section>
    </article>
  );
}
