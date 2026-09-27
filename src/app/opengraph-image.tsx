import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} - ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f9f9f9",
          color: "#100f0f",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              background: "#fcbb00",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
              color: "#100f0f",
            }}
          >
            B
          </div>
          <div style={{ fontSize: 26, letterSpacing: 2, fontWeight: 600 }}>
            BUNNY
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 30, color: "#737373", marginTop: 14 }}>
            {site.role}
          </div>
          <div
            style={{
              fontSize: 25,
              color: "#737373",
              marginTop: 26,
              maxWidth: 880,
              lineHeight: 1.45,
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            borderTop: "1px solid #e5e5e5",
            paddingTop: 22,
            fontSize: 22,
            color: "#737373",
          }}
        >
          work · writing · projects
        </div>
      </div>
    ),
    size,
  );
}
