// Components › Calendar: its documentation, from @qeetrix/react 0.2.0 (experimental/calendar), the
// Storybook stories (data-entry/calendar.stories.tsx) and the changelog. Its examples run live
// (Live.tsx); the do-and-don'ts render to HTML, on a fixed today.
import { Field } from "@qeetrix/react";
import { Calendar, DatePicker } from "@qeetrix/react/experimental";
import { isDayOff, TODAY } from "../dates";
import { FORM_TESTED } from "../forms";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const calendar: ComponentDoc = {
  name: "Calendar",
  slug: "calendar",
  category: "dates",
  status: "experimental",
  since: "0.0.6",
  lede: 'A month to choose a day from, on the WAI-ARIA date grid. Dates are "YYYY-MM-DD", with no library.',
  exports: ["Calendar"],
  renders: '<table role="grid">',
  source: "experimental/calendar",
  story: "components/data-entry/calendar.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Choosing a day where the month is worth seeing: a review, a booking, leave.",
      "A date always in view, beside what it's for.",
    ],
    notFor: [
      { text: "A date in a form", use: "Date picker" },
      { text: "A range of days", use: "Range calendar" },
    ],
    anatomyFigure: (
      <div className="qc-anat-cal">
        <Calendar defaultValue="2026-10-14" today={TODAY} />
      </div>
    ),
    anatomy: [
      {
        slot: "calendar-zoom",
        element: "<button>",
        note: "The month and year (calendar-title): it opens the years, a decade a page.",
      },
      {
        slot: "calendar-next",
        element: "<button>",
        note: "The next month; calendar-previous, the last.",
      },
      {
        slot: "calendar-weekday",
        element: "<th>",
        note: "The week, starting on the locale's first day.",
      },
      {
        slot: "calendar-day",
        select: '[data-slot="calendar-cell"][aria-selected="true"] [data-slot="calendar-day"]',
        element: "<button>",
        note: "The chosen day: filled Ember.",
      },
      {
        slot: "calendar-day",
        select: '[data-slot="calendar-day"][data-today]',
        element: "<button>",
        note: 'Today, ringed; read as "Today, …".',
      },
    ],
    rules: [
      {
        title: "Rule out what can't be chosen",
        doLine: "Weekends and holidays greyed, before anyone picks one.",
        dontLine: "Every day open, and an error after the pick.",
        doIt: (
          <Calendar min={TODAY} isDateDisabled={isDayOff} defaultMonth="2026-11" today={TODAY} />
        ),
        dontIt: <Calendar defaultMonth="2026-11" today={TODAY} />,
      },
      {
        title: "In a form, a field",
        doLine: "A date among other fields: a Date picker, typed or chosen.",
        dontLine: "A whole month for one date in a form.",
        doIt: (
          <div className="qc-narrow">
            <Field label="Joining date">
              <DatePicker defaultValue="2026-11-02" today={TODAY} />
            </Field>
          </div>
        ),
        dontIt: <Calendar defaultValue="2026-11-02" today={TODAY} />,
      },
    ],
    content: [
      'Values are "YYYY-MM-DD" strings: no Date objects, no time zones.',
      'Say why days are ruled out, beside it: "Weekdays only."',
      "Leave the week's start to the locale.",
    ],
  },

  api: {
    props: [
      {
        name: "value · defaultValue",
        type: "string | null",
        default: "null",
        note: 'The chosen day, "YYYY-MM-DD".',
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        default: "—",
        note: "Called with the chosen day.",
      },
      {
        name: "min · max",
        type: "string",
        default: "—",
        note: 'The earliest and latest days, "YYYY-MM-DD".',
      },
      {
        name: "isDateDisabled",
        type: "(date: string) => boolean",
        default: "—",
        note: "Rules out more days: weekends, holidays.",
      },
      {
        name: "defaultMonth",
        type: "string",
        default: "today's month",
        note: 'The month shown first when nothing\'s chosen, "YYYY-MM".',
      },
      {
        name: "locale",
        type: "string",
        default: "the provider's",
        note: "The language and the week's first day (Sunday for India).",
      },
      {
        name: "today",
        type: "string",
        default: "the browser's",
        note: "Today, for tests and screenshots.",
      },
      {
        name: "autoFocus",
        type: "boolean",
        default: "false",
        note: "Focuses the focusable day as it mounts: in a picker that opens.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        note: "Nothing can be chosen and the month stays put; still focusable, to be read.",
      },
      {
        name: "readOnly",
        type: "boolean",
        default: "false",
        note: "The months can be browsed; no day can be chosen.",
      },
      {
        name: "messages",
        type: "Partial<…calendar>",
        default: "—",
        note: "Its words, over QeetrixProvider's.",
      },
    ],
    parts: [
      { slot: "calendar", element: "<div>", note: "The root." },
      {
        slot: "calendar-header",
        element: "<div>",
        note: "calendar-previous, calendar-title and calendar-next.",
      },
      {
        slot: "calendar-grid",
        element: '<table role="grid">',
        note: "The month: calendar-weekday heads, calendar-cell cells.",
      },
      {
        slot: "calendar-day",
        element: "<button>",
        note: "A day: data-date, data-today, data-outside; its calendar-cell carries aria-selected.",
      },
      {
        slot: "calendar-zoom",
        element: "<button>",
        note: "The title's button: it opens the years, then the months; calendar-option each.",
      },
    ],
    recipes: [
      {
        title: "Days a console rules out",
        line: "isDateDisabled with min: from today, weekdays, not on holidays.",
        file: "review.tsx",
        code: `const holidays = new Set(["2026-10-02", "2026-10-20", "2026-11-08"]);
const isWeekend = (date: string) => [0, 6].includes(new Date(\`\${date}T00:00:00Z\`).getUTCDay());

<Calendar min={today} isDateDisabled={(date) => isWeekend(date) || holidays.has(date)} />`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["←", "→"], action: "A day back or on; mirrored in right to left." },
      { keys: ["↑", "↓"], action: "A week back or on." },
      { keys: ["Home", "End"], action: "The week's first or last day." },
      { keys: ["PageUp", "PageDown"], action: "A month back or on; with Shift, a year." },
      { keys: ["Enter", "Space"], action: "Chooses the day." },
      { keys: ["Esc"], action: "From the years or months, back to the days." },
    ],
    checks: [
      {
        check: "Grid",
        result: "The WAI-ARIA date picker's grid: one day in the Tab order at a time.",
      },
      {
        check: "Each day",
        result: 'Read as its full date: "Tuesday, 20 October 2026"; today as "Today, …".',
      },
      { check: "Ruled-out days", result: "aria-disabled, greyed, and skipped by Enter." },
      {
        check: "Disabled",
        result: "Dimmed and unchangeable, but focusable, so its date can be read.",
      },
    ],
    tested: FORM_TESTED,
  },

  changelog: [
    {
      version: "0.1.0",
      items: [
        "disabled and readOnly.",
        "Its header and days share one width in a stretching layout.",
      ],
    },
    {
      version: "0.0.6",
      items: [
        "Calendar: a month of dates on the WAI-ARIA date picker grid, with no date library: one day in the Tab order, arrows, Home and End, Page Up and Down; each day read as its full date; min, max and isDateDisabled; the week starts by locale (Sunday for India).",
      ],
    },
  ],

  related: [
    { name: "Date picker", when: "A date in a form" },
    { name: "Range calendar", when: "A range" },
    { name: "Date range picker", when: "A range in a form" },
  ],
};
