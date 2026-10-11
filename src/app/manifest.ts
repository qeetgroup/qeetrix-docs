import type { MetadataRoute } from "next";
import { appDescription, appName } from "@/lib/shared";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${appName} — the Qeet design system`,
    short_name: appName,
    description: appDescription,
    start_url: "/",
    display: "browser",
    background_color: "#fbfaf9",
    theme_color: "#fbfaf9",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
