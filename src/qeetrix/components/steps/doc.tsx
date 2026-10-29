// Components › Steps: its documentation, from @qeetrix/react 0.2.0 (experimental/steps), the
// Storybook stories (navigation/steps.stories.tsx) and the changelog. Its examples run live
// (Live.tsx); the figures are the real Steps, server-rendered.
import { Steps } from "@qeetrix/react/experimental";
import { NAV_TESTED } from "../navigation";
import type { ComponentDoc } from "../types";
import { ADD_APP, examples, SAML } from "./examples";

const Stage = ({ steps, current }: { steps: Array<{ label: string }>; current: number }) => (
  <div className="qc-steps-stage">
    <Steps steps={steps} current={current} />
  </div>
);

export const steps: ComponentDoc = {
  name: "Steps",
  slug: "steps",
  category: "navigation",
  status: "experimental",
  since: "0.0.6",
  lede: "Where a person is in a setup of a few steps: done, current and to come.",
  exports: ["Steps"],
  renders: "<ol>",
  source: "experimental/steps",
  story: "components/navigation/steps.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A wizard of three to five steps: add an application.",
      "A longer setup, vertical, with what each step chose.",
    ],
    notFor: [
      { text: "Instructions: how to do something", use: "Text" },
      { text: "Views to move between freely", use: "Tabs" },
      { text: "A task's progress, as a share", use: "Progress" },
    ],
    anatomyFigure: (
      <div className="qc-steps-stage" data-narrow="">
        <Steps steps={SAML} current={2} orientation="vertical" />
      </div>
    ),
    anatomy: [
      {
        slot: "done",
        select: '[data-state="done"] [data-slot="step-marker"]',
        element: "<span>",
        note: 'A done step: filled Ember, a tick; read "Completed".',
      },
      {
        slot: "current",
        select: '[aria-current="step"]',
        element: '<li aria-current="step">',
        note: "The current step: outlined Ember.",
      },
      {
        slot: "description",
        select: '[aria-current="step"] .qx-step-description',
        element: "<span>",
        note: "What the step is, or what was chosen: vertical only.",
      },
      {
        slot: "upcoming",
        select: '[data-state="upcoming"] [data-slot="step-marker"]',
        element: "<span>",
        note: 'A step to come: grey, numbered; read "Not started".',
      },
    ],
    rules: [
      {
        title: "A few steps, short names",
        doLine: "Four steps of a word or two.",
        dontLine: "Seven long names: nothing fits, and the end is far.",
        doIt: <Stage steps={ADD_APP} current={1} />,
        dontIt: (
          <Stage
            steps={[
              { label: "Choose the type of application" },
              { label: "Configure the redirect URLs" },
              { label: "Upload a logo" },
              { label: "Assign users" },
              { label: "Assign groups" },
              { label: "Set the session policy" },
              { label: "Review everything" },
            ]}
            current={1}
          />
        ),
      },
      {
        title: "Progress, not instructions",
        doLine: "Steps a person moves through, here.",
        dontLine: 'How-to steps: each is read "Not started".',
        doIt: <Stage steps={ADD_APP} current={2} />,
        dontIt: (
          <Stage
            steps={[
              { label: "Open Settings" },
              { label: "Choose Security" },
              { label: "Add a passkey" },
            ]}
            current={0}
          />
        ),
      },
    ],
    content: [
      "Labels a word or two, as nouns or verbs: Configure, Review.",
      "Descriptions say what was chosen: acme-idp-metadata.xml.",
      "Three to five steps; more wants a shorter flow.",
    ],
  },

  api: {
    props: [
      {
        name: "steps",
        type: "{ label, description?, status? }[]",
        default: "required",
        note: "The steps in order; description shows in the vertical layout; status overrides current's state for one step.",
      },
      {
        name: "current",
        type: "number",
        default: "required",
        note: "The current step's index, from 0; steps.length once all are done.",
      },
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        default: '"horizontal"',
        note: "Horizontal for a short wizard; vertical, with descriptions, for a longer setup.",
      },
      {
        name: "onStepSelect",
        type: "(index) => void",
        default: "—",
        note: "Done steps become buttons back to themselves. Without it, steps are text.",
      },
      {
        name: "messages",
        type: "object",
        default: "the provider's",
        note: 'The list\'s name, "Completed" and "Not started".',
      },
    ],
    parts: [
      { slot: "steps", element: "<ol>", note: 'Named "Progress"; data-orientation.' },
      { slot: "step", element: "<li>", note: "data-state: done, current or upcoming." },
      { slot: "step-marker", element: "<span>", note: "The tick or the number, aria-hidden." },
    ],
    recipes: [
      {
        title: "With a form per step",
        line: "Keep current in state; Continue moves on once the step's fields are valid, and Back or a done step goes back.",
        file: "add-application.tsx",
        code: `const [current, setCurrent] = useState(0);

<Steps steps={steps} current={current} onStepSelect={setCurrent} />
<Form onFormSubmit={() => setCurrent(current + 1)}>…</Form>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "To each done step, with onStepSelect." },
      { keys: ["Enter", "Space"], action: "Goes back to it." },
    ],
    checks: [
      { check: "List", result: 'An ordered list named "Progress": its length is read.' },
      { check: "Current", result: 'aria-current="step" on the current step.' },
      {
        check: "State",
        result: 'Others are read with "Completed" or "Not started" after the name.',
      },
      { check: "Narrow", result: "Only the current label shows; every name is still read." },
    ],
    tested: NAV_TESTED,
  },

  changelog: [
    {
      version: "0.2.0",
      items: [
        'A step\'s status: "failed" or "attention", or done, current and upcoming set outright.',
      ],
    },
    { version: "0.1.0", items: ["Names have no stray space."] },
    {
      version: "0.0.6",
      items: [
        "Steps: done steps filled Ember with a tick, the current one outlined Ember, those to come grey, joined by a line that turns Ember behind them. Horizontal for short wizards (only the current label where it's narrow), vertical with descriptions for longer ones. onStepSelect makes done steps buttons back to themselves.",
      ],
    },
  ],

  related: [
    { name: "Form", when: "A step's fields" },
    { name: "Progress", when: "A share of a task" },
    { name: "Tabs", when: "Views in any order" },
  ],
};
