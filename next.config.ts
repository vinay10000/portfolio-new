import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages serves static files, so the site is exported as flat
  // HTML/CSS/JS instead of running a Node server. Every page is prerendered at
  // build time.
  output: "export",
  // out/blog/index.html rather than out/blog.html, which is what Pages resolves
  // directory-style URLs from.
  trailingSlash: true,
  // No image optimisation server to point at on a static host, so emit the
  // plain <img> output instead of a /_next/image URL that would 404.
  images: { unoptimized: true },
};

export default nextConfig;
