// Components › Card: its documentation, from @qeetrix/react 0.2.0 (card.d.ts, card.js), the
// Storybook stories (layout/card.stories.tsx) and the changelog. Server-safe: its examples and
// figures are rendered with the page.
import { Box, Card, Stack, Text } from "@qeetrix/react";
import type { ReactNode } from "react";
import { LAYOUT_TESTED } from "../layout";
import type { ComponentDoc } from "../types";
import { ApiKeyCard, examples } from "./examples";

const Stage = ({ children }: { children: ReactNode }) => (
  <div className="qc-fold-stage">{children}</div>
);

export const card: ComponentDoc = {
  name: "Card",
  slug: "card",
  category: "layout",
  status: "stable",
  since: "0.0.2",
  lede: "Related content on a page: a raised, ruled surface with no shadow. A titled card is a section named by its title.",
  exports: ["Card"],
  renders: "<section>",
  source: "card",
  story: "components/layout/card.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A group of settings, a list, a summary.",
      "A table, edge to edge, with Pagination in its footer.",
    ],
    notFor: [
      { text: "A surface with no title or structure", use: "Box" },
      { text: "Something to click", use: "Button" },
      { text: "Sections that fold", use: "Accordion" },
    ],
    anatomyFigure: (
      <div className="qc-card-figure">
        <ApiKeyCard />
      </div>
    ),
    anatomy: [
      {
        slot: "card-heading",
        element: "<div>",
        note: "The title, a heading at level, and its description.",
      },
      {
        slot: "card-actions",
        element: "<div>",
        note: "Actions at the header's end: a ghost button.",
      },
      { slot: "card-body", element: "<div>", note: "The content; a Table here runs edge to edge." },
      {
        slot: "card-footer",
        element: "<div>",
        note: "Ruled: the card's own actions, the primary last.",
      },
    ],
    rules: [
      {
        title: "No card in a card",
        doLine: "One surface, its parts divided by space.",
        dontLine: "Cards nested: borders inside borders.",
        doIt: (
          <Stage>
            <Card title="Sign-in" level={3}>
              <Stack gap="sm">
                <Text weight="semibold">Passkeys</Text>
                <Text size="sm" tone="subtle">
                  Required for admins.
                </Text>
              </Stack>
            </Card>
          </Stage>
        ),
        dontIt: (
          <Stage>
            <Card title="Sign-in" level={3}>
              <Card>
                <Text>Passkeys: required for admins.</Text>
              </Card>
            </Card>
          </Stage>
        ),
      },
      {
        title: "Titled, at the right level",
        doLine: "A title and its level, under the page's heading.",
        dontLine: "Bold text where the title goes: no section, no heading.",
        doIt: (
          <Stage>
            <Card title="Recent sign-ins" level={3}>
              <Text>3 today.</Text>
            </Card>
          </Stage>
        ),
        dontIt: (
          <Stage>
            <Card>
              <Box paddingBlock="xs">
                <Text weight="semibold">Recent sign-ins</Text>
              </Box>
              <Text>3 today.</Text>
            </Card>
          </Stage>
        ),
      },
    ],
    content: [
      "Titles name what's inside, a word or three: Recent sign-ins.",
      "One line of description, if it helps.",
      "Footer actions: Cancel, then the primary.",
    ],
  },

  api: {
    props: [
      {
        name: "title · level",
        type: "ReactNode · 1 – 6",
        default: "—",
        note: "The title in the ruled header, a heading at level: the card becomes a section named by it.",
      },
      { name: "description", type: "ReactNode", default: "—", note: "A line under the title." },
      {
        name: "actions",
        type: "ReactNode",
        default: "—",
        note: "At the header's end: a ghost View all.",
      },
      {
        name: "footer",
        type: "ReactNode",
        default: "—",
        note: "A ruled footer: the card's actions.",
      },
      {
        name: "variant",
        type: '"default" | "subdued"',
        default: '"default"',
        note: "subdued: the sunken surface, for a secondary panel.",
      },
      {
        name: "tone",
        type: '"neutral" | "danger"',
        default: '"neutral"',
        note: "danger: the border and title, for a danger zone.",
      },
      {
        name: "render",
        type: "ReactElement",
        default: "a <section> or <div>",
        note: "Another element: <article />.",
      },
    ],
    parts: [
      {
        slot: "card",
        element: "<section>",
        note: "Titled: aria-labelledby its title. Untitled: a <div>.",
      },
      { slot: "card-header", element: "<div>", note: "The heading and the actions." },
      { slot: "card-description", element: "<p>", note: "The line under the title." },
      { slot: "card-body", element: "<div>", note: "The content." },
      { slot: "card-footer", element: "<div>", note: "The footer." },
    ],
    recipes: [
      {
        title: "A table and its pages",
        line: "The Table edge to edge in the body, Pagination in the footer.",
        file: "users-card.tsx",
        code: `<Card footer={<Pagination offset={offset} pageSize={25} total={1284} onOffsetChange={setOffset} />}>
  <Table label="Users" … />
</Card>`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      { check: "Section", result: "A titled card is a section, named by its title's heading." },
      { check: "Heading", result: "level sets the heading, so cards sit in the page's outline." },
      { check: "Danger", result: "The danger tone is never alone: the title says what it is." },
    ],
    tested: LAYOUT_TESTED,
  },

  changelog: [
    {
      version: "0.4.0",
      items: [
        "A card with only a header ends at its header: no empty body, and its header's rule no longer doubles the card's edge or the footer's.",
      ],
    },
    {
      version: "0.1.0",
      items: [
        'variant="subdued" and tone="danger".',
        "Footers use inset-lg padding, except under an edge-to-edge table; the footer lines up with the body.",
      ],
    },
    {
      version: "0.0.2",
      items: [
        "Card: a raised, ruled surface with an optional ruled footer; a titled card is a section labelled by its title, and a table in the body runs edge to edge. Server-safe.",
      ],
    },
  ],

  related: [
    { name: "Box", when: "A plain surface" },
    { name: "Table", when: "Its usual content" },
    { name: "Grid", when: "Cards in columns" },
  ],
};
