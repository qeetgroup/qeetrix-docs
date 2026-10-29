// Components › Progress: its documentation, from @qeetrix/react 0.2.0 (progress.d.ts,
// progress.js), the Storybook stories (feedback/progress.stories.tsx) and the changelog. Its
// examples run live (Live.tsx); the figures are the real Progress, server-rendered.
import { Progress } from "@qeetrix/react";
import type { ReactNode } from "react";
import { FEEDBACK_TESTED } from "../feedback";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

const Stage = ({ children }: { children: ReactNode }) => (
  <div className="qc-bar-stage">{children}</div>
);

export const progress: ComponentDoc = {
  name: "Progress",
  slug: "progress",
  category: "feedback",
  status: "stable",
  since: "0.0.2",
  lede: "A task advancing: an upload, an import. Unknown while its end is unknown; its tone says how it ended.",
  exports: ["Progress"],
  renders: '<div role="progressbar">',
  source: "progress",
  story: "components/feedback/progress.stories.tsx",
  examples,

  usage: {
    useFor: ["An upload or an import, with a known end.", "A long job, before its end is known."],
    notFor: [
      { text: "A measurement: storage used", use: "Meter" },
      { text: "A short wait", use: "Spinner" },
      { text: "Steps of a flow", use: "Steps" },
    ],
    anatomyFigure: (
      <Stage>
        <Progress label="Uploading invoices.csv" showValue value={40} />
      </Stage>
    ),
    anatomy: [
      { slot: "progress-header", element: "<div>", note: "The label, then the value." },
      { slot: "progress-track", element: "<div>", note: "4px, the whole range." },
      { slot: "progress-indicator", element: "<div>", note: "How far: Ember, or the tone." },
    ],
    rules: [
      {
        title: "Progress, not amounts",
        doLine: "A task on its way to done.",
        dontLine: "Storage used: it isn't a task. Use a Meter.",
        doIt: (
          <Stage>
            <Progress label="Uploading invoices.csv" showValue value={40} />
          </Stage>
        ),
        dontIt: (
          <Stage>
            <Progress label="Storage used" showValue value={84} />
          </Stage>
        ),
      },
      {
        title: "Say how it ended",
        doLine: "Success or danger once it's over, with words to match.",
        dontLine: "A bar left at 72%, still Ember: did it stop?",
        doIt: (
          <Stage>
            <Progress label="Couldn't upload payroll-oct.csv" showValue value={72} tone="danger" />
          </Stage>
        ),
        dontIt: (
          <Stage>
            <Progress label="Uploading payroll-oct.csv" showValue value={72} />
          </Stage>
        ),
      },
    ],
    content: [
      'Labels say the task and its object: "Uploading invoices.csv".',
      "When it ends, the label says so: Uploaded, Couldn't upload.",
      "A count beside it, where people count: 1,360 of 2,000 users.",
    ],
  },

  api: {
    props: [
      {
        name: "value",
        type: "number | null",
        default: "required",
        note: "How far, from min to max; null while that's unknown.",
      },
      {
        name: "min · max",
        type: "number",
        default: "0 · 100",
        note: "An empty track, and a full one.",
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
        note: "How the value is written and read.",
      },
      {
        name: "tone",
        type: '"brand" | "success" | "danger"',
        default: '"brand"',
        note: "success for a task that finished, danger for one that failed.",
      },
      { name: "locale", type: "string", default: "the provider's", note: "Formats the value." },
    ],
    parts: [
      { slot: "progress", element: '<div role="progressbar">', note: "aria-valuenow; data-tone." },
      { slot: "progress-header", element: "<div>", note: "The label and the value." },
      { slot: "progress-track", element: "<div>", note: "The track." },
      { slot: "progress-indicator", element: "<div>", note: "The bar." },
    ],
    recipes: [
      {
        title: "From an upload",
        line: "Feed it the bytes sent; when it ends, turn it success or danger and say so in the label.",
        file: "upload.tsx",
        code: `const [sent, setSent] = useState(0);
xhr.upload.onprogress = (event) => setSent(event.loaded / event.total);

<Progress label={label} showValue value={sent * 100} tone={failed ? "danger" : done ? "success" : "brand"} />`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      { check: "Role", result: "progressbar, with its value, read as the formatted text." },
      { check: "Name", result: "The label names it, or aria-label." },
      {
        check: "Unknown",
        result: "value={null}: no value is read; the segment fades under reduced motion.",
      },
      { check: "Forced colours", result: "The bar is drawn in Highlight." },
    ],
    tested: FEEDBACK_TESTED,
  },

  changelog: [
    { version: "0.1.0", items: ["tone: brand, success or danger."] },
    {
      version: "0.0.2",
      items: [
        "Progress: Slider's header, a 4px track and an Ember indicator. Indeterminate progress slides, and fades under reduced motion.",
      ],
    },
  ],

  related: [
    { name: "Meter", when: "A measurement" },
    { name: "Spinner", when: "A short wait" },
    { name: "File upload", when: "Files on their way" },
  ],
};
