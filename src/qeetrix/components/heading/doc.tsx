// Components › Heading: its documentation, from @qeetrix/react 0.2.0 (heading.d.ts, heading.js),
// the Storybook stories (typography/typography.stories.tsx) and the changelog. Server-safe: its
// examples and figures are rendered with the page.
import { Heading, Inline, Stack, Text } from "@qeetrix/react";
import { TYPE_TESTED } from "../type";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const heading: ComponentDoc = {
  name: "Heading",
  slug: "heading",
  category: "type",
  status: "stable",
  since: "0.0.2",
  lede: "A section heading: the level sets the element, the size sets the look. The level is required, so the outline is always meant.",
  exports: ["Heading"],
  renders: "<h1>–<h6>",
  source: "heading",
  story: "components/typography/typography.stories.tsx",
  examples,

  usage: {
    useFor: ["The title of a section, a card or a panel.", "A welcoming page's display line."],
    notFor: [
      { text: "A console page's title", use: "Page header" },
      { text: "Emphasis in running text", use: "Text" },
    ],
    anatomyFigure: (
      <Heading level={2} size="heading-md">
        Payments
      </Heading>
    ),
    anatomy: [
      { slot: "heading", element: "<h2>", note: "h1 to h6 from level; data-size for the look." },
    ],
    rules: [
      {
        title: "Levels in order",
        doLine: "h2, then h3 under it: the outline reads as the page does.",
        dontLine: "A level picked for its look: h4 straight under h2.",
        doIt: (
          <Stack gap="xs">
            <Inline gap="sm" align="baseline">
              <Heading level={3} size="heading-sm">
                Payments
              </Heading>
              <Text size="sm" tone="subtle">
                h3
              </Text>
            </Inline>
            <Inline gap="sm" align="baseline">
              <Heading level={4} size="title-md">
                Invoices
              </Heading>
              <Text size="sm" tone="subtle">
                h4
              </Text>
            </Inline>
          </Stack>
        ),
        dontIt: (
          <Stack gap="xs">
            <Inline gap="sm" align="baseline">
              <Heading level={3} size="heading-sm">
                Payments
              </Heading>
              <Text size="sm" tone="subtle">
                h3
              </Text>
            </Inline>
            <Inline gap="sm" align="baseline">
              <Heading level={6} size="title-md">
                Invoices
              </Heading>
              <Text size="sm" tone="subtle">
                h6
              </Text>
            </Inline>
          </Stack>
        ),
      },
      {
        title: "A heading, not bold text",
        doLine: "Heading: in the outline, found by screen readers' heading keys.",
        dontLine: "Bold Text where a heading goes: the section has no name.",
        doIt: (
          <Heading level={3} size="title-md">
            Recent sign-ins
          </Heading>
        ),
        dontIt: <Text weight="semibold">Recent sign-ins</Text>,
      },
    ],
    content: [
      "Sentence case: Recent sign-ins.",
      "No full stop.",
      "A few words: the section's subject.",
    ],
  },

  api: {
    props: [
      { name: "level", type: "1 – 6", default: "required", note: "The element: <h1> to <h6>." },
      {
        name: "size",
        type: '"display-lg" … "title-sm"',
        default: "by level",
        note: "The look: 1 heading-lg, 2 heading-md, 3 heading-sm, 4 title-lg, 5 title-md, 6 title-sm.",
      },
      { name: "tone", type: '"default" | "subtle" | "inverse"', default: "—", note: "Its colour." },
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
      {
        name: "render",
        type: "ReactElement",
        default: "—",
        note: "Another element: a link that looks like a heading. Prefer level.",
      },
    ],
    parts: [{ slot: "heading", element: "<h2>", note: "h1–h6: data-size, data-tone." }],
    recipes: [
      {
        title: "Display sizes",
        line: "For welcoming pages, in the Geo letterforms; a console's titles keep the title sizes.",
        file: "welcome.tsx",
        code: `<Heading level={1} size="display-lg">One philosophy, many products</Heading>`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      { check: "Outline", result: "level is required: every heading is meant, and in order." },
      { check: "Look", result: "size changes only the look, never the level." },
      { check: "Zoom", result: "Sizes in rem: they grow with the reader's text size." },
    ],
    tested: TYPE_TESTED,
  },

  changelog: [
    {
      version: "0.2.0",
      items: ["The display sizes use the Geo letterforms, as the design rules give them."],
    },
    { version: "0.0.2", items: ["Heading: the level sets the element, the size sets the look."] },
  ],

  related: [
    { name: "Text", when: "Running text" },
    { name: "Page header", when: "A page's title" },
    { name: "Card", when: "A section's title" },
  ],
};
