// Components › Grid: its documentation, from @qeetrix/react 0.2.0 (grid.d.ts, grid.js), the
// Storybook stories (layout/grid.stories.tsx) and the changelog. Server-safe: its examples and
// figures are rendered with the page.
import { Grid, GridItem } from "@qeetrix/react";
import { Cell, LAYOUT_TESTED } from "../layout";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const grid: ComponentDoc = {
  name: "Grid",
  slug: "grid",
  category: "layout",
  status: "stable",
  since: "0.0.2",
  lede: "Equal columns that change with the window's size class, with gaps from the space scale.",
  exports: ["Grid", "GridItem"],
  renders: "<div>",
  source: "grid",
  story: "components/layout/grid.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Cards in columns: one on a phone, four on a desktop.",
      "A detail page's main and side columns.",
    ],
    notFor: [
      { text: "A row that wraps by its content", use: "Inline" },
      { text: "Rows of records", use: "Table" },
    ],
    anatomyFigure: (
      <div className="qc-grid-figure">
        <Grid columns={3}>
          <GridItem span={2}>
            <Cell>span 2</Cell>
          </GridItem>
          <Cell>1</Cell>
          <Cell>2</Cell>
          <Cell>3</Cell>
          <Cell>4</Cell>
        </Grid>
      </div>
    ),
    anatomy: [
      { slot: "grid", element: "<div>", note: "The columns: data-gap, data-align." },
      { slot: "grid-item", element: "<div>", note: "A cell that spans or starts where you say." },
    ],
    rules: [
      {
        title: "Fewer columns where it's narrow",
        doLine: "One column on a phone, more as the window grows.",
        dontLine: "Four columns at every size: cards a few words wide.",
        doIt: (
          <div className="qc-cells" data-narrow="">
            <Grid columns={1} gap="sm">
              <Cell>Users</Cell>
              <Cell>Groups</Cell>
            </Grid>
          </div>
        ),
        dontIt: (
          <div className="qc-cells" data-narrow="">
            <Grid columns={4} gap="sm">
              <Cell>Users</Cell>
              <Cell>Groups</Cell>
              <Cell>Roles</Cell>
              <Cell>Keys</Cell>
            </Grid>
          </div>
        ),
      },
    ],
    content: [
      "A Grid has no words of its own.",
      "Size classes, not breakpoints of your own: 600, 840, 1200, 1600.",
    ],
  },

  api: {
    props: [
      {
        name: "columns",
        type: "1 – 12 | { base, medium, expanded, large, xlarge }",
        default: "1",
        note: "Equal columns: one count, or one per window size class.",
      },
      {
        name: "gap",
        type: '"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"',
        default: '"md"',
        note: "Space between cells.",
      },
      {
        name: "align",
        type: '"start" | "center" | "end" | "stretch"',
        default: '"stretch"',
        note: "Cells in a row, up and down.",
      },
      {
        name: "render",
        type: "ReactElement",
        default: "a <div>",
        note: "A <ul> around <li> GridItems.",
      },
      {
        name: "GridItem: span · start",
        type: "1 – 12 | per size class",
        default: "1 · the next free cell",
        note: "Columns spanned, and the one it starts in; each size class inherits the nearest smaller one set.",
      },
    ],
    parts: [
      { slot: "grid", element: "<div>", note: "data-gap, data-align." },
      { slot: "grid-item", element: "<div>", note: "A spanning cell." },
    ],
    recipes: [
      {
        title: "A detail page",
        line: "The record's main column and its side column, side by side from 1200px.",
        file: "user-page.tsx",
        code: `<Grid columns={{ base: 1, large: 3 }} gap="xl">
  <GridItem span={{ large: 2 }}>
    <Card title="Profile" level={2}>…</Card>
  </GridItem>
  <Card title="Recent activity" level={2}>…</Card>
</Grid>`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      {
        check: "Order",
        result: "Cells read in source order at every size: never reordered with CSS.",
      },
      { check: "Right to left", result: "Column 1 is at the start edge." },
    ],
    tested: LAYOUT_TESTED,
  },

  changelog: [
    {
      version: "0.1.0",
      items: [
        "GridItem: a cell that spans columns, span and start, both by window size class. Server-safe.",
        "Rendered as a ul or ol, it resets list styles and keeps list semantics.",
      ],
    },
    { version: "0.0.2", items: ["Grid: responsive equal columns on the window size classes."] },
  ],

  related: [
    { name: "Card", when: "What it lays out" },
    { name: "Stack", when: "One column" },
  ],
};
