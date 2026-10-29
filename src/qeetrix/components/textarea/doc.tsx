// Components › Textarea: its documentation, from @qeetrix/react 0.2.0 (input.d.ts, where Textarea
// lives with Input) and the changelog. Its examples run live (Live.tsx).
import { Field, Input, Textarea } from "@qeetrix/react";
import { FORM_TESTED } from "../forms";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const textarea: ComponentDoc = {
  name: "Textarea",
  slug: "textarea",
  category: "forms",
  status: "stable",
  since: "0.0.2",
  lede: "Several lines, with the Input look. It grows with its content, and no script measures it.",
  exports: ["Textarea", "Field"],
  renders: "<textarea>",
  source: "input",
  story: "components/data-entry/textarea.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A note, a reason, an address: text that runs to lines.",
      "Anything where a line break is part of the answer.",
    ],
    notFor: [
      { text: "One line", use: "Text field" },
      { text: "Code to show", use: "Code block" },
    ],
    anatomyFigure: (
      <div className="qc-anat-field">
        <Field label="Note" description="Your team sees it.">
          <Textarea rows={2} defaultValue="Renewal due in November." />
        </Field>
      </div>
    ),
    anatomy: [
      { slot: "field-label", element: "<label>", note: "Names it, from the Field around it." },
      {
        slot: "textarea",
        element: "<textarea>",
        note: "The box: Input's surface and bottom line, between rows and maxRows tall.",
      },
      {
        slot: "field-description",
        element: "<p>",
        note: "A limit or a hint; the error takes its place.",
      },
    ],
    rules: [
      {
        title: "Sized for the answer",
        doLine: "rows for the usual length; it grows from there.",
        dontLine: "One row for a reason, or a page for a name.",
        doIt: (
          <div className="qc-narrow">
            <Field label="Reason for access">
              <Textarea rows={3} placeholder="e.g. Quarter-end audit of payroll" />
            </Field>
          </div>
        ),
        dontIt: (
          <div className="qc-narrow">
            <Field label="Reason for access">
              <Input placeholder="e.g. Quarter-end audit of payroll" />
            </Field>
          </div>
        ),
      },
    ],
    content: [
      'Say a limit before it\'s reached: "Up to 200 characters."',
      'Placeholders are examples, starting "e.g.".',
    ],
  },

  api: {
    props: [
      { name: "rows", type: "number", default: "3", note: "Its height before it grows, in lines." },
      {
        name: "maxRows",
        type: "number",
        default: "no limit",
        note: "The most it grows to; then it scrolls.",
      },
      {
        name: "value · defaultValue",
        type: "string",
        default: "—",
        note: "Controlled, or to start with.",
      },
      {
        name: "onValueChange",
        type: "(value, details) => void",
        default: "—",
        note: "Called with the new value.",
      },
      {
        name: "placeholder · maxLength · disabled · readOnly · required",
        type: "…",
        default: "—",
        note: "As on a <textarea>.",
      },
    ],
    parts: [{ slot: "textarea", element: "<textarea>", note: "The box itself; ref lands here." }],
    recipes: [
      {
        title: "Grow with care",
        line: "Where field-sizing isn't supported, it keeps rows and can be dragged taller.",
        file: "note.tsx",
        code: `<Field label="Note">
  <Textarea rows={3} maxRows={8} name="note" />
</Field>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "Moves focus to it." },
      { keys: ["Enter"], action: "A new line: it doesn't submit the form." },
    ],
    checks: [
      { check: "Name", result: "From its Field's label." },
      { check: "Description and error", result: "Linked by aria-describedby, as on every field." },
      {
        check: "Resizing",
        result: "Growth needs no script; where it can't grow, it can be resized by hand.",
      },
    ],
    tested: FORM_TESTED,
  },

  changelog: [
    {
      version: "0.0.2",
      items: [
        "Textarea: Input's look. It grows with its content between rows and maxRows through CSS field-sizing, with no script.",
      ],
    },
  ],

  related: [
    { name: "Text field", when: "One line" },
    { name: "Input", when: "The bare input" },
    { name: "Form", when: "Validation and summary" },
  ],
};
