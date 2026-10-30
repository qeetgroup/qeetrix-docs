// Components › Timeline: its examples, the real Timeline with the code for each. Server-safe, so
// they're rendered with the page: nothing here reads token data.
import { CircleCheckIcon } from "@qeetrix/icons/icons/circle-check";
import { CircleXIcon } from "@qeetrix/icons/icons/circle-x";
import { FingerprintPatternIcon } from "@qeetrix/icons/icons/fingerprint-pattern";
import { GlobeIcon } from "@qeetrix/icons/icons/globe";
import { KeyRoundIcon } from "@qeetrix/icons/icons/key-round";
import { LogInIcon } from "@qeetrix/icons/icons/log-in";
import { ShieldAlertIcon } from "@qeetrix/icons/icons/shield-alert";
import { SparklesIcon } from "@qeetrix/icons/icons/sparkles";
import { TriangleAlertIcon } from "@qeetrix/icons/icons/triangle-alert";
import { UserCogIcon } from "@qeetrix/icons/icons/user-cog";
import { Card } from "@qeetrix/react";
import {
  Timeline,
  TimelineGroup,
  TimelineItem,
  type TimelineProps,
} from "@qeetrix/react/experimental";
import type { ExampleDoc } from "../types";

/** Priya Sharma's recent activity, as her Qeet ID user page shows it. */
export const Activity = (props: TimelineProps) => (
  <Timeline aria-label="Recent activity" {...props}>
    <TimelineGroup label="Today">
      <TimelineItem
        icon={LogInIcon}
        title="Signed in with a passkey"
        description="Bengaluru, India · Chrome on macOS"
        time="2 min ago"
        dateTime="2026-10-29T03:58:00Z"
      />
      <TimelineItem
        icon={CircleXIcon}
        tone="danger"
        title="Failed sign-in"
        description="Wrong password · Mumbai, India"
        time="09:12"
        dateTime="2026-10-29T03:42:00Z"
      />
    </TimelineGroup>
    <TimelineGroup label="Yesterday">
      <TimelineItem
        icon={FingerprintPatternIcon}
        title="Added a passkey"
        description="MacBook Pro · Touch ID"
        time="18:40"
        dateTime="2026-10-28T13:10:00Z"
      />
      <TimelineItem
        icon={UserCogIcon}
        title="Role changed to Admin"
        description="By Rahul Verma"
        time="11:05"
        dateTime="2026-10-28T05:35:00Z"
      />
    </TimelineGroup>
  </Timeline>
);

/** Every tone. */
export const Verification = (props: TimelineProps) => (
  <Timeline aria-label="Domain verification" {...props}>
    <TimelineItem icon={KeyRoundIcon} title="Signing key rotated" time="10:04" />
    <TimelineItem
      icon={CircleCheckIcon}
      tone="success"
      title="Domain acme.in verified"
      time="09:55"
    />
    <TimelineItem icon={GlobeIcon} tone="info" title="TXT record found" time="09:50" />
    <TimelineItem
      icon={TriangleAlertIcon}
      tone="warning"
      title="Signing key expires soon"
      time="09:30"
    />
    <TimelineItem icon={ShieldAlertIcon} tone="danger" title="Sign-in blocked" time="09:20" />
    <TimelineItem icon={SparklesIcon} tone="brand" title="Upgraded to Qeet Pro" time="09:02" />
  </Timeline>
);

export const examples: ExampleDoc[] = [
  {
    id: "recent-activity",
    title: "Recent activity",
    line: "Newest first, grouped by day: an icon, what happened, where or by whom, and when.",
    code: `<Timeline aria-label="Recent activity">
  <TimelineGroup label="Today">
    <TimelineItem
      icon={LogInIcon}
      title="Signed in with a passkey"
      description="Bengaluru, India · Chrome on macOS"
      time="2 min ago"
      dateTime="2026-10-29T03:58:00Z"
    />
    <TimelineItem icon={CircleXIcon} tone="danger" title="Failed sign-in" … />
  </TimelineGroup>
</Timeline>`,
    render: () => (
      <div className="qc-fold-stage">
        <Activity />
      </div>
    ),
  },
  {
    id: "tones",
    title: "Tones",
    line: "tone colours the icon: danger for a failure, which turns its title danger too.",
    code: `<TimelineItem icon={CircleCheckIcon} tone="success" title="Domain acme.in verified" time="09:55" />
<TimelineItem icon={ShieldAlertIcon} tone="danger" title="Sign-in blocked" time="09:20" />`,
    render: () => (
      <div className="qc-fold-stage">
        <Verification />
      </div>
    ),
  },
  {
    id: "compact",
    title: "Compact",
    line: "variant=\"compact\": a dot in the event's tone, on the title's line, for a side panel.",
    code: `<Timeline variant="compact" aria-label="Domain verification">…</Timeline>`,
    render: () => (
      <div className="qc-fold-stage">
        <Verification variant="compact" aria-label="Domain verification, compact" />
      </div>
    ),
  },
  {
    id: "in-a-card",
    title: "In a card",
    line: "A user page's recent activity; the full audit log stays a Table.",
    code: `<Card title="Recent activity">
  <Timeline aria-label="Recent activity">…</Timeline>
</Card>`,
    render: () => (
      <div className="qc-fold-stage">
        <Card title="Recent activity" level={3}>
          <Activity aria-label="Recent activity, in a card" />
        </Card>
      </div>
    ),
  },
];
