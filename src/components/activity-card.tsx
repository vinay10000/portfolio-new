"use client";

/**
 * Solved-problem rings, adapted from the Kokonut UI Apple Activity Card
 * (https://kokonutui.com/docs/cards/apple-activity-card, MIT).
 *
 * Four deliberate departures from the original, because this site has rules the
 * original does not:
 *
 *  - NO ENTRANCE ANIMATION ON CONTENT. The original fades the rings in from
 *    opacity 0. If Motion never runs, that content is simply gone. Here the
 *    markup already carries each ring's finished state, and the only animation
 *    is a CSS keyframe that sweeps the stroke from empty to full. Disabled
 *    animations and reduced-motion both leave the correct final state on screen.
 *  - NO MOTION DEPENDENCY. The rings are inline SVG with a CSS transition, so
 *    there is no library to load and nothing to fail.
 *  - NO GRADIENTS AND NO DROP SHADOWS. The original gradients each ring and adds
 *    a drop-shadow. Flat fills and a tonal track read cleaner and match the rest
 *    of the site.
 *  - THE SITE'S OWN COLOURS, not zinc. LeetCode's difficulty colours carry the
 *    meaning here: green easy, amber medium, red hard.
 *
 * Ring geometry follows the original: the bigger the count, the bigger the ring,
 * and the stroke fills to that difficulty's share of the total.
 */

import type { Solved } from "@/lib/leetcode";

type Ring = {
  key: "easy" | "medium" | "hard";
  label: string;
  count: number;
  size: number;
  color: string;
};

/** Dial diameter. Kept small enough to sit in a narrow footer column beside the
 *  link lists, with the legend stacked under it rather than beside it. */
const DIAL = 132;

function ringsFor(s: Solved): Ring[] {
  return [
    { key: "easy", label: "Easy", count: s.easy, size: DIAL, color: "#00a544" },
    { key: "medium", label: "Medium", count: s.medium, size: Math.round(DIAL * 0.78), color: "#fcbb00" },
    { key: "hard", label: "Hard", count: s.hard, size: Math.round(DIAL * 0.57), color: "#df2225" },
  ];
}

const STROKE = 11;

function Ring({ ring, total, delay }: { ring: Ring; total: number; delay: number }) {
  const radius = (ring.size - STROKE) / 2;
  const circumference = 2 * Math.PI * radius;
  // Share of everything solved. Honest, and the reason the hard ring is small
  // and nearly empty: fifteen hard problems out of two hundred and fifty.
  const share = total > 0 ? ring.count / total : 0;
  const offset = circumference * (1 - share);

  return (
    <svg
      width={ring.size}
      height={ring.size}
      viewBox={`0 0 ${ring.size} ${ring.size}`}
      className="-rotate-90"
      role="img"
      aria-label={`${ring.label}: ${ring.count} solved`}
    >
      <circle
        cx={ring.size / 2}
        cy={ring.size / 2}
        r={radius}
        fill="none"
        stroke="var(--muted)"
        strokeWidth={STROKE}
      />
      <circle
        cx={ring.size / 2}
        cy={ring.size / 2}
        r={radius}
        fill="none"
        stroke={ring.color}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="ring-sweep"
        style={
          {
            // Declared as the finished state, so the ring is correct even if
            // the animation never runs. The keyframe only overrides it while
            // it plays.
            "--ring-c": circumference,
            "--ring-offset": offset,
            animationDelay: `${delay}ms`,
          } as React.CSSProperties
        }
      />
    </svg>
  );
}

export function LeetcodeRings({ solved }: { solved: Solved }) {
  const rings = ringsFor(solved);

  return (
    <section aria-labelledby="leetcode-heading">
      <h2
        id="leetcode-heading"
        className="text-[12px] font-semibold text-[var(--muted-foreground)]"
      >
        LeetCode
      </h2>

      {/* Dial and legend stack, not sit side by side: this is a narrow footer
          column, and a row here would either overflow it or crush the labels. */}
      <div className="mt-3">
        {/* Three concentric rings reading as one dial. The inner two need
            inset-0 or they collapse to their content box and drift off-centre. */}
        <div
          className="relative grid place-items-center"
          style={{ height: DIAL, width: DIAL }}
        >
          <Ring ring={rings[0]} total={solved.total} delay={0} />
          <div className="absolute inset-0 grid place-items-center">
            <Ring ring={rings[1]} total={solved.total} delay={120} />
          </div>
          <div className="absolute inset-0 grid place-items-center">
            <Ring ring={rings[2]} total={solved.total} delay={240} />
          </div>
          {/* One number in the middle, not one per ring, or they collide. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute font-mono text-[19px] font-medium tabular-nums leading-none text-[var(--heading-ink)]"
          >
            {solved.total}
          </span>
        </div>

        <dl className="mt-3 flex flex-col gap-2">
          {rings.map((r) => (
            <div key={r.key} className="flex items-baseline gap-2">
              <span
                aria-hidden="true"
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: r.color }}
              />
              <dt className="text-[13px] text-[var(--muted-foreground)]">
                {r.label}
              </dt>
              <dd className="font-mono text-[13px] tabular-nums text-[var(--heading-ink)]">
                {r.count}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
