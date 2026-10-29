// Components › Meter: its documentation, from @qeetrix/react 0.2.0 (progress.d.ts, progress.js),
// the Storybook stories (data-display/meter.stories.tsx) and the changelog. Its examples and
// figures are the real Meter, server-rendered.
import { Meter, Progress } from "@qeetrix/react";
import type { ReactNode } from "react";
import { FEEDBACK_TESTED } from "../feedback";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

const Stage = ({ children }: { children: ReactNode }) => (
  <div className="qc-bar-stage">{children}</div>
);

export const meter: ComponentDoc = {
  name: "Meter",
  slug: "meter",
  category: "feedback",
  status: "stable",
  since: "0.0.2",
  lede: "A measurement within a range: storage used, a quota spent. It looks like Progress; it isn't a task.",
  exports: ["Meter"],
  renders: '<div role="meter">',
  source: "progress",
  story: "components/data-display/meter.stories.tsx",
  examples,

  usage: {
    useFor: ["A limit and how close it is: seats, storage, API calls.", "Plan usage, in a card."],
    notFor: [
      { text: "A task on its way", use: "Progress" },
      { text: "A key number alone", use: "Stat" },
    ],
    anatomyFigure: (
      <Stage>
        <Meter label="API quota used" showValue value={84} tone="warning" />
      </Stage>
    ),
    anatomy: [
      { slot: "meter-header", element: "<div>", note: "The label, then the value." },
      { slot: "meter-track", element: "<div>", note: "4px, the whole range." },
      { slot: "meter-indicator", element: "<div>", note: "The measure, in the tone." },
    ],
    rules: [
      {
        title: "A tone for how it stands",
        doLine: "Warning near the limit, danger at it: the words say so too.",
        dontLine: "Danger for an amount that's fine.",
        doIt: (
          <Stage>
            <Meter label="SMS credits used" showValue value={84} tone="warning" />
          </Stage>
        ),
        dontIt: (
          <Stage>
            <Meter label="SMS credits used" showValue value={24} tone="danger" />
          </Stage>
        ),
      },
      {
        title: "A meter, not a progress bar",
        doLine: 'role="meter": read as a measurement.',
        dontLine: "A Progress for storage: read as a task that's 68% done.",
        doIt: (
          <Stage>
            <Meter label="Storage used" showValue value={68} />
          </Stage>
        ),
        dontIt: (
          <Stage>
            <Progress label="Storage used" showValue value={68} />
          </Stage>
        ),
      },
    ],
    content: [
      'Labels name what\'s measured: "API quota used".',
      "A count or a unit where a percentage hides it: 47 of 100 members.",
      "Say what to do near a limit, beside it: Upgrade, or Buy credits.",
    ],
  },

  api: {
    props: [
      {
        name: "value",
        type: "number",
        default: "required",
        note: "The measurement, from min to max.",
      },
      { name: "min · max", type: "number", default: "0 · 100", note: "The range." },
      {
        name: "target",
        type: "number",
        default: "—",
        note: "A goal on the range: a tick on the track, in the read-out too. It mirrors in right to left.",
      },
      {
        name: "label",
        type: "ReactNode",
        default: "—",
        note: "The visible label; without one, an aria-label.",
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
        default: "a percentage",
        note: 'How the value is written and read: { style: "unit", unit: "gigabyte" }.',
      },
      {
        name: "tone",
        type: '"brand" | "neutral" | "info" | "success" | "warning" | "danger"',
        default: '"brand"',
        note: "neutral or info for a plain amount; success, warning or danger for how it stands.",
      },
      {
        name: "locale · messages",
        type: "string · object",
        default: "the provider's",
        note: "Formats the value; the read-out with a target.",
      },
    ],
    parts: [
      {
        slot: "meter",
        element: '<div role="meter">',
        note: "aria-valuenow, aria-valuetext; data-tone.",
      },
      { slot: "meter-header", element: "<div>", note: "The label and the value." },
      { slot: "meter-track", element: "<div>", note: "The track." },
      { slot: "meter-indicator", element: "<div>", note: "The bar." },
      { slot: "meter-target", element: "<span>", note: "target's tick, aria-hidden." },
    ],
    recipes: [
      {
        title: "Near a limit",
        line: "Turn the tone with the value, and put the way out beside it.",
        file: "plan-usage.tsx",
        code: `const tone = used / limit >= 0.95 ? "danger" : used / limit >= 0.8 ? "warning" : "brand";

<Meter label="SMS credits used" showValue value={used} max={limit} tone={tone} />`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      { check: "Role", result: "meter, with its value and the formatted text." },
      { check: "Name", result: "The label names it, or aria-label." },
      { check: "Tone", result: "Colour only reinforces the words and the value." },
    ],
    tested: FEEDBACK_TESTED,
  },

  changelog: [
    {
      version: "0.2.0",
      items: ["target: a goal on the range, drawn as a tick and read with the value."],
    },
    { version: "0.1.0", items: ["Tones neutral and info."] },
    {
      version: "0.0.2",
      items: ["Meter: Slider's header, a 4px track and an indicator in a status tone."],
    },
  ],

  related: [
    { name: "Progress", when: "A task" },
    { name: "Stat", when: "A key number" },
    { name: "Card", when: "Plan usage" },
  ],
};
