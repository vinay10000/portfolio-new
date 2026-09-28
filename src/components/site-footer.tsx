import Link from "next/link";
import { footerLinks, site, socials } from "@/lib/site";
import { getSolved } from "@/lib/leetcode";
import { SocialIcon } from "./icons";
import { LeetcodeRings } from "./activity-card";

export async function SiteFooter() {
  const year = new Date().getFullYear();
  // Never null. Falls back to a committed snapshot when the upstream API is
  // down, so the card below can never be dropped from the build.
  const solved = await getSolved();

  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--footer-veil)]">
      <div className="shell py-10">
        {/* Three columns on one shared grid so the weight balances. The rings
            are the first column, level with Navigate. All three are always
            filled: a conditional card here left a dead gap on the right when the
            API was down at build time. The playlist embed used to be a fourth
            column, but a 56rem shell splits four ways into 188px each and the
            embed cannot render in anything under 360px, so it lives in the hero
            on the home page instead. */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <LeetcodeRings solved={solved} />

          <div>
            <h2 className="text-[12px] font-semibold text-[var(--muted-foreground)]">
              Navigate
            </h2>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    {...("external" in l && l.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-[13px] text-[var(--muted-foreground)] transition-colors duration-150 hover:text-[var(--foreground)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[12px] font-semibold text-[var(--muted-foreground)]">
              Connect
            </h2>
            <ul className="mt-3 flex flex-wrap gap-1.5">
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
                    <SocialIcon name={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 border-t border-[var(--border)] pt-6 text-[12px] text-[var(--muted-foreground)]">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
