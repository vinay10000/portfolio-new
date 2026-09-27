import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import { gearGroups } from "@/lib/gears";
import { IconBox, IconExternal, IconGrid, IconLaptop } from "@/components/icons";

export const metadata: Metadata = {
  title: "Gears",
  description: "Tools, devices and software I use to get work done.",
  alternates: { canonical: "/gears" },
};

const iconFor = {
  laptop: IconLaptop,
  grid: IconGrid,
  box: IconBox,
} as const;

export default function GearsPage() {
  return (
    <div className="pb-4">
      <PageHead
        title="Gears"
        description="My gears and tools. This is the kit I actually get work done with."
      />

      {gearGroups.map((group) => {
        const Icon = iconFor[group.icon];
        return (
          <section key={group.title} className="mt-9 first:mt-2">
            <h2 className="flex items-center gap-2.5 text-[18px] font-bold leading-7 text-[var(--heading-ink)]">
              {/* A bare mark, not a glyph in a coloured tile. */}
              <Icon
                className="shrink-0 text-[var(--muted-foreground)]"
                width={17}
                height={17}
              />
              {group.title}
            </h2>

            {group.numbered ? (
              // A real ordered list, so the numbers come from the browser and
              // stay correct if an item is added or removed.
              <ol className="mt-3 list-decimal space-y-0.5 pl-5 text-[14px] text-[var(--foreground)] [&>li::marker]:font-mono [&>li::marker]:text-[12px] [&>li::marker]:text-[var(--muted-foreground)]">
                {group.items.map((item) => (
                  <li key={item.name} className="py-1.5">
                    {item.href ? (
                      <GearLinkHref name={item.name} href={item.href} />
                    ) : (
                      <span className="block text-[14px] text-[var(--foreground)]">
                        {item.name}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            ) : (
              <ul className="mt-3 space-y-0.5">
                {group.items.map((item) => (
                  <li key={item.name} className="py-1.5">
                    {item.href ? (
                      <GearLinkHref name={item.name} href={item.href} />
                    ) : (
                      <span className="block text-[14px] text-[var(--foreground)]">
                        {item.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}

/** The external-link glyph only appears on a link that actually goes somewhere. */
function GearLinkHref({ name, href }: { name: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 rounded-[var(--radius)] text-[14px] text-[var(--foreground)] transition-colors duration-150 hover:bg-[var(--accent)]"
    >
      <span>{name}</span>
      <IconExternal
        width={12}
        height={12}
        className="shrink-0 text-[var(--muted-foreground)] opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />
    </a>
  );
}
