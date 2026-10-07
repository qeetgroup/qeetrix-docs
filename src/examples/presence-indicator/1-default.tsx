"use client";

import { PresenceIndicator } from "@qeetrix/ui";

const states = [
  { status: "online", text: "Online" },
  { status: "away", text: "Away" },
  { status: "busy", text: "Do not disturb" },
  { status: "offline", text: "Offline" },
] as const;

/**
 * Each state has its own shape — a disc, a crescent, a barred disc and a ring — so presence
 * never rests on green versus red. The mark is announced by its status, or by `label`.
 */
export default function PresenceIndicatorDefault() {
  return (
    <ul className="flex flex-wrap items-center gap-6 text-label">
      {states.map((state) => (
        <li key={state.status} className="flex items-center gap-2">
          <PresenceIndicator
            status={state.status}
            size="lg"
            className="[--presence-surface:var(--card)]"
          />
          {state.text}
        </li>
      ))}
    </ul>
  );
}
