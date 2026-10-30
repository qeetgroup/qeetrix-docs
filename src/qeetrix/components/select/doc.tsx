// Components › Select: its documentation, from @qeetrix/react 0.2.0 (select.d.ts, select.js) and the
// changelog. Its examples run live (Live.tsx); the do-and-don'ts render to HTML.
import { Field, Radio, RadioGroup, Select } from "@qeetrix/react";
import { FORM_TESTED } from "../forms";
import type { ComponentDoc } from "../types";
import { CYCLES, examples } from "./examples";

export const select: ComponentDoc = {
  name: "Select",
  slug: "select",
  category: "forms",
  status: "stable",
  since: "0.0.2",
  lede: "One option, or several, from up to about fifteen: a field that opens its list below.",
  exports: ["Select", "Field"],
  renders: "<button> + list",
  source: "select",
  story: "components/data-entry/select.stories.tsx",
  examples,

  usage: {
    useFor: [
      "One choice from a list too long to show: five to fifteen options.",
      "Several from a short list, with multiple.",
      "A choice that's part of a form, saved with it.",
    ],
    notFor: [
      { text: "Two to four options, all worth seeing", use: "Radio" },
      { text: "Many options, found by typing", use: "Combobox" },
      { text: "Actions from a button", use: "Menu" },
      { text: "A view that changes at once", use: "Toggle group" },
    ],
    anatomyFigure: (
      <div className="qc-anat-field">
        <Field label="Billing cycle">
          <Select items={CYCLES} defaultValue="yearly" />
        </Field>
      </div>
    ),
    anatomy: [
      { slot: "field-label", element: "<label>", note: "Names the trigger, from its Field." },
      {
        slot: "select-trigger",
        element: "<button>",
        note: "The field-style box with its chevron; it opens the list.",
      },
      { slot: "select-value", element: "<span>", note: "The chosen label, or the placeholder." },
    ],
    rules: [
      {
        title: "Two choices are radios",
        doLine: "Both in view: one press to choose.",
        dontLine: "Two options behind a click.",
        doIt: (
          <RadioGroup label="Billing cycle" defaultValue="yearly" orientation="horizontal">
            <Radio value="monthly" label="Monthly" />
            <Radio value="yearly" label="Yearly" />
          </RadioGroup>
        ),
        dontIt: (
          <div className="qc-narrow">
            <Field label="Billing cycle">
              <Select
                items={[
                  { value: "monthly", label: "Monthly" },
                  { value: "yearly", label: "Yearly" },
                ]}
                defaultValue="yearly"
              />
            </Field>
          </div>
        ),
      },
      {
        title: "The placeholder is an example",
        doLine: '"e.g. Monthly": what an answer looks like.',
        dontLine: "An instruction, where the label already asks.",
        doIt: (
          <div className="qc-narrow">
            <Field label="Billing cycle">
              <Select items={CYCLES} placeholder="e.g. Monthly" />
            </Field>
          </div>
        ),
        dontIt: (
          <div className="qc-narrow">
            <Field label="Billing cycle">
              <Select items={CYCLES} placeholder="Please select an option" />
            </Field>
          </div>
        ),
      },
    ],
    content: [
      'Options in sentence case, short: "Billing admin".',
      "Order them as people think of them: by time, by size, else alphabetically.",
      "A disabled option stays in the list when its absence would puzzle.",
    ],
  },

  api: {
    props: [
      {
        name: "items",
        type: "SelectItem[] | SelectItemGroup[]",
        default: "required",
        note: "The options, flat ({ value, label, disabled, meta }) or in groups ({ label, items }); meta, a count at the end, isn't shown once chosen.",
      },
      {
        name: "value · defaultValue",
        type: "Value | Value[]",
        default: "—",
        note: "The chosen value, controlled or to start with; an array with multiple.",
      },
      {
        name: "onValueChange",
        type: "(value, details) => void",
        default: "—",
        note: "Called with the new value.",
      },
      {
        name: "multiple",
        type: "boolean",
        default: "false",
        note: "Several at once; the trigger lists their labels.",
      },
      {
        name: "placeholder",
        type: "ReactNode",
        default: "—",
        note: "Shown while nothing's chosen: an example, never an instruction.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"lg"',
        note: "lg, a form field's; md or sm beside Buttons of that size in a toolbar.",
      },
      {
        name: "disabled · required · name",
        type: "…",
        default: "—",
        note: "As on a form control; name submits the value.",
      },
      {
        name: "aria-label",
        type: "string",
        default: "—",
        note: "Without a Field: the trigger's name.",
      },
    ],
    parts: [
      {
        slot: "select-trigger",
        element: "<button>",
        note: "The box: ref lands here, and a Field labels it.",
      },
      { slot: "select-value", element: "<span>", note: "The chosen label, or the placeholder." },
      { slot: "select-popup", element: "<div>", note: "The list, below the trigger, as a menu's." },
      {
        slot: "select-option",
        element: '<div role="option">',
        note: "An option; the chosen one has an Ember check.",
      },
      { slot: "select-group-label", element: "<div>", note: "A group's label." },
    ],
    recipes: [
      {
        title: "Typed values",
        line: "Generic over the value: the type follows the items.",
        file: "cycle.tsx",
        code: `type Cycle = "monthly" | "quarterly" | "yearly";
const cycles: SelectItem<Cycle>[] = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
];

<Select<Cycle> items={cycles} onValueChange={(cycle) => setCycle(cycle)} />`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Enter", "Space"], action: "Opens the list; chooses the highlighted option." },
      {
        keys: ["↑", "↓"],
        action: "Opens the list, and moves through it, skipping disabled options.",
      },
      { keys: ["A–Z"], action: "Jumps to the option that starts with the letter." },
      { keys: ["Esc"], action: "Closes the list; focus stays on the trigger." },
    ],
    checks: [
      { check: "Name", result: "Its Field's label names the trigger; without one, aria-label." },
      {
        check: "Role",
        result: "The trigger opens a listbox; each option is an option, the chosen one selected.",
      },
      { check: "Forced colours", result: "The highlighted option draws in Highlight." },
    ],
    tested: FORM_TESTED,
  },

  changelog: [
    {
      version: "0.4.0",
      items: [
        "Read-only, its line is border.strong, the editable field's, so it keeps 3:1; the missing fill still tells it apart.",
        "Long options wrap instead of ending in an ellipsis; the check and the icon stay on the first line.",
      ],
    },
    {
      version: "0.2.0",
      items: [
        "An item's meta: a short fact at the option's end, read with it.",
        "size: md and sm, for toolbars.",
      ],
    },
    {
      version: "0.0.5",
      items: ["Combobox shares its field and its list: one height and edge for every field."],
    },
    {
      version: "0.0.2",
      items: [
        "Select: a field-style trigger with a chevron, a menu-style list below; the chosen option carries an Ember check.",
        "Flat or grouped items, multiple, generic over the value; a Field labels it.",
      ],
    },
  ],

  related: [
    { name: "Combobox", when: "Many options, by typing" },
    { name: "Radio", when: "A few, all in view" },
    { name: "Checkbox", when: "Several of a few" },
    { name: "Menu", when: "Actions, not answers" },
  ],
};
