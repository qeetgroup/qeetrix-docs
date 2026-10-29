// Components › Skeleton: its documentation, from @qeetrix/react 0.2.0 (skeleton.d.ts,
// skeleton.js), the Storybook stories (feedback/skeleton.stories.tsx) and the changelog.
// Server-safe: its examples and figures are rendered with the page.
import { Inline, Skeleton, Spinner, Stack } from "@qeetrix/react";
import { FEEDBACK_TESTED } from "../feedback";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

const Row = () => (
  <Inline gap="sm" wrap={false}>
    <Skeleton variant="circle" />
    <Stack gap="xs" style={{ flex: 1 }}>
      <Skeleton style={{ inlineSize: "60%" }} />
      <Skeleton style={{ inlineSize: "40%" }} />
    </Stack>
  </Inline>
);

export const skeleton: ComponentDoc = {
  name: "Skeleton",
  slug: "skeleton",
  category: "feedback",
  status: "stable",
  since: "0.0.2",
  lede: "A placeholder shaped like the content that's loading, so the page doesn't move when it lands.",
  exports: ["Skeleton"],
  renders: '<span aria-hidden="true">',
  source: "skeleton",
  story: "components/feedback/skeleton.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A card, a list or a profile, the first time it loads.",
      "Table rows: Table draws its own.",
    ],
    notFor: [
      { text: "A wait with no known shape", use: "Spinner" },
      { text: "A long task", use: "Progress" },
      { text: "Nothing to show", use: "Empty state" },
    ],
    anatomyFigure: (
      <div className="qc-skeleton-stage">
        <Stack gap="md">
          <Row />
          <Skeleton lines={2} />
        </Stack>
      </div>
    ),
    anatomy: [
      {
        slot: "skeleton",
        select: '[data-slot="skeleton"][data-variant="circle"]',
        element: "<span>",
        note: "A circle, an Avatar's size.",
      },
      { slot: "skeleton", element: "<span>", note: "A line of text, sized by you." },
      {
        slot: "skeleton-lines",
        element: "<span>",
        note: "A paragraph: lines, the last one shorter.",
      },
    ],
    rules: [
      {
        title: "The shape of what's coming",
        doLine: "Rows like the list's: it lands without a jump.",
        dontLine: "One grey block for a list of rows.",
        doIt: (
          <Stack gap="md" className="qc-skeleton-stage">
            <Row />
            <Row />
          </Stack>
        ),
        dontIt: (
          <div className="qc-skeleton-stage">
            <Skeleton variant="block" style={{ blockSize: 96 }} />
          </div>
        ),
      },
      {
        title: "One way to wait",
        doLine: "Skeletons alone, with the wait said once to screen readers.",
        dontLine: "Skeletons and a spinner: two ways of saying the same.",
        doIt: (
          <div className="qc-skeleton-stage">
            <Row />
          </div>
        ),
        dontIt: (
          <Stack gap="md" align="center" className="qc-skeleton-stage">
            <Spinner />
            <Row />
          </Stack>
        ),
      },
    ],
    content: [
      "No words: it's hidden from screen readers.",
      'Say the wait once, in a status: "Loading Priya Sharma\'s profile".',
      "Size lines like the text they stand for: a name shorter than a paragraph.",
    ],
  },

  api: {
    props: [
      {
        name: "variant",
        type: '"text" | "block" | "circle"',
        default: '"text"',
        note: "One line, a card or image, or an avatar.",
      },
      {
        name: "lines",
        type: "number",
        default: "—",
        note: "With text: a paragraph of this many lines, the last one shorter, at the lines' height.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        default: '"md"',
        note: "With circle: an Avatar's diameter, 32px by default.",
      },
      {
        name: "style · className",
        type: "…",
        default: "—",
        note: "Its size: inlineSize, blockSize.",
      },
    ],
    parts: [
      { slot: "skeleton", element: '<span aria-hidden="true">', note: "data-variant; it pulses." },
      {
        slot: "skeleton-lines",
        element: '<span aria-hidden="true">',
        note: "A paragraph's lines.",
      },
    ],
    recipes: [
      {
        title: "Until it loads",
        line: "Show the skeleton while there's nothing; never over content that's already there.",
        file: "profile.tsx",
        code: `{profile ? <ProfileCard profile={profile} /> : <ProfileSkeleton />}`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      { check: "Hidden", result: "aria-hidden: nothing is read." },
      { check: "The wait", result: "Mark the region aria-busy, and say it once in a status." },
      { check: "Reduced motion", result: "It holds still instead of pulsing." },
    ],
    tested: FEEDBACK_TESTED,
  },

  changelog: [
    { version: "0.1.0", items: ["lines, a paragraph; size, circles that match Avatar's sizes."] },
    {
      version: "0.0.2",
      items: [
        "Skeleton: text, block or circle. It pulses, holds still under reduced motion, and is hidden from assistive technology. Server-safe.",
      ],
    },
  ],

  related: [
    { name: "Spinner", when: "No known shape" },
    { name: "Table", when: "Its loading rows" },
    { name: "Avatar", when: "The circle's sizes" },
  ],
};
