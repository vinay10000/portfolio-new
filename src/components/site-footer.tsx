import Link from "next/link";
import { footerLinks, site, socials } from "@/lib/site";
import { getSolved } from "@/lib/leetcode";
import { SocialIcon } from "./icons";
import { LeetcodeRings } from "./activity-card";

/** Set this in src/lib/site.ts to swap in a different playlist. */
const SPOTIFY_PLAYLIST_ID = "4pMTjn9zGah0x9dAgJ9dLR";

export async function SiteFooter() {
  const year = new Date().getFullYear();
  const spotifySrc = `https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`;
  // Null when the upstream API is unavailable, in which case the card is simply
  // left out rather than rendered with made-up numbers.
  const solved = await getSolved();

  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--footer-veil)]">
      <div className="shell py-10">
        {/* One row on one shared grid so the weight balances. The rings are the
            first column, level with Navigate, and the player is last so it never
            pushes the link columns around. When the API is down that column is
            dropped and the rest re-flow without a gap. */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {solved ? <LeetcodeRings solved={solved} /> : null}

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

          {/* Compact embed: 152px tall, the shortest height Spotify offers that
              still shows the track. Lazy so it costs nothing on first paint. */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="text-[12px] font-semibold text-[var(--muted-foreground)]">
              Listening to
            </h2>
            <iframe
              className="mt-3 h-[152px] w-full max-w-[100%] rounded-[8px] border-0"
              style={{ colorScheme: "normal" }}
              src={spotifySrc}
              width="100%"
              height="152"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              title="Spotify playlist"
            />
          </div>
        </div>

        <p className="mt-8 border-t border-[var(--border)] pt-6 text-[12px] text-[var(--muted-foreground)]">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
