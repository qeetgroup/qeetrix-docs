// Components › Range calendar: its documentation, from @qeetrix/react 0.2.0 (experimental/
// range-calendar, on Calendar), the Storybook stories (data-entry/range-calendar.stories.tsx) and
// the changelog. Its examples run live (Live.tsx); the do-and-don'ts render to HTML.
import { Field } from "@qeetrix/react";
import { DateRangePicker, RangeCalendar } from "@qeetrix/react/experimental";
import { isDayOff, TODAY } from "../dates";
import { FORM_TESTED } from "../forms";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const rangeCalendar: ComponentDoc = {
  name: "Range calendar",
  slug: "range-calendar",
  category: "dates",
  status: "experimental",
  since: "0.0.6",
  lede: "A Calendar that chooses a range: two picks, a band between them, every step announced.",
  exports: ["RangeCalendar"],
  renders: '<table role="grid">',
  source: "experimental/range-calendar",
  story: "components/data-entry/range-calendar.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Choosing a span where the days matter: leave, a booking, a report's period.",
      "A range always in view.",
    ],
    notFor: [
      { text: "A range in a form", use: "Date range picker" },
      { text: "One day", use: "Calendar" },
    ],
    anatomyFigure: (
      <div className="qc-anat-cal">
        <RangeCalendar defaultValue={{ start: "2026-10-12", end: "2026-10-16" }} today={TODAY} />
      </div>
    ),
    anatomy: [
      {
        slot: "calendar-day",
        select: '[data-slot="calendar-cell"][data-range="start"] [data-slot="calendar-day"]',
        element: "<button>",
        note: "The start: filled Ember.",
      },
      {
        slot: "calendar-day",
        select: '[data-slot="calendar-cell"][data-range="middle"] [data-slot="calendar-day"]',
        element: "<button>",
        note: "A day inside: the subtle brand band, selected too.",
      },
      {
        slot: "calendar-day",
        select: '[data-slot="calendar-cell"][data-range="end"] [data-slot="calendar-day"]',
        element: "<button>",
        note: "The end: filled Ember.",
      },
    ],
    rules: [
      {
        title: "Grey stays grey",
        doLine: "Holidays and weekends ruled out, even inside a range.",
        dontLine: "A range that quietly counts days nobody works.",
        doIt: (
          <RangeCalendar
            min={TODAY}
            isDateDisabled={isDayOff}
            defaultValue={{ start: "2026-11-02", end: "2026-11-13" }}
            today={TODAY}
          />
        ),
        dontIt: (
          <RangeCalendar defaultValue={{ start: "2026-11-02", end: "2026-11-13" }} today={TODAY} />
        ),
      },
      {
        title: "In a form, a field",
        doLine: "A period among other fields: a Date range picker.",
        dontLine: "A whole month for a report's period.",
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
          <RangeCalendar defaultValue={{ start: "2026-10-19", end: "2026-10-25" }} today={TODAY} />
        ),
      },
    ],
    content: [
      'Say what the range is for, beside it: "Request leave".',
      'Count it back: "5 days", once both ends are chosen.',
    ],
  },

  api: {
    props: [
      {
        name: "value · defaultValue",
        type: "DateRange | null",
        default: "null",
        note: '{ start, end }, "YYYY-MM-DD"; end never before start.',
      },
      {
        name: "onValueChange",
        type: "(value: DateRange) => void",
        default: "—",
        note: "Called once both ends are chosen.",
      },
      {
        name: "min · max · isDateDisabled",
        type: "…",
        default: "—",
        note: "As Calendar's: a ruled-out day can't be an end.",
      },
      {
        name: "defaultMonth · locale · today · autoFocus",
        type: "…",
        default: "—",
        note: "As Calendar's.",
      },
      { name: "disabled · readOnly · messages", type: "…", default: "—", note: "As Calendar's." },
    ],
    parts: [
      { slot: "range-calendar", element: "<div>", note: "The root: Calendar's parts throughout." },
      {
        slot: "calendar-cell",
        element: "<td>",
        note: "A day's cell: data-range start, middle or end, and aria-selected inside the range.",
      },
    ],
    recipes: [
      {
        title: "Count the days",
        line: "Both ends inclusive: the same day twice is a one-day range.",
        file: "leave.tsx",
        code: `const days = (range: DateRange) => Math.round((Date.parse(range.end) - Date.parse(range.start)) / 86_400_000) + 1;`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Enter", "Space"], action: "Picks an end: the first, then the second." },
      { keys: ["Esc"], action: "Undoes a half-chosen range." },
      {
        keys: ["←", "→", "↑", "↓"],
        action: "As Calendar's: by day and week; the half-chosen range follows focus.",
      },
    ],
    checks: [
      {
        check: "Selection",
        result: "Every day in the range is selected, and each step is announced.",
      },
      {
        check: "Order",
        result: "Picking a day before the first swaps the ends; the same day twice is one day.",
      },
      { check: "Ruled-out days", result: "They can't be an end, and stay grey inside a range." },
    ],
    tested: FORM_TESTED,
  },

  changelog: [
    {
      version: "0.1.0",
      items: ["disabled and readOnly.", "Disabled days stay grey inside a range."],
    },
    {
      version: "0.0.6",
      items: [
        "RangeCalendar: the first pick is one end, the range follows the pointer or focus until the second, ends picked backwards are swapped; Escape undoes a half-chosen range. A band of the subtle brand fill with Ember ends; each step announced. Exports DateRange.",
      ],
    },
  ],

  related: [
    { name: "Date range picker", when: "A range in a form" },
    { name: "Calendar", when: "One day" },
    { name: "Date picker", when: "A date in a form" },
  ],
};
