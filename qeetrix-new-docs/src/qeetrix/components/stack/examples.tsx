// Components › Stack: its examples, the real Stack with the code for each. Server-safe, so they're
// rendered with the page: nothing here reads token data.
import { Stack, Text } from "@qeetrix/react";
import { Cell } from "../layout";
import type { ExampleDoc } from "../types";

const Three = () => (
  <>
    <Cell>Passkeys</Cell>
    <Cell>Authenticator apps</Cell>
    <Cell>SMS codes</Cell>
  </>
);

export const examples: ExampleDoc[] = [
  {
    id: "gaps",
    title: "Gaps",
    line: "gap from the space scale: 0 · 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64px. md, 12px, by default.",
    code: `<Stack gap="sm">…</Stack>
<Stack>…</Stack>
<Stack gap="xl">…</Stack>`,
    render: () => (
      <div className="qc-cell-columns">
        {(["sm", "md", "xl"] as const).map((gap) => (
          <Stack key={gap} gap="xs">
            <Text size="sm" tone="subtle">
              {gap}
            </Text>
            <Stack gap={gap}>
              <Three />
            </Stack>
          </Stack>
        ))}
      </div>
    ),
  },
  {
    id: "alignment",
    title: "Alignment",
    line: "align across: stretch by default, or start, center, end.",
    code: `<Stack align="start">…</Stack>`,
    render: () => (
      <div className="qc-cell-columns">
        {(["stretch", "start", "center", "end"] as const).map((align) => (
          <Stack key={align} gap="xs">
            <Text size="sm" tone="subtle">
              {align}
            </Text>
            <Stack gap="sm" align={align}>
              <Three />
            </Stack>
          </Stack>
        ))}
      </div>
    ),
  },
  {
    id: "a-list",
    title: "A list",
    line: "render a <ul> around <li> children: the bullets and indent go, the list role stays.",
    code: `<Stack render={<ul />} gap="sm">
  <li>Passkeys</li>
  <li>Authenticator apps</li>
</Stack>`,
    render: () => (
      <Stack render={<ul />} gap="sm" aria-label="Sign-in methods">
        <li>
          <Text>Passkeys</Text>
        </li>
        <li>
          <Text>Authenticator apps</Text>
        </li>
        <li>
          <Text>SMS codes</Text>
        </li>
      </Stack>
    ),
  },
];
