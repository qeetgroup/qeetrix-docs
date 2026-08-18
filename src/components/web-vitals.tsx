"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Honor Do-Not-Track — bail before sending anything.
    if (typeof navigator !== "undefined" && navigator.doNotTrack === "1") return;

    try {
      const body = JSON.stringify({
        name: metric.name,
        value: Math.round(metric.value),
        props: {
          id: metric.id,
          rating: metric.rating,
          path: window.location.pathname,
        },
      });

      if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon("/api/telemetry", blob);
      } else {
        void fetch("/api/telemetry", {
          method: "POST",
          keepalive: true,
          headers: { "content-type": "application/json" },
          body,
        });
      }
    } catch {
      // Never let telemetry throw — analytics is best-effort.
    }
  });

  return null;
}
