// The dates every date example shares: a fixed today, so the page reads the same on every day it's
// built and opened (and the server's render matches the browser's), and the days a console rules out.
export const TODAY = "2026-10-29";

/** Gandhi Jayanti, Dussehra and Diwali, 2026. */
export const HOLIDAYS = new Set(["2026-10-02", "2026-10-20", "2026-11-08"]);

/** Saturday or Sunday, for a "YYYY-MM-DD" day. */
export const isWeekend = (date: string) =>
  [0, 6].includes(new Date(`${date}T00:00:00Z`).getUTCDay());

/** A weekend or a holiday. */
export const isDayOff = (date: string) => isWeekend(date) || HOLIDAYS.has(date);

/** The code a reader copies for the same rules. */
export const DAY_OFF_CODE = [
  "const isWeekend = (date: string) => [0, 6].includes(new Date(`${date}T00:00:00Z`).getUTCDay());",
];
