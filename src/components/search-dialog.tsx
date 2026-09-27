"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import type { SearchDoc } from "@/lib/posts";
import { IconSearch } from "./icons";

type Hit = {
  doc: SearchDoc;
  score: number;
  snippets: { text: string; match: [number, number] }[];
};

const MAX_SNIPPETS = 4;
const SNIPPET_RADIUS = 46;

function score(doc: SearchDoc, q: string): { score: number; snippets: Hit["snippets"] } {
  const needle = q.toLowerCase();
  let score = 0;

  const title = doc.title.toLowerCase();
  if (title === needle) score += 120;
  else if (title.startsWith(needle)) score += 70;
  else if (title.includes(needle)) score += 45;

  const desc = doc.description.toLowerCase();
  if (desc.includes(needle)) score += 18;

  const tagHit = doc.tags.find((t) => t.toLowerCase().includes(needle));
  if (tagHit) score += 14;

  if (doc.category.toLowerCase().includes(needle)) score += 10;

  const body = doc.body;
  const haystack = body.toLowerCase();
  const snippets: Hit["snippets"] = [];

  if (haystack.includes(needle)) {
    let from = 0;
    let count = 0;
    while (count < MAX_SNIPPETS) {
      const at = haystack.indexOf(needle, from);
      if (at === -1) break;
      const start = Math.max(0, at - SNIPPET_RADIUS);
      const end = Math.min(body.length, at + needle.length + SNIPPET_RADIUS);
      const lead = body.slice(start, at);
      const trail = body.slice(at + needle.length, end);
      snippets.push({
        text: `${start > 0 ? "…" : ""}${lead}${needle}${trail}${
          end < body.length ? "…" : ""
        }`,
        match: [lead.length + (start > 0 ? 1 : 0), lead.length + (start > 0 ? 1 : 0) + needle.length],
      });
      from = at + needle.length;
      count += 1;
    }
    score += Math.min(snippets.length * 4, 16);
  }

  return { score, snippets };
}

/** Splits text around the match and marks only the matched run. */
function Snippet({ text, match }: { text: string; match: [number, number] }) {
  const [start, end] = match;
  return (
    <p className="truncate text-[13px] leading-5 text-[var(--muted-foreground)]">
      {text.slice(0, start)}
      <mark data-hit>{text.slice(start, end)}</mark>
      {text.slice(end)}
    </p>
  );
}

export function SearchDialog({
  docs,
  onOpenChange,
}: {
  docs: SearchDoc[];
  onOpenChange: (v: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // The palette is mounted on open, so the field takes focus immediately and
  // you can type without reaching for the mouse.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const hits = useMemo<Hit[]>(() => {
    const q = query.trim();
    if (!q) return [];
    return docs
      .map((doc) => {
        const { score: s, snippets } = score(doc, q);
        return { doc, score: s, snippets };
      })
      .filter((h) => h.score > 0)
      .sort((a, b) => b.score - a.score || (a.doc.date < b.doc.date ? 1 : -1))
      .slice(0, 12);
  }, [docs, query]);

  function go(slug: string) {
    onOpenChange(false);
    router.push(`/blog/${slug}`);
  }

  return (
    <Command
      shouldFilter={false}
      loop
      label="Search Blog"
      className="w-[min(38rem,calc(100vw-2rem))] overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-[var(--border)] bg-[var(--popover)] text-[var(--popover-foreground)] shadow-[0_16px_48px_-12px_rgb(0_0_0/0.28)]"
    >
      <div className="search-row flex items-center gap-2.5 border-b border-[var(--border)] px-4 transition-colors duration-150">
        <IconSearch className="shrink-0 text-[var(--muted-foreground)]" />
        <Command.Input
          ref={inputRef}
          value={query}
          onValueChange={setQuery}
          placeholder="Search post titles and text…"
          className="h-12 w-full bg-transparent text-[15px] outline-none placeholder:text-[var(--muted-foreground)]"
        />
        <kbd className="hidden shrink-0 rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--muted-foreground)] sm:block">
          ESC
        </kbd>
      </div>

      <Command.List className="max-h-[min(24rem,60vh)] overflow-y-auto overscroll-contain p-1.5">
        <Command.Empty className="px-3 py-8 text-center text-[13px] text-[var(--muted-foreground)]">
          {query.trim() ? `No posts match “${query.trim()}”.` : "Start typing to search."}
        </Command.Empty>

        {hits.length > 0 && (
          <>
            <div className="px-2.5 pb-1 pt-2 text-[11px] font-medium tracking-wide text-[var(--muted-foreground)]">
              {hits.length} {hits.length === 1 ? "post" : "posts"}
            </div>
            {hits.map((hit) => (
              <Command.Item
                key={hit.doc.slug}
                value={hit.doc.slug}
                onSelect={() => go(hit.doc.slug)}
                className="cursor-pointer rounded-[var(--radius)] px-2.5 py-2 outline-none data-[selected=true]:bg-[var(--accent)] data-[selected=true]:text-[var(--accent-foreground)]"
              >
                <p className="text-[11px] text-[var(--muted-foreground)]">
                  {hit.doc.category}
                </p>
                <p className="truncate text-[15px] font-semibold text-[var(--foreground)]">
                  {hit.doc.title}
                </p>
                {hit.snippets.length > 0 ? (
                  <div className="mt-1 space-y-0.5">
                    {hit.snippets.map((s, i) => (
                      <Snippet key={i} text={s.text} match={s.match} />
                    ))}
                  </div>
                ) : (
                  <p className="truncate text-[13px] text-[var(--muted-foreground)]">
                    {hit.doc.description}
                  </p>
                )}
              </Command.Item>
            ))}
          </>
        )}
      </Command.List>

      <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2 text-[11px] text-[var(--muted-foreground)]">
        <span>Searches titles, tags and body text</span>
        <span className="hidden sm:block">{docs.length} posts indexed</span>
      </div>
    </Command>
  );
}
