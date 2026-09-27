"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site";
import { SearchProvider } from "./search-provider";
import { ThemeToggle } from "./theme-toggle";
import type { SearchDoc } from "@/lib/posts";

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader({ docs }: { docs: SearchDoc[] }) {
  const pathname = usePathname() ?? "/";

  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-[var(--surface-veil)] backdrop-blur-md">
      <div className="shell flex h-14 items-center gap-3">
        <Link
          href="/"
          aria-label="Home"
          className="flex shrink-0 items-center gap-2 rounded-[var(--radius)] text-[var(--muted-foreground)] transition-colors duration-150 hover:text-[var(--foreground)]"
        >
          <Image
            src="/logo-64.png"
            alt=""
            width={26}
            height={26}
            className="h-[26px] w-[26px] rounded-full"
            priority
          />
        </Link>

        <nav aria-label="Main" className="min-w-0 flex-1">
          <ul className="flex items-center gap-1 overflow-x-auto">
            {navLinks.map((l) => {
              const active = isActive(l.href, pathname);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`block whitespace-nowrap rounded-[var(--radius)] px-2.5 py-1.5 text-[13px] transition-colors duration-150 ${
                      active
                        ? "font-semibold text-[var(--foreground)]"
                        : "text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <SearchProvider docs={docs} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
