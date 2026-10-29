// Components › Collapsible: its documentation, from @qeetrix/react 0.2.0 (accordion.d.ts,
// accordion.js), the Storybook stories (layout/collapsible.stories.tsx) and the changelog. Its
// examples open live (Live.tsx); the figures are the real Collapsible, server-rendered.
import { ChevronDownIcon } from "@qeetrix/icons/icons/chevron-down";
import { Button, Collapsible, CollapsibleTrigger, Stack } from "@qeetrix/react";
import { NAV_TESTED } from "../navigation";
import type { ComponentDoc } from "../types";
import { Advanced, examples } from "./examples";

const Closed = ({ labels }: { labels: string[] }) => (
  <div className="qc-fold-stage">
    <Stack gap="xs">
      {labels.map((label) => (
        <Collapsible key={label}>
          <CollapsibleTrigger
            render={
              <Button variant="ghost" icon={ChevronDownIcon}>
                {label}
              </Button>
            }
          />
        </Collapsible>
      ))}
    </Stack>
  </div>
);

export const collapsible: ComponentDoc = {
  name: "Collapsible",
  slug: "collapsible",
  category: "navigation",
  status: "stable",
  since: "0.0.2",
  lede: "One section that folds, with no rules: Show more, or Advanced settings.",
  exports: ["Collapsible", "CollapsibleTrigger", "CollapsiblePanel"],
  renders: "<button aria-expanded>",
  source: "accordion",
  story: "components/layout/collapsible.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Advanced options most people leave alone.",
      "Show more, under the first few of a list.",
      "A detail beside a row: a webhook's retry policy.",
    ],
    notFor: [
      { text: "Several sections, ruled", use: "Accordion" },
      { text: "Content over the page", use: "Popover" },
    ],
    anatomyFigure: (
      <div className="qc-fold-stage">
        <Advanced defaultOpen />
      </div>
    ),
    anatomy: [
      {
        slot: "collapsible-trigger",
        select: "[aria-expanded]",
        element: "<button>",
        note: "Your control, through render: aria-expanded.",
      },
      {
        slot: "chevron",
        select: '[data-qx-fold] [data-slot="button-icon"]',
        element: "<svg>",
        note: "The Button's trailing icon: it turns as the panel opens.",
      },
      {
        slot: "collapsible-panel",
        element: "<div>",
        note: "What folds, with the height animation.",
      },
    ],
    rules: [
      {
        title: "Say what's folded",
        doLine: "A label that names what opens.",
        dontLine: "More: more of what?",
        doIt: <Closed labels={["Advanced settings"]} />,
        dontIt: <Closed labels={["More"]} />,
      },
      {
        title: "One section",
        doLine: "One fold, for what most people skip.",
        dontLine: "A stack of folds: use an Accordion, ruled, with headings.",
        doIt: <Closed labels={["Advanced settings"]} />,
        dontIt: <Closed labels={["Token settings", "Session settings", "Network settings"]} />,
      },
    ],
    content: [
      "Name what opens: Advanced settings, Retry policy.",
      'Show more with a number: "Show 3 more"; then "Show fewer".',
      "Sentence case, no full stop.",
    ],
  },

  api: {
    props: [
      {
        name: "open · defaultOpen",
        type: "boolean",
        default: "false",
        note: "Whether the panel is open.",
      },
      {
        name: "onOpenChange",
        type: "(open, details) => void",
        default: "—",
        note: "Called as it opens or closes.",
      },
      { name: "disabled", type: "boolean", default: "false", note: "The trigger does nothing." },
      {
        name: "CollapsibleTrigger: render",
        type: "ReactElement",
        default: "a <button>",
        note: "Your control: a ghost Button. It keeps its own data-slot.",
      },
      {
        name: "CollapsiblePanel: keepMounted",
        type: "boolean",
        default: "false",
        note: "Keep it in the page while closed, so its state survives.",
      },
      {
        name: "CollapsiblePanel: hiddenUntilFound",
        type: "boolean",
        default: "false",
        note: "Find in page opens it, as an accordion's sections do.",
      },
    ],
    parts: [
      { slot: "collapsible", element: "<div>", note: "The root." },
      {
        slot: "collapsible-trigger",
        element: "<button>",
        note: "aria-expanded, aria-controls; data-panel-open while open. A Qeetrix control in render keeps its own data-slot; a Button's icon in it turns.",
      },
      { slot: "collapsible-panel", element: "<div>", note: "data-open while open." },
    ],
    recipes: [
      {
        title: "A chevron alone",
        line: "An IconButton turns its chevron too: name it for what opens.",
        file: "Details.tsx",
        code: `<Collapsible>
  <CollapsibleTrigger
    render={<IconButton variant="ghost" icon={ChevronDownIcon} aria-label="Request details" />}
  />
  <CollapsiblePanel>…</CollapsiblePanel>
</Collapsible>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "To the trigger." },
      { keys: ["Enter", "Space"], action: "Opens or closes the panel." },
    ],
    checks: [
      { check: "State", result: "aria-expanded on the trigger, which controls the panel." },
      { check: "Closed", result: "The panel leaves the page, unless keepMounted." },
      { check: "Reduced motion", result: "The height doesn't animate." },
    ],
    tested: NAV_TESTED,
  },

  changelog: [
    {
      version: "0.2.0",
      items: [
        "A Button or IconButton trigger with icon={ChevronDownIcon} turns its chevron as the panel opens.",
      ],
    },
    {
      version: "0.0.2",
      items: ["Collapsible, CollapsibleTrigger and CollapsiblePanel: one unruled section."],
    },
  ],

  related: [
    { name: "Accordion", when: "Several sections" },
    { name: "Button", when: "Its trigger" },
    { name: "Popover", when: "Over the page" },
  ],
};
