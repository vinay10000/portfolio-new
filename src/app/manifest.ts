import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f9f9f9",
    theme_color: "#f9f9f9",
    icons: [
      { src: "/logo-32.png", sizes: "32x32", type: "image/png", purpose: "any" },
      { src: "/logo-180.png", sizes: "180x180", type: "image/png", purpose: "any" },
      { src: "/logo-256.png", sizes: "256x256", type: "image/png", purpose: "maskable" },
    ],
  };
}
