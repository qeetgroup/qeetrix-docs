// Components › Checkbox: its documentation, from @qeetrix/react 0.2.0 (checkbox.d.ts, checkbox.js,
// field/choice.js) and the changelog. Its examples run live (Live.tsx); the do-and-don'ts render to
// HTML.
import { Checkbox, CheckboxGroup, Stack } from "@qeetrix/react";
import { FORM_TESTED } from "../forms";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const checkbox: ComponentDoc = {
  name: "Checkbox",
  slug: "checkbox",
  category: "forms",
  status: "stable",
  since: "0.0.2",
  lede: "Yes or no, or several of a list. It waits for the form's Save; the whole row is the target.",
  exports: ["Checkbox", "CheckboxGroup"],
  renders: '<span role="checkbox">',
  source: "checkbox",
  story: "components/data-entry/checkbox.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Agreeing, or a yes-or-no saved with the form.",
      "Several answers to one question.",
      "Selecting all, with a parent checkbox.",
    ],
    notFor: [
      { text: "A setting that applies at once", use: "Switch" },
      { text: "One answer from a few", use: "Radio" },
      { text: "A tool that's on or off", use: "Toggle" },
    ],
    anatomyFigure: (
      <Checkbox
        label="Email me a weekly summary"
        description="Every Monday at 9 am."
        defaultChecked
      />
    ),
    anatomy: [
      {
        slot: "checkbox",
        element: "<div>",
        note: "The row: its <label> makes all of it the target, at least 24px tall.",
      },
      { slot: "checkbox-indicator", element: '<span role="checkbox">', note: "The 16px box." },
      { slot: "checkbox-mark", element: "<span>", note: "A sharp tick, or a dash while mixed." },
    ],
    rules: [
      {
        title: "Checked means yes",
        doLine: "The label says what checking it does.",
        dontLine: "A negative: checked means no.",
        doIt: <Checkbox label="Email me a weekly summary" defaultChecked />,
        dontIt: <Checkbox label="Don't email me a summary" />,
      },
      {
        title: "A group asks its question",
        doLine: "The group's label is the question; the boxes, its answers.",
        dontLine: "Loose boxes: answers to what?",
        doIt: (
          <CheckboxGroup label="Tell me about" defaultValue={["sign-ins"]}>
            <Checkbox value="sign-ins" label="New sign-ins" />
            <Checkbox value="billing" label="Billing changes" />
          </CheckboxGroup>
        ),
        dontIt: (
          <Stack gap="sm">
            <Checkbox label="New sign-ins" defaultChecked />
            <Checkbox label="Billing changes" />
          </Stack>
        ),
      },
    ],
    content: [
      "Labels say what checked means, in the positive.",
      'A group\'s label is a question or a heading: "Tell me about".',
      "Say why an option is disabled, in its description.",
    ],
  },

  api: {
    props: [
      {
        name: "label",
        type: "ReactNode",
        default: "—",
        note: "The row's label; without one, aria-label is required by its type.",
      },
      { name: "description", type: "ReactNode", default: "—", note: "A line under the label." },
      {
        name: "icon",
        type: "IconSource",
        default: "—",
        note: "An icon before the label; on a tile, in its box.",
      },
      {
        name: "checked · defaultChecked · onCheckedChange",
        type: "boolean",
        default: "—",
        note: "Controlled, or to start with.",
      },
      { name: "indeterminate", type: "boolean", default: "false", note: "Mixed: a dash." },
      {
        name: "parent",
        type: "boolean",
        default: "false",
        note: "In a group with allValues: checks them all; a dash while some are.",
      },
      {
        name: "value · name · disabled · required",
        type: "…",
        default: "—",
        note: "Its value in a group; as on a form control.",
      },
    ],
    parts: [
      { slot: "checkbox", element: "<div>", note: "The row." },
      {
        slot: "checkbox-indicator",
        element: '<span role="checkbox">',
        note: "The box: ref and Base UI props land here.",
      },
      { slot: "checkbox-mark", element: "<span>", note: "The tick or the dash." },
    ],
    recipes: [
      {
        title: "CheckboxGroup",
        line: 'label is its legend; value is the array of checked values; variant="tile" and columns for tiles.',
        file: "events.tsx",
        code: `<CheckboxGroup label="Tell me about" name="events" value={events} onValueChange={setEvents} error={errors.events}>
  <Checkbox value="sign-ins" label="New sign-ins" />
  <Checkbox value="invites" label="Accepted invites" />
</CheckboxGroup>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Space"], action: "Checks it, or clears it." },
      { keys: ["Tab"], action: "Moves to each checkbox in turn." },
    ],
    checks: [
      {
        check: "Role and name",
        result: 'role="checkbox" with aria-checked, mixed while indeterminate; named by its label.',
      },
      {
        check: "Group",
        result: 'role="group", with the group\'s label as its legend; its error is linked to it.',
      },
      { check: "Target", result: "The whole row toggles it, at least 24px tall." },
      { check: "Forced colours", result: "A checked box draws in Highlight." },
    ],
    tested: FORM_TESTED,
  },

  changelog: [
    {
      version: "0.4.0",
      items: ["An invalid checkbox keeps its danger edge under the pointer and when checked."],
    },
    {
      version: "0.3.0",
      items: [
        "icon takes an element as well as a component (icon={<PlusIcon />}), so a Server Component can pass one: its type is IconSource.",
      ],
    },
    {
      version: "0.1.0",
      items: [
        "A parent checkbox draws a dash, not a tick, while it's mixed.",
        "A Form's error summary lists a CheckboxGroup's error.",
      ],
    },
    {
      version: "0.0.8",
      items: ['variant="tile": each option a tile with an icon, a title and a line.'],
    },
    {
      version: "0.0.2",
      items: [
        "Checkbox and CheckboxGroup: the 16px box with a sharp tick, the mixed dash, a parent that selects the group; the row at least 24px tall.",
        "With no visible label, aria-label is required by its type.",
      ],
    },
  ],

  related: [
    { name: "Switch", when: "A setting, at once" },
    { name: "Radio", when: "One of a few" },
    { name: "Form", when: "Validation and summary" },
  ],
};
