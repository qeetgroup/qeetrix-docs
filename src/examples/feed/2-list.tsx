"use client";

import { Feed, FeedItem } from "@qeetrix/ui";

const events = [
  {
    id: "audit-1",
    actor: "Diya Sharma",
    action: "revoked 3 sessions for Rohan Gupta",
    time: "09:41",
  },
  {
    id: "audit-2",
    actor: "Kabir Rao",
    action: "changed the role of Meera Iyer to Billing admin",
    time: "09:12",
  },
  {
    id: "audit-3",
    actor: "Meera Iyer",
    action: "enrolled a passkey on a MacBook Pro",
    time: "08:57",
  },
  {
    id: "audit-4",
    actor: "Aarav Mehta",
    action: "rotated the webhook signing secret",
    time: "Yesterday",
  },
  {
    id: "audit-5",
    actor: "System",
    action: "suspended 2 accounts after 10 failed sign-ins",
    time: "Yesterday",
  },
];

/**
 * `variant="list"` sets the articles as rows in one bordered surface, for long, scannable
 * streams such as an audit log.
 */
export default function FeedList() {
  return (
    <Feed variant="list" aria-label="Audit log" className="w-full max-w-lg">
      {events.map((event) => (
        <FeedItem key={event.id} aria-labelledby={event.id}>
          <div className="flex items-baseline justify-between gap-4 text-label">
            <p id={event.id}>
              <span className="font-medium">{event.actor}</span> {event.action}
            </p>
            <span className="shrink-0 text-caption text-muted-foreground">
              {event.time}
            </span>
          </div>
        </FeedItem>
      ))}
    </Feed>
  );
}
