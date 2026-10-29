// Components › Inline: its documentation, from @qeetrix/react 0.2.0 (inline.d.ts, inline.js), the
// Storybook stories (layout/inline.stories.tsx) and the changelog. Server-safe: its examples and
// figures are rendered with the page.
import { Inline } from "@qeetrix/react";
import { Cell, LAYOUT_TESTED } from "../layout";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const inline: ComponentDoc = {
  name: "Inline",
  slug: "inline",
  category: "layout",
  status: "stable",
  since: "0.0.2",
  lede: "A horizontal flow with a gap from the space scale, that wraps when space runs out.",
  exports: ["Inline"],
  renders: "<div>",
  source: "inline",
  story: "components/layout/inline.stories.tsx",
  examples,

  usage: {
    useFor: ["Buttons side by side.", "Badges, tags, a title and its action."],
    notFor: [
      { text: "A column", use: "Stack" },
      { text: "Equal columns", use: "Grid" },
    ],
    anatomyFigure: (
      <Inline gap="lg">
        <Cell>Export</Cell>
        <Cell>Invite users</Cell>
      </Inline>
    ),
    anatomy: [
      { slot: "inline", element: "<div>", note: "The row: data-gap, data-align, data-justify." },
      {
        slot: "box",
        element: "<div>",
        note: "A child: the gap is between, and between lines when it wraps.",
      },
    ],
    rules: [
      {
        title: "Let it wrap",
        doLine: "Badges wrap to the next line where it's narrow.",
        dontLine: "wrap={false} for a list that can grow: it overflows.",
        doIt: (
          <div className="qc-cells" data-narrow="">
            <Inline gap="xs">
              <Cell fixed>Engineering</Cell>
              <Cell fixed>Finance</Cell>
              <Cell fixed>People</Cell>
              <Cell fixed>Sales</Cell>
            </Inline>
          </div>
        ),
        dontIt: (
          <div className="qc-cells" data-narrow="">
            <Inline gap="xs" wrap={false}>
              <Cell fixed>Engineering</Cell>
              <Cell fixed>Finance</Cell>
              <Cell fixed>People</Cell>
              <Cell fixed>Sales</Cell>
            </Inline>
          </div>
        ),
      },
    ],
    content: ["An Inline has no words of its own.", "Buttons in a row: the primary last."],
  },

  api: {
    props: [
      {
        name: "gap",
        type: '"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"',
        default: '"sm"',
        note: "Space between children: 0 · 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64px.",
      },
      {
        name: "align",
        type: '"start" | "center" | "end" | "baseline" | "stretch"',
        default: '"center"',
        note: "Across.",
      },
      {
        name: "justify",
        type: '"start" | "center" | "end" | "between"',
        default: "—",
        note: "Along the row.",
      },
      {
        name: "wrap",
        type: "boolean",
        default: "true",
        note: "Onto new lines when space runs out.",
      },
      {
        name: "render",
        type: "ReactElement",
        default: "a <div>",
        note: "A <ul> around <li>: bullets go, the list stays.",
      },
    ],
    parts: [
      {
        slot: "inline",
        element: "<div>",
        note: 'data-gap, data-align, data-justify; data-wrap="false".',
      },
    ],
    recipes: [
      {
        title: "A header row",
        line: "A title at the start and its action at the end.",
        file: "section-header.tsx",
        code: `<Inline justify="between">
  <Heading level={2} size="title-sm">Recent sign-ins</Heading>
  <Button variant="ghost">View all</Button>
</Inline>`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      { check: "Order", result: "Reading and Tab order follow the source, in either direction." },
      { check: "Right to left", result: "start and end swap." },
    ],
    tested: LAYOUT_TESTED,
  },

  changelog: [
    {
      version: "0.1.0",
      items: ["Rendered as a ul or ol, it resets list styles and keeps list semantics."],
    },
    {
      version: "0.0.2",
      items: ["Inline: a horizontal flow with token gaps that wraps by default."],
    },
  ],

  related: [
    { name: "Stack", when: "A column" },
    { name: "Grid", when: "Equal columns" },
  ],
};
