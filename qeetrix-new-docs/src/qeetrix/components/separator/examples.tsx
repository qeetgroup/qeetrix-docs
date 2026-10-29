// Components › Separator: its examples, the real Separator with the code for each. Server-safe, so
// they're rendered with the page: nothing here reads token data.
import { Inline, Link, Separator, Stack, Text } from "@qeetrix/react";
import type { ExampleDoc } from "../types";

export const Groups = () => (
  <Stack gap="md" className="qc-cells">
    <Stack gap="xs">
      <Text weight="semibold">Passkeys</Text>
      <Text size="sm" tone="subtle">
        2 on this account
      </Text>
    </Stack>
    <Separator />
    <Stack gap="xs">
      <Text weight="semibold">Authenticator app</Text>
      <Text size="sm" tone="subtle">
        Added 3 March 2026
      </Text>
    </Stack>
  </Stack>
);

export const examples: ExampleDoc[] = [
  {
    id: "between-groups",
    title: "Between groups",
    line: "A 1px line between groups of content: read as a separator.",
    code: `<Stack gap="md">
  <Passkeys />
  <Separator />
  <AuthenticatorApp />
</Stack>`,
    render: () => <Groups />,
  },
  {
    id: "vertical",
    title: "Vertical",
    line: 'orientation="vertical" stretches to its row.',
    code: `<Inline gap="md">
  <Link href="/privacy">Privacy</Link>
  <Separator orientation="vertical" decorative />
  <Link href="/terms">Terms</Link>
</Inline>`,
    render: () => (
      <Inline gap="md" align="stretch">
        <Link href="#privacy">Privacy</Link>
        <Separator orientation="vertical" decorative />
        <Link href="#terms">Terms</Link>
        <Separator orientation="vertical" decorative />
        <Link href="#security">Security</Link>
      </Inline>
    ),
  },
  {
    id: "tones",
    title: "Tones",
    line: "subtle by default; default and strong from the border tokens.",
    code: `<Separator />
<Separator tone="default" />
<Separator tone="strong" />`,
    render: () => (
      <Stack gap="lg" className="qc-cells">
        <Separator />
        <Separator tone="default" />
        <Separator tone="strong" />
      </Stack>
    ),
  },
];
