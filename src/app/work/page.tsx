import type { Metadata } from "next";
import { PageHead, StatusBadge } from "@/components/ui";
import { TechRow } from "@/components/tech-tile";
import { experiences } from "@/lib/experience";
import { placeLabel } from "@/lib/format";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Roles, technologies and outcomes across the places I have worked and the things I have shipped.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="pb-4">
      <PageHead
        title="Work Experience"
        description="My work across different companies and roles."
      />

      <ol>
        {experiences.map((e) => (
          <li
            key={`${e.company}-${e.role}`}
            className="border-b border-[var(--border)] py-6 first:pt-1"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <div className="min-w-0">
                <h2 className="flex flex-wrap items-center gap-2 text-[18px] font-bold leading-7 text-[var(--heading-ink)]">
                  {e.company}
                  {e.current ? <StatusBadge>Working</StatusBadge> : null}
                </h2>
                <p className="mt-0.5 text-[13px] text-[var(--muted-foreground)]">
                  {e.role}
                </p>
              </div>
                <div className="text-right text-[13px] leading-5 text-[var(--muted-foreground)]">
                  <p>
                    {e.start} – {e.end}
                  </p>
                  <p>{placeLabel(e)}</p>
                </div>
            </div>

            <p className="mt-2.5 max-w-[62ch] text-[14px] leading-5 text-[var(--muted-foreground)]">
              {e.summary}
            </p>

            <TechRow tech={e.tech} />

            <p className="mt-5 text-[13px] font-semibold text-[var(--heading-ink)]">
              What I&rsquo;ve done
            </p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[13px] leading-5 text-[var(--muted-foreground)]">
              {e.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            {e.links?.length ? (
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {e.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] text-[var(--foreground)] underline decoration-[color-mix(in_oklab,var(--foreground)_30%,transparent)] underline-offset-3 transition-colors duration-150 hover:decoration-[var(--foreground)]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
