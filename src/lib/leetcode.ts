/**
 * Solved-problem counts from LeetCode, via the community API at
 * https://github.com/alfaarghya/alfa-leetcode-api (MIT).
 *
 * Fetched once at build time. This site is a static export (Cloudflare Pages
 * serves files, not a server), so the counts are baked into the HTML on deploy
 * and only move when the site is rebuilt.
 *
 * The upstream API is a free Render instance that cold-starts and rate limits.
 * It failed from Cloudflare's build runners once already, and the old version
 * of this file returned null when that happened, so the footer dropped the
 * card with no error and no log line. A flaky third-party API silently deleted
 * a section of the live site. FALLBACK_SOLVED is a committed snapshot of the
 * last good read so the card always renders; a successful fetch overwrites it.
 * To refresh the committed numbers by hand, hit the endpoint above and edit it.
 */

export const LEETCODE_USERNAME = "vinay10000";

const ENDPOINT = `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`;

export type Solved = {
  total: number;
  easy: number;
  medium: number;
  hard: number;
};

/** Last good read, 28 Sep 2026. See the note above before editing. */
const FALLBACK_SOLVED: Solved = {
  total: 251,
  easy: 131,
  medium: 105,
  hard: 15,
};

type SolvedResponse = {
  solvedProblem?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
};

// One warning per build worker, not one per page. The footer calls this on
// every route, and a line repeated 20 times is a line nobody reads.
let warned = false;

/**
 * Always returns numbers, so the caller never has to decide whether to render
 * the card. On a failed fetch it returns the committed snapshot and says so
 * loudly, because a stale read should be visible in the build log rather than
 * mistaken for a live one.
 */
export async function getSolved(): Promise<Solved> {
  try {
    const res = await fetch(ENDPOINT, {
      // `next.revalidate` is an ISR option and this site is exported statically,
      // so it is not available. `force-cache` lets the build reuse the response
      // instead of refetching it once per page that calls this.
      cache: "force-cache",
      // Generous, because a cold Render start can take a while and the
      // fallback means a slow answer costs freshness, not correctness.
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = (await res.json()) as SolvedResponse;
    const { solvedProblem, easySolved, mediumSolved, hardSolved } = data;
    if (
      typeof solvedProblem !== "number" ||
      typeof easySolved !== "number" ||
      typeof mediumSolved !== "number" ||
      typeof hardSolved !== "number"
    ) {
      throw new Error("response did not match the expected shape");
    }

    return {
      total: solvedProblem,
      easy: easySolved,
      medium: mediumSolved,
      hard: hardSolved,
    };
  } catch (err) {
    if (!warned) {
      warned = true;
      const why = err instanceof Error ? err.message : String(err);
      console.warn(
        `[leetcode] ${why} - using the snapshot in src/lib/leetcode.ts ` +
          `(${FALLBACK_SOLVED.total} solved, may be stale)`,
      );
    }
    return { ...FALLBACK_SOLVED };
  }
}
