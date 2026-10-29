// Components › Date range picker: its documentation, from @qeetrix/react 0.2.0 (experimental/
// date-range-picker), the Storybook stories (data-entry/date-range-picker.stories.tsx) and the
// changelog. Its examples run live (Live.tsx); the do-and-don'ts render to HTML.
import { Field, Stack } from "@qeetrix/react";
import { DatePicker, DateRangePicker } from "@qeetrix/react/experimental";
import { TODAY } from "../dates";
import { FORM_TESTED } from "../forms";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const dateRangePicker: ComponentDoc = {
  name: "Date range picker",
  slug: "date-range-picker",
  category: "dates",
  status: "experimental",
  since: "0.0.6",
  lede: "One field for a range: typed in either order, chosen in a range calendar, or a preset in one step.",
  exports: ["DateRangePicker"],
  renders: "<input> + calendar",
  source: "experimental/date-range-picker",
  story: "components/data-entry/date-range-picker.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A report's or an export's period.",
      "Leave, a booking, a contract's term.",
      "Quick ranges people reach for: the last 7 days, this month.",
    ],
    notFor: [
      { text: "One date", use: "Date picker" },
      { text: "A range always in view", use: "Range calendar" },
    ],
    anatomyFigure: (
      <div className="qc-anat-field">
        <Field label="Period">
          <DateRangePicker
            defaultValue={{ start: "2026-10-19", end: "2026-10-25" }}
            today={TODAY}
          />
        </Field>
      </div>
    ),
    anatomy: [
      { slot: "field-label", element: "<label>", note: "Names the field, and its button." },
      {
        slot: "input-control",
        element: "<input>",
        note: 'Both dates, as typed or chosen: "19/10/2026 – 25/10/2026".',
      },
      {
        slot: "icon-button",
        element: "<button>",
        note: "Opens the range calendar, with any presets beside it.",
      },
    ],
    rules: [
      {
        title: "One field for one range",
        doLine: "Both ends in one field: typed, or chosen in one calendar.",
        dontLine: "Two date pickers that don't know about each other.",
        doIt: (
          <div className="qc-narrow">
            <Field label="Period">
              <DateRangePicker
                defaultValue={{ start: "2026-10-19", end: "2026-10-25" }}
                today={TODAY}
              />
            </Field>
          </div>
        ),
        dontIt: (
          <div className="qc-narrow">
            <Stack gap="md">
              <Field label="From">
                <DatePicker defaultValue="2026-10-19" today={TODAY} />
              </Field>
              <Field label="To">
                <DatePicker defaultValue="2026-10-25" today={TODAY} />
              </Field>
            </Stack>
          </div>
        ),
      },
    ],
    content: [
      'The label names the period: "Sign-ins", "Leave".',
      'Presets people actually use; your own with a label: "Last quarter".',
      "Limit to what has data: max={today} for reports.",
    ],
  },

  api: {
    props: [
      {
        name: "value · defaultValue",
        type: "DateRange | null",
        default: "null",
        note: '{ start, end }, "YYYY-MM-DD".',
      },
      {
        name: "onValueChange",
        type: "(value: DateRange | null) => void",
        default: "—",
        note: "The new range; null when cleared or what's typed isn't one.",
      },
      {
        name: "presets",
        type: "(DateRangePreset | DateRangePresetName)[]",
        default: "—",
        note: "today, last7Days, last30Days, last90Days, thisMonth, lastMonth, or { label, range }.",
      },
      {
        name: "min · max · isDateDisabled",
        type: "…",
        default: "—",
        note: "As DatePicker's; isDateDisabled rules out a range's ends.",
      },
      {
        name: "startName · endName",
        type: "string",
        default: "—",
        note: 'Hidden inputs that submit the start and the end, "YYYY-MM-DD".',
      },
      {
        name: "locale · today · messages",
        type: "…",
        default: "—",
        note: "As DatePicker's; today also anchors the named presets.",
      },
      {
        name: "… Input's props",
        type: "",
        default: "—",
        note: "disabled, readOnly, placeholder and the rest.",
      },
    ],
    parts: [
      { slot: "input-control", element: "<input>", note: "Both dates: Input's parts throughout." },
      {
        slot: "icon-button",
        element: "<button>",
        note: "The calendar button, named after the field.",
      },
      {
        slot: "date-range-picker-presets",
        element: "<div>",
        note: "The presets beside the calendar; date-range-picker-preset each.",
      },
    ],
    recipes: [
      {
        title: "A preset of your own",
        line: "range can be a function, worked out when the list shows.",
        file: "quarter.tsx",
        code: `const lastQuarter: DateRangePreset = {
  label: "Last quarter",
  range: () => ({ start: "2026-07-01", end: "2026-09-30" }),
};

<DateRangePicker presets={["last7Days", "last30Days", lastQuarter]} />`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Alt+↓"], action: "In the field: opens the calendar." },
      { keys: ["Enter"], action: "Reads what's typed; in the calendar, picks an end." },
      { keys: ["Esc"], action: "First undoes a half-chosen range, then closes; focus returns." },
    ],
    checks: [
      {
        check: "Typed ranges",
        result:
          "Any separator, either order; a range that can't be read, or whose ends aren't allowed, keeps its text and makes the field invalid.",
      },
      { check: "The button", result: "Named after the field." },
      {
        check: "The calendar",
        result: "RangeCalendar, in a popover as wide as the field: each step announced.",
      },
    ],
    tested: FORM_TESTED,
  },

  changelog: [
    {
      version: "0.1.0",
      items: [
        "presets: quick ranges beside the calendar, cut to min and max.",
        "Its button is named after its field.",
      ],
    },
    {
      version: "0.0.6",
      items: [
        'DateRangePicker: one field for a range, typed with any separators in either order, or chosen in a RangeCalendar in a popover as wide as the field; startName and endName submit "YYYY-MM-DD".',
      ],
    },
  ],

  related: [
    { name: "Date picker", when: "One date" },
    { name: "Range calendar", when: "A range in view" },
    { name: "Calendar", when: "A month in view" },
  ],
};
