"use client";

import { useState } from "react";
import { toast } from "sonner";
import { IconCheck, IconCopy } from "./icons";

export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  className = "",
  children,
}: {
  value: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard can be blocked; fall back to a selection the user can copy.
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand?.("copy");
      document.body.removeChild(ta);
      if (!ok) {
        toast.error("Could not access the clipboard");
        return;
      }
    }
    setDone(true);
    toast.success(copiedLabel);
    window.setTimeout(() => setDone(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={done ? copiedLabel : label}
      className={`inline-flex items-center gap-1.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-2.5 py-1.5 text-[12px] text-[var(--muted-foreground)] transition-colors duration-150 hover:border-[color-mix(in_oklab,var(--foreground)_25%,transparent)] hover:text-[var(--foreground)] ${className}`}
    >
      {done ? <IconCheck /> : <IconCopy />}
      {children ?? (done ? copiedLabel : label)}
    </button>
  );
}
