// Components › Spinner: its documentation, from @qeetrix/react 0.2.0 (spinner.d.ts, spinner.js),
// the Storybook stories (feedback/spinner.stories.tsx) and the changelog. Server-safe: its
// examples and figures are rendered with the page.
import { Inline, Skeleton, Spinner, Stack, Text } from "@qeetrix/react";
import { FEEDBACK_TESTED } from "../feedback";
import type { ComponentDoc } from "../types";
import { examples, SIZES } from "./examples";

export const spinner: ComponentDoc = {
  name: "Spinner",
  slug: "spinner",
  category: "feedback",
  status: "stable",
  since: "0.0.2",
  lede: "A short wait with no known end: a ring that turns. Read as a status, in the app's language.",
  exports: ["Spinner"],
  renders: '<span role="status">',
  source: "spinner",
  story: "components/feedback/spinner.stories.tsx",
  examples,

  usage: {
    useFor: ["A wait of a second or two: a search, a passkey prompt.", "A small region loading."],
    notFor: [
      { text: "Content still on its way, with a known shape", use: "Skeleton" },
      { text: "A long task with a known end", use: "Progress" },
      { text: "A button's own wait", use: "Button" },
    ],
    anatomyFigure: (
      <span className="qc-clip">
        <Spinner size="xl" />
      </span>
    ),
    anatomy: [
      {
        slot: "spinner",
        element: '<span role="status">',
        note: 'The ring, named "Loading", or by label.',
      },
    ],
    rules: [
      {
        title: "Shape over spin",
        doLine: "A known layout loading: skeletons hold its place.",
        dontLine: "A spinner where a table will be: the page jumps when it lands.",
        doIt: (
          <Stack gap="sm" className="qc-skeleton-stage">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Stack>
        ),
        dontIt: <Spinner size="lg" />,
      },
      {
        title: "Say what's loading",
        doLine: "Words beside it, where the wait is long enough to read.",
        dontLine: "A spinner alone, for minutes.",
        doIt: (
          <Inline gap="sm" role="status">
            <Spinner decorative />
            <Text>Importing 2,000 users…</Text>
          </Inline>
        ),
        dontIt: <Spinner />,
      },
    ],
    sizes: {
      line: "Fixed, at every density.",
      specimen: (
        <Inline gap="lg" align="end">
          {SIZES.map(([size]) => (
            <Spinner key={size} size={size} decorative />
          ))}
        </Inline>
      ),
      columns: ["Size", "Pixels", "Beside"],
      rows: [
        ["sm", "14", "Small text"],
        ["md", "16", "Body text, a field"],
        ["lg", "20", "A title"],
        ["xl", "24", "A region"],
      ],
    },
    content: [
      'label says what\'s loading: "Loading users".',
      "Words beside it end in an ellipsis: Saving…",
      "After a few seconds, say more, or show Progress.",
    ],
  },

  api: {
    props: [
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        default: '"md"',
        note: "14, 16, 20 or 24px.",
      },
      {
        name: "tone",
        type: '"neutral" | "brand"',
        default: '"neutral"',
        note: "neutral follows the text colour; brand is Ember. default is a deprecated alias of neutral.",
      },
      {
        name: "label",
        type: "string",
        default: '"Loading"',
        note: "The accessible name; by default, the provider's string, in its language.",
      },
      {
        name: "decorative",
        type: "boolean",
        default: "false",
        note: "Hidden, when something else announces the wait.",
      },
    ],
    parts: [{ slot: "spinner", element: '<span role="status">', note: "data-size, data-tone." }],
    recipes: [
      {
        title: "A region loading",
        line: "Mark the region aria-busy, and let one Spinner say so.",
        file: "sessions.tsx",
        code: `<section aria-busy={loading}>
  {loading ? <Spinner label="Loading sessions" /> : <SessionList />}
</section>`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      {
        check: "Status",
        result: 'role="status", named "Loading" in the app\'s language, or by label.',
      },
      { check: "Decorative", result: "aria-hidden, when words or a busy Button say it." },
      { check: "Reduced motion", result: "It fades instead of turning." },
    ],
    tested: FEEDBACK_TESTED,
  },

  changelog: [
    {
      version: "0.1.0",
      items: [
        'tone="neutral": the consistent name for default, which stays as a deprecated alias.',
        "A standalone Spinner reads QeetrixProvider's language, and stays server-safe.",
        "Without a label, its server markup uses aria-labelledby with a hidden label.",
      ],
    },
    {
      version: "0.0.2",
      items: [
        "Spinner: four sizes, announced as a status unless decorative; it fades under reduced motion.",
      ],
    },
  ],

  related: [
    { name: "Skeleton", when: "A known shape" },
    { name: "Progress", when: "A known end" },
    { name: "Button", when: "Its loading state" },
  ],
};
