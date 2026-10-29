import { ImageResponse } from "next/og";
import { getSiteSettings } from "@/lib/site";

export const alt = "Tennis Nallbani";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 600;

/** Preview card for links shared on WhatsApp, Facebook and Google. */
export default async function OpenGraphImage() {
  const s = await getSiteSettings();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0f1f3d 0%, #162a55 100%)",
          color: "#f5f6ec",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 24,
              background: "#cddc3b",
              border: "6px solid #0f1f3d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 92,
              fontWeight: 800,
            }}
          >
            N
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: -1 }}>{s.clubName}</div>
            {s.tagline && <div style={{ fontSize: 28, color: "#cddc3b", textTransform: "uppercase", letterSpacing: 3 }}>{s.tagline}</div>}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, textTransform: "uppercase", maxWidth: 1000 }}>{s.heroTitle ?? "Tenis për të gjithë"}</div>
          {s.heroText && <div style={{ fontSize: 30, color: "#b7bfd1", maxWidth: 900 }}>{s.heroText}</div>}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#b7bfd1" }}>
          <span>{[s.address, "Tiranë"].filter(Boolean).join(" · ")}</span>
          {s.phone && <span>{s.phone}</span>}
        </div>
      </div>
    ),
    size,
  );
}
