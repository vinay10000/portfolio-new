import type { SVGProps } from "react";

/**
 * Hand-drawn icon set. One grid, one stroke weight, round caps and joins
 * throughout, so the marks belong to this site rather than to an icon pack.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = (p: IconProps) => ({
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});

export function IconLinkedIn(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.5 10.5V17" />
      <circle cx="7.5" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 17v-3.6a2.4 2.4 0 0 1 4.8 0V17" />
      <path d="M11.5 10.5V17" />
    </svg>
  );
}

export function IconGithub(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M9 19c-4 1.3-4-2.2-5.6-2.7M15 21v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.7 4.7 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.3s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6.1 0C6.3 2.5 5.3 2.8 5.3 2.8a4.3 4.3 0 0 0-.1 3.3A4.7 4.7 0 0 0 3.9 9.3c0 4.7 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.3V21" />
    </svg>
  );
}

export function IconX(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M4 4l7.2 9.3L4.4 20" />
      <path d="M20 20l-7.2-9.3L19.6 4" />
      <path d="M4 4l16 16" />
    </svg>
  );
}

export function IconYouTube(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.5l5 2.5-5 2.5z" />
    </svg>
  );
}

export function IconLeetCode(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M11.5 21H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h5.5" />
      <path d="M8 12h6" />
      <path d="M11.5 8.5L15 12l-3.5 3.5" />
      <path d="M18 8v8" />
    </svg>
  );
}

export function IconTerminalMark(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="2.5" y="4" width="19" height="16" rx="3" />
      <path d="M6.5 9.5l3 2.5-3 2.5" />
      <path d="M12.5 15h5" />
    </svg>
  );
}

export function IconEmail(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="2.5" y="5" width="19" height="14" rx="3" />
      <path d="M3.5 7.5l8.5 6 8.5-6" />
    </svg>
  );
}

export function IconSearch(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </svg>
  );
}

export function IconSun(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
    </svg>
  );
}

export function IconMoon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />
    </svg>
  );
}

export function IconMonitor(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="2.5" y="4" width="19" height="13" rx="2.5" />
      <path d="M9 21h6M12 17v4" />
    </svg>
  );
}

export function IconCopy(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="9" y="9" width="12" height="12" rx="2.5" />
      <path d="M15 6.2A2.5 2.5 0 0 0 12.5 4H6a2.5 2.5 0 0 0-2.5 2.5v6.5A2.5 2.5 0 0 0 6 15" />
    </svg>
  );
}

export function IconCheck(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}

export function IconExternal(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M14 4h6v6" />
      <path d="M20 4l-8.5 8.5" />
      <path d="M18 14.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4.5" />
    </svg>
  );
}

export function IconDownload(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 3.5v11" />
      <path d="M8 11l4 4 4-4" />
      <path d="M4 17.5v1.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5" />
    </svg>
  );
}

export function IconArrowUpRight(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M7 17L17 7" />
      <path d="M8.5 7H17v8.5" />
    </svg>
  );
}

export function IconChevronDown(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M6 9.5l6 6 6-6" />
    </svg>
  );
}

export function IconArrowLeft(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </svg>
  );
}

export function IconLaptop(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="4" y="5" width="16" height="10" rx="2" />
      <path d="M2 19h20" />
    </svg>
  );
}

export function IconGrid(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.8" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.8" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.8" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.8" />
    </svg>
  );
}

export function IconBox(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M20.5 7.5v9l-8.5 4.7-8.5-4.7v-9L12 2.8z" />
      <path d="M3.5 7.5L12 12.2l8.5-4.7" />
      <path d="M12 12.2v9" />
    </svg>
  );
}

export function IconFile(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5z" />
      <path d="M13.5 3v5.5H19" />
    </svg>
  );
}

export function IconClock(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function IconQuote(p: IconProps) {
  return (
    <svg {...base(p)} strokeWidth={1.2}>
      <path d="M9.5 7.5C7 8.6 5.5 10.6 5.5 13.2c0 2 1.2 3.3 3 3.3 1.6 0 2.7-1.1 2.7-2.6 0-1.4-1-2.4-2.4-2.4-.3 0-.5 0-.7.1.3-1.2 1.3-2.3 2.7-3z" />
      <path d="M18.2 7.5c-2.5 1.1-4 3.1-4 5.7 0 2 1.2 3.3 3 3.3 1.6 0 2.7-1.1 2.7-2.6 0-1.4-1-2.4-2.4-2.4-.3 0-.5 0-.7.1.3-1.2 1.3-2.3 2.7-3z" />
    </svg>
  );
}

export function IconInstagram(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socialMap = {
  linkedin: IconLinkedIn,
  github: IconGithub,
  instagram: IconInstagram,
  x: IconX,
  youtube: IconYouTube,
  leetcode: IconLeetCode,
  tryhackme: IconTerminalMark,
  email: IconEmail,
} as const;

export function SocialIcon({
  name,
  ...rest
}: { name: keyof typeof socialMap } & IconProps) {
  const Cmp = socialMap[name];
  return <Cmp {...rest} />;
}
