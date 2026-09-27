import Link from "next/link";
import Image from "next/image";
import { CopyButton } from "@/components/copy-button";
import { QuoteCard } from "@/components/quote-card";
import { Section, SectionLink, StatusBadge } from "@/components/ui";
import { SocialIcon } from "@/components/icons";
import { experiences, recentExperienceCount } from "@/lib/experience";
import { placeLabel } from "@/lib/format";
import { getRecentPosts } from "@/lib/posts";
import { projects } from "@/lib/projects";
import { site, socials } from "@/lib/site";
import { PostRow, ProjectBody } from "@/components/post-row";
import { TechRow } from "@/components/tech-tile";

export default function HomePage() {
  const recent = experiences.slice(0, recentExperienceCount);
  const posts = getRecentPosts(3);

  return (
    <div className="pb-4">
      {/* Hero. The name and the mark sit on one baseline, the way a byline
          does in print, rather than stacking into a centred hero block. */}
      <section className="flex items-start gap-4">
        <Image
          src="/logo-256.png"
          alt={`${site.name}, ${site.role}`}
          width={80}
          height={80}
          className="mt-0.5 h-16 w-16 shrink-0 rounded-full sm:h-20 sm:w-20"
          priority
        />
        <div className="min-w-0 pt-1">
          <h1 className="text-[24px] font-bold leading-8 tracking-tight text-[var(--heading-ink)]">
            {site.name}
          </h1>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[14px] text-[var(--muted-foreground)]">
              <span>{site.role}</span>
              <span aria-hidden="true">·</span>
              <CopyButton
                value={site.email}
                label={site.email}
                copiedLabel="Email copied"
                className="border-transparent bg-transparent px-1.5 py-0.5 font-mono text-[13px] hover:border-[var(--border)] hover:bg-[var(--card)]"
              >
                {site.email}
              </CopyButton>
              <span aria-hidden="true">·</span>
              <span>{site.location}</span>
            </p>
        </div>
      </section>

      <p className="mt-4 max-w-[72ch] text-pretty text-[14px] leading-5 text-[var(--muted-foreground)]">
        {site.summary}
      </p>

      <ul className="mt-4 flex flex-wrap items-center gap-1.5">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target={s.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              className="grid h-8 w-8 place-items-center rounded-[var(--radius)] text-[var(--muted-foreground)] transition-colors duration-150 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
            >
              <SocialIcon name={s.icon} width={17} height={17} />
            </a>
          </li>
        ))}
      </ul>

      <Section title="Experience" className="mt-12">
        <ul>
          {recent.map((e) => (
            <li
              key={`${e.company}-${e.role}`}
              className="border-b border-[var(--border)] py-4 first:pt-1"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2 text-[17px] font-bold leading-6 text-[var(--heading-ink)]">
                    {e.company}
                    {e.current ? <StatusBadge>Working</StatusBadge> : null}
                  </p>
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
              <details className="group mt-1.5">
                <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-[12px] text-[var(--muted-foreground)] transition-colors duration-150 hover:text-[var(--foreground)]">
                  <span className="transition-transform duration-200 group-open:rotate-180">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6 9.5l6 6 6-6" />
                    </svg>
                  </span>
                  <span className="group-open:hidden">Expand details</span>
                  <span className="hidden group-open:inline">Collapse details</span>
                </summary>
                <div className="mt-2.5">
                  <p className="max-w-[60ch] text-[13px] leading-5 text-[var(--muted-foreground)]">
                    {e.summary}
                  </p>
                  <TechRow tech={e.tech} />
                </div>
              </details>
            </li>
          ))}
        </ul>

        {experiences.length > recent.length ? (
          <div className="pt-5">
            <Link
              href="/work"
              className="inline-flex items-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-3.5 py-2 text-[13px] text-[var(--foreground)] transition-colors duration-150 hover:border-[color-mix(in_oklab,var(--foreground)_25%,transparent)] hover:bg-[var(--accent)]"
            >
              Show all work experiences
            </Link>
          </div>
        ) : null}
      </Section>

      <Section title="Blog" className="mt-12">
        <ul>
          {posts.map((p) => (
            <PostRow key={p.slug} post={p} />
          ))}
        </ul>
        <div className="pt-5">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-3.5 py-2 text-[13px] text-[var(--foreground)] transition-colors duration-150 hover:border-[color-mix(in_oklab,var(--foreground)_25%,transparent)] hover:bg-[var(--accent)]"
          >
            Show all posts
          </Link>
        </div>
      </Section>

      <Section title="Projects" className="mt-12">
        <ul>
          {projects.map((p) => (
            <li key={p.name} className="border-b border-[var(--border)] py-4 first:pt-1">
              <article>
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-[var(--radius)]"
                  >
                    <ProjectBody project={p} />
                  </a>
                ) : (
                  <div className="group">
                    <ProjectBody project={p} />
                  </div>
                )}
              </article>
            </li>
          ))}
        </ul>
        <div className="pt-5">
          <Link
            href="/projects"
            className="inline-flex items-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-3.5 py-2 text-[13px] text-[var(--foreground)] transition-colors duration-150 hover:border-[color-mix(in_oklab,var(--foreground)_25%,transparent)] hover:bg-[var(--accent)]"
          >
            Show all projects
          </Link>
        </div>
      </Section>

      <Section title="Development" className="mt-12">
        <div className="space-y-2">
          <SectionLink
            href="/gears"
            title="Gears"
            description="Tools, devices, and software I use to get work done."
          />
        </div>
      </Section>

      <Section title="Personal" className="mt-12">
        <div className="space-y-2">
          <SectionLink
            href="/education"
            title="Education"
            description="Degree, certifications, and the tools I reach for."
          />
          <SectionLink
            href="/movies"
            title="Movies"
            description="Films and shows that stuck with me."
          />
        </div>
      </Section>

      <div className="mt-12">
        <QuoteCard />
      </div>
    </div>
  );
}
