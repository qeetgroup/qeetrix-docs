// Components › Switch: its documentation, from @qeetrix/react 0.2.0 (switch.d.ts, field/choice.js)
// and the changelog. Its examples run live (Live.tsx); the do-and-don'ts render to HTML.
import { Button, Stack, Switch } from "@qeetrix/react";
import { FORM_TESTED } from "../forms";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const switchDoc: ComponentDoc = {
  name: "Switch",
  slug: "switch",
  category: "forms",
  status: "stable",
  since: "0.0.2",
  lede: "A setting, on or off, applied at once. A setting that waits for Save is a Checkbox.",
  exports: ["Switch"],
  renders: '<span role="switch">',
  source: "switch",
  story: "components/data-entry/switch.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A setting that takes effect the moment it's switched.",
      "Notification and feature settings, one to a row.",
    ],
    notFor: [
      { text: "A choice saved with a form", use: "Checkbox" },
      { text: "A tool that's pressed or not", use: "Toggle" },
      { text: "One of a few", use: "Radio" },
    ],
    anatomyFigure: (
      <Switch
        label="Email me a weekly summary"
        description="Every Monday at 9 am."
        defaultChecked
      />
    ),
    anatomy: [
      {
        slot: "switch",
        element: "<div>",
        note: "The row: its <label> makes all of it the target.",
      },
      {
        slot: "switch-track",
        element: '<span role="switch">',
        note: "The 32×18 track; Ember while on.",
      },
      {
        slot: "switch-thumb",
        element: "<span>",
        note: "The square thumb: at the end side while on, in either direction.",
      },
    ],
    rules: [
      {
        title: "At once, or it's a checkbox",
        doLine: "Switched, and saved: nothing else to press.",
        dontLine: "A switch that waits for Save: that's a Checkbox.",
        doIt: <Switch label="Email me a weekly summary" defaultChecked />,
        dontIt: (
          <Stack gap="md">
            <Switch label="Email me a weekly summary" defaultChecked />
            <Button>Save</Button>
          </Stack>
        ),
      },
      {
        title: "Name the setting",
        doLine: 'What\'s on: "Two-step sign-in".',
        dontLine: 'The state as its label: "On".',
        doIt: <Switch label="Two-step sign-in" defaultChecked />,
        dontIt: <Switch label="On" defaultChecked />,
      },
    ],
    content: [
      "Label the setting, never its state.",
      "A description says what it changes, or why it can't.",
      'Confirm a change that\'s saved: "Saved."',
    ],
  },

  api: {
    props: [
      {
        name: "label",
        type: "ReactNode",
        default: "—",
        note: "The setting; without one, aria-label is required by its type.",
      },
      { name: "description", type: "ReactNode", default: "—", note: "A line under the label." },
      {
        name: "checked · defaultChecked",
        type: "boolean",
        default: "—",
        note: "On, controlled or to start with.",
      },
      {
        name: "onCheckedChange",
        type: "(checked, details) => void",
        default: "—",
        note: "Called as it switches: save here.",
      },
      {
        name: "name · value · disabled · readOnly · required",
        type: "…",
        default: "—",
        note: "As on a form control.",
      },
    ],
    parts: [
      { slot: "switch", element: "<div>", note: "The row." },
      {
        slot: "switch-track",
        element: '<span role="switch">',
        note: "The track: ref and Base UI props land here.",
      },
      { slot: "switch-thumb", element: "<span>", note: "The thumb." },
    ],
    recipes: [
      {
        title: "Save as it switches",
        line: "Roll back if the save fails, and say so.",
        file: "mfa.tsx",
        code: `<Switch
  label="Two-step sign-in for everyone"
  checked={policy.mfa}
  onCheckedChange={async (next) => {
    setPolicy({ ...policy, mfa: next });
    try { await savePolicy({ mfa: next }); showSaved(); }
    catch { setPolicy(policy); showSaveFailed(); }
  }}
/>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Space"], action: "Switches it." },
      { keys: ["Enter"], action: "Switches it." },
      { keys: ["Tab"], action: "Moves to each switch in turn." },
    ],
    checks: [
      { check: "Role and name", result: 'role="switch" with aria-checked; named by its label.' },
      { check: "Target", result: "The whole row switches it." },
      {
        check: "Direction",
        result: "The thumb moves to the end side, in left to right and right to left.",
      },
      { check: "Forced colours", result: "On draws in Highlight." },
    ],
    tested: FORM_TESTED,
  },

  changelog: [
    {
      version: "0.4.0",
      items: [
        "An invalid switch keeps its danger edge under the pointer and when on.",
        "The thumb of a switch that's on is white in both schemes, icon.on-brand; it was near-black in dark.",
      ],
    },
    {
      version: "0.0.2",
      items: [
        "Switch: a 32×18 track with a square thumb that moves to the end side, in either text direction.",
        "With no visible label, aria-label is required by its type.",
      ],
    },
  ],

  related: [
    { name: "Checkbox", when: "Saved with a form" },
    { name: "Toggle", when: "A tool on or off" },
    { name: "Radio", when: "One of a few" },
  ],
};
