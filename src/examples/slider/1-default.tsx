"use client";

import { Slider } from "@qeetrix/ui";
import { useState } from "react";

/** A value on a range, by drag or arrow keys. Show the value beside it — the thumb alone is hard to read. */
export default function SliderDefault() {
  const [minutes, setMinutes] = useState(30);
  return (
    <div className="flex w-80 flex-col gap-3">
      <div className="flex items-center justify-between text-label">
        <span id="idle-timeout" className="font-medium">
          Idle timeout
        </span>
        <span className="text-muted-foreground tabular-nums">
          {minutes} min
        </span>
      </div>
      <Slider
        aria-labelledby="idle-timeout"
        value={minutes}
        onValueChange={(value) => setMinutes(value as number)}
        min={5}
        max={120}
        step={5}
      />
    </div>
  );
}
