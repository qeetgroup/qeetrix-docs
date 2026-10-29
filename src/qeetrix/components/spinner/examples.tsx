// Components › Spinner: its examples, the real Spinner with the code for each. Server-safe, so
// they're rendered with the page: nothing here reads token data.
import { Button, Inline, Spinner, Stack, Text } from "@qeetrix/react";
import type { ExampleDoc } from "../types";

export const SIZES = [
  ["sm", "14"],
  ["md", "16"],
  ["lg", "20"],
  ["xl", "24"],
] as const;

export const examples: ExampleDoc[] = [
  {
    id: "a-short-wait",
    title: "A short wait",
    line: 'A 2px ring that turns, or fades under reduced motion. Read as a status named "Loading", in the app\'s language.',
    code: `<Spinner />`,
    render: () => <Spinner size="lg" />,
  },
  {
    id: "tones",
    title: "Tones",
    line: "neutral follows the text colour; brand is Ember. label names what's loading.",
    code: `<Spinner size="lg" label="Loading users" />
<Spinner size="lg" tone="brand" label="Loading applications" />`,
    render: () => (
      <Inline gap="md">
        <Spinner size="lg" label="Loading users" />
        <Spinner size="lg" tone="brand" label="Loading applications" />
      </Inline>
    ),
  },
  {
    id: "sizes",
    title: "Sizes",
    line: "sm 14, md 16, lg 20 and xl 24px: the icon sizes it stands in for.",
    code: `<Spinner size="sm" />
<Spinner />
<Spinner size="lg" />
<Spinner size="xl" />`,
    render: () => (
      <Inline gap="lg" align="end">
        {SIZES.map(([size, px]) => (
          <Stack key={size} gap="sm" align="center">
            <Spinner size={size} label={`Loading, ${px}px`} />
            <Text size="sm" tone="subtle">
              {px}
            </Text>
          </Stack>
        ))}
      </Inline>
    ),
  },
  {
    id: "beside-words",
    title: "Beside words",
    line: "decorative hides it when the words say the wait; a busy Button draws its own.",
    code: `<Inline gap="sm" role="status">
  <Spinner decorative />
  <Text>Waiting for your passkey…</Text>
</Inline>
<Button loading>Saving…</Button>`,
    render: () => (
      <Stack gap="lg" align="center">
        <Inline gap="sm" role="status">
          <Spinner decorative />
          <Text>Waiting for your passkey…</Text>
        </Inline>
        <Button loading>Saving…</Button>
      </Stack>
    ),
  },
];
