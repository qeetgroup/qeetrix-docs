// Components › Slider: its documentation, from @qeetrix/react 0.2.0 (slider.d.ts, slider.js) and the
// changelog. Its examples run live (Live.tsx); the do-and-don'ts render to HTML.
import { Field, Slider } from "@qeetrix/react";
import { NumberField } from "@qeetrix/react/experimental";
import { FORM_TESTED } from "../forms";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const slider: ComponentDoc = {
  name: "Slider",
  slug: "slider",
  category: "forms",
  status: "stable",
  since: "0.0.2",
  lede: "A number, or a range, on a scale: where it lies matters more than its exact digits.",
  exports: ["Slider"],
  renders: '<input type="range">',
  source: "slider",
  story: "components/data-entry/slider.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A value where the position matters: a length, a share, a limit.",
      "A range: a band of seats, of prices.",
      "Quick changes you can see the effect of.",
    ],
    notFor: [
      { text: "An exact number", use: "Number field" },
      { text: "Progress, or a measured value", use: "Meter" },
    ],
    anatomyFigure: (
      <div className="qc-anat-field">
        <Slider label="Session length" showValue min={1} max={24} defaultValue={8} />
      </div>
    ),
    anatomy: [
      {
        slot: "slider-label",
        element: "<div>",
        note: "Names it; with showValue, the value sits at the header's end.",
      },
      { slot: "slider-value", element: "<output>", note: "The value, formatted for the locale." },
      { slot: "slider-indicator", element: "<div>", note: "The Ember range on the 4px track." },
      {
        slot: "slider-thumb",
        element: "<div>",
        note: "The 16px square thumb, ringed in the surface colour.",
      },
    ],
    rules: [
      {
        title: "Show the value",
        doLine: "showValue: the number as it moves.",
        dontLine: "A thumb with no number: where is it?",
        doIt: (
          <div className="qc-narrow">
            <Slider label="Session length" showValue min={1} max={24} defaultValue={8} />
          </div>
        ),
        dontIt: (
          <div className="qc-narrow">
            <Slider label="Session length" min={1} max={24} defaultValue={8} />
          </div>
        ),
      },
      {
        title: "Exact numbers are typed",
        doLine: "A credit limit to the rupee: a Number field.",
        dontLine: "A slider for an exact amount.",
        doIt: (
          <div className="qc-narrow">
            <Field label="Credit limit">
              <NumberField startAdornment="₹" defaultValue={124500} />
            </Field>
          </div>
        ),
        dontIt: (
          <div className="qc-narrow">
            <Slider label="Credit limit" showValue min={0} max={1000000} defaultValue={124500} />
          </div>
        ),
      },
    ],
    content: [
      'Format the value: "8 hours", "₹2,50,000", "12%".',
      "A description says what the range means.",
      "Steps people can tell apart: 10 seats, not 1.",
    ],
  },

  api: {
    props: [
      {
        name: "label",
        type: "ReactNode",
        default: "—",
        note: "The label; without one, aria-label.",
      },
      {
        name: "value · defaultValue",
        type: "number | number[]",
        default: "—",
        note: "A value, or an array for a range: one thumb each.",
      },
      {
        name: "onValueChange · onValueCommitted",
        type: "(value, details) => void",
        default: "—",
        note: "As it moves; once it's let go.",
      },
      {
        name: "min · max · step · largeStep",
        type: "number",
        default: "0 · 100 · 1 · 10",
        note: "The scale; Page Up and Down take largeStep.",
      },
      {
        name: "showValue",
        type: "boolean",
        default: "false",
        note: "The formatted value at the header's end.",
      },
      {
        name: "format",
        type: "Intl.NumberFormatOptions",
        default: "—",
        note: "Currency, per cent, a unit; in the provider's locale.",
      },
      {
        name: "description · error",
        type: "ReactNode",
        default: "—",
        note: "On its own it's a field; inside a Field, the Field's.",
      },
      { name: "disabled · name", type: "…", default: "—", note: "As on a form control." },
    ],
    parts: [
      { slot: "slider", element: "<div>", note: "The root." },
      { slot: "slider-header", element: "<div>", note: "slider-label and slider-value." },
      { slot: "slider-control", element: "<div>", note: "The area that takes the pointer." },
      { slot: "slider-track", element: "<div>", note: "The 4px track." },
      { slot: "slider-indicator", element: "<div>", note: "The range." },
      {
        slot: "slider-thumb",
        element: "<div>",
        note: "A thumb; it holds the input with the slider role.",
      },
    ],
    recipes: [
      {
        title: "Save once it's let go",
        line: "onValueCommitted fires when the drag ends: one save, not a hundred.",
        file: "session.tsx",
        code: `<Slider label="Session length" showValue min={1} max={24} defaultValue={policy.hours} onValueCommitted={(hours) => savePolicy({ hours })} />`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["←", "→"], action: "Steps down or up; mirrored in right to left." },
      { keys: ["↑", "↓"], action: "Steps up or down." },
      { keys: ["PageUp", "PageDown"], action: "Takes largeStep." },
      { keys: ["Home", "End"], action: "Jumps to min or max." },
    ],
    checks: [
      {
        check: "Role and name",
        result:
          'Each thumb is a slider, named by the label; a range\'s are "Seats, minimum" and "Seats, maximum".',
      },
      { check: "Value", result: 'aria-valuetext is the formatted value: "8 hours", not 8.' },
      { check: "Error", result: "Linked to it, and listed by a Form's error summary." },
      { check: "Forced colours", result: "The range draws in Highlight." },
    ],
    tested: FORM_TESTED,
  },

  changelog: [
    {
      version: "0.1.0",
      items: [
        "description and error, like the choice groups.",
        'A range\'s thumbs are named after the label ("Seats, minimum").',
      ],
    },
    {
      version: "0.0.2",
      items: [
        "Slider: a 4px track, the Ember range, a 16px square thumb; label and showValue with Intl formatting; a thumb per value for a range.",
        "A slider named by aria-label passes the name on to its thumbs.",
      ],
    },
  ],

  related: [
    { name: "Number field", when: "An exact number" },
    { name: "Meter", when: "A measured value" },
    { name: "Progress", when: "Work under way" },
  ],
};
