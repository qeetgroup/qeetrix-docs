// Components › Separator: its documentation, from @qeetrix/react 0.2.0 (separator.d.ts,
// separator.js), the Storybook stories (layout/separator.stories.tsx) and the changelog.
// Server-safe: its examples and figures are rendered with the page.
import { Separator, Stack, Text } from "@qeetrix/react";
import { LAYOUT_TESTED } from "../layout";
import type { ComponentDoc } from "../types";
import { examples, Groups } from "./examples";

export const separator: ComponentDoc = {
  name: "Separator",
  slug: "separator",
  category: "layout",
  status: "stable",
  since: "0.0.2",
  lede: "A 1px line between groups of content, horizontal or vertical; decorative when it only draws.",
  exports: ["Separator"],
  renders: '<div role="separator">',
  source: "separator",
  story: "components/layout/separator.stories.tsx",
  examples,

  usage: {
    useFor: ["Groups in a list or a panel.", "Links in a row, decorative."],
    notFor: [
      { text: "Space alone does it", use: "Stack" },
      { text: "Sections with titles", use: "Card" },
    ],
    anatomyFigure: <Groups />,
    anatomy: [
      {
        slot: "separator",
        element: '<div role="separator">',
        note: '1px, subtle; decorative is role="none".',
      },
    ],
    rules: [
      {
        title: "Space first",
        doLine: "Space between items; a line between groups.",
        dontLine: "A line under every row: the page turns to stripes.",
        doIt: <Groups />,
        dontIt: (
          <Stack gap="sm" className="qc-cells">
            <Text>Passkeys</Text>
            <Separator decorative />
            <Text>2 on this account</Text>
            <Separator decorative />
            <Text>Authenticator app</Text>
            <Separator decorative />
            <Text>Added 3 March 2026</Text>
          </Stack>
        ),
      },
    ],
    content: [
      "A Separator has no words.",
      "decorative when it's only a visual break, so it isn't announced.",
    ],
  },

  api: {
    props: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        default: '"horizontal"',
        note: "A vertical one stretches to its row.",
      },
      {
        name: "tone",
        type: '"subtle" | "default" | "strong"',
        default: '"subtle"',
        note: "From the border tokens.",
      },
      { name: "decorative", type: "boolean", default: "false", note: 'Only visual: role="none".' },
      { name: "render", type: "ReactElement", default: "a <div>", note: "Another element." },
    ],
    parts: [
      {
        slot: "separator",
        element: '<div role="separator">',
        note: "aria-orientation when vertical.",
      },
    ],
    recipes: [
      {
        title: "Between links",
        line: "A footer's links, a vertical decorative line between each.",
        file: "footer.tsx",
        code: `<Inline gap="md">
  <Link href="/privacy">Privacy</Link>
  <Separator orientation="vertical" decorative />
  <Link href="/terms">Terms</Link>
</Inline>`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      {
        check: "Role",
        result: 'separator, with aria-orientation when vertical; decorative is role="none".',
      },
      { check: "Forced colours", result: "The line is drawn in CanvasText." },
    ],
    tested: LAYOUT_TESTED,
  },

  changelog: [
    { version: "0.0.2", items: ["Separator: 1px, horizontal or vertical, optionally decorative."] },
  ],

  related: [
    { name: "Stack", when: "Space between" },
    { name: "Card", when: "Grouped sections" },
  ],
};
