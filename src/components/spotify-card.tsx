/**
 * The Spotify playlist embed.
 *
 * This is a real Spotify iframe and it gets no help from us: it picks its own
 * layout from the pixel size we hand it and clips whatever does not fit. Two
 * numbers below are floors measured against a real playlist, not preferences.
 *
 *  - HEIGHT must be 352. At 152 and at 232 the embed lands its track list on a
 *    half-row, so the last visible track is sliced through the middle with the
 *    Preview badge sitting on it. 352 is the first tier where the rows are whole.
 *  - WIDTH must be 360 or more. Narrower and the third track title truncates
 *    mid-word, reading "Feel It (From "Invincib".
 *
 * The tier check is exact, so nothing may change the content box. A 1px border
 * takes 352 down to 350 and silently drops the embed onto the short layout,
 * which leaves 200px of dead iframe under the player. The edge is therefore an
 * inset ring, which lives inside the box and cannot resize it.
 *
 * Both values are also written to the width/height attributes rather than left
 * to CSS, because the attributes are what the embed measures on first paint.
 */

const PLAYLIST_ID = "4pMTjn9zGah0x9dAgJ9dLR";

export function SpotifyCard() {
  return (
    <section aria-labelledby="listening-heading" className="min-w-0">
      <h2
        id="listening-heading"
        className="text-[12px] font-semibold text-[var(--muted-foreground)]"
      >
        Listening to
      </h2>
      <iframe
        className="mt-3 block w-full max-w-full rounded-[8px]"
        style={{
          // Keep Spotify on its own dark surface in both themes instead of
          // letting the page's color-scheme repaint its controls.
          colorScheme: "normal",
          boxShadow: "inset 0 0 0 1px var(--border)",
        }}
        src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`}
        width={380}
        height={352}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        title="Spotify playlist"
      />
    </section>
  );
}
