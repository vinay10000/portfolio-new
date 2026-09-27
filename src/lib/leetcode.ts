/**
 * Solved-problem counts from LeetCode, via the community API at
 * https://github.com/alfaarghya/alfa-leetcode-api (MIT).
 *
 * Fetched once at build time. This site is a static export (Cloudflare Pages
 * serves files, not a server), so the counts are baked into the HTML on deploy
 * and only move when the site is rebuilt. If the upstream API is slow, rate
 * limited or down, `getSolved` returns null and the caller omits the card
 * rather than rendering a broken one or inventing numbers.
 */

export const LEETCODE_USERNAME = "vinay10000";

const ENDPOINT = `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`;

export type Solved = {
  total: number;
  easy: number;
  medium: number;
  hard: number;
};

type SolvedResponse = {
  solvedProblem?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
};

export async function getSolved(): Promise<Solved | null> {
  try {
    const res = await fetch(ENDPOINT, {
      // `next.revalidate` is an ISR option and this site is exported statically,
      // so it is not available. `force-cache` lets the build reuse the response
      // instead of refetching it once per page that calls this.
      cache: "force-cache",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;

    const data = (await res.json()) as SolvedResponse;
    const { solvedProblem, easySolved, mediumSolved, hardSolved } = data;
    if (
      typeof solvedProblem !== "number" ||
      typeof easySolved !== "number" ||
      typeof mediumSolved !== "number" ||
      typeof hardSolved !== "number"
    ) {
      return null;
    }

    return {
      total: solvedProblem,
      easy: easySolved,
      medium: mediumSolved,
      hard: hardSolved,
    };
  } catch {
    // Network error, abort, or malformed JSON. All the same to the caller.
    return null;
  }
}
