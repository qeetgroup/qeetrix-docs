// Components › Text: its documentation, from @qeetrix/react 0.2.0 (text.d.ts, text.js), the
// Storybook stories (typography/typography.stories.tsx) and the changelog. Server-safe: its
// examples and figures are rendered with the page.
import { Stack, Text } from "@qeetrix/react";
import { TYPE_TESTED } from "../type";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const text: ComponentDoc = {
  name: "Text",
  slug: "text",
  category: "type",
  status: "stable",
  since: "0.0.2",
  lede: "Running text, labels and inline code, on the type roles: a size, a weight and a tone from the tokens.",
  exports: ["Text"],
  renders: "<span>",
  source: "text",
  story: "components/typography/typography.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Labels, values and metadata.",
      "A paragraph, rendered as <p>.",
      "An ID or a command, mono.",
    ],
    notFor: [
      { text: "A section's title", use: "Heading" },
      { text: "Code to copy", use: "Code block" },
      { text: "A status", use: "Badge" },
    ],
    anatomyFigure: (
      <Stack gap="xs">
        <Text size="lg" weight="semibold">
          Priya Sharma
        </Text>
        <Text size="sm" tone="subtle">
          Last signed in 2 minutes ago
        </Text>
      </Stack>
    ),
    anatomy: [
      {
        slot: "text",
        element: "<span>",
        note: "A role: size, weight; a tone, or the inherited colour.",
      },
    ],
    rules: [
      {
        title: "Tone says less, not more",
        doLine: "Subtle for metadata; the words carry the rest.",
        dontLine: "Danger for a whole paragraph: nothing reads as calm.",
        doIt: (
          <Stack gap="xs">
            <Text>Priya Sharma</Text>
            <Text size="sm" tone="subtle">
              2 minutes ago
            </Text>
          </Stack>
        ),
        dontIt: (
          <Text tone="danger">
            Priya Sharma signed in from Bengaluru 2 minutes ago using a passkey.
          </Text>
        ),
      },
    ],
    content: [
      "Sentence case everywhere.",
      "Numbers formatted for the locale: 1,284 users.",
      "mono only for what's typed or copied.",
    ],
  },

  api: {
    props: [
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', note: "12/16, 14/20 or 16/24." },
      {
        name: "weight",
        type: '"regular" | "medium" | "semibold"',
        default: '"regular"',
        note: "400, 500 or 600.",
      },
      {
        name: "tone",
        type: '"default" | "subtle" | "subtlest" | "disabled" | "inverse" | "brand" | "danger" | "success" | "warning" | "info"',
        default: "inherit",
        note: "A text colour; disabled only inside an inactive control.",
      },
      { name: "mono", type: "boolean", default: "false", note: "Fira Code at the same size." },
      {
        name: "truncate",
        type: "boolean | number",
        default: "—",
        note: "One line with an ellipsis, or a number of lines.",
      },
      {
        name: "align",
        type: '"start" | "center" | "end"',
        default: "—",
        note: "Logical alignment.",
      },
      { name: "render", type: "ReactElement", default: "a <span>", note: "A <p>, a <label>." },
    ],
    parts: [{ slot: "text", element: "<span>", note: "data-size, data-weight, data-tone." }],
    recipes: [
      {
        title: "Numbers",
        line: "Format them for the locale with the library's helpers.",
        file: "count.tsx",
        code: `import { formatNumber } from "@qeetrix/react";

<Text>{formatNumber(1284, "en-IN")} users</Text>`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      { check: "Zoom", result: "Sizes in rem: they grow with the reader's text size." },
      {
        check: "Truncation",
        result: "The full text stays in the page; pass title where it's cut.",
      },
    ],
    tested: TYPE_TESTED,
  },

  changelog: [
    { version: "0.0.2", items: ["Text: body roles, weights, tones, monospace, truncation."] },
  ],

  related: [
    { name: "Heading", when: "A section's title" },
    { name: "Link", when: "Text that goes somewhere" },
    { name: "Visually hidden", when: "Words only a screen reader hears" },
  ],
};
