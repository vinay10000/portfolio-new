import { brandPath } from "@/lib/brands";

export type Tech = {
  name: string;
  /**
   * Only used when there is no real brand mark for this tool. Muted, never a
   * loud brand colour, so a fallback never pretends to be a logo.
   */
  tint?: string;
};

function BrandMark({ name }: { name: string }) {
  const d = brandPath(name);
  if (!d) return null;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 shrink-0"
      fill="currentColor"
    >
      <path d={d} />
    </svg>
  );
}

/**
 * A tool in the stack.
 *
 * The name is always rendered. An earlier version collapsed it away and
 * revealed it on hover, which meant a phone user saw a row of marks with
 * nothing to read, so the label stays and the tile keeps its quiet dashed
 * outline instead. Where a genuine brand mark exists it is used; where one
 * does not, the name carries the tile on its own rather than an invented
 * two-letter stand-in.
 */
export function TechTile({ tech }: { tech: Tech }) {
  const hasMark = brandPath(tech.name) !== null;

  return (
    <span
      title={tech.name}
      className="tech-tile group inline-flex max-w-full items-center gap-1.5 rounded-[var(--radius)] border border-dashed border-[var(--border)] bg-[color-mix(in_oklab,var(--card)_60%,transparent)] px-2 py-1 text-[12px] leading-5 text-[var(--muted-foreground)] transition-colors duration-150 hover:border-[color-mix(in_oklab,var(--foreground)_28%,transparent)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
    >
      {hasMark ? (
        <span className="text-[var(--foreground)] opacity-70 transition-opacity duration-150 group-hover:opacity-100">
          <BrandMark name={tech.name} />
        </span>
      ) : (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--muted-foreground)] opacity-60"
          style={tech.tint ? { background: tech.tint } : undefined}
        />
      )}
      <span className="truncate">{tech.name}</span>
    </span>
  );
}

export function TechRow({ tech }: { tech: Tech[] }) {
  if (tech.length === 0) return null;
  return (
    <>
      <p className="mt-5 text-[13px] font-semibold text-[var(--heading-ink)]">
        Technologies &amp; Tools
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {tech.map((t) => (
          <TechTile key={t.name} tech={t} />
        ))}
      </div>
    </>
  );
}
