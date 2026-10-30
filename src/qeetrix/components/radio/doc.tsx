// Components › Radio: its documentation, from @qeetrix/react 0.2.0 (radio.d.ts, field/choice.js)
// and the changelog. Its examples run live (Live.tsx); the do-and-don'ts render to HTML.
import { Field, Radio, RadioGroup, Select } from "@qeetrix/react";
import { FORM_TESTED } from "../forms";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const radio: ComponentDoc = {
  name: "Radio",
  slug: "radio",
  category: "forms",
  status: "stable",
  since: "0.0.2",
  lede: "One answer from a few, all in view and always answered. The group is one Tab stop.",
  exports: ["RadioGroup", "Radio"],
  renders: '<div role="radiogroup">',
  source: "radio",
  story: "components/data-entry/radio-group.stories.tsx",
  examples,

  usage: {
    useFor: [
      "One answer from two to about five, worth seeing side by side.",
      "A choice that's part of a form, saved with it.",
      "Choices that need explaining, as tiles.",
    ],
    notFor: [
      { text: "More than about five", use: "Select" },
      { text: "Several answers", use: "Checkbox" },
      { text: "A view that changes at once", use: "Toggle group" },
    ],
    anatomyFigure: (
      <RadioGroup label="Billing cycle" defaultValue="yearly">
        <Radio value="monthly" label="Monthly" />
        <Radio value="yearly" label="Yearly" description="Two months free" />
      </RadioGroup>
    ),
    anatomy: [
      {
        slot: "radio",
        element: "<div>",
        note: "A row: its <label> makes all of it the target.",
      },
      {
        slot: "radio-indicator",
        element: '<span role="radio">',
        note: "The circle; chosen, a 5px Ember ring.",
      },
    ],
    rules: [
      {
        title: "Always answered",
        doLine: "One is chosen to start: the likeliest, or the safest.",
        dontLine: "None chosen: a radio can't be cleared once it's set.",
        doIt: (
          <RadioGroup label="Session length" defaultValue="8h">
            <Radio value="1h" label="1 hour" />
            <Radio value="8h" label="8 hours" />
          </RadioGroup>
        ),
        dontIt: (
          <RadioGroup label="Session length">
            <Radio value="1h" label="1 hour" />
            <Radio value="8h" label="8 hours" />
          </RadioGroup>
        ),
      },
      {
        title: "A long list is a Select",
        doLine: "Ten regions: one field, its list on demand.",
        dontLine: "Ten radios down the page.",
        doIt: (
          <div className="qc-narrow">
            <Field label="Data region">
              <Select
                items={[
                  { value: "mum", label: "Mumbai" },
                  { value: "hyd", label: "Hyderabad" },
                ]}
                defaultValue="mum"
              />
            </Field>
          </div>
        ),
        dontIt: (
          <RadioGroup label="Data region" defaultValue="mum" orientation="horizontal">
            {["Mumbai", "Hyderabad", "Chennai", "Delhi", "Pune", "Kolkata"].map((city) => (
              <Radio key={city} value={city.toLowerCase().slice(0, 3)} label={city} />
            ))}
          </RadioGroup>
        ),
      },
    ],
    content: [
      'The group\'s label asks the question: "Billing cycle".',
      'Options are short and parallel: "1 hour", "8 hours".',
      "A description says what an option costs or means.",
    ],
  },

  api: {
    props: [
      {
        name: "label",
        type: "ReactNode",
        default: "required",
        note: "The group's question, as its legend.",
      },
      {
        name: "value · defaultValue · onValueChange",
        type: "Value",
        default: "—",
        note: 'The chosen value; generic: RadioGroup<"monthly" | "yearly">.',
      },
      {
        name: "orientation",
        type: '"vertical" | "horizontal"',
        default: '"vertical"',
        note: "horizontal for short options.",
      },
      {
        name: "variant",
        type: '"default" | "tile"',
        default: '"default"',
        note: "Rows, or tiles with an icon, a title and a line.",
      },
      {
        name: "columns",
        type: "1 | 2 | 3 | 4",
        default: "1",
        note: "For tiles: the most columns, fewer where there isn't room.",
      },
      {
        name: "description · error",
        type: "ReactNode",
        default: "—",
        note: "Under the group; the error marks it invalid.",
      },
      {
        name: "name · disabled · required",
        type: "…",
        default: "—",
        note: "As on a form control.",
      },
      {
        name: "Radio: value · label · description · icon · disabled",
        type: "…",
        default: "—",
        note: "One option; value is required.",
      },
    ],
    parts: [
      { slot: "radio", element: "<div>", note: "A row." },
      {
        slot: "radio-indicator",
        element: '<span role="radio">',
        note: "The circle: ref and Base UI props land here.",
      },
    ],
    recipes: [
      {
        title: "Typed values",
        line: 'The value\'s type follows the group\'s: onValueChange gets "monthly" | "yearly".',
        file: "cycle.tsx",
        code: `<RadioGroup<"monthly" | "yearly"> label="Billing cycle" value={cycle} onValueChange={setCycle}>
  <Radio value="monthly" label="Monthly" />
  <Radio value="yearly" label="Yearly" />
</RadioGroup>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "Moves into the group, to the chosen option; Tab again leaves it." },
      {
        keys: ["↑", "↓", "←", "→"],
        action: "Moves to the next option and chooses it; mirrored in right to left.",
      },
    ],
    checks: [
      {
        check: "Role and name",
        result: 'role="radiogroup" named by its label; each option role="radio" with aria-checked.',
      },
      { check: "One Tab stop", result: "The group is one stop; the arrow keys move inside it." },
      { check: "Error", result: "Linked to the group, and listed by a Form's error summary." },
      {
        check: "Right to left",
        result: "The arrow keys follow the reading direction; tested in RTL.",
      },
    ],
    tested: FORM_TESTED,
  },

  changelog: [
    {
      version: "0.4.0",
      items: [
        "An invalid radio keeps its danger edge under the pointer and when chosen: a chosen invalid radio's ring is the danger colour.",
      ],
    },
    {
      version: "0.3.0",
      items: [
        "icon takes an element as well as a component (icon={<PlusIcon />}), so a Server Component can pass one: its type is IconSource.",
      ],
    },
    {
      version: "0.1.0",
      items: ["A Form's error summary lists a RadioGroup's error and links to it."],
    },
    {
      version: "0.0.8",
      items: ['variant="tile": each option a tile with an icon, a title and a line.'],
    },
    {
      version: "0.0.2",
      items: [
        "Radio and RadioGroup: the 5px Ember ring; arrow keys move and choose; generic over the value.",
        "With no visible label, aria-label is required by its type.",
      ],
    },
  ],

  related: [
    { name: "Select", when: "A longer list" },
    { name: "Checkbox", when: "Several answers" },
    { name: "Toggle group", when: "A view, at once" },
  ],
};
