// Components › Visually hidden: its examples, the real VisuallyHidden with the code for each.
// Server-safe, so they're rendered with the page: nothing here reads token data.
import { Inline, Stack, Text, VisuallyHidden } from "@qeetrix/react";
import type { ExampleDoc } from "../types";

export const examples: ExampleDoc[] = [
  {
    id: "words-for-screen-readers",
    title: "Words for screen readers",
    line: "Read, never shown: clipped, never display: none.",
    code: `<Text>
  1,284 <VisuallyHidden>users</VisuallyHidden>
</Text>`,
    render: () => (
      <Stack gap="xs" align="center">
        <Text size="lg" weight="semibold">
          1,284 <VisuallyHidden>users</VisuallyHidden>
        </Text>
        <Text size="sm" tone="subtle">
          A screen reader hears "1,284 users".
        </Text>
      </Stack>
    ),
  },
  {
    id: "a-status",
    title: "A status",
    line: "A status announced once, where the change is already shown.",
    code: `<VisuallyHidden>
  <Text role="status">{count} selected</Text>
</VisuallyHidden>`,
    render: () => (
      <Inline gap="sm">
        <Text>3 rows ticked.</Text>
        <VisuallyHidden>
          <Text role="status">3 selected</Text>
        </VisuallyHidden>
      </Inline>
    ),
  },
];
