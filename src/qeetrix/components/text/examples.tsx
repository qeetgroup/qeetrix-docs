// Components › Text: its examples, the real Text with the code for each. Server-safe, so they're
// rendered with the page: nothing here reads token data.
import { Box, Stack, Text, type TextTone } from "@qeetrix/react";
import type { ExampleDoc } from "../types";

export const TONES: Array<[TextTone, string]> = [
  ["default", "Priya Sharma signed in"],
  ["subtle", "2 minutes ago · Bengaluru"],
  ["subtlest", "evt_4812"],
  ["brand", "Qeet Pro"],
  ["success", "Directory synced"],
  ["warning", "Expires in 9 days"],
  ["danger", "Sign-in blocked"],
  ["info", "3 invitations waiting"],
];

export const examples: ExampleDoc[] = [
  {
    id: "sizes-and-weights",
    title: "Sizes and weights",
    line: "The body roles: sm 12/16, md 14/20 (by default), lg 16/24; regular, medium or semibold.",
    code: `<Text size="lg" weight="semibold">Priya Sharma</Text>
<Text>priya@acme.in · Engineering</Text>
<Text size="sm" tone="subtle">Last signed in 2 minutes ago</Text>`,
    render: () => (
      <Stack gap="xs">
        <Text size="lg" weight="semibold">
          Priya Sharma
        </Text>
        <Text>priya@acme.in · Engineering</Text>
        <Text size="sm" tone="subtle">
          Last signed in 2 minutes ago
        </Text>
      </Stack>
    ),
  },
  {
    id: "tones",
    title: "Tones",
    line: "A text colour from the tokens; unset, it inherits. inverse for a dark surface.",
    code: `<Text tone="subtle">2 minutes ago · Bengaluru</Text>
<Text tone="danger">Sign-in blocked</Text>`,
    render: () => (
      <Stack gap="xs">
        {TONES.map(([tone, text]) => (
          <Text key={tone} tone={tone}>
            {text}
          </Text>
        ))}
        <Box background="inverse" paddingInline="sm" paddingBlock="xs" radius="control">
          <Text tone="inverse">Viewing as Rahul Verma</Text>
        </Box>
      </Stack>
    ),
  },
  {
    id: "code-and-ids",
    title: "Code and IDs",
    line: "mono: Fira Code at the same size, for an ID, a key or a command.",
    code: `<Text mono size="sm">usr_0001</Text>`,
    render: () => (
      <Text>
        Priya's ID is <Text mono>usr_0001</Text>.
      </Text>
    ),
  },
  {
    id: "truncation",
    title: "Truncation",
    line: "truncate: one line with an ellipsis, or a number of lines.",
    code: `<Text truncate>…</Text>
<Text truncate={2}>…</Text>`,
    render: () => (
      <Stack gap="md" className="qc-cells">
        <Text truncate>
          People who can sign in to Acme Pvt Ltd's applications, synced from Azure AD.
        </Text>
        <Text truncate={2}>
          People who can sign in to Acme Pvt Ltd's applications, synced from Azure AD four minutes
          ago, with passkeys required for every admin.
        </Text>
      </Stack>
    ),
  },
  {
    id: "a-paragraph",
    title: "A paragraph",
    line: "A <span> by default; render a <p> for a paragraph.",
    code: `<Text render={<p />}>…</Text>`,
    render: () => (
      <div className="qc-cells">
        <Text render={<p />}>
          Passkeys can't be phished: there's no password to type into the wrong page. Turn them on
          for admins first.
        </Text>
      </div>
    ),
  },
];
