// Components › Stat: its documentation, from @qeetrix/react 0.2.0 (experimental/stat), the
// Storybook stories (data-display/stat.stories.tsx) and the changelog. Server-safe: its examples
// and figures are rendered with the page.
import { Stat, StatGroup } from "@qeetrix/react/experimental";
import { DISPLAY_TESTED } from "../display";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

const WEEKLY = [1080, 1094, 1110, 1121, 1139, 1150, 1172, 1190, 1205, 1231, 1246, 1284];

export const stat: ComponentDoc = {
  name: "Stat",
  slug: "stat",
  category: "data-display",
  status: "experimental",
  since: "0.0.4",
  lede: "A key number with its label, a note and a small trend. Several sit in a StatGroup's ruled strip.",
  exports: ["Stat", "StatGroup"],
  renders: "<dl>",
  source: "experimental/stat",
  story: "components/data-display/stat.stories.tsx",
  examples,

  usage: {
    useFor: ["A console page's key numbers, at the top.", "A summary under a page header."],
    notFor: [
      { text: "A record's facts", use: "Description list" },
      { text: "A share of a whole, or a limit", use: "Meter" },
      { text: "Many numbers to compare", use: "Table" },
    ],
    anatomyFigure: (
      <div className="qc-stat-figure">
        <StatGroup aria-label="Users">
          <Stat
            label="Total users"
            value={1284}
            note="+38 this week"
            tone="positive"
            trend={WEEKLY}
          />
        </StatGroup>
      </div>
    ),
    anatomy: [
      { slot: "stat-label", element: "<dt>", note: "What's counted." },
      { slot: "stat-value", element: "<dd>", note: "The number, formatted for the locale." },
      { slot: "stat-trend", element: "<svg>", note: "Recent values, oldest first: decorative." },
      { slot: "stat-note", element: "<dd>", note: "The change or the context, in the tone." },
    ],
    rules: [
      {
        title: "Say what the trend means",
        doLine: "The note says which way, and how much.",
        dontLine: "A line alone: it's hidden from screen readers, and says nothing exact.",
        doIt: (
          <div className="qc-stat-figure">
            <StatGroup aria-label="Users, with a note">
              <Stat
                label="Total users"
                value={1284}
                note="+38 this week"
                tone="positive"
                trend={WEEKLY}
              />
            </StatGroup>
          </div>
        ),
        dontIt: (
          <div className="qc-stat-figure">
            <StatGroup aria-label="Users, a line alone">
              <Stat label="Total users" value={1284} trend={WEEKLY} />
            </StatGroup>
          </div>
        ),
      },
      {
        title: "A few, that matter",
        doLine: "Three or four numbers a person acts on.",
        dontLine: "Every number there is: none stands out.",
        doIt: (
          <StatGroup aria-label="Billing, a few">
            <Stat label="Collected" value="₹12,45,000" />
            <Stat label="Overdue" value={4} tone="warning" note="₹1,82,400" />
          </StatGroup>
        ),
        dontIt: (
          <StatGroup aria-label="Billing, everything">
            <Stat label="Collected" value="₹12,45,000" />
            <Stat label="Invoices" value={38} />
            <Stat label="Customers" value={31} />
            <Stat label="Overdue" value={4} />
            <Stat label="Refunds" value={2} />
            <Stat label="Disputes" value={0} />
          </StatGroup>
        ),
      },
    ],
    content: [
      'Labels a few words, sentence case: "Active, last 30 days".',
      'Notes say the change and its period: "+38 this week".',
      "A number as a number, so it follows the locale; units and amounts as strings you format.",
    ],
  },

  api: {
    props: [
      {
        name: "label",
        type: "ReactNode",
        default: "required",
        note: 'What\'s counted: "Total users".',
      },
      {
        name: "value",
        type: "ReactNode",
        default: "required",
        note: "A number is formatted for locale, as money with currency; pass a string for units and percentages.",
      },
      {
        name: "currency",
        type: "string",
        default: "—",
        note: 'An ISO code, "INR": money, a whole amount with no fraction.',
      },
      {
        name: "format",
        type: "Intl.NumberFormatOptions",
        default: "—",
        note: "Over the defaults, for a numeric value.",
      },
      { name: "note", type: "ReactNode", default: "—", note: "One line under the value." },
      {
        name: "tone",
        type: '"neutral" | "positive" | "negative" | "warning"',
        default: '"neutral"',
        note: "Colours the note.",
      },
      {
        name: "trend",
        type: "number[]",
        default: "—",
        note: "Recent values, oldest first, drawn as a small line: decorative.",
      },
      {
        name: "chart",
        type: "ReactNode",
        default: "—",
        note: "A small chart under the note, in a summary band: a Meter, a ShareBar.",
      },
      {
        name: "action",
        type: "ReactNode",
        default: "—",
        note: "A link at the cell's foot, into the list it counts.",
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        note: "Placeholders for the value and note; Loading is read instead.",
      },
      {
        name: "locale · messages",
        type: "string · object",
        default: "the provider's",
        note: "Formats a numeric value; the Loading string.",
      },
      {
        name: "StatGroup: children",
        type: "Stat[]",
        default: "—",
        note: "Side by side in equal ruled cells, at least 200px wide.",
      },
    ],
    parts: [
      { slot: "stat-group", element: "<dl>", note: "The strip." },
      { slot: "stat", element: "<div>", note: "One stat: aria-busy while loading." },
      { slot: "stat-label", element: "<dt>", note: "The term." },
      { slot: "stat-value", element: "<dd>", note: "The number." },
      { slot: "stat-trend", element: "<svg>", note: "aria-hidden." },
      { slot: "stat-note", element: "<dd>", note: "data-tone." },
    ],
    recipes: [
      {
        title: "A figure that isn't money",
        line: "format: Intl.NumberFormat options for a numeric value, such as a percentage.",
        file: "adoption.tsx",
        code: `<Stat label="Passkey adoption" value={0.72} format={{ style: "percent" }} />`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      { check: "Pairs", result: "A <dl>: each label is read with its value and note." },
      { check: "Trend", result: "aria-hidden: say what matters about it in note." },
      { check: "Loading", result: 'aria-busy, and "Loading" read in the value\'s place.' },
      { check: "Tone", result: "The note's colour only reinforces its words." },
    ],
    tested: DISPLAY_TESTED,
  },

  changelog: [
    {
      version: "0.2.0",
      items: [
        "currency and format: money and other figures formatted for the locale.",
        "chart and action: a small chart and a link into the list, for a summary band.",
      ],
    },
    {
      version: "0.1.0",
      items: [
        "loading: placeholders that hold the value's place.",
        "A wrapped StatGroup keeps the gutter, with no stray rules.",
        "locale follows the provider.",
      ],
    },
    {
      version: "0.0.3",
      items: [
        "Stat and StatGroup: key numbers in ruled cells; numeric values formatted for the locale; an optional decorative trend line, its last point the Ember mark. Server-safe.",
      ],
    },
  ],

  related: [
    { name: "Page header", when: "Its summary" },
    { name: "Meter", when: "A share or a limit" },
    { name: "Description list", when: "A record's facts" },
  ],
};
