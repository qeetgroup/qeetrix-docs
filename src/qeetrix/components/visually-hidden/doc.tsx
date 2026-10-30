// Components › Visually hidden: its documentation, from @qeetrix/react 0.2.0
// (visually-hidden.d.ts, visually-hidden.js), the Storybook stories
// (utilities/visually-hidden.stories.tsx) and the changelog. Server-safe.
import { Text, TextField, VisuallyHidden } from "@qeetrix/react";
import { TYPE_TESTED } from "../type";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const visuallyHidden: ComponentDoc = {
  name: "Visually hidden",
  slug: "visually-hidden",
  category: "type",
  status: "stable",
  since: "0.0.2",
  lede: "Content for screen readers only: read, never shown. Never display: none.",
  exports: ["VisuallyHidden"],
  renders: "<span>",
  source: "visually-hidden",
  story: "components/utilities/visually-hidden.stories.tsx",
  examples,

  usage: {
    useFor: ["Words a picture or a layout already says to the eye.", "A status announced once."],
    notFor: [
      { text: "An icon button's name", use: "Icon button" },
      { text: "Content nobody needs", use: "Text" },
    ],
    anatomyFigure: (
      <Text size="lg" weight="semibold">
        1,284 <VisuallyHidden>users</VisuallyHidden>
      </Text>
    ),
    anatomy: [
      { slot: "visually-hidden", element: "<span>", note: "Clipped to 1px: read, not seen." },
    ],
    rules: [
      {
        title: "Not for what everyone needs",
        doLine: "An error shown, and read with its field.",
        dontLine: "An error only a screen reader hears: the sighted see nothing wrong.",
        doIt: (
          <div className="qc-cells">
            <TextField
              label="Password"
              type="password"
              defaultValue="hunter2"
              error="Wrong password"
            />
          </div>
        ),
        dontIt: (
          <div className="qc-cells">
            <TextField label="Password" type="password" defaultValue="hunter2" />
            <VisuallyHidden>Wrong password</VisuallyHidden>
          </div>
        ),
      },
    ],
    content: [
      "Only what the eye already gets another way.",
      "Write it as it's heard: 1,284 users.",
    ],
  },

  api: {
    props: [
      { name: "children", type: "ReactNode", default: "—", note: "What's read." },
      {
        name: "render",
        type: "ReactElement",
        default: "a <span>",
        note: "Another element: a <div> around a block.",
      },
    ],
    parts: [{ slot: "visually-hidden", element: "<span>", note: "Clipped to 1px." }],
    recipes: [
      {
        title: "Not for focusable content",
        line: "Something focusable shouldn't hide: a Skip link shows itself when focused.",
        file: "skip.tsx",
        code: `<SkipLink />`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      {
        check: "Read",
        result: "Screen readers and braille displays get it; it's never display: none.",
      },
      { check: "Selection", result: "It's clipped to 1px, so it never takes space." },
    ],
    tested: TYPE_TESTED,
  },

  changelog: [{ version: "0.0.2", items: ["VisuallyHidden: screen-reader-only content."] }],

  related: [
    { name: "Skip link", when: "Shown on focus" },
    { name: "Icon button", when: "Named by aria-label" },
  ],
};
