// Components › Heading: its examples, the real Heading with the code for each. Server-safe, so
// they're rendered with the page: nothing here reads token data.
import { Heading, type HeadingSize, Stack, Text } from "@qeetrix/react";
import type { ExampleDoc } from "../types";

export const SIZES: HeadingSize[] = [
  "display-lg",
  "display-md",
  "display-sm",
  "heading-lg",
  "heading-md",
  "heading-sm",
  "title-lg",
  "title-md",
  "title-sm",
];

export const examples: ExampleDoc[] = [
  {
    id: "level-and-size",
    title: "Level and size",
    line: "level sets the element, required, so the outline is meant; size sets the look. By default, the level's size.",
    code: `<Heading level={2}>Payments</Heading>
<Heading level={3}>Invoices</Heading>
<Heading level={4}>Overdue</Heading>`,
    render: () => (
      <Stack gap="sm">
        <Heading level={2}>Payments</Heading>
        <Heading level={3}>Invoices</Heading>
        <Heading level={4}>Overdue</Heading>
      </Stack>
    ),
  },
  {
    id: "sizes",
    title: "Sizes",
    line: "Nine looks, from display to title; display sizes are for welcoming pages, title sizes for cards and panels.",
    code: `<Heading level={2} size="display-md">Payments for Acme Pvt Ltd</Heading>
<Heading level={2} size="title-sm">Payments for Acme Pvt Ltd</Heading>`,
    render: () => (
      <Stack gap="md" className="qc-type-stage">
        {SIZES.map((size) => (
          <Stack key={size} gap="none">
            <Text size="sm" tone="subtle">
              {size}
            </Text>
            <Heading level={3} size={size}>
              Payments for Acme Pvt Ltd
            </Heading>
          </Stack>
        ))}
      </Stack>
    ),
  },
  {
    id: "truncation",
    title: "Truncation",
    line: "truncate: one line with an ellipsis, or a number of lines.",
    code: `<Heading level={3} size="title-md" truncate>…</Heading>
<Heading level={3} size="title-md" truncate={2}>…</Heading>`,
    render: () => (
      <Stack gap="lg" className="qc-cells">
        <Heading level={3} size="title-md" truncate>
          Payroll portal for Acme Pvt Ltd employees in Bengaluru and Pune
        </Heading>
        <Heading level={3} size="title-md" truncate={2}>
          Payroll portal for Acme Pvt Ltd employees in Bengaluru, Pune, Chennai and Hyderabad
        </Heading>
      </Stack>
    ),
  },
];
