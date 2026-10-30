// Components › Text field: its documentation, from @qeetrix/react 0.2.0 (text-field.d.ts, Field's
// and Input's), the Storybook stories (forms/text-field.stories.tsx) and the changelog. Its examples
// run live (Live.tsx); the do-and-don'ts render to HTML.
import { MailIcon } from "@qeetrix/icons/icons/mail";
import { Input, TextField } from "@qeetrix/react";
import { FORM_TESTED } from "../forms";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const textField: ComponentDoc = {
  name: "Text field",
  slug: "text-field",
  category: "forms",
  status: "stable",
  since: "0.0.2",
  lede: "A labelled text input: the default form row. A label always; a placeholder is only an example.",
  exports: ["TextField"],
  renders: "<input>",
  source: "text-field",
  story: "components/forms/text-field.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Any short text: a name, an email, an ID, a URL.",
      "A form row with its label, description and error in one.",
      "Values with a unit or a suffix: ₹, .qeet.in.",
    ],
    notFor: [
      { text: "Several lines", use: "Textarea" },
      { text: "A password or a secret", use: "Password input" },
      { text: "A number with steps", use: "Number field" },
      { text: "One of a list", use: "Select" },
    ],
    anatomyFigure: (
      <div className="qc-anat-field">
        <TextField
          label="Work email"
          optional
          icon={MailIcon}
          defaultValue="priya@acme.in"
          description="We send the invite here."
        />
      </div>
    ),
    anatomy: [
      {
        slot: "field-label",
        element: "<label>",
        note: 'Names the input. Always shown; "(optional)" when it is.',
      },
      { slot: "input", element: "<div>", note: "The box: a filled surface with a bottom line." },
      { slot: "input-icon", element: "<svg>", note: "A leading icon, 16px, decorative." },
      {
        slot: "field-description",
        element: "<p>",
        note: "Help under the box; the error takes its place.",
      },
    ],
    rules: [
      {
        title: "A label, always",
        doLine: "The label names it; the placeholder is an example.",
        dontLine: "A placeholder for a label: it's gone once you type.",
        doIt: <TextField label="Work email" placeholder="e.g. priya@acme.in" />,
        dontIt: <Input placeholder="Work email" aria-label="Work email" />,
      },
      {
        title: "Mark the optional",
        doLine: 'optional adds "(optional)"; the rest are needed.',
        dontLine: "Asterisks on the required ones.",
        doIt: <TextField label="Phone" optional placeholder="e.g. 98765 43210" />,
        dontIt: <TextField label="Work email *" placeholder="e.g. priya@acme.in" />,
      },
      {
        title: "Errors say how to fix it",
        doLine: "What to do, with an example.",
        dontLine: "What went wrong, and no more.",
        doIt: (
          <TextField
            label="Work email"
            defaultValue="priya@gmail"
            error="Enter an email like priya@acme.in."
          />
        ),
        dontIt: <TextField label="Work email" defaultValue="priya@gmail" error="Invalid input." />,
      },
    ],
    content: [
      'Labels are nouns, in sentence case: "Work email".',
      'Placeholders are examples, starting "e.g."; never instructions.',
      'Errors say how to fix it: "Enter an email like priya@acme.in."',
    ],
  },

  api: {
    props: [
      {
        name: "label",
        type: "ReactNode",
        default: "required",
        note: "The label. A placeholder is never a label.",
      },
      {
        name: "description",
        type: "ReactNode",
        default: "—",
        note: "Help under the box: a format, a limit. Hidden while an error shows.",
      },
      {
        name: "error",
        type: "ReactNode",
        default: "—",
        note: "An error to show now, e.g. from the server; it marks it invalid.",
      },
      {
        name: "optional",
        type: "boolean",
        default: "false",
        note: 'Appends "(optional)". Required fields aren\'t marked.',
      },
      {
        name: "help",
        type: "ReactNode",
        default: "—",
        note: "An explanation behind ⓘ, after the label.",
      },
      {
        name: "hideLabel",
        type: "boolean",
        default: "false",
        note: "Hides the label but keeps it for screen readers: a toolbar search only.",
      },
      {
        name: "icon",
        type: "IconSource",
        default: "—",
        note: "A leading icon, 16px and decorative.",
      },
      { name: "startAdornment", type: "ReactNode", default: "—", note: "Before the value: ₹." },
      {
        name: "endAdornment",
        type: "ReactNode",
        default: "—",
        note: "After the value: %, .qeet.in, or a tool.",
      },
      {
        name: "validate",
        type: "(value, formValues) => string | null",
        default: "—",
        note: "Your own check: return the error, or null.",
      },
      {
        name: "validationMode",
        type: '"onSubmit" | "onBlur" | "onChange"',
        default: '"onSubmit"',
        note: "When it checks.",
      },
      {
        name: "value · defaultValue · onValueChange",
        type: "string",
        default: "—",
        note: "Controlled or not, as an input.",
      },
      {
        name: "type · required · disabled · readOnly · name",
        type: "…",
        default: "—",
        note: "As on an <input>: disabled and name go to the field.",
      },
    ],
    parts: [
      { slot: "text-field", element: "<div>", note: "The row: label, box, description." },
      {
        slot: "field-label",
        element: "<label>",
        note: 'The label; field-optional holds "(optional)".',
      },
      {
        slot: "input",
        element: "<div>",
        note: "The box, with input-icon, input-start and input-end.",
      },
      {
        slot: "input-control",
        element: "<input>",
        note: "The input: ref and native props land here.",
      },
      { slot: "field-description", element: "<p>", note: "The help line." },
      { slot: "field-error", element: "<div>", note: "The error, in its place." },
    ],
    recipes: [
      {
        title: "Check as you leave it",
        line: "validate returns the error; onBlur says it once the person moves on.",
        file: "work-email.tsx",
        code: `<TextField
  label="Work email"
  type="email"
  name="email"
  validationMode="onBlur"
  validate={(value) => (String(value).endsWith("@acme.in") ? null : "Use your acme.in email.")}
/>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      {
        keys: ["Tab"],
        action: "Moves focus to the input; ⓘ help is its own stop after the label.",
      },
    ],
    checks: [
      {
        check: "Label",
        result:
          "A <label> for the input: clicking it focuses the input, and it's the input's name.",
      },
      { check: "Optional", result: '"(optional)" is part of the name, so it\'s read with it.' },
      {
        check: "Description and error",
        result:
          "Linked by aria-describedby; the error replaces the description for screen readers too.",
      },
      {
        check: "Invalid",
        result: "aria-invalid while an error shows; the edge turns danger, not by colour alone.",
      },
      {
        check: "Disabled and read-only",
        result: "Disabled dims label and description; read-only keeps it readable and focusable.",
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
      version: "0.1.0",
      items: [
        "help: the ⓘ explanation, like Field's.",
        "A Form's error summary lists a TextField's error and links to it.",
      ],
    },
    {
      version: "0.0.2",
      items: [
        "TextField: Field and Input in one, the default form row.",
        "A messages prop, over QeetrixProvider's.",
      ],
    },
  ],

  related: [
    { name: "Input", when: "The bare input" },
    { name: "Textarea", when: "Several lines" },
    { name: "Password input", when: "A password" },
    { name: "Form", when: "Validation and summary" },
  ],
};
