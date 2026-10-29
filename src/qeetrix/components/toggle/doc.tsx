// Components › Toggle: its documentation, from @qeetrix/react 0.2.0 (toggle.d.ts, toggle.js), the
// Storybook stories (actions/toggle.stories.tsx) and the changelog. Its examples run live
// (Live.tsx), so they press; the do-and-don'ts render to HTML.
import { BoldIcon } from "@qeetrix/icons/icons/bold";
import { ItalicIcon } from "@qeetrix/icons/icons/italic";
import { StarIcon } from "@qeetrix/icons/icons/star";
import { Button, Inline, Switch, Toggle } from "@qeetrix/react";
import { controlHeights } from "../sizes";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const toggle: ComponentDoc = {
  name: "Toggle",
  slug: "toggle",
  category: "actions",
  status: "stable",
  since: "0.0.2",
  lede: "A tool that's pressed or not. With only an icon, its name shows as its tooltip.",
  exports: ["Toggle"],
  renders: "<button aria-pressed>",
  source: "toggle",
  story: "components/actions/toggle.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A tool that stays on until it's pressed again: bold, mute, a filter.",
      "Marking something: favourite, pin, follow.",
      "Showing or hiding part of a view.",
    ],
    notFor: [
      { text: "An action that happens once", use: "Button" },
      { text: "A setting that's saved", use: "Switch" },
      { text: "One view among a few", use: "Toggle group" },
      { text: "A choice in a form", use: "Checkbox" },
    ],
    anatomyFigure: (
      <Toggle size="lg" icon={StarIcon} filledWhenPressed defaultPressed>
        Favourite
      </Toggle>
    ),
    anatomy: [
      { slot: "toggle", element: "<button>", note: "The root: aria-pressed says whether it's on." },
      {
        slot: "toggle-icon-filled",
        element: "<svg>",
        note: "Leads the label. Filled while pressed, with filledWhenPressed.",
      },
    ],
    rules: [
      {
        title: "Pressed is a state, not an action",
        doLine: "It stays on: the text stays bold.",
        dontLine: "A toggle that saves, then springs back.",
        doIt: (
          <Inline gap="xs">
            <Toggle icon={BoldIcon} aria-label="Bold" defaultPressed tooltip={false} />
            <Toggle icon={ItalicIcon} aria-label="Italic" tooltip={false} />
          </Inline>
        ),
        dontIt: <Toggle>Save</Toggle>,
      },
      {
        title: "A saved setting is a switch",
        doLine: "A setting that's kept: a Switch with its label.",
        dontLine: "A toggle for a preference that's stored.",
        doIt: <Switch label="Email me a weekly summary" defaultChecked />,
        dontIt: <Toggle defaultPressed>Email me a weekly summary</Toggle>,
      },
      {
        title: "The label stays the same",
        doLine: "Its name doesn't change; aria-pressed says it's on.",
        dontLine: "A label that flips: is it the state, or the action?",
        doIt: (
          <Toggle icon={StarIcon} filledWhenPressed defaultPressed>
            Favourite
          </Toggle>
        ),
        dontIt: <Toggle defaultPressed>Unfavourite</Toggle>,
      },
      {
        title: "Not for doing",
        doLine: "An action is a Button.",
        dontLine: "A toggle that runs something.",
        doIt: <Button variant="soft">Export</Button>,
        dontIt: <Toggle>Export</Toggle>,
      },
    ],
    sizes: {
      specimen: (
        <Inline gap="md" align="center">
          <Toggle size="sm" icon={StarIcon} filledWhenPressed defaultPressed>
            Small
          </Toggle>
          <Toggle size="md" icon={StarIcon} filledWhenPressed defaultPressed>
            Medium
          </Toggle>
          <Toggle size="lg" icon={StarIcon} filledWhenPressed defaultPressed>
            Large
          </Toggle>
        </Inline>
      ),
      columns: ["Size", "Height: compact / default / comfortable", "Icon"],
      rows: [
        ["sm", controlHeights("sm"), "16px"],
        ["md", controlHeights("md"), "16px"],
        ["lg", controlHeights("lg"), "20px"],
      ],
    },
    content: [
      'Name the thing it turns on: "Bold", "Favourite".',
      "Keep the label the same whether it's on or off.",
      "An icon alone: its aria-label names it and shows as its tooltip.",
    ],
  },

  api: {
    props: [
      { name: "pressed", type: "boolean", default: "—", note: "Pressed, controlled." },
      {
        name: "defaultPressed",
        type: "boolean",
        default: "false",
        note: "Pressed to start with, uncontrolled.",
      },
      {
        name: "onPressedChange",
        type: "(pressed, details) => void",
        default: "—",
        note: "Called with the new state.",
      },
      {
        name: "icon",
        type: "QeetrixIcon",
        default: "—",
        note: "An icon from @qeetrix/icons, drawn sharp, before the label.",
      },
      {
        name: "filledWhenPressed",
        type: "boolean",
        default: "false",
        note: "The icon's filled drawing while pressed; for icons that have one.",
      },
      {
        name: "aria-label",
        type: "string",
        default: "—",
        note: "Required with an icon alone: its name and its tooltip.",
      },
      {
        name: "tooltip",
        type: "ReactNode | false",
        default: "aria-label",
        note: "An icon-only toggle's tooltip: other text, or false.",
      },
      {
        name: "tooltipSide",
        type: '"top" | "bottom" | "left" | "right" | "inline-start" | "inline-end"',
        default: '"top"',
        note: "The side it opens on; it flips when there's no room.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        note: "Height from the density tokens; a group's size wins.",
      },
      { name: "value", type: "string", default: "—", note: "Its value inside a Toggle group." },
      { name: "disabled", type: "boolean", default: "false", note: "It can't be pressed." },
      { name: "children", type: "ReactNode", default: "—", note: "The label." },
    ],
    parts: [
      {
        slot: "toggle",
        element: "<button>",
        note: "The root. data-pressed while on; data-size; data-icon-only.",
      },
      { slot: "toggle-icon", element: "<svg>", note: "The icon, outline." },
      {
        slot: "toggle-icon-filled",
        element: "<svg>",
        note: "The icon, filled: shown while pressed, with filledWhenPressed.",
      },
    ],
    recipes: [
      {
        title: "Controlled",
        line: "pressed and onPressedChange, for a toggle the page reads from.",
        file: "pin.tsx",
        code: `const [pinned, setPinned] = useState(false);

<Toggle icon={PinIcon} filledWhenPressed pressed={pinned} onPressedChange={setPinned}>
  Pin to top
</Toggle>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Space"], action: "Presses it, or releases it." },
      { keys: ["Enter"], action: "Presses it, or releases it." },
      { keys: ["Tab"], action: "Moves focus to it; an icon-only toggle's tooltip opens." },
    ],
    checks: [
      {
        check: "Role and state",
        result: "A native <button> with aria-pressed: read as a toggle button, on or off.",
      },
      {
        check: "Name",
        result:
          "Its label, or aria-label for an icon alone; that toggle warns in development without one.",
      },
      {
        check: "Pressed",
        result: "A fill, not colour alone; forced colours draw it in Highlight.",
      },
      { check: "Focus", result: "A 2px Ember ring on :focus-visible, inside a 1px surface gap." },
    ],
    tested: [
      "axe, WCAG 2.2 A and AA, in Chromium on every pull request",
      "Firefox and WebKit every night",
      "Forced colours, reduced motion and right to left",
      "Server rendering",
    ],
  },

  changelog: [
    { version: "0.1.0", items: ["tooltip and tooltipSide, for an icon-only toggle's tooltip."] },
    {
      version: "0.0.2",
      items: [
        "Toggle, on Base UI's Toggle: pressed state with onPressedChange; filledWhenPressed.",
        "Forced colours: a pressed toggle draws in Highlight.",
      ],
    },
  ],

  related: [
    { name: "Toggle group", when: "One or several of a few" },
    { name: "Switch", when: "A setting on or off" },
    { name: "Button", when: "An action" },
    { name: "Icon button", when: "An action as an icon" },
  ],
};
