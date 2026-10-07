"use client";

import { TimeSince } from "@qeetrix/ui";

const ago = (ms: number) => new Date(Date.now() - ms);
const MINUTE = 60_000;

const activity = [
  {
    who: "Diya Sharma",
    what: "signed in from a new device",
    at: ago(0.5 * MINUTE),
  },
  { who: "Kabir Rao", what: "revoked 3 sessions", at: ago(12 * MINUTE) },
  { who: "Meera Iyer", what: "enrolled a passkey", at: ago(5 * 60 * MINUTE) },
  {
    who: "Aarav Mehta",
    what: "changed the billing plan",
    at: ago(3 * 24 * 60 * MINUTE),
  },
  {
    who: "Rohan Gupta",
    what: "joined the workspace",
    at: ago(45 * 24 * 60 * MINUTE),
  },
];

/**
 * Elapsed time in words — "12 minutes ago" — that keeps itself current, with the exact time on
 * hover. Past `absoluteAfterDays` (30 by default) it shows the date instead.
 */
export default function TimeSinceDefault() {
  return (
    <ul className="w-full max-w-md divide-y divide-border rounded-lg border border-border bg-card">
      {activity.map((entry) => (
        <li
          key={entry.who}
          className="flex items-baseline justify-between gap-4 px-4 py-2.5 text-label"
        >
          <span>
            <span className="font-medium">{entry.who}</span> {entry.what}
          </span>
          <TimeSince
            value={entry.at}
            className="shrink-0 text-caption text-muted-foreground"
          />
        </li>
      ))}
    </ul>
  );
}
