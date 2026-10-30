// Components › Input: its documentation, from @qeetrix/react 0.2.0 (input.d.ts, input.js, Field's)
// and the changelog. Its examples run live (Live.tsx); the do-and-don'ts render to HTML.
import { Field, Input } from "@qeetrix/react";
import { FORM_TESTED } from "../forms";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const input: ComponentDoc = {
  name: "Input",
  slug: "input",
  category: "forms",
  status: "stable",
  since: "0.0.2",
  lede: "The bare text box: a filled surface with a bottom line, an icon and affixes. A Field labels it.",
  exports: ["Input", "Field"],
  renders: "<input>",
  source: "input",
  story: "components/data-entry/input.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A text box inside your own Field: with a tool at its end, or a layout TextField doesn't give.",
      "A toolbar search, with a hidden label.",
      "Composing: Field labels any control the same way.",
    ],
    notFor: [
      { text: "A plain form row", use: "Text field" },
      { text: "Several lines", use: "Textarea" },
      { text: "A number with steps", use: "Number field" },
    ],
    anatomyFigure: (
      <div className="qc-anat-field">
        <Input
          startAdornment="₹"
          defaultValue="1,24,500"
          endAdornment="per month"
          aria-label="Amount"
        />
      </div>
    ),
    anatomy: [
      {
        slot: "input",
        element: "<div>",
        note: "The box: filled, with a bottom line; it takes the input's focus and state.",
      },
      { slot: "input-start", element: "<span>", note: "Text before the value: ₹." },
      {
        slot: "input-control",
        element: "<input>",
        note: "The input itself: ref and native props land here.",
      },
      { slot: "input-end", element: "<span>", note: "After it: a unit, or a tool." },
    ],
    rules: [
      {
        title: "Inside a Field",
        doLine: "Field names it, describes it and shows its error.",
        dontLine: "A bare box named only by its placeholder.",
        doIt: (
          <div className="qc-narrow">
            <Field label="Legal name">
              <Input defaultValue="Acme Private Limited" />
            </Field>
          </div>
        ),
        dontIt: (
          <div className="qc-narrow">
            <Input placeholder="Legal name" aria-label="Legal name" />
          </div>
        ),
      },
      {
        title: "Affixes are part of the value",
        doLine: "A unit the value is in: ₹, %, .qeet.in.",
        dontLine: "The unit typed into the value, or left to guess.",
        doIt: (
          <div className="qc-narrow">
            <Field label="Discount">
              <Input endAdornment="%" defaultValue="12" />
            </Field>
          </div>
        ),
        dontIt: (
          <div className="qc-narrow">
            <Field label="Discount">
              <Input defaultValue="12" />
            </Field>
          </div>
        ),
      },
    ],
    content: [
      "Affixes are short: a symbol or a word, never a sentence.",
      "Read-only values stay selectable: give them a Copy button.",
      "A hidden label is still written, for screen readers.",
    ],
  },

  api: {
    props: [
      {
        name: "icon",
        type: "IconSource",
        default: "—",
        note: "A leading icon from @qeetrix/icons: sharp, 16px, decorative.",
      },
      {
        name: "startAdornment",
        type: "ReactNode",
        default: "—",
        note: "Before the value: a text affix such as ₹.",
      },
      {
        name: "endAdornment",
        type: "ReactNode",
        default: "—",
        note: "After the value: %, .qeet.in, or a tool such as a Copy button.",
      },
      {
        name: "value · defaultValue · onValueChange",
        type: "string",
        default: "—",
        note: "Controlled or not; onValueChange has the value first.",
      },
      {
        name: "type · placeholder · disabled · readOnly · required",
        type: "…",
        default: "—",
        note: "As on an <input>; its look follows them.",
      },
      {
        name: "className · style",
        type: "…",
        default: "—",
        note: "Place the box only; ref and the rest go to the input.",
      },
    ],
    parts: [
      { slot: "input", element: "<div>", note: "The box." },
      { slot: "input-icon", element: "<svg>", note: "The leading icon." },
      { slot: "input-start", element: "<span>", note: "Before the value." },
      { slot: "input-control", element: "<input>", note: "The input." },
      { slot: "input-end", element: "<span>", note: "After the value." },
    ],
    recipes: [
      {
        title: "Field around any control",
        line: "Field's label, description and error link to the control inside it.",
        file: "legal-name.tsx",
        code: `<Field label="Legal name" description="As on your GST certificate." error={errors.legalName}>
  <Input name="legalName" defaultValue={tenant.legalName} />
</Field>`,
      },
      {
        title: "A control that isn't an input",
        line: "A function child: Field hands it the props that name and describe it.",
        file: "notify-by.tsx",
        code: `<Field label="Notify by" description="Pick one or more.">
  {(control) => (
    <ToggleGroup {...control} multiple defaultValue={["email"]}>
      <Toggle value="email">Email</Toggle>
      <Toggle value="sms">SMS</Toggle>
    </ToggleGroup>
  )}
</Field>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      {
        keys: ["Tab"],
        action: "Moves focus to the input; a tool in endAdornment is the next stop.",
      },
    ],
    checks: [
      { check: "Name", result: "From its Field's label; without one, give it aria-label." },
      {
        check: "Affixes",
        result:
          "Read with the value: the box holds them, so they're seen with it, and stay in order in right to left.",
      },
      {
        check: "States",
        result: "Focus, invalid, read-only and disabled looks come from the input's own state.",
      },
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
      version: "0.3.0",
      items: [
        "icon takes an element as well as a component (icon={<PlusIcon />}), so a Server Component can pass one: its type is IconSource.",
      ],
    },
    {
      version: "0.2.0",
      items: ["Field takes a function child, for a control that isn't a form input."],
    },
    {
      version: "0.0.2",
      items: [
        "Input: the filled box with a bottom line, a leading icon, and start and end adornments; its focus, invalid, read-only and disabled looks come from the input.",
        "Right-to-left tests cover the adornments' order.",
      ],
    },
  ],

  related: [
    { name: "Text field", when: "Field and Input in one" },
    { name: "Textarea", when: "Several lines" },
    { name: "Number field", when: "A number" },
    { name: "Copy button", when: "A tool at its end" },
  ],
};
