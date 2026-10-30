// Components › Inline: its examples, the real Inline with the code for each. Server-safe, so
// they're rendered with the page: nothing here reads token data.
import { DownloadIcon } from "@qeetrix/icons/icons/download";
import { PlusIcon } from "@qeetrix/icons/icons/plus";
import { Badge, Button, Heading, Inline, Text } from "@qeetrix/react";
import type { ExampleDoc } from "../types";

const GROUPS = [
  "Engineering",
  "Finance",
  "People",
  "Sales",
  "Support",
  "Design",
  "Operations",
  "Legal",
];

export const examples: ExampleDoc[] = [
  {
    id: "a-row",
    title: "A row",
    line: "Side by side, centred across, sm (8px) apart by default.",
    code: `<Inline>
  <Button variant="soft" icon={DownloadIcon}>Export</Button>
  <Button icon={PlusIcon}>Invite users</Button>
</Inline>`,
    render: () => (
      <Inline>
        <Button variant="soft" icon={DownloadIcon}>
          Export
        </Button>
        <Button icon={PlusIcon}>Invite users</Button>
      </Inline>
    ),
  },
  {
    id: "wrapping",
    title: "Wrapping",
    line: "It wraps onto new lines when space runs out; wrap={false} keeps one line.",
    code: `<Inline gap="xs">
  {groups.map((group) => <Badge key={group}>{group}</Badge>)}
</Inline>`,
    render: () => (
      <div className="qc-cells">
        <Inline gap="xs">
          {GROUPS.map((group) => (
            <Badge key={group}>{group}</Badge>
          ))}
        </Inline>
      </div>
    ),
  },
  {
    id: "ends",
    title: "Ends",
    line: 'justify="between": one thing at the start, another at the end.',
    code: `<Inline justify="between">
  <Heading level={3} size="title-sm">Recent sign-ins</Heading>
  <Button variant="ghost">View all</Button>
</Inline>`,
    render: () => (
      <div className="qc-cells">
        <Inline justify="between">
          <Heading level={3} size="title-sm">
            Recent sign-ins
          </Heading>
          <Button variant="ghost">View all</Button>
        </Inline>
      </div>
    ),
  },
  {
    id: "baseline",
    title: "Baseline",
    line: 'align="baseline": text of two sizes on one line.',
    code: `<Inline align="baseline">
  <Text size="lg" weight="semibold">1,284</Text>
  <Text size="sm" tone="subtle">users</Text>
</Inline>`,
    render: () => (
      <Inline align="baseline">
        <Text size="lg" weight="semibold">
          1,284
        </Text>
        <Text size="sm" tone="subtle">
          users
        </Text>
      </Inline>
    ),
  },
];
