import Link from "next/link";
import { IconArrowUpRight } from "./icons";

/** Page title plus one line of context. Opens each page the same way. */
export function PageHead({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="pb-6">
      <h1 className="text-[24px] font-bold leading-8 tracking-tight text-[var(--heading-ink)]">
        {title}
      </h1>
      <p className="mt-1 text-[14px] leading-5 text-[var(--muted-foreground)]">
        {description}
      </p>
      <div className="mt-6 border-t border-[var(--border)]" />
    </div>
  );
}

/** A titled block. The rule is the same width everywhere, never decorative. */
export function Section({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-2 ${className}`}>
      {title ? (
        <h2 className="pb-1 text-[20px] font-bold leading-7 text-[var(--heading-ink)]">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}

export function SectionLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 transition-colors duration-150 hover:border-[color-mix(in_oklab,var(--foreground)_22%,transparent)] hover:bg-[var(--accent)]"
    >
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold leading-6 text-[var(--heading-ink)]">
          {title}
        </p>
        <p className="truncate text-[13px] leading-5 text-[var(--muted-foreground)]">
          {description}
        </p>
      </div>
      <IconArrowUpRight className="shrink-0 text-[var(--muted-foreground)] transition-colors duration-150 group-hover:text-[var(--foreground)]" />
    </Link>
  );
}

export function StatusBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[var(--radius)] bg-[color-mix(in_oklab,var(--live)_16%,transparent)] px-1.5 py-0.5 align-middle text-[11px] font-medium text-[color-mix(in_oklab,var(--live-deep)_80%,var(--foreground))] dark:text-[var(--live)]">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-[var(--live)]"
      />
      {children}
    </span>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[var(--radius)] border border-[var(--border)] px-1.5 py-0.5 text-[11px] text-[var(--muted-foreground)]">
      {children}
    </span>
  );
}
