"use client";

import { Slider } from "@qeetrix/ui";
import { useState } from "react";

/** Two thumbs make a range. `getAriaLabel` names each thumb for screen readers. */
export default function SliderRange() {
  const [range, setRange] = useState([9, 18]);
  return (
    <div className="flex w-80 flex-col gap-3">
      <div className="flex items-center justify-between text-label">
        <span className="font-medium">Delivery window</span>
        <span className="text-muted-foreground tabular-nums">
          {range[0]}:00 – {range[1]}:00
        </span>
      </div>
      <Slider
        value={range}
        onValueChange={(value) => setRange(value as number[])}
        min={0}
        max={24}
        getAriaLabel={(index) =>
          index === 0 ? "Earliest hour" : "Latest hour"
        }
      />
    </div>
  );
}
