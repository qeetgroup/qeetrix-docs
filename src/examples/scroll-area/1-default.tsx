import { ScrollArea } from "@qeetrix/ui";

const events = [
  {
    id: "a1",
    actor: "Diya Sharma",
    action: "enforced passkeys for the Admin role",
    time: "10:24",
  },
  {
    id: "a2",
    actor: "Aarav Mehta",
    action: "revoked a session on Chrome, Windows",
    time: "10:12",
  },
  {
    id: "a3",
    actor: "SCIM · Okta",
    action: "provisioned 4 users",
    time: "09:58",
  },
  {
    id: "a4",
    actor: "Kabir Singh",
    action: "rotated the signing key for Northwind POS",
    time: "09:41",
  },
  {
    id: "a5",
    actor: "Meera Iyer",
    action: "invited rohan.gupta@northwind.in",
    time: "09:30",
  },
  {
    id: "a6",
    actor: "Diya Sharma",
    action: "added 49.207.12.0/24 to the IP allow-list",
    time: "09:12",
  },
  {
    id: "a7",
    actor: "SCIM · Okta",
    action: "deprovisioned 1 user",
    time: "08:55",
  },
  {
    id: "a8",
    actor: "Aarav Mehta",
    action: "changed session lifetime to 12 hours",
    time: "08:40",
  },
  {
    id: "a9",
    actor: "Kabir Singh",
    action: "connected Azure AD over SAML 2.0",
    time: "08:21",
  },
];

/**
 * A fixed-height audit log. The scrollbar is always present rather than auto-hidden, and the
 * viewport is a Tab stop whenever it can scroll, so the arrow keys scroll it too.
 */
export default function ScrollAreaDefault() {
  return (
    <ScrollArea
      role="region"
      aria-label="Audit log"
      className="h-64 w-80 rounded-lg border border-border bg-card"
    >
      <ol className="divide-y divide-border">
        {events.map((event) => (
          <li key={event.id} className="flex gap-3 px-3 py-2.5 text-sm">
            <span className="shrink-0 font-mono text-caption text-muted-foreground tabular-nums">
              {event.time}
            </span>
            <span>
              <span className="font-medium">{event.actor}</span> {event.action}
            </span>
          </li>
        ))}
      </ol>
    </ScrollArea>
  );
}
