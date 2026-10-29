// Components › Date picker: its documentation, from @qeetrix/react 0.2.0 (experimental/date-picker),
// the Storybook stories (data-entry/date-picker.stories.tsx) and the changelog. Its examples run live
// (Live.tsx); the do-and-don'ts render to HTML.
import { Field, TextField } from "@qeetrix/react";
import { DatePicker } from "@qeetrix/react/experimental";
import { TODAY } from "../dates";
import { FORM_TESTED } from "../forms";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const datePicker: ComponentDoc = {
  name: "Date picker",
  slug: "date-picker",
  category: "dates",
  status: "experimental",
  since: "0.0.6",
  lede: "A date field: typed in the locale's order (25/10/2026 for India), or chosen from a calendar.",
  exports: ["DatePicker"],
  renders: "<input> + calendar",
  source: "experimental/date-picker",
  story: "components/data-entry/date-picker.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A date in a form: joining, due, starts.",
      "A date people know and would rather type: a date of birth.",
    ],
    notFor: [
      { text: "A range of dates", use: "Date range picker" },
      { text: "A month worth seeing, not a field", use: "Calendar" },
    ],
    anatomyFigure: (
      <div className="qc-anat-field">
        <Field label="Joining date">
          <DatePicker defaultValue="2026-11-02" today={TODAY} />
        </Field>
      </div>
    ),
    anatomy: [
      { slot: "field-label", element: "<label>", note: "Names the field, and its button." },
      {
        slot: "input-control",
        element: "<input>",
        note: "The date, as typed or chosen, in the locale's order.",
      },
      {
        slot: "icon-button",
        element: "<button>",
        note: 'Opens the calendar: "Choose date for Joining date".',
      },
    ],
    rules: [
      {
        title: "A real date field",
        doLine: "Typed in the locale's order, checked, or chosen.",
        dontLine: "A text field and a hint about the format.",
        doIt: (
          <div className="qc-narrow">
            <Field label="Joining date">
              <DatePicker defaultValue="2026-11-02" today={TODAY} />
            </Field>
          </div>
        ),
        dontIt: (
          <div className="qc-narrow">
            <TextField
              label="Joining date"
              description="Use DD/MM/YYYY."
              defaultValue="02/11/2026"
            />
          </div>
        ),
      },
    ],
    content: [
      'The label names the date: "Joining date", not "Date".',
      'Errors say the date and the rule: "18/10/2026 is a Sunday."',
      'Say the limits in the description: "A weekday in November or December."',
    ],
  },

  api: {
    props: [
      {
        name: "value · defaultValue",
        type: "string | null",
        default: "null",
        note: 'The date, "YYYY-MM-DD".',
      },
      {
        name: "onValueChange",
        type: "(value: string | null) => void",
        default: "—",
        note: "The new date; null when cleared or what's typed isn't a date.",
      },
      {
        name: "min · max",
        type: "string",
        default: "—",
        note: 'The earliest and latest dates, "YYYY-MM-DD".',
      },
      {
        name: "isDateDisabled",
        type: "(date: string) => boolean",
        default: "—",
        note: "Rules out more dates.",
      },
      {
        name: "locale",
        type: "string",
        default: "the provider's",
        note: "The date's order, the language and the week.",
      },
      {
        name: "today",
        type: "string",
        default: "the browser's",
        note: "Today, for tests and screenshots.",
      },
      { name: "name", type: "string", default: "—", note: 'A hidden input submits "YYYY-MM-DD".' },
      {
        name: "messages",
        type: "Partial<…datePicker>",
        default: "—",
        note: "Its words, over QeetrixProvider's.",
      },
      {
        name: "… Input's props",
        type: "",
        default: "—",
        note: "disabled, readOnly, placeholder and the rest, but type.",
      },
    ],
    parts: [
      { slot: "input-control", element: "<input>", note: "The text: Input's parts throughout." },
      {
        slot: "icon-button",
        element: "<button>",
        note: "The calendar button, named after the field.",
      },
      {
        slot: "date-picker-panel",
        element: "<div>",
        note: "The popover with the calendar: the WAI-ARIA date picker dialog.",
      },
    ],
    recipes: [
      {
        title: "Submitted as YYYY-MM-DD",
        line: "name submits a hidden \"YYYY-MM-DD\"; a Form's onFormSubmit values read the field's text instead, so read the date from state.",
        file: "joining.tsx",
        code: `const [joinedOn, setJoinedOn] = useState<string | null>(null);

<Field label="Joining date">
  <DatePicker name="joinedOn" value={joinedOn} onValueChange={setJoinedOn} />
</Field>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Alt+↓"], action: "In the field: opens the calendar on its date." },
      { keys: ["Enter"], action: "Reads what's typed; in the calendar, chooses the day." },
      { keys: ["Esc"], action: "Closes the calendar; focus returns to where it was opened." },
      { keys: ["Tab"], action: "Closes the calendar too." },
    ],
    checks: [
      {
        check: "Typed dates",
        result:
          "Read on leaving the field or on Enter, with any separator. One that isn't an allowed date keeps its text and makes the field invalid, so Field says why and Form stops the submit.",
      },
      { check: "The button", result: 'Named after the field: "Choose date for Joining date".' },
      {
        check: "The calendar",
        result: "The WAI-ARIA date picker dialog, with Calendar's grid and keys.",
      },
    ],
    tested: FORM_TESTED,
  },

  changelog: [
    {
      version: "0.1.0",
      items: ['Its button is named after its field ("Choose date for Joining date").'],
    },
    {
      version: "0.0.6",
      items: [
        "DatePicker: type a date in the locale's order (25/10/2026 for India), or choose it from the Calendar in a popover as wide as the field. Typed text is read on leaving or on Enter; text that isn't an allowed date stays and the field turns invalid. Alt+Down opens the calendar; with name, a hidden input submits \"YYYY-MM-DD\".",
      ],
    },
  ],

  related: [
    { name: "Date range picker", when: "A range" },
    { name: "Calendar", when: "A month in view" },
    { name: "Text field", when: "Other text" },
  ],
};
