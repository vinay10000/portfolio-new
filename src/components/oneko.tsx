"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/**
 * A pixel cat that follows the pointer.
 *
 * SPRITE
 * The 256x128 sheet from the oneko.js project (MIT), a 32px grid 8 cells wide
 * and 4 tall, addressed with negative cell coordinates. It is black line art on
 * a transparent background, so the colour comes from a mask: the sprite's alpha
 * channel is the cat's silhouette, and filling that with a flat colour tints it
 * with no guesswork. See public/oneko/LICENCE.txt.
 *
 * A filter chain was tried first and was not dependable: pure black has no hue
 * for hue-rotate to act on, so some of the cats stayed black.
 *
 * ONE CAT, A DIFFERENT COLOUR EACH VISIT
 * There is one cat on screen at a time. The colour is picked when the component
 * first mounts, and the previous visit's colour is excluded, so every refresh
 * genuinely shows a different cat. The pick is held in a module-level variable
 * rather than in state, because a value that lives in state would have to be
 * seeded by an effect, and picking during render would reshuffle the colour on
 * every re-render.
 *
 * `pale` is a custom property rather than a fixed colour, because a literal
 * white sprite is invisible against the light background. It resolves to a warm
 * near-black on the light theme and off-white on the dark one.
 *
 * GUARD RAILS
 *  - Decorative: aria-hidden, never focusable, pointer-events-none, so the cat
 *    can never sit on a control and swallow a click.
 *  - No cursor means no cat: a coarse pointer has nothing to chase.
 *  - No cat under prefers-reduced-motion.
 *  - The loop stops when the tab is hidden.
 */

const CELL = 32;
const HALF = CELL / 2;
const STEP_MS = 100; // ~10fps, which is part of the original charm

/** Verified frame table, in grid cells relative to the sheet's bottom-right. */
const FRAMES = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
} as const;

type FrameName = keyof typeof FRAMES;

const COATS: { label: string; color: string }[] = [
  { label: "amber cat", color: "var(--amber)" },
  { label: "pale cat", color: "var(--pet-pale)" },
  { label: "violet cat", color: "#9b7bff" },
  { label: "brown cat", color: "#9c6644" },
  { label: "green cat", color: "#22c55e" },
  { label: "blue cat", color: "#3b82f6" },
];

const COAT_STORE_KEY = "oneko:coat";

/** Held so a re-render cannot reshuffle the colour. Null until first picked. */
let chosen: string | null = null;

function pickCoat() {
  if (chosen) {
    const cached = COATS.find((c) => c.label === chosen);
    if (cached) return cached;
  }

  // The previous visit's coat is excluded outright, so a refresh really does
  // bring a different cat rather than a random one that may well repeat. The
  // choice is kept in sessionStorage, so the cycle is per tab and a reload
  // counts as a new visit.
  let previous: string | null = null;
  try {
    previous = window.sessionStorage.getItem(COAT_STORE_KEY);
  } catch {
    // Storage blocked (private mode, or storage disabled). Fall through to a
    // plain random pick.
  }

  const options = COATS.filter((c) => c.label !== previous);
  const coat = options[Math.floor(Math.random() * options.length)];
  chosen = coat.label;

  try {
    window.sessionStorage.setItem(COAT_STORE_KEY, coat.label);
  } catch {
    // Not being able to remember the pick only costs us the no-repeat rule.
  }

  return coat;
}

const noopSubscribe = () => () => {};

/**
 * Whether this browser can show the cat: it needs a real cursor to chase and it
 * must not run against a reduced-motion preference. False during server render
 * and on hydration, then true on the client, which is safe because the cat is
 * decorative and hidden from assistive tech either way.
 */
