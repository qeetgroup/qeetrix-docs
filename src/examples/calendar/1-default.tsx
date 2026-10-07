"use client";

import { Calendar } from "@qeetrix/ui";
import { useState } from "react";

/** The month grid on its own, for a page or a panel; `DatePicker` puts it in a popover. Today is marked. */
export default function CalendarDefault() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg border border-border"
    />
  );
}
