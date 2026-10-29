// Components › Badge: its examples, the real Badge with the code for each. Server-safe, so they're
// rendered with the page: nothing here reads token data.
import { BanIcon } from "@qeetrix/icons/icons/ban";
import { CircleCheckIcon } from "@qeetrix/icons/icons/circle-check";
import { ClockIcon } from "@qeetrix/icons/icons/clock";
import { Badge, type BadgeTone, Inline, Stack, Text } from "@qeetrix/react";
import type { ExampleDoc } from "../types";

export const TONES: Array<[BadgeTone, string]> = [
  ["neutral", "Draft"],
  ["brand", "Qeet Pro"],
  ["info", "Invited"],
  ["success", "Active"],
  ["warning", "Pending"],
  ["danger", "Blocked"],
];

export const Keys = () => (
  <Stack gap="sm" className="qc-badge-keys">
    {(
      [
        ["qid_live_4xKz…9Rp2", "success", "Live"],
        ["qid_test_8bQm…1Lc7", "info", "Test"],
        ["qid_live_7yHd…3Va9", "neutral", "Revoked"],
      ] as const
    ).map(([id, tone, status]) => (
      <Inline key={id} justify="between" align="center">
        <Text mono size="sm">
          {id}
        </Text>
        <Badge tone={tone}>{status}</Badge>
      </Inline>
    ))}
  </Stack>
);

export const examples: ExampleDoc[] = [
  {
    id: "tones",
    title: "Tones",
    line: "The word carries the meaning; the tone only reinforces it.",
    code: `<Badge>Draft</Badge>
<Badge tone="brand">Qeet Pro</Badge>
<Badge tone="info">Invited</Badge>
<Badge tone="success">Active</Badge>
<Badge tone="warning">Pending</Badge>
<Badge tone="danger">Blocked</Badge>`,
    render: () => (
      <Inline gap="md">
        {TONES.map(([tone, label]) => (
          <Badge key={tone} tone={tone}>
            {label}
          </Badge>
        ))}
      </Inline>
    ),
  },
  {
    id: "solid",
    title: "Solid",
    line: 'variant="solid": the bold fill, for the one status in a view that must stand out.',
    code: `<Badge tone="danger" variant="solid">Overdue</Badge>`,
    render: () => (
      <Inline gap="md">
        {TONES.map(([tone, label]) => (
          <Badge key={tone} tone={tone} variant="solid">
            {label}
          </Badge>
        ))}
      </Inline>
    ),
  },
  {
    id: "with-an-icon",
    title: "With an icon",
    line: "icon: a 12px sharp icon before the word, decorative.",
    code: `<Badge tone="success" icon={CircleCheckIcon}>Verified</Badge>
<Badge tone="warning" icon={ClockIcon}>Expires in 9 days</Badge>
<Badge tone="danger" icon={BanIcon}>Suspended</Badge>`,
    render: () => (
      <Inline gap="md">
        <Badge tone="success" icon={CircleCheckIcon}>
          Verified
        </Badge>
        <Badge tone="warning" icon={ClockIcon}>
          Expires in 9 days
        </Badge>
        <Badge tone="danger" icon={BanIcon}>
          Suspended
        </Badge>
      </Inline>
    ),
  },
  {
    id: "sizes",
    title: "Sizes",
    line: "md, 20px, by default; sm, 16px, for tight rows and beside small text.",
    code: `<Badge tone="success">Active</Badge>
<Badge tone="success" size="sm">Active</Badge>`,
    render: () => (
      <Inline gap="lg" align="center">
        <Badge tone="success">Active</Badge>
        <Badge tone="success" size="sm">
          Active
        </Badge>
      </Inline>
    ),
  },
  {
    id: "in-a-list",
    title: "In a list",
    line: "Beside what it describes, at its end.",
    code: `<Inline justify="between">
  <Text mono size="sm">qid_live_4xKz…9Rp2</Text>
  <Badge tone="success">Live</Badge>
</Inline>`,
    render: () => <Keys />,
  },
  {
    id: "long-text",
    title: "Long text",
    line: "It truncates with an ellipsis: pass title with the full text where it may be cut.",
    code: `<Badge tone="info" title="Awaiting approval from the finance team">
  Awaiting approval from the finance team
</Badge>`,
    render: () => (
      <div className="qc-badge-narrow">
        <Badge tone="info" title="Awaiting approval from the finance team">
          Awaiting approval from the finance team
        </Badge>
      </div>
    ),
  },
];
