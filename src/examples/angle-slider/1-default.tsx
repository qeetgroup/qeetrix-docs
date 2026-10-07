"use client";

import { AngleSlider } from "@qeetrix/ui";
import { useState } from "react";

/** A dial for a 0–360° angle. Drag, or use the arrow keys; here it sets a gradient's direction. */
export default function AngleSliderDefault() {
  const [angle, setAngle] = useState(135);
  return (
    <div className="flex items-center gap-6">
      <AngleSlider
        aria-label="Gradient angle"
        value={angle}
        onValueChange={setAngle}
        step={15}
      />
      <div
        aria-hidden
        className="size-24 rounded-xl border border-border shadow-xs"
        style={{
          background: `linear-gradient(${angle}deg, var(--qx-color-text-brand), var(--qx-color-text-info))`,
        }}
      />
    </div>
  );
}
