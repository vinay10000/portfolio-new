"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "./icons";

const noopSubscribe = () => () => {};

/**
 * `false` on the server, `true` on the client. This is the hydration-safe way
 * to ask "am I on the client yet" without setting state inside an effect.
 */
const useMounted = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

/**
 * The icon swap is driven entirely by the resolved theme. Until the client has
 * taken over we render the sun, which is the default for a first-time visitor.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="grid h-8 w-8 shrink-0 place-items-center rounded-[var(--radius)] text-[var(--muted-foreground)] transition-colors duration-150 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
    >
      <span className="relative grid h-4 w-4 place-items-center">
        {/* Both glyphs occupy the same cell, so the button never resizes. */}
        <IconSun
          className={`absolute inset-0 transition-opacity duration-150 ${
            isDark ? "opacity-0" : "opacity-100"
          }`}
        />
        <IconMoon
          className={`absolute inset-0 transition-opacity duration-150 ${
            isDark ? "opacity-100" : "opacity-0"
          }`}
        />
      </span>
    </button>
  );
}
