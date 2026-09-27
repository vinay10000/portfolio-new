"use client";

import { useMemo, useState } from "react";
import { PostRow } from "./post-row";
import type { CategoryCount, PostMeta } from "@/lib/posts";

const PREVIEW = 6;

export function BlogIndex({
  posts,
  categories,
}: {
  posts: PostMeta[];
  categories: CategoryCount[];
}) {
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(
    () =>
      category === "All" ? posts : posts.filter((p) => p.category === category),
    [posts, category],
  );

  // The count is derived from what is actually filtered, so the label can
  // never disagree with the list. No hidden posts, no stale number.
  const hidden = Math.max(0, filtered.length - PREVIEW);
  const visible = expanded ? filtered : filtered.slice(0, PREVIEW);

  return (
    <div className="pb-4">
      <div className="flex flex-wrap items-center gap-1.5">
        {categories.map((c) => {
          const active = c.name === category;
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => {
                setCategory(c.name);
                setExpanded(false);
              }}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 rounded-[var(--radius)] border px-2.5 py-1 text-[12px] transition-colors duration-150 ${
                active
                  ? "border-[color-mix(in_oklab,var(--foreground)_25%,transparent)] bg-[var(--accent)] font-medium text-[var(--accent-foreground)]"
                  : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-[color-mix(in_oklab,var(--foreground)_22%,transparent)] hover:text-[var(--foreground)]"
              }`}
            >
              {c.name}
              <span className="font-mono text-[11px] opacity-70">{c.count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-6">
        {visible.map((p) => (
          <PostRow key={p.slug} post={p} />
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-[14px] text-[var(--muted-foreground)]">
          Nothing filed under {category} yet.
        </p>
      ) : null}

      {hidden > 0 || expanded ? (
        <div className="pt-6">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-3.5 py-2 text-[13px] text-[var(--foreground)] transition-colors duration-150 hover:border-[color-mix(in_oklab,var(--foreground)_25%,transparent)] hover:bg-[var(--accent)]"
          >
            {expanded
              ? "Show fewer"
              : `Show all ${filtered.length} ${category === "All" ? "posts" : `${category} posts`}`}
          </button>
        </div>
      ) : null}
    </div>
  );
}
