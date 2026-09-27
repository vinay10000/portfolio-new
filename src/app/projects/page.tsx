import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import { projects } from "@/lib/projects";
import { IconArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Projects",
  description: "Products, experiments and tools I have built.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="pb-4">
      <PageHead
        title="Projects"
        description="A few products and experiments I have shipped."
      />

      <ul>
        {projects.map((p) => {
          const body = (
            <>
              <div className="min-w-0 flex-1">
                <h2 className="flex flex-wrap items-center gap-2 text-[16px] font-bold leading-6 text-[var(--heading-ink)]">
                  {p.name}
                  {p.href ? (
                    <IconArrowUpRight className="text-[var(--muted-foreground)] transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  ) : null}
                </h2>
                <p className="mt-0.5 max-w-[62ch] text-[13px] leading-5 text-[var(--muted-foreground)]">
                  {p.description}
                </p>
                {p.stack?.length ? (
                  <p className="mt-1.5 text-[12px] text-[var(--muted-foreground)] opacity-80">
                    {p.stack.join(" · ")}
                  </p>
                ) : null}
              </div>
            </>
          );

          return (
            <li key={p.name} className="border-b border-[var(--border)] py-4 first:pt-1">
              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-[var(--radius)]"
                >
                  {body}
                </a>
              ) : (
                <div className="group">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
