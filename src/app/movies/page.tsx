import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import { movies } from "@/lib/personal";

export const metadata: Metadata = {
  title: "Movies",
  description: "Films and shows that have inspired and entertained me.",
  alternates: { canonical: "/movies" },
};

export default function MoviesPage() {
  return (
    <div className="pb-4">
      <PageHead
        title="Movies"
        description="Movies and shows that have inspired and entertained me."
      />

      <ul className="grid gap-2 sm:grid-cols-2">
        {movies.map((m) => (
          <li
            key={m.title}
            className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-3.5 py-3 transition-colors duration-150 hover:border-[color-mix(in_oklab,var(--foreground)_20%,transparent)] hover:bg-[var(--accent)]"
          >
            <p className="text-[14px] font-semibold leading-5 text-[var(--heading-ink)]">
              {m.title}
            </p>
            <p className="mt-0.5 font-mono text-[12px] text-[var(--muted-foreground)]">
              {m.year}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
