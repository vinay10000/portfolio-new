import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Required for `output: "export"`: this route uses `site.url`, which the build
// cannot prove is static, so without this Next treats it as dynamic and fails
// the export. The URL is baked in at build time either way.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
