// Components › Scroll area: its documentation, from @qeetrix/react 0.2.0 (scroll-area.d.ts,
// scroll-area.js), the Storybook stories (layout/scroll-area.stories.tsx) and the changelog. Its
// examples run live (Live.tsx); the figures are the real ScrollArea, server-rendered.
import { ScrollArea } from "@qeetrix/react";
import { LAYOUT_TESTED } from "../layout";
import type { ComponentDoc } from "../types";
import { AuditEvents, examples } from "./examples";

export const scrollArea: ComponentDoc = {
  name: "Scroll area",
  slug: "scroll-area",
  category: "layout",
  status: "stable",
  since: "0.0.2",
  lede: "A scrolling region with Qeetrix scrollbars; it takes keyboard focus when its content overflows.",
  exports: ["ScrollArea"],
  renders: '<div role="region">',
  source: "scroll-area",
  story: "components/layout/scroll-area.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A long list in a fixed space: a panel's events.",
      "A long line, sideways: a URL, a key.",
    ],
    notFor: [
      { text: "The page itself: let the window scroll", use: "Stack" },
      { text: "A wide table: it scrolls itself", use: "Table" },
      { text: "Content that folds", use: "Accordion" },
    ],
    anatomyFigure: (
      <div className="qc-scroll-stage">
        <ScrollArea aria-label="Audit events, figure" style={{ blockSize: 160 }}>
          <AuditEvents count={8} />
        </ScrollArea>
      </div>
    ),
    anatomy: [
      {
        slot: "scroll-area-viewport",
        element: "<div>",
        note: "What scrolls: a named region that takes focus when it overflows. Its 8px scrollbars show on hover, while scrolling and on focus.",
      },
    ],
    rules: [
      {
        title: "Name it",
        doLine: "aria-label: the region is announced, and found by landmark.",
        dontLine: "Unnamed: a focusable box nobody can identify.",
        doIt: (
          <div className="qc-scroll-stage">
            <ScrollArea aria-label="Audit events, named" style={{ blockSize: 120 }}>
              <AuditEvents count={4} />
            </ScrollArea>
          </div>
        ),
        dontIt: (
          <div className="qc-scroll-stage">
            <ScrollArea style={{ blockSize: 120 }}>
              <AuditEvents count={4} />
            </ScrollArea>
          </div>
        ),
      },
    ],
    content: [
      'Name it for what it holds: "Audit events".',
      "Give it a height, or it never scrolls.",
    ],
  },

  api: {
    props: [
      {
        name: "orientation",
        type: '"vertical" | "horizontal" | "both"',
        default: '"vertical"',
        note: "Which way it scrolls.",
      },
      {
        name: "aria-label · aria-labelledby",
        type: "string",
        default: "—",
        note: "Names the region; it goes on the viewport, which becomes a region landmark.",
      },
      {
        name: "className · style",
        type: "…",
        default: "—",
        note: "Its size, e.g. blockSize: 320, and its placement.",
      },
      { name: "children", type: "ReactNode", default: "—", note: "What scrolls." },
    ],
    parts: [
      { slot: "scroll-area", element: "<div>", note: "The root." },
      {
        slot: "scroll-area-viewport",
        element: '<div role="region">',
        note: "Named: role region, focusable when it overflows.",
      },
      { slot: "scroll-area-scrollbar", element: "<div>", note: "data-orientation." },
      { slot: "scroll-area-thumb", element: "<div>", note: "The thumb." },
    ],
    recipes: [
      {
        title: "A long value",
        line: "A URL or a key wider than its box: sideways, named for what it holds, by keyboard too.",
        file: "redirect-uri.tsx",
        code: `<ScrollArea orientation="horizontal" aria-label="Authorization URL">
  <code>{authorizationUrl}</code>
</ScrollArea>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "To the region, when its content overflows." },
      { keys: ["↑", "↓", "←", "→"], action: "Scroll it, while it has focus." },
    ],
    checks: [
      { check: "Region", result: "Named, the viewport is a region landmark." },
      { check: "Focus", result: "It takes focus only when there's something to scroll." },
      { check: "Scrollbars", result: "They show on keyboard focus, not only on hover." },
    ],
    tested: LAYOUT_TESTED,
  },

  changelog: [
    { version: "0.1.0", items: ['Its name and role="region" sit on the focusable viewport.'] },
    {
      version: "0.0.2",
      items: [
        "ScrollArea: 8px scrollbars that show on hover, while scrolling and on keyboard focus. The region takes focus when it overflows.",
      ],
    },
  ],

  related: [
    { name: "Table", when: "Scrolls itself" },
    { name: "Card", when: "A panel to scroll in" },
  ],
};
