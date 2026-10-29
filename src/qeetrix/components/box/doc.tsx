// Components › Box: its documentation, from @qeetrix/react 0.2.0 (box.d.ts, box.js), the
// Storybook stories (layout/box.stories.tsx) and the changelog. Server-safe: its examples and
// figures are rendered with the page.
import { Box, Stack, Text } from "@qeetrix/react";
import { Cell, LAYOUT_TESTED } from "../layout";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const box: ComponentDoc = {
  name: "Box",
  slug: "box",
  category: "layout",
  status: "stable",
  since: "0.0.2",
  lede: "A token-only surface: padding, a background, a border and corners. No margin: space between siblings is the parent's gap.",
  exports: ["Box"],
  renders: "<div>",
  source: "box",
  story: "components/layout/box.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A panel with a tint, a border or corners.",
      "Padding around a region, from the tokens.",
    ],
    notFor: [
      { text: "Related content with a title", use: "Card" },
      { text: "Space between siblings", use: "Stack" },
    ],
    anatomyFigure: (
      <Box padding="lg" background="raised" border="default" radius="surface">
        <Text>Payroll portal</Text>
      </Box>
    ),
    anatomy: [
      { slot: "box", element: "<div>", note: "The surface: padding, background, border, corners." },
    ],
    rules: [
      {
        title: "Gaps, not margins",
        doLine: "The parent's gap spaces the boxes.",
        dontLine: "A margin on each box: the spacing drifts, and doubles at the edges.",
        doIt: (
          <Stack gap="md" className="qc-cells">
            <Cell>Passkeys</Cell>
            <Cell>Authenticator apps</Cell>
          </Stack>
        ),
        dontIt: (
          <div className="qc-cells">
            <div style={{ marginBlock: 20 }}>
              <Cell>Passkeys</Cell>
            </div>
            <div style={{ marginBlock: 6 }}>
              <Cell>Authenticator apps</Cell>
            </div>
          </div>
        ),
      },
    ],
    content: [
      "A Box has no words of its own: name it with render and aria-label if it's a landmark.",
      "Tokens only: no colour or size outside the scales.",
    ],
  },

  api: {
    props: [
      {
        name: "padding",
        type: '"none" | "xs" | "sm" | "md" | "lg" | "xl"',
        default: "—",
        note: "Every side, from the inset scale: 0 · 4 · 8 · 12 · 16 · 24px.",
      },
      {
        name: "paddingInline · paddingBlock",
        type: "Inset",
        default: "—",
        note: "Start and end, or top and bottom; over padding.",
      },
      {
        name: "background",
        type: '"canvas" | "default" | "raised" | "sunken" | "overlay" | "inverse" | "neutral" | "brand" | "selected"',
        default: "—",
        note: "A surface or a tint; inverse sets the text too.",
      },
      {
        name: "border",
        type: '"none" | "subtle" | "default" | "strong"',
        default: "—",
        note: "A 1px border in a token colour.",
      },
      {
        name: "radius",
        type: '"none" | "sm" | "control" | "surface" | "overlay" | "modal" | "chip" | "full"',
        default: "—",
        note: "Corners from the radius tokens.",
      },
      {
        name: "render",
        type: "ReactElement",
        default: "a <div>",
        note: "Another element: <section />.",
      },
    ],
    parts: [{ slot: "box", element: "<div>", note: "data-background, data-border, data-radius." }],
    recipes: [
      {
        title: "A landmark",
        line: "render a <section> or an <aside>, and name it.",
        file: "tips.tsx",
        code: `<Box render={<aside />} aria-label="Tips" padding="md" background="sunken" radius="surface">…</Box>`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      { check: "Semantics", result: "A <div>: none of its own. render gives it an element's." },
      { check: "Right to left", result: "paddingInline is logical: start and end swap." },
    ],
    tested: LAYOUT_TESTED,
  },

  changelog: [
    {
      version: "0.0.2",
      items: ["Box: a token-only surface: padding, background, border and corners."],
    },
  ],

  related: [
    { name: "Card", when: "A titled surface" },
    { name: "Stack", when: "Gaps between" },
  ],
};
