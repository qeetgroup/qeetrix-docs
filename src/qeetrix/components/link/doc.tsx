// Components › Link: its documentation, from @qeetrix/react 0.2.0 (link.d.ts, link.js), the
// Storybook stories (navigation/link.stories.tsx) and the changelog. Server-safe: its examples
// and figures are rendered with the page.
import { Button, Link, Text } from "@qeetrix/react";
import { TYPE_TESTED } from "../type";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const link: ComponentDoc = {
  name: "Link",
  slug: "link",
  category: "type",
  status: "stable",
  since: "0.0.2",
  lede: "Navigation to a page, a section, a file or a site. An action that changes data is a Button.",
  exports: ["Link"],
  renders: "<a>",
  source: "link",
  story: "components/navigation/link.stories.tsx",
  examples,

  usage: {
    useFor: ["Going somewhere: a page, a section, a document.", "Another site, opening a new tab."],
    notFor: [
      { text: "Doing something: Save, Delete", use: "Button" },
      { text: "The site's navigation", use: "Sidebar" },
    ],
    anatomyFigure: (
      <Link href="https://www.w3.org/TR/webauthn-3/" external>
        The WebAuthn specification
      </Link>
    ),
    anatomy: [
      { slot: "link", element: "<a>", note: "Underlined, in the link colour." },
      {
        slot: "link-icon",
        element: "<svg>",
        note: "With external: the arrow, tied to the last word; it mirrors right to left.",
      },
    ],
    rules: [
      {
        title: "Say where it goes",
        doLine: "The destination in the words: read alone, it still makes sense.",
        dontLine: '"Click here": a list of links that all say the same.',
        doIt: (
          <Text>
            Read the <Link href="#guide">passkey setup guide</Link>.
          </Text>
        ),
        dontIt: (
          <Text>
            To read the passkey setup guide, <Link href="#guide">click here</Link>.
          </Text>
        ),
      },
      {
        title: "Links go, buttons do",
        doLine: "A Button for an action that changes data.",
        dontLine: "A link that deletes.",
        doIt: <Button tone="danger">Delete key</Button>,
        dontIt: (
          <Link href="#delete" tone="inherit">
            Delete key
          </Link>
        ),
      },
    ],
    content: [
      "Link the words that say where: passkey setup guide.",
      'No "click here", no bare URLs in sentences.',
      "external for another site, so the new tab is announced.",
    ],
  },

  api: {
    props: [
      { name: "href", type: "string", default: "—", note: "Where it goes." },
      {
        name: "tone",
        type: '"default" | "subtle" | "inherit"',
        default: '"default"',
        note: "The link colour, subtle, or the text's.",
      },
      {
        name: "external",
        type: "boolean",
        default: "false",
        note: 'A new tab: rel="noopener noreferrer", the arrow, and "(opens in a new tab)".',
      },
      {
        name: "render",
        type: "ReactElement",
        default: "an <a>",
        note: 'A router link: render={<RouterLink to="/x" />}; or a <button />, an action in place that reads as a link.',
      },
      {
        name: "messages",
        type: "{ external }",
        default: '"(opens in a new tab)"',
        note: "Server-safe, so the provider's strings don't reach it: pass the translation here.",
      },
    ],
    parts: [
      { slot: "link", element: "<a>", note: "data-tone; data-external." },
      { slot: "link-icon", element: "<svg>", note: "The external arrow, aria-hidden." },
    ],
    recipes: [
      {
        title: "With your router",
        line: "render takes your router's link; the look stays.",
        file: "nav-link.tsx",
        code: `import { Link as RouterLink } from "@tanstack/react-router";

<Link render={<RouterLink to="/users" />}>View all users</Link>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "To the link." },
      { keys: ["Enter"], action: "Follows it." },
    ],
    checks: [
      {
        check: "Name",
        result: 'Its words; with external, "(opens in a new tab)" after them, for screen readers.',
      },
      { check: "Underline", result: "Always underlined: never colour alone." },
      {
        check: "Right to left",
        result: "The external arrow mirrors, pointing up and toward the reading end.",
      },
    ],
    tested: TYPE_TESTED,
  },

  changelog: [
    {
      version: "0.2.0",
      items: [
        "Rendered as a button, it drops the button's box: an action in place that reads as a link.",
      ],
    },
    {
      version: "0.1.1",
      items: [
        "The external arrow mirrors in right to left.",
        "The last word is found with a scan, not a regular expression that backtracked on long text.",
      ],
    },
    {
      version: "0.1.0",
      items: ["It wraps with its sentence, the external arrow kept on the last word; it's inline."],
    },
    {
      version: "0.0.2",
      items: [
        "Link: default, subtle and inherit tones; external opens a new tab with a screen-reader note.",
      ],
    },
  ],

  related: [
    { name: "Button", when: "An action" },
    { name: "Breadcrumb", when: "Where the page sits" },
    { name: "Text", when: "Its sentence" },
  ],
};
