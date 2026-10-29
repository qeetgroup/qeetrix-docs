// Components › Form: its documentation, from @qeetrix/react 0.2.0 (experimental/form: Form and
// ErrorSummary), the Storybook stories (forms/form.stories.tsx) and the changelog. Its examples run
// live (Live.tsx), with a timer for the server.
import { Stack, TextField } from "@qeetrix/react";
import { ErrorSummary } from "@qeetrix/react/experimental";
import { FORM_TESTED } from "../forms";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const form: ComponentDoc = {
  name: "Form",
  slug: "form",
  category: "forms",
  status: "experimental",
  since: "0.0.6",
  lede: "Fields that check themselves on submit, server errors by name, and a summary of what to fix.",
  exports: ["Form", "ErrorSummary"],
  renders: "<form>",
  source: "experimental/form",
  story: "components/forms/form.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Any form that's submitted: invite, settings, setup.",
      "Errors from the server, shown on their fields.",
      "Long forms, where the summary says what's wrong at once.",
    ],
    notFor: [
      { text: "A setting that saves as it's switched", use: "Switch" },
      { text: "A search box", use: "Input" },
    ],
    anatomyFigure: (
      <div className="qc-anat-wide">
        <Stack gap="lg">
          <ErrorSummary
            autoFocus={false}
            items={[{ message: "Enter a work email, like priya@acme.in." }]}
          />
          <TextField
            label="Work email"
            defaultValue="priya@"
            error="Enter a work email, like priya@acme.in."
          />
        </Stack>
      </div>
    ),
    anatomy: [
      {
        slot: "error-summary",
        element: "<div>",
        note: 'At the top: a danger alert (role="alert") inside, its title a heading; it takes focus.',
      },
      {
        slot: "error-summary-list",
        element: "<ul>",
        note: "Each problem, in the fields' order, linked to its control.",
      },
      { slot: "field-error", element: "<div>", note: "The same words, on the field itself." },
    ],
    rules: [
      {
        title: "The same words twice",
        doLine: "The summary repeats the field's error exactly, and links to it.",
        dontLine: "A vague banner, and the errors only on the fields.",
        doIt: (
          <ErrorSummary
            autoFocus={false}
            items={[
              { message: "Enter a work email, like priya@acme.in." },
              { message: "Choose a role." },
            ]}
          />
        ),
        dontIt: (
          <ErrorSummary
            autoFocus={false}
            title="Something went wrong"
            items={[{ message: "Please check the form." }]}
          />
        ),
      },
    ],
    content: [
      'The summary\'s title says what to do: "Fix these to continue".',
      "Each item is worded exactly as its field's error.",
      "Errors say how to fix it, with an example.",
    ],
  },

  api: {
    props: [
      {
        name: "onFormSubmit",
        type: "(values, details) => void",
        default: "—",
        note: "Runs only when every field is valid; values are keyed by name.",
      },
      {
        name: "errors",
        type: "Record<string, string | string[]>",
        default: "—",
        note: "Server errors, keyed by each field's name.",
      },
      {
        name: "validationMode",
        type: '"onSubmit" | "onBlur" | "onChange"',
        default: '"onSubmit"',
        note: "When fields check themselves.",
      },
      {
        name: "summary",
        type: "boolean",
        default: "true",
        note: "After a failed submit or server errors: the summary at the top, and focus.",
      },
      {
        name: "summaryTitle · summaryHeadingLevel",
        type: "ReactNode · 2–6",
        default: '"Fix these to continue" · 2',
        note: "The summary's heading.",
      },
      {
        name: "ErrorSummary: items",
        type: "{ id?, message }[]",
        default: "required",
        note: "The problems; id links to the control.",
      },
      {
        name: "ErrorSummary: title · headingLevel · autoFocus",
        type: "…",
        default: "— · 2 · true",
        note: "Its heading, and whether it takes focus as it appears.",
      },
    ],
    parts: [
      { slot: "form", element: "<form>", note: "Fields stand space.form-gap apart." },
      { slot: "error-summary", element: "<div>", note: "The summary." },
      { slot: "error-summary-list", element: "<ul>", note: "Its links." },
    ],
    recipes: [
      {
        title: "Server errors by name",
        line: "Return the server's errors as { name: message }: each lands on its field and in the summary.",
        file: "invite.tsx",
        code: `const [errors, setErrors] = useState<Record<string, string>>({});

<Form
  errors={errors}
  onFormSubmit={async (values) => {
    const result = await invite(values);
    if (!result.ok) setErrors(result.errors); // { email: "priya@acme.in is already a member." }
  }}
>
  …
</Form>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Enter"], action: "Submits from a text field." },
      { keys: ["Tab"], action: "From the summary's heading to its links, each to its field." },
    ],
    checks: [
      {
        check: "Summary",
        result:
          "An alert with a real heading; it takes focus as it appears, so its heading is read first.",
      },
      {
        check: "Links",
        result:
          "Each item links to its control: TextField, Field, CheckboxGroup, RadioGroup and Slider rows.",
      },
      {
        check: "Field errors",
        result:
          "On each field, linked to it; an error replaces the description for screen readers too.",
      },
    ],
    tested: FORM_TESTED,
  },

  changelog: [
    {
      version: "0.1.0",
      items: [
        "ErrorSummary lists TextField, CheckboxGroup, RadioGroup and Slider errors as well as Field's, and links each to its control; it's an alert with a real heading, and takes focus.",
        "ErrorSummary headingLevel and autoFocus; Form summaryHeadingLevel.",
      ],
    },
    {
      version: "0.0.5",
      items: [
        "Form and ErrorSummary, on Base UI's Form: validate on submit, blur or change; server errors through errors by name; onFormSubmit only when valid; a summary at the top after a failed submit.",
      ],
    },
  ],

  related: [
    { name: "Text field", when: "The form row" },
    { name: "Checkbox", when: "Several answers" },
    { name: "Radio", when: "One of a few" },
    { name: "Alert", when: "A message in the page" },
  ],
};
