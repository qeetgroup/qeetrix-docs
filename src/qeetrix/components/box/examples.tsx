// Components › Box: its examples, the real Box with the code for each. Server-safe, so they're
// rendered with the page: nothing here reads token data.
import { Box, type BoxBackground, Inline, Stack, Text } from "@qeetrix/react";
import type { ExampleDoc } from "../types";

export const BACKGROUNDS: BoxBackground[] = [
  "canvas",
  "default",
  "raised",
  "sunken",
  "neutral",
  "brand",
  "selected",
  "inverse",
];

export const examples: ExampleDoc[] = [
  {
    id: "a-surface",
    title: "A surface",
    line: "padding from the inset tokens, a background, a border and corners: the sanctioned way to give a region a surface.",
    code: `<Box padding="lg" background="raised" border="default" radius="surface">
  <Text weight="semibold">Payroll portal</Text>
  <Text size="sm" tone="subtle">OIDC · 642 users</Text>
</Box>`,
    render: () => (
      <Box padding="lg" background="raised" border="default" radius="surface">
        <Stack gap="xs">
          <Text weight="semibold">Payroll portal</Text>
          <Text size="sm" tone="subtle">
            OIDC · 642 users
          </Text>
        </Stack>
      </Box>
    ),
  },
  {
    id: "backgrounds",
    title: "Backgrounds",
    line: "A surface or a tint from the tokens; inverse sets the inverse text colour too.",
    code: `<Box background="sunken" padding="md">…</Box>
<Box background="inverse" padding="md">…</Box>`,
    render: () => (
      <Inline gap="sm">
        {BACKGROUNDS.map((background) => (
          <Box
            key={background}
            background={background}
            border="subtle"
            radius="control"
            padding="md"
          >
            <Text size="sm">{background}</Text>
          </Box>
        ))}
      </Inline>
    ),
  },
  {
    id: "sides",
    title: "Sides",
    line: "paddingInline and paddingBlock override padding on those sides, in logical directions.",
    code: `<Box padding="sm" paddingInline="xl" background="sunken" radius="control">…</Box>`,
    render: () => (
      <Box padding="sm" paddingInline="xl" background="sunken" radius="control">
        <Text size="sm">8px top and bottom, 24px at the start and end</Text>
      </Box>
    ),
  },
  {
    id: "another-element",
    title: "Another element",
    line: "render: a <section>, an <aside>, a <li>, with the same surface.",
    code: `<Box render={<aside />} padding="md" background="sunken" radius="surface" aria-label="Tips">…</Box>`,
    render: () => (
      <Box render={<aside />} padding="md" background="sunken" radius="surface" aria-label="Tips">
        <Text size="sm">Passkeys can't be phished: turn them on for admins first.</Text>
      </Box>
    ),
  },
];
