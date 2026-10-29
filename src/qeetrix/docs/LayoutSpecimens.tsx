// A live specimen for each layout component, drawn with the component itself, for its card
// (ComponentSpecimens.tsx). Rendered to HTML.
import { Box, Card, Grid, Inline, ScrollArea, Separator, Stack, Text } from "@qeetrix/react";
import type { ReactNode } from "react";

const block = (label: string) => (
  <Box key={label} padding="sm" background="sunken" border="subtle" radius="sm">
    <Text size="sm">{label}</Text>
  </Box>
);

export const specimens: Record<string, ReactNode> = {
  Box: (
    <Box padding="lg" background="raised" border="default" radius="surface">
      <Text size="sm">Padding, surface, border</Text>
    </Box>
  ),
  Stack: <Stack gap="sm">{["Name", "Email", "Role"].map(block)}</Stack>,
  Inline: (
    <Inline gap="sm" wrap>
      {["Active", "Admin", "Mumbai", "Passkey"].map(block)}
    </Inline>
  ),
  Grid: (
    <Grid columns={3} gap="sm">
      {["1", "2", "3", "4", "5", "6"].map(block)}
    </Grid>
  ),
  Card: (
    <Card title="Invoice INV-2047" level={4}>
      <Text size="sm" tone="subtle">
        Due 30 Oct 2026
      </Text>
    </Card>
  ),
  Separator: (
    <Stack gap="sm">
      <Text size="sm">Account</Text>
      <Separator />
      <Text size="sm">Security</Text>
    </Stack>
  ),
  "Scroll area": (
    <ScrollArea style={{ blockSize: "6rem" }}>
      <Stack gap="xs">
        {[
          "Priya Sharma",
          "Rahul Verma",
          "Ananya Iyer",
          "Karthik Reddy",
          "Meera Nair",
          "Arjun Mehta",
        ].map((n) => (
          <Text key={n} size="sm">
            {n}
          </Text>
        ))}
      </Stack>
    </ScrollArea>
  ),
};
