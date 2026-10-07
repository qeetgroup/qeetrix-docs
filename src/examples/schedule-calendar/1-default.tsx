"use client";

import { ScheduleCalendar, type ScheduleEvent } from "@qeetrix/ui";

/** An event `days` from today, from `hour` for `length` hours. */
function at(days: number, hour: number, length = 1) {
  const start = new Date();
  start.setDate(start.getDate() + days);
  start.setHours(hour, 0, 0, 0);
  return { start, end: new Date(start.getTime() + length * 3_600_000) };
}

const events: ScheduleEvent[] = [
  { id: "1", title: "Design review", ...at(0, 11) },
  { id: "2", title: "1:1 with Diya", ...at(0, 15) },
  {
    id: "3",
    title: "Payroll run",
    // An all-day event ends within its day, or it spills into the next one.
    ...at(1, 0, 23.99),
    allDay: true,
    color: "border-success bg-success-subtle",
  },
  {
    id: "4",
    title: "SOC 2 audit call",
    ...at(2, 10, 2),
    color: "border-warning bg-warning-subtle",
  },
  {
    id: "5",
    title: "Release 3.2",
    ...at(3, 17),
    color: "border-info bg-info-subtle",
  },
];

/**
 * Day, week and month views of a schedule, with the date navigation built in; narrow screens get
 * a chronological agenda. `color` takes semantic classes for an event's chip.
 *
 * @layout wide
 */
export default function ScheduleCalendarDefault() {
  return (
    <ScheduleCalendar events={events} defaultView="week" weekStartsOn={1} />
  );
}
