// Components › Toggle group: its documentation, from @qeetrix/react 0.2.0 (toggle.d.ts, toggle.js),
// the Storybook stories (actions/toggle.stories.tsx: Segmented control, In context) and the
// changelog. Its examples run live (Live.tsx); the do-and-don'ts render to HTML.
import { LayoutGridIcon } from "@qeetrix/icons/icons/layout-grid";
import { ListIcon } from "@qeetrix/icons/icons/list";
import { Radio, RadioGroup, Toggle, ToggleGroup } from "@qeetrix/react";
import { controlHeights } from "../sizes";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const toggleGroup: ComponentDoc = {
  name: "Toggle group",
  slug: "toggle-group",
  category: "actions",
  status: "stable",
  since: "0.0.2",
  lede: "A row of toggles: one view among a few, or a set of tools that are each on or off.",
  exports: ["ToggleGroup", "Toggle"],
  renders: '<div role="group">',
  source: "toggle",
  story: "components/actions/toggle.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Switching between views of the same thing: grid or list, 7, 30 or 90 days.",
      "A set of tools: bold, italic, underline.",
      "A choice that applies at once, with two to five options.",
    ],
    notFor: [
      { text: "Moving between panels of content", use: "Tabs" },
      { text: "A choice in a form that's submitted", use: "Radio" },
      { text: "More than five options", use: "Select" },
      { text: "One tool on its own", use: "Toggle" },
    ],
    anatomyFigure: (
      <ToggleGroup size="lg" defaultValue={["grid"]} aria-label="Members view">
        <Toggle value="grid" icon={LayoutGridIcon} filledWhenPressed>
          Grid
        </Toggle>
        <Toggle value="list" icon={ListIcon}>
          List
        </Toggle>
      </ToggleGroup>
    ),
    anatomy: [
      {
        slot: "toggle-group",
        element: '<div role="group">',
        note: "The root: one Tab stop; arrow keys move inside.",
      },
      { slot: "toggle", element: "<button>", note: "Each choice, with aria-pressed." },
    ],
    rules: [
      {
        title: "A few, all in view",
        doLine: "Two to five short choices.",
        dontLine: "Seven to scan: that's a Select's job.",
        doIt: (
          <ToggleGroup defaultValue={["30d"]} aria-label="Period">
            <Toggle value="7d">7 days</Toggle>
            <Toggle value="30d">30 days</Toggle>
            <Toggle value="90d">90 days</Toggle>
          </ToggleGroup>
        ),
        dontIt: (
          <ToggleGroup size="sm" defaultValue={["mon"]} aria-label="Day">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <Toggle key={day} value={day.toLowerCase()}>
                {day}
              </Toggle>
            ))}
          </ToggleGroup>
        ),
      },
      {
        title: "A form answer is a radio",
        doLine: "Submitted with the form: a radio group, labelled.",
        dontLine: "A segmented control in the middle of a form.",
        doIt: (
          <RadioGroup label="Billing" defaultValue="monthly">
            <Radio value="monthly" label="Monthly" />
            <Radio value="yearly" label="Yearly" />
          </RadioGroup>
        ),
        dontIt: (
          <ToggleGroup defaultValue={["monthly"]} aria-label="Billing">
            <Toggle value="monthly">Monthly</Toggle>
            <Toggle value="yearly">Yearly</Toggle>
          </ToggleGroup>
        ),
      },
    ],
    sizes: {
      specimen: (
        <ToggleGroup size="lg" defaultValue={["30d"]} aria-label="Period, large">
          <Toggle value="7d">7 days</Toggle>
          <Toggle value="30d">30 days</Toggle>
          <Toggle value="90d">90 days</Toggle>
        </ToggleGroup>
      ),
      columns: ["Size", "Height: compact / default / comfortable"],
      rows: [
        ["sm", controlHeights("sm")],
        ["md", controlHeights("md")],
        ["lg", controlHeights("lg")],
      ],
    },
    content: [
      'Short labels, one or two words: "7 days", "Grid".',
      'Name the group: aria-label says what\'s being chosen, "Members view".',
      "Icon-only toggles: each needs its own aria-label.",
    ],
  },

  api: {
    props: [
      {
        name: "value",
        type: "readonly string[]",
        default: "—",
        note: "The pressed values, controlled.",
      },
      {
        name: "defaultValue",
        type: "readonly string[]",
        default: "—",
        note: "The pressed values to start with.",
      },
      {
        name: "onValueChange",
        type: "(value, details) => void",
        default: "—",
        note: "Called with the pressed values.",
      },
      {
        name: "multiple",
        type: "boolean",
        default: "false",
        note: "Several pressed at once; otherwise one at a time.",
      },
      {
        name: "variant",
        type: '"segmented" | "separate"',
        default: '"segmented"',
        note: "One joined control, or toggles with a gap.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        note: "Every toggle's height; it wins over theirs.",
      },
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        default: '"horizontal"',
        note: "How they line up, and which arrow keys move.",
      },
      { name: "disabled", type: "boolean", default: "false", note: "Disables every toggle." },
      {
        name: "aria-label",
        type: "string",
        default: "—",
        note: 'What\'s being chosen: "Members view".',
      },
    ],
    parts: [
      {
        slot: "toggle-group",
        element: '<div role="group">',
        note: "The root. data-variant, data-size, data-orientation.",
      },
      {
        slot: "toggle",
        element: "<button>",
        note: "Each toggle (see Toggle). data-pressed while on.",
      },
    ],
    recipes: [
      {
        title: "Always one pressed",
        line: "A single-choice group can be emptied by pressing its choice again; keep the last one.",
        file: "period.tsx",
        code: `const [period, setPeriod] = useState(["30d"]);

<ToggleGroup value={period} onValueChange={(next) => next.length && setPeriod(next)} aria-label="Period">
  <Toggle value="7d">7 days</Toggle>
  <Toggle value="30d">30 days</Toggle>
</ToggleGroup>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "Moves focus into the group; Tab again leaves it." },
      {
        keys: ["←", "→"],
        action: "Moves between toggles; ↑ and ↓ when vertical. Mirrored in right to left.",
      },
      { keys: ["Home", "End"], action: "Moves to the first or the last." },
      { keys: ["Space", "Enter"], action: "Presses the focused toggle." },
    ],
    checks: [
      {
        check: "Role and name",
        result: 'role="group", named by its aria-label; each toggle a button with aria-pressed.',
      },
      {
        check: "One Tab stop",
        result: "Roving focus: the group is one stop in the page's tab order.",
      },
      {
        check: "Right to left",
        result: "The arrow keys follow the reading direction; tested in RTL.",
      },
      {
        check: "Pressed",
        result: "A fill, not colour alone; forced colours draw it in Highlight.",
      },
    ],
    tested: [
      "axe, WCAG 2.2 A and AA, in Chromium on every pull request",
      "Firefox and WebKit every night",
      "Forced colours, reduced motion and right to left",
      "Server rendering",
    ],
  },

  changelog: [
    {
      version: "0.1.0",
      items: ["A toggle's tooltip and tooltipSide, for icon-only toggles in a group."],
    },
    {
      version: "0.0.2",
      items: [
        "ToggleGroup, on Base UI's ToggleGroup: segmented or separate, single-choice or multiple, with arrow-key focus.",
        "Right-to-left tests cover its arrow keys.",
      ],
    },
  ],

  related: [
    { name: "Toggle", when: "One tool on its own" },
    { name: "Tabs", when: "Panels of content" },
    { name: "Radio", when: "One of a few, in a form" },
    { name: "Select", when: "One from a long list" },
  ],
};
