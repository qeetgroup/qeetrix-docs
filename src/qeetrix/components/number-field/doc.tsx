// Components › Number field: its documentation, from @qeetrix/react 0.2.0 (experimental/number-field)
// and the changelog. Its examples run live (Live.tsx); the do-and-don'ts render to HTML.
import { Field } from "@qeetrix/react";
import { NumberField } from "@qeetrix/react/experimental";
import { FORM_TESTED } from "../forms";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const numberField: ComponentDoc = {
  name: "Number field",
  slug: "number-field",
  category: "forms",
  status: "experimental",
  since: "0.0.6",
  lede: "A number, typed or stepped, formatted for the locale: 1,28,400 in en-IN.",
  exports: ["NumberField"],
  renders: "<input>",
  source: "experimental/number-field",
  story: "components/data-entry/number-field.stories.tsx",
  examples,

  usage: {
    useFor: [
      "An exact number: seats, minutes, an amount.",
      "A count people step through: 25 seats, then 30.",
      "Money and per cent, formatted as people read them.",
    ],
    notFor: [
      { text: "A position on a scale", use: "Slider" },
      { text: "Digits that aren't a quantity: a PIN, a phone number", use: "Text field" },
    ],
    anatomyFigure: (
      <div className="qc-anat-field">
        <Field label="Session length">
          <NumberField endAdornment="minutes" defaultValue={30} step={5} />
        </Field>
      </div>
    ),
    anatomy: [
      {
        slot: "number-field-input",
        element: "<input>",
        note: "The number, formatted for the locale as it's left.",
      },
      { slot: "number-field-end", element: "<span>", note: "The unit after it." },
      {
        slot: "number-field-decrement",
        element: "<button>",
        note: "−: one step down; stops at min.",
      },
      {
        slot: "number-field-increment",
        element: "<button>",
        note: "+: one step up; stops at max.",
      },
    ],
    rules: [
      {
        title: "Quantities, not codes",
        doLine: "A count or an amount: steps make sense.",
        dontLine: "A phone number with + and −.",
        doIt: (
          <div className="qc-narrow">
            <Field label="Seats">
              <NumberField defaultValue={25} />
            </Field>
          </div>
        ),
        dontIt: (
          <div className="qc-narrow">
            <Field label="Phone">
              <NumberField defaultValue={9876543210} />
            </Field>
          </div>
        ),
      },
      {
        title: "No steppers on an amount",
        doLine: "An amount you type: steppers={false}.",
        dontLine: "Steppers on an amount nobody steps through.",
        doIt: (
          <div className="qc-narrow">
            <Field label="Credit limit">
              <NumberField startAdornment="₹" steppers={false} defaultValue={124500} />
            </Field>
          </div>
        ),
        dontIt: (
          <div className="qc-narrow">
            <Field label="Credit limit">
              <NumberField startAdornment="₹" defaultValue={124500} />
            </Field>
          </div>
        ),
      },
    ],
    content: [
      'The unit as an affix: "minutes", ₹, never in the label as well.',
      'Say the limits in the description: "Up to 500 on your plan."',
      "Let the locale group the digits: 1,28,400.",
    ],
  },

  api: {
    props: [
      {
        name: "value · defaultValue · onValueChange",
        type: "number | null",
        default: "—",
        note: "The number, controlled or to start with.",
      },
      {
        name: "min · max",
        type: "number",
        default: "—",
        note: "The steppers and the keys stop here.",
      },
      {
        name: "step · largeStep",
        type: "number",
        default: "1 · 10",
        note: "A step; Shift or Page Up and Down take largeStep.",
      },
      {
        name: "format",
        type: "Intl.NumberFormatOptions",
        default: "—",
        note: "Currency, per cent; in the provider's locale.",
      },
      {
        name: "startAdornment · endAdornment",
        type: "ReactNode",
        default: "—",
        note: "A unit before or after: ₹, minutes.",
      },
      {
        name: "steppers",
        type: "boolean",
        default: "true",
        note: "The − and + buttons; off for amounts nobody steps.",
      },
      { name: "placeholder", type: "string", default: "—", note: 'An example: "e.g. 30".' },
      {
        name: "disabled · readOnly · required · name",
        type: "…",
        default: "—",
        note: "As on a form control.",
      },
    ],
    parts: [
      {
        slot: "number-field",
        element: "<div>",
        note: "The field's box: Input's height and edges.",
      },
      { slot: "number-field-start", element: "<span>", note: "Before the number." },
      { slot: "number-field-input", element: "<input>", note: "The number; a Field labels it." },
      { slot: "number-field-end", element: "<span>", note: "After it." },
      { slot: "number-field-decrement", element: "<button>", note: "−" },
      { slot: "number-field-increment", element: "<button>", note: "+" },
    ],
    recipes: [
      {
        title: "Money",
        line: "INR without paise; the locale groups it in lakhs.",
        file: "contract.tsx",
        code: `<Field label="Annual contract">
  <NumberField format={{ style: "currency", currency: "INR", maximumFractionDigits: 0 }} steppers={false} name="contract" />
</Field>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["↑", "↓"], action: "One step up or down." },
      { keys: ["Shift+↑"], action: "A large step; Page Up and Page Down too." },
      { keys: ["Home", "End"], action: "To min or max." },
    ],
    checks: [
      {
        check: "Name",
        result: "From its Field; the − and + buttons are named, in the provider's language.",
      },
      { check: "Role", result: "Its spoken role description is translated with its strings." },
      { check: "Format", result: "The value reads as formatted for the locale." },
    ],
    tested: FORM_TESTED,
  },

  changelog: [
    {
      version: "0.4.0",
      items: [
        "Read-only, its line is border.strong, the editable field's, so it keeps 3:1; the missing fill still tells it apart.",
      ],
    },
    {
      version: "0.0.5",
      items: [
        "NumberField: typed or stepped, on Base UI's Number Field: Input's field with units as affixes and − and + steppers (they can be turned off). It formats for the locale and takes format; strings, its spoken role too, in English and Hindi.",
      ],
    },
  ],

  related: [
    { name: "Slider", when: "A position on a scale" },
    { name: "Text field", when: "Digits that aren't a number" },
    { name: "Input", when: "The same field" },
  ],
};
