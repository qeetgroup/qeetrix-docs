// Components › Scroll area: its examples, the real ScrollArea with the code for each. Shared by the
// page (doc.tsx) and the island that runs them (Live.tsx), as its scrollbars need React: nothing
// here reads token data.
import { Box, ScrollArea, Separator, Stack, Text } from "@qeetrix/react";
import { Fragment } from "react";
import type { ExampleDoc } from "../types";

const PEOPLE = ["Priya Sharma", "Rahul Verma", "Ananya Iyer", "Karthik Reddy", "Meera Nair"];
const ACTIONS = [
  "signed in with a passkey",
  "reset MFA for a user",
  "created an API key",
  "updated the session policy",
  "invited 3 users",
  "revoked a session",
];

/** Thirty audit events, newest first. */
const EVENTS = Array.from({ length: 30 }, (_, i) => ({
  id: `evt_${String(4812 - i)}`,
  who: PEOPLE[i % PEOPLE.length] as string,
  what: ACTIONS[i % ACTIONS.length] as string,
  when: `${String(9 - Math.floor(i / 6)).padStart(2, "0")}:${String(59 - ((i * 7) % 60)).padStart(2, "0")} IST`,
}));

export const AuditEvents = ({ count = 30 }) => (
  <Box paddingInline="md" paddingBlock="md">
    <Stack gap="sm">
      {EVENTS.slice(0, count).map((event, i) => (
        <Fragment key={event.id}>
          {i > 0 && <Separator />}
          <Stack gap="none">
            <Text size="sm">
              <Text weight="medium">{event.who}</Text> {event.what}
            </Text>
            <Text size="sm" tone="subtle">
              {event.when} · {event.id}
            </Text>
          </Stack>
        </Fragment>
      ))}
    </Stack>
  </Box>
);

const Wide = () => (
  <Box padding="md">
    <Text mono size="sm" style={{ whiteSpace: "nowrap" }}>
      https://id.qeet.in/oauth2/authorize?client_id=payroll-portal&redirect_uri=https%3A%2F%2Fpayroll.acme.in%2Fcallback&scope=openid%20profile%20email
    </Text>
  </Box>
);

export const examples: ExampleDoc[] = [
  {
    id: "a-long-list",
    title: "A long list",
    line: "Give it a height; 8px scrollbars show on hover, while scrolling and on keyboard focus. Named by aria-label, it's a region that takes focus when it overflows.",
    code: `<ScrollArea aria-label="Audit events" style={{ blockSize: 240 }}>
  <AuditEvents />
</ScrollArea>`,
    render: () => (
      <div className="qc-scroll-stage">
        <ScrollArea aria-label="Audit events" style={{ blockSize: 240 }}>
          <AuditEvents />
        </ScrollArea>
      </div>
    ),
  },
  {
    id: "sideways",
    title: "Sideways",
    line: 'orientation="horizontal": a long URL, sideways.',
    code: `<ScrollArea orientation="horizontal" aria-label="Authorization URL">…</ScrollArea>`,
    render: () => (
      <div className="qc-scroll-stage">
        <ScrollArea orientation="horizontal" aria-label="Authorization URL">
          <Wide />
        </ScrollArea>
      </div>
    ),
  },
  {
    id: "both-ways",
    title: "Both ways",
    line: 'orientation="both", with a corner where the bars meet.',
    code: `<ScrollArea orientation="both" aria-label="Events and the URL" style={{ blockSize: 160 }}>…</ScrollArea>`,
    render: () => (
      <div className="qc-scroll-stage">
        <ScrollArea orientation="both" aria-label="Events and the URL" style={{ blockSize: 160 }}>
          <Wide />
          <AuditEvents count={6} />
        </ScrollArea>
      </div>
    ),
  },
];
