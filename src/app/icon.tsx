// Dynamic app icon (favicon / PWA icon). Legitimately uses literal brand
// colours — the no-raw-color lint rule only inspects JSX style/className, not
// image-generation route files like this one.
import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
      }}
    >
      <div
        style={{
          width: "88%",
          height: "88%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "96px",
          background: "#F26D0E",
          color: "#ffffff",
          fontSize: "320px",
          fontWeight: 700,
          fontFamily: "sans-serif",
          lineHeight: 1,
        }}
      >
        Q
      </div>
    </div>,
    size,
  );
}