function canChase() {
  return (
    !window.matchMedia("(pointer: coarse)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function Pets() {
  const enabled = useSyncExternalStore(noopSubscribe, canChase, () => false);
  const ref = useRef<HTMLDivElement>(null);

  // Only reached on the client, after hydration, so the static HTML never bakes
  // in a colour and every visitor gets their own.
  const coat = enabled ? pickCoat() : null;

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || !coat) return;
    // TS cannot carry the narrowing above into the nested closures below.
    const node: HTMLDivElement = el;

    let x = HALF;
    let y = window.innerHeight - HALF;
    let tx = x;
    let ty = y;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: FrameName | null = null;
    let idleFrame = 0;
    let last = 0;
    let raf = 0;
    let pointerX = -1;
    let pointerY = -1;

    function draw(name: FrameName, frame: number) {
      const list = FRAMES[name] as readonly (readonly [number, number])[];
      const [cx, cy] = list[frame % list.length];
      const pos = `${cx * CELL}px ${cy * CELL}px`;
      // The mask is the shape, so it has to step with the frame or the tint
      // slides off the line art.
      node.style.maskPosition = pos;
      node.style.webkitMaskPosition = pos;
    }

    function place() {
      node.style.left = `${Math.round(x - HALF)}px`;
      node.style.top = `${Math.round(y - HALF)}px`;
    }

    function runIdle() {
      idleTime += 1;
      if (
        idleTime > 10 &&
        idleAnimation === null &&
        Math.floor(Math.random() * 240) === 0
      ) {
        const options: FrameName[] = ["sleeping", "scratchSelf"];
        if (x < CELL) options.push("scratchWallW");
        if (y < CELL) options.push("scratchWallN");
        if (x > window.innerWidth - CELL) options.push("scratchWallE");
        if (y > window.innerHeight - CELL) options.push("scratchWallS");
        idleAnimation = options[Math.floor(Math.random() * options.length)];
        idleFrame = 0;
      }

      if (idleAnimation === "sleeping") {
        if (idleFrame < 8) draw("tired", 0);
        else draw("sleeping", Math.floor(idleFrame / 4));
        if (idleFrame > 192) {
          idleAnimation = null;
          idleFrame = 0;
        }
      } else if (idleAnimation) {
        draw(idleAnimation, idleFrame);
        if (idleFrame > 9) {
          idleAnimation = null;
          idleFrame = 0;
        }
      } else {
        draw("idle", 0);
      }
      idleFrame += 1;
    }

    function step() {
      frameCount += 1;
      const dx = x - tx;
      const dy = y - ty;
      const distance = Math.hypot(dx, dy);
      const speed = 12;

      if (distance < speed || distance < 44) {
        runIdle();
        return;
      }

      idleAnimation = null;
      idleFrame = 0;
      if (idleTime > 1) {
        draw("alert", 0);
        idleTime = Math.min(idleTime, 7) - 1;
        return;
      }

      const ux = dx / distance;
      const uy = dy / distance;
      let dir = "";
      if (uy > 0.5) dir += "N";
      if (uy < -0.5) dir += "S";
      if (ux > 0.5) dir += "W";
      if (ux < -0.5) dir += "E";
      if (dir) draw(dir as FrameName, frameCount);

      x -= ux * speed;
      y -= uy * speed;
      x = Math.min(Math.max(HALF, x), window.innerWidth - HALF);
      y = Math.min(Math.max(HALF, y), window.innerHeight - HALF);
      place();
    }

    function loop(timestamp: number) {
      if (document.hidden) {
        raf = window.requestAnimationFrame(loop);
        return;
      }
      if (!last) last = timestamp;
      if (timestamp - last > STEP_MS) {
        last = timestamp;
        if (pointerX >= 0) {
          tx = pointerX;
          ty = pointerY;
        }
        step();
      }
      raf = window.requestAnimationFrame(loop);
    }

    function onMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      pointerX = e.clientX;
      pointerY = e.clientY;
    }

    function onResize() {
      x = Math.min(Math.max(HALF, x), window.innerWidth - HALF);
      y = Math.min(Math.max(HALF, y), window.innerHeight - HALF);
      place();
    }

    place();
    draw("idle", 0);
    raf = window.requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [enabled, coat]);

  if (!enabled || !coat) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      title={coat.label}
      // z-45 sits deliberately between the sticky header (z-40) and the search
      // overlay (z-50). The cat should walk over the nav bar rather than vanish
      // behind it, but it should not sit on top of the search dialog either.
      // It is pointer-events-none, so crossing the header costs no clicks.
      className="pointer-events-none fixed left-0 top-0 z-[45] h-8 w-8"
      style={{
        // The sprite is black line art on transparent, so its alpha channel is
        // the cat's silhouette. Filling that with a flat colour tints it. The
        // sprite is deliberately NOT also painted as a background image, because
        // that would draw the black art back over the colour.
        backgroundColor: coat.color,
        maskImage: "url(/oneko/oneko.gif)",
        maskRepeat: "no-repeat",
        WebkitMaskImage: "url(/oneko/oneko.gif)",
        WebkitMaskRepeat: "no-repeat",
        willChange: "left, top",
      }}
    />
  );
}
