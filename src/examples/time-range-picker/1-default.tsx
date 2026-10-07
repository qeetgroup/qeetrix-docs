"use client";

import { TimeRangePicker, type TimeRangeValue } from "@qeetrix/ui";
import { useState } from "react";

const format = (date: Date) =>
  date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

/**
 * Presets for the common windows, and a calendar for a custom one. It emits `{ preset, from, to }`;
 * a custom range covers whole days, so its last day is included.
 */
export default function TimeRangePickerDefault() {
  const [range, setRange] = useState<TimeRangeValue>(() => {
    const to = new Date();
    return { preset: "24h", from: new Date(to.getTime() - 86_400_000), to };
  });
  return (
    <div className="flex flex-col items-center gap-3">
      <TimeRangePicker
        aria-label="Log window"
        value={range}
        onValueChange={setRange}
        max={new Date()}
      />
      <span className="text-caption text-muted-foreground">
        {format(range.from)} → {format(range.to)}
      </span>
    </div>
  );
}
