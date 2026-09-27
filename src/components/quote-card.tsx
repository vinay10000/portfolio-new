"use client";

import { useEffect, useState } from "react";
import { quotes } from "@/lib/site";

/**
 * Rotates through quotes on an interval. The card is a fixed height and the
 * text is always in the DOM, so nothing disappears if the timer never fires.
 */
export function QuoteCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % quotes.length),
      12000,
    );
    return () => window.clearInterval(id);
  }, []);

  const q = quotes[index];

  return (
    <figure className="relative overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-[var(--border)] bg-[var(--card)] px-5 py-7 sm:pl-24">
      {/*
        One quiet open-quote mark, given a dedicated column of its own on the
        left and clear of both the text and the card edge, so nothing is
        sliced by the frame.
      */}
      <span
        aria-hidden="true"
        className="absolute left-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 text-[var(--foreground)] opacity-[0.08] sm:block"
      >
        <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor">
          <path d="M9.6 5.4C6.5 6.7 4.5 9.3 4.5 12.9c0 2.9 1.7 4.7 4.1 4.7 2 0 3.4-1.4 3.4-3.3 0-1.8-1.3-3.1-3-3.1-.3 0-.6 0-.8.1.4-1.7 1.8-3.2 3.8-4.2zm9.3 0c-3.1 1.3-5.1 3.9-5.1 7.5 0 2.9 1.7 4.7 4.1 4.7 2 0 3.4-1.4 3.4-3.3 0-1.8-1.3-3.1-3-3.1-.3 0-.6 0-.8.1.4-1.7 1.8-3.2 3.8-4.2z" />
        </svg>
      </span>

      <blockquote className="relative max-w-[58ch] font-[family-name:var(--font-quote)] text-[15px] italic leading-6 text-[var(--heading-ink)]">
        &ldquo;{q.text}&rdquo;
      </blockquote>
      <figcaption className="relative mt-2 text-right font-[family-name:var(--font-quote)] text-[13px] italic text-[var(--muted-foreground)]">
        — {q.author}
      </figcaption>
    </figure>
  );
}
