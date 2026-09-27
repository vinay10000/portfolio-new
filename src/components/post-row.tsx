import Link from "next/link";
import { IconArrowUpRight, IconClock } from "./icons";
import { Pill } from "./ui";
import type { PostMeta } from "@/lib/posts";
import type { Project } from "@/lib/projects";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function PostRow({ post }: { post: PostMeta }) {
  return (
    <li className="border-b border-[var(--border)] py-4 first:pt-1">
      <article>
        <Link
          href={`/blog/${post.slug}`}
          className="group block rounded-[var(--radius)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-[17px] font-bold leading-6 text-[var(--heading-ink)] transition-colors duration-150 group-hover:text-[color-mix(in_oklab,var(--heading-ink)_72%,var(--foreground))]">
                {post.title}
              </h3>
              {post.description ? (
                <p className="mt-0.5 text-[13px] leading-5 text-[var(--muted-foreground)]">
                  {post.description}
                </p>
              ) : null}
            </div>
            <span className="mt-0.5 hidden shrink-0 items-center gap-1 text-[13px] text-[var(--muted-foreground)] sm:flex">
              Read more
              <IconArrowUpRight className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[12px] text-[var(--muted-foreground)]">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <IconClock width={12} height={12} />
              {post.readingTime}
            </span>
            {post.tags.slice(0, 3).map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
        </Link>
      </article>
    </li>
  );
}

/** The project summary, shared by the home page and /projects. */
export function ProjectBody({ project }: { project: Project }) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[17px] font-bold leading-6 text-[var(--heading-ink)] transition-colors duration-150 group-hover:text-[color-mix(in_oklab,var(--heading-ink)_72%,var(--foreground))]">
            {project.name}
          </h3>
          <p className="mt-0.5 max-w-[62ch] text-[13px] leading-5 text-[var(--muted-foreground)]">
            {project.description}
          </p>
        </div>
        {project.href ? (
          <span className="mt-0.5 hidden shrink-0 items-center gap-1 text-[13px] text-[var(--muted-foreground)] sm:flex">
            View
            <IconArrowUpRight className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        ) : null}
      </div>
      {project.stack?.length ? (
        <p className="mt-2 text-[12px] text-[var(--muted-foreground)] opacity-80">
          {project.stack.join(" · ")}
        </p>
      ) : null}
    </>
  );
}
