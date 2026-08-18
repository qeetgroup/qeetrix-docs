// This route generates an OG image and legitimately uses literal colours.
import { ImageResponse } from "next/og";

export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "Qeetrix").slice(0, 90);
  const eyebrow = (searchParams.get("eyebrow") ?? "The Qeet Group design system").slice(0, 80);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0a0a",
        color: "#fafafa",
        padding: "80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div
          style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#f26d0e" }}
        />
        <div style={{ fontSize: "30px", fontWeight: 600, letterSpacing: "-0.01em" }}>Qeetrix</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ fontSize: "26px", color: "#fb923c", fontWeight: 600 }}>{eyebrow}</div>
        <div
          style={{
            fontSize: "76px",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontSize: "24px",
          color: "#a1a1aa",
        }}
      >
        <span>116 accessible React components · Base UI · Tailwind v4</span>
        <span style={{ color: "#f26d0e" }}>ui.qeet.in</span>
      </div>
    </div>,
    { ...size },
  );
}
