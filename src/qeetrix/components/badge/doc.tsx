// Components › Badge: its documentation, from @qeetrix/react 0.2.0 (badge.d.ts, badge.js), the
// Storybook stories (data-display/badge.stories.tsx) and the changelog. Server-safe: its examples
// and figures are rendered with the page.
import { CircleCheckIcon } from "@qeetrix/icons/icons/circle-check";
import { Badge, Inline } from "@qeetrix/react";
import { DISPLAY_TESTED } from "../display";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const badge: ComponentDoc = {
  name: "Badge",
  slug: "badge",
  category: "data-display",
  status: "stable",
  since: "0.0.2",
  lede: "A short, static status or count: one or two words. The word carries the meaning, the tone reinforces it.",
  exports: ["Badge"],
  renders: "<span>",
  source: "badge",
  story: "components/data-display/badge.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A record's status: Active, Invited, Blocked.",
      "A count beside a label: a tab's 642.",
      "A plan or a tag: Qeet Pro.",
    ],
    notFor: [
      { text: "Something to click or remove", use: "Button" },
      { text: "A message about the page", use: "Alert" },
      { text: "A person", use: "Avatar" },
    ],
    anatomyFigure: (
      <Badge tone="success" icon={CircleCheckIcon}>
        Verified
      </Badge>
    ),
    anatomy: [
      { slot: "badge", element: "<span>", note: "The pill: the tone's tint, or its bold fill." },
      { slot: "badge-icon", element: "<svg>", note: "12px, sharp, decorative." },
      { slot: "badge-label", element: "<span>", note: "The word: it truncates with an ellipsis." },
    ],
    rules: [
      {
        title: "The word says it",
        doLine: "A status anyone can read, in any colour scheme.",
        dontLine: "Colour as the only difference: two tones, one word.",
        doIt: (
          <Inline gap="md">
            <Badge tone="success">Active</Badge>
            <Badge tone="danger">Blocked</Badge>
          </Inline>
        ),
        dontIt: (
          <Inline gap="md">
            <Badge tone="success">Status</Badge>
            <Badge tone="danger">Status</Badge>
          </Inline>
        ),
      },
      {
        title: "One solid in a view",
        doLine: "Subtle for the list; solid for the one that must stand out.",
        dontLine: "Every badge solid: nothing stands out.",
        doIt: (
          <Inline gap="md">
            <Badge tone="success">Paid</Badge>
            <Badge tone="success">Paid</Badge>
            <Badge tone="danger" variant="solid">
              Overdue
            </Badge>
          </Inline>
        ),
        dontIt: (
          <Inline gap="md">
            <Badge tone="success" variant="solid">
              Paid
            </Badge>
            <Badge tone="success" variant="solid">
              Paid
            </Badge>
            <Badge tone="danger" variant="solid">
              Overdue
            </Badge>
          </Inline>
        ),
      },
    ],
    content: [
      "One or two words, sentence case: Active, Expires in 9 days.",
      "A status as an adjective or a past participle: Active, Blocked, Paid.",
      "Pass title with the full text where it may be cut.",
    ],
  },

  api: {
    props: [
      {
        name: "tone",
        type: '"neutral" | "brand" | "info" | "success" | "warning" | "danger"',
        default: '"neutral"',
        note: "Reinforces the word.",
      },
      {
        name: "variant",
        type: '"subtle" | "solid"',
        default: '"subtle"',
        note: "Subtle, the tone's tint; solid, its bold fill, AA in every tone and scheme.",
      },
      { name: "size", type: '"md" | "sm"', default: '"md"', note: "20px or 16px." },
      {
        name: "icon",
        type: "QeetrixIcon",
        default: "—",
        note: "A leading 12px icon (--qx-size-icon-2xs), sharp, decorative.",
      },
      { name: "children", type: "ReactNode", default: "—", note: "The word or the count." },
    ],
    parts: [
      { slot: "badge", element: "<span>", note: "data-tone, data-variant, data-size." },
      { slot: "badge-icon", element: "<svg>", note: "aria-hidden." },
      { slot: "badge-label", element: "<span>", note: "The text, truncated." },
    ],
    recipes: [
      {
        title: "From a status",
        line: "Map each status to its tone once, so every list agrees.",
        file: "status.ts",
        code: `const tone = { Active: "success", Invited: "info", Blocked: "danger" } as const;

<Badge tone={tone[user.status]}>{user.status}</Badge>`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      { check: "Text", result: "Read as its words; the tone adds nothing a screen reader needs." },
      { check: "Contrast", result: "Every tone and variant meets AA, in light and dark." },
      { check: "Icon", result: "Decorative: aria-hidden." },
      { check: "Forced colours", result: "A border keeps the pill's edge." },
    ],
    tested: DISPLAY_TESTED,
  },

  changelog: [
    {
      version: "0.1.1",
      items: ["Its icon is sized by --qx-size-icon-2xs, 12px; it looks the same."],
    },
    {
      version: "0.1.0",
      items: ['variant="solid", the bold fill, and size="sm", 16px.'],
    },
    {
      version: "0.0.2",
      items: ["Badge: pills in six tones with an optional sharp icon. Server-safe."],
    },
  ],

  related: [
    { name: "Table", when: "A status in a cell" },
    { name: "Tabs", when: "A count on a tab" },
    { name: "Alert", when: "A message, not a status" },
  ],
};
