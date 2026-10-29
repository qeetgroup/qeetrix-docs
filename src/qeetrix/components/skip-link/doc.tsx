// Components › Skip link: its documentation, from @qeetrix/react 0.2.0 (skip-link.d.ts,
// skip-link.js), the Storybook stories (navigation/skip-link.stories.tsx) and the changelog. Its
// examples are a page in a frame; its figures draw the focused link still (.qc-skip-still).

import { TYPE_TESTED } from "../type";
import type { ComponentDoc } from "../types";
import { examples, FocusedSkipLink } from "./examples";

export const skipLink: ComponentDoc = {
  name: "Skip link",
  slug: "skip-link",
  category: "type",
  status: "stable",
  since: "0.0.2",
  lede: "The first focusable element on a page: hidden until focused, it jumps past the navigation to the main content.",
  exports: ["SkipLink"],
  renders: "<a>",
  source: "skip-link",
  story: "components/navigation/skip-link.stories.tsx",
  examples,

  usage: {
    useFor: ["Every page with navigation before its content: WCAG 2.4.1, Bypass Blocks."],
    notFor: [
      { text: "A console: AppShell has its own", use: "App shell" },
      { text: "Links within the page", use: "Link" },
    ],
    anatomyFigure: <FocusedSkipLink />,
    anatomy: [
      {
        slot: "skip-link",
        element: "<a>",
        note: "Fixed at the start corner; clipped until it has focus.",
      },
    ],
    rules: [
      {
        title: "Say where it goes",
        doLine: '"Skip to main content": what it skips to.',
        dontLine: '"Skip": skip what?',
        doIt: <FocusedSkipLink />,
        dontIt: <FocusedSkipLink label="Skip" />,
      },
    ],
    content: [
      '"Skip to main content", or the page\'s own word for it.',
      "One per page: the first thing in the body.",
    ],
  },

  api: {
    props: [
      { name: "href", type: "string", default: '"#main"', note: "Where it jumps." },
      {
        name: "children",
        type: "ReactNode",
        default: '"Skip to main content"',
        note: "The label; without it, messages.label, then the provider's.",
      },
      {
        name: "messages",
        type: "{ label }",
        default: "the provider's",
        note: "This link's strings.",
      },
      { name: "render", type: "ReactElement", default: "an <a>", note: "A router link." },
    ],
    parts: [
      { slot: "skip-link", element: "<a>", note: "Underlined, on the overlay surface when shown." },
    ],
    recipes: [
      {
        title: "Its target",
        line: "Give the main region the id and tabIndex={-1}, so focus lands there and the next Tab goes on from it.",
        file: "layout.tsx",
        code: `<SkipLink />
<SiteHeader />
<main id="main" tabIndex={-1}>…</main>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "The page's first stop: it shows." },
      { keys: ["Enter"], action: "Jumps to the main content." },
    ],
    checks: [
      { check: "Bypass blocks", result: "WCAG 2.4.1: the repeated navigation can be skipped." },
      { check: "Hidden", result: "Clipped, never display: none, so it can take focus." },
      { check: "Language", result: "Its label follows the provider's language." },
    ],
    tested: TYPE_TESTED,
  },

  changelog: [
    { version: "0.1.0", items: ["messages: this link's strings."] },
    {
      version: "0.0.2",
      items: ["SkipLink: the first focusable element on a page, hidden until focused."],
    },
  ],

  related: [
    { name: "App shell", when: "Its own skip link" },
    { name: "Visually hidden", when: "Words only a screen reader hears" },
  ],
};
