"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { SearchDialog } from "./search-dialog";
import { IconSearch } from "./icons";
import type { SearchDoc } from "@/lib/posts";

const noopSubscribe = () => () => {};

/** false on the server, true on the client, without setState in an effect. */
const useMounted = () => useSyncExternalStore(noopSubscribe, () => true, () => false);

/** Apple keyboards do not have a Ctrl key, so do not claim they do. */
const isApple = () =>
  typeof navigator !== "undefined" &&
  /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent);

/**
 * Owns the palette state so the keyboard shortcut works from any page. The
 * index is passed down from the server layout, so it ships once.
 *
 * The overlay is portalled to <body> on purpose. It is triggered from inside
 * the header, which carries a backdrop-filter, and a filtered ancestor becomes
 * the containing block for position:fixed descendants. Left in place the
 * dialog would be sized and clipped to the 56px header instead of the viewport.
 */
export function SearchProvider({ docs }: { docs: SearchDoc[] }) {
  const [open, setOpen] = useState(false);
  const mounted = useMounted();
  const apple = useSyncExternalStore(noopSubscribe, isApple, () => false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Stop the page behind the dialog from scrolling while it is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open blog search"
        title="Open blog search"
        className="group flex h-8 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] pl-2.5 pr-1.5 text-[var(--muted-foreground)] transition-colors duration-150 hover:border-[color-mix(in_oklab,var(--foreground)_25%,transparent)] hover:text-[var(--foreground)]"
      >
        <IconSearch />
        <span
          aria-hidden="true"
          className="hidden items-center gap-1 rounded-full bg-[var(--muted)] p-0.5 pl-1 pr-1 sm:flex"
        >
          <kbd className="flex h-5 min-w-5 items-center justify-center rounded-[5px] bg-[var(--card)] px-1.5 font-sans text-[11px] font-medium leading-none text-[var(--muted-foreground)] shadow-[0_1px_1px_rgb(0_0_0/0.06)]">
            {apple ? "\u2318" : "Ctrl"}
          </kbd>
          <kbd className="flex h-5 min-w-5 items-center justify-center rounded-[5px] bg-[var(--card)] px-1.5 font-sans text-[11px] font-medium leading-none text-[var(--muted-foreground)] shadow-[0_1px_1px_rgb(0_0_0/0.06)]">
            K
          </kbd>
        </span>
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] sm:pt-[16vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Search Blog"
          >
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => setOpen(false)}
              className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-[2px]"
            />
            <div className="relative">
              <SearchDialog docs={docs} onOpenChange={setOpen} />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
