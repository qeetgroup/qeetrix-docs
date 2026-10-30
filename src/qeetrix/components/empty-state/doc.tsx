// Components › Empty state: its documentation, from @qeetrix/react 0.2.0
// (experimental/empty-state: EmptyState and DataState), the Storybook stories
// (feedback/empty-state.stories.tsx, data-state.stories.tsx) and the changelog. Its examples run
// live (Live.tsx); the figures are the real EmptyState, server-rendered.
import { CircleAlertIcon } from "@qeetrix/icons/icons/circle-alert";
import { UsersIcon } from "@qeetrix/icons/icons/users";
import { Button } from "@qeetrix/react";
import { EmptyState } from "@qeetrix/react/experimental";
import type { ReactNode } from "react";
import { FEEDBACK_TESTED } from "../feedback";
import type { ComponentDoc } from "../types";
import { examples, NoUsers } from "./examples";

const Stage = ({ children }: { children: ReactNode }) => (
  <div className="qc-empty-stage">{children}</div>
);

export const emptyState: ComponentDoc = {
  name: "Empty state",
  slug: "empty-state",
  category: "feedback",
  status: "experimental",
  since: "0.0.4",
  lede: "The message where content would be: nothing yet, no results, or an error. DataState picks the right one.",
  exports: ["EmptyState", "DataState"],
  renders: "<div>",
  source: "experimental/empty-state",
  story: "components/feedback/empty-state.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A list with nothing in it yet: the first users, the first key.",
      "A search with no results.",
      "Content that couldn't load.",
    ],
    notFor: [
      { text: "A message above content", use: "Alert" },
      { text: "Content on its way", use: "Skeleton" },
    ],
    anatomyFigure: (
      <Stage>
        <NoUsers />
      </Stage>
    ),
    anatomy: [
      { slot: "empty-state-icon", element: "<svg>", note: "24px, sharp, decorative." },
      { slot: "empty-state-title", element: "<p>", note: "What's missing; a heading with level." },
      { slot: "empty-state-description", element: "<p>", note: "Why, and what to do." },
      { slot: "empty-state-actions", element: "<div>", note: "One primary action at most." },
    ],
    rules: [
      {
        title: "A way forward",
        doLine: "What's missing, and the action that fills it.",
        dontLine: "Nothing to do but leave.",
        doIt: (
          <Stage>
            <EmptyState
              size="section"
              icon={UsersIcon}
              title="No users yet"
              actions={<Button>Invite users</Button>}
            />
          </Stage>
        ),
        dontIt: (
          <Stage>
            <EmptyState size="section" icon={UsersIcon} title="No data" />
          </Stage>
        ),
      },
      {
        title: "Never the raw error",
        doLine: "What couldn't load, that it's safe, and Try again.",
        dontLine: "The server's message: it means nothing to the reader.",
        doIt: (
          <Stage>
            <EmptyState
              size="section"
              tone="danger"
              icon={CircleAlertIcon}
              title="Couldn't load API keys"
              description="Your keys are safe. Try again in a moment."
            />
          </Stage>
        ),
        dontIt: (
          <Stage>
            <EmptyState
              size="section"
              tone="danger"
              icon={CircleAlertIcon}
              title="Error 503"
              description="upstream connect error or disconnect/reset before headers"
            />
          </Stage>
        ),
      },
    ],
    content: [
      'Titles say what\'s missing: "No users yet", "No users match “priya.s”".',
      "Descriptions say why, and what to do, in a sentence.",
      "One primary action; a second way in goes under it, as a link.",
    ],
  },

  api: {
    props: [
      {
        name: "title",
        type: "ReactNode",
        default: "required",
        note: 'What\'s missing or went wrong: "No users yet".',
      },
      {
        name: "description",
        type: "ReactNode",
        default: "—",
        note: "One or two sentences: why, and what to do.",
      },
      { name: "icon", type: "IconSource", default: "—", note: "A 24px sharp icon." },
      { name: "actions", type: "ReactNode", default: "—", note: "Buttons, one primary at most." },
      {
        name: "children",
        type: "ReactNode",
        default: "—",
        note: "Under the actions, small and subtle: a link.",
      },
      {
        name: "size",
        type: '"page" | "section"',
        default: '"page"',
        note: "page for a whole view; section inside a card or a table.",
      },
      {
        name: "tone",
        type: '"neutral" | "danger"',
        default: '"neutral"',
        note: "danger colours the icon.",
      },
      {
        name: "level",
        type: "2 – 6",
        default: "—",
        note: "Makes the title a heading, when this is the page's main message.",
      },
      {
        name: "DataState: loading · error · empty",
        type: "boolean · unknown · boolean",
        default: "—",
        note: "Which state: loading wins, then error, then empty, then the children.",
      },
      {
        name: "DataState: emptyState · onRetry",
        type: "ReactNode · () => void",
        default: "—",
        note: "The EmptyState for empty; Try again for an error.",
      },
    ],
    parts: [
      { slot: "empty-state", element: "<div>", note: "data-size, data-tone." },
      { slot: "empty-state-icon", element: "<svg>", note: "aria-hidden." },
      { slot: "empty-state-title", element: "<p>", note: "Or <h2>–<h6> with level." },
      { slot: "empty-state-actions", element: "<div>", note: "The actions." },
      {
        slot: "data-state",
        element: "<div>",
        note: "DataState's loading, error or empty region: data-state.",
      },
    ],
    recipes: [
      {
        title: "In a table",
        line: "Table's empty and error take an EmptyState and a DataState, under its header.",
        file: "users.tsx",
        code: `<Table
  empty={<EmptyState size="section" icon={UsersIcon} title="No users yet" … />}
  error={error && <DataState error={error} onRetry={refetch} />}
  …
/>`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      { check: "Heading", result: "With level, the title is a heading in the page's outline." },
      { check: "Icon", result: "Decorative: aria-hidden." },
      { check: "Error", result: "DataState's error is announced; the raw error is never shown." },
      { check: "Height", result: "DataState holds its height between loading and error." },
    ],
    tested: FEEDBACK_TESTED,
  },

  changelog: [
    {
      version: "0.3.0",
      items: [
        "icon takes an element as well as a component (icon={<PlusIcon />}), so a Server Component can pass one: its type is IconSource.",
      ],
    },
    {
      version: "0.1.0",
      items: [
        "EmptyState renders its children.",
        "DataState no longer jumps in height between loading and error, and its error is announced.",
      ],
    },
    {
      version: "0.0.3",
      items: [
        "EmptyState: a 24px icon, a title (a heading with level), a description and actions, in page or section size and neutral or danger tone. Server-safe.",
        'DataState: loading, then error, then empty, then the content. The error never shows the raw error, and onRetry adds "Try again".',
      ],
    },
  ],

  related: [
    { name: "Table", when: "Its empty rows" },
    { name: "Alert", when: "A message above content" },
    { name: "Skeleton", when: "Still loading" },
  ],
};
