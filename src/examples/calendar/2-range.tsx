"use client";

import { Calendar, type DateRange } from "@qeetrix/ui";
import { useState } from "react";

/** Next week's Monday (`offset` 0) or a later weekday, so the range never starts on a weekend. */
function nextWeek(offset: number) {
  const date = new Date();
  date.setDate(date.getDate() + ((8 - date.getDay()) % 7 || 7) + offset);
  return date;
}

/** `mode="range"` across two months. `unavailable` days — here weekends — are struck through and can't be picked. */
export default function CalendarRange() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: nextWeek(0),
    to: nextWeek(4),
  });
  return (
    <Calendar
      mode="range"
      numberOfMonths={2}
      selected={range}
      onSelect={setRange}
      unavailable={{ dayOfWeek: [0, 6] }}
      className="rounded-lg border border-border"
    />
  );
}
