import type { Metadata } from "next";
import { PageHead, Section } from "@/components/ui";
import { TechTile } from "@/components/tech-tile";
import {
  certifications,
  education,
  skillGroups,
} from "@/lib/experience";
import { IconArrowUpRight, IconCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: "Education",
  description:
    "Degree, certifications and the technical skills behind my work.",
  alternates: { canonical: "/education" },
};

export default function EducationPage() {
  return (
    <div className="pb-4">
      <PageHead
        title="Education &amp; Skills"
        description="Where I studied, what I have certified, and the tools I reach for."
      />

      <Section>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h2 className="text-[17px] font-bold leading-6 text-[var(--heading-ink)]">
            {education.school}
          </h2>
          <p className="text-[13px] text-[var(--muted-foreground)]">
            {education.start} – {education.end}
          </p>
        </div>
        <p className="mt-0.5 text-[13px] text-[var(--muted-foreground)]">
          {education.degree} · {education.field}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[var(--muted-foreground)]">
          {education.score ? (
            <span className="font-mono text-[12px]">{education.score}</span>
          ) : null}
          <span>{education.location}</span>
        </div>
      </Section>

      <Section title="Technical Skills" className="mt-10">
        <div className="space-y-5">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <p className="text-[13px] font-semibold text-[var(--heading-ink)]">
                {group.title}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {group.items.map((t) => (
                  <TechTile key={t.name} tech={t} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Certifications" className="mt-10">
        <ul>
          {certifications.map((c) => {
            const body = (
              <>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold leading-6 text-[var(--heading-ink)]">
                    {c.name}
                  </p>
                  <p className="mt-0.5 text-[13px] text-[var(--muted-foreground)]">
                    {c.issuer}
                  </p>
                </div>
                {c.href ? (
                  <IconArrowUpRight className="mt-1 shrink-0 text-[var(--muted-foreground)] transition-colors duration-150 group-hover:text-[var(--foreground)]" />
                ) : null}
              </>
            );
            return (
              <li key={c.name} className="border-b border-[var(--border)] py-4 first:pt-1">
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 rounded-[var(--radius)]"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="flex items-start gap-4">
                    <span className="mt-1 shrink-0 text-[var(--live)]">
                      <IconCheck width={15} height={15} />
                    </span>
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Section>
    </div>
  );
}
