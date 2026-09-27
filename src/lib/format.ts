import type { Experience } from "./experience";

/**
 * "Bangalore, India (On-Site)", or just the location when the work mode adds
 * nothing. Never renders the same word twice.
 */
export function placeLabel(e: Pick<Experience, "location" | "mode">): string {
  if (!e.mode) return e.location;
  if (e.mode.toLowerCase() === e.location.toLowerCase()) return e.location;
  return `${e.location} (${e.mode})`;
}
