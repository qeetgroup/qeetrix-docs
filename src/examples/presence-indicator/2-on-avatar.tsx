"use client";

import { Avatar, AvatarFallback, PresenceIndicator } from "@qeetrix/ui";

const people = [
  { name: "Aarav Mehta", status: "online" },
  { name: "Diya Sharma", status: "busy" },
  { name: "Kabir Rao", status: "away" },
  { name: "Meera Iyer", status: "offline" },
] as const;

/**
 * On an avatar, the ring and the cut-outs are painted in `--presence-surface`, which defaults
 * to the page background. Set it to the surface underneath, here `--card`. `pulse` adds a soft
 * pulse that stops under reduced motion.
 */
export default function PresenceIndicatorOnAvatar() {
  return (
    <div className="flex items-center gap-4">
      {people.map((person) => (
        <div key={person.name} className="relative">
          <Avatar size="lg" name={person.name}>
            <AvatarFallback />
          </Avatar>
          <PresenceIndicator
            status={person.status}
            label={`${person.name} is ${person.status}`}
            pulse={person.status === "online"}
            className="absolute end-0 bottom-0 [--presence-surface:var(--card)]"
          />
        </div>
      ))}
    </div>
  );
}
