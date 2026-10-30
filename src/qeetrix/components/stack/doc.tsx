// Components › Stack: its documentation, from @qeetrix/react 0.2.0 (stack.d.ts, stack.js), the
// Storybook stories (layout/stack.stories.tsx) and the changelog. Server-safe: its examples and
// figures are rendered with the page.
import { Stack } from "@qeetrix/react";
import { Cell, LAYOUT_TESTED } from "../layout";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const stack: ComponentDoc = {
  name: "Stack",
  slug: "stack",
  category: "layout",
  status: "stable",
  since: "0.0.2",
  lede: "A vertical flow with a gap from the space scale. The one way to space things above each other.",
  exports: ["Stack"],
  renders: "<div>",
  source: "stack",
  story: "components/layout/stack.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Fields in a form, sections of a card, items of a list.",
      "Any column whose gaps come from the scale.",
    ],
    notFor: [
      { text: "A row", use: "Inline" },
      { text: "Columns", use: "Grid" },
      { text: "Padding around a region", use: "Box" },
    ],
    anatomyFigure: (
      <Stack gap="lg" className="qc-cells">
        <Cell>Passkeys</Cell>
        <Cell>Authenticator apps</Cell>
      </Stack>
    ),
    anatomy: [
      { slot: "stack", element: "<div>", note: "The column: data-gap, data-align." },
      { slot: "box", element: "<div>", note: "A child: the gap is between, never around." },
    ],
    rules: [
      {
        title: "One gap per stack",
        doLine: "Siblings of one kind, one gap: nest a Stack for a group.",
        dontLine: "Spacer divs for the odd gap: the scale breaks.",
        doIt: (
          <Stack gap="xl" className="qc-cells">
            <Stack gap="sm">
              <Cell>Email</Cell>
              <Cell>Password</Cell>
            </Stack>
            <Cell>Sign in</Cell>
          </Stack>
        ),
        dontIt: (
          <Stack gap="sm" className="qc-cells">
            <Cell>Email</Cell>
            <Cell>Password</Cell>
            <div style={{ blockSize: 21 }} />
            <Cell>Sign in</Cell>
          </Stack>
        ),
      },
    ],
    content: [
      "A Stack has no words of its own.",
      "As a list, name it if a heading doesn't: aria-label.",
    ],
  },

  api: {
    props: [
      {
        name: "gap",
        type: '"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"',
        default: '"md"',
        note: "Space between children: 0 · 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64px.",
      },
      {
        name: "align",
        type: '"start" | "center" | "end" | "stretch"',
        default: '"stretch"',
        note: "Across.",
      },
      {
        name: "justify",
        type: '"start" | "center" | "end" | "between"',
        default: "—",
        note: "Along, in a taller stack.",
      },
      {
        name: "render",
        type: "ReactElement",
        default: "a <div>",
        note: "A <ul> around <li>: bullets go, the list stays.",
      },
    ],
    parts: [{ slot: "stack", element: "<div>", note: "data-gap, data-align, data-justify." }],
    recipes: [
      {
        title: "A form's gaps",
        line: "Fields stand the form gap apart; Form does it for you.",
        file: "invite.tsx",
        code: `<Stack gap="lg">
  <TextField label="Email" />
  <Select label="Role" items={roles} />
</Stack>`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      { check: "Order", result: "The reading order is the source order: never reversed with CSS." },
      {
        check: "Lists",
        result: "As a <ul>, it keeps the list role without the browser's bullets.",
      },
    ],
    tested: LAYOUT_TESTED,
  },

  changelog: [
    {
      version: "0.1.0",
      items: ["Rendered as a ul or ol, it resets list styles and keeps list semantics."],
    },
    { version: "0.0.2", items: ["Stack: a vertical flow with token gaps."] },
  ],

  related: [
    { name: "Inline", when: "A row" },
    { name: "Grid", when: "Columns" },
    { name: "Box", when: "A surface" },
  ],
};
