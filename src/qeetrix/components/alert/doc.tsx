// Components › Alert: its documentation, from @qeetrix/react 0.2.0 (experimental/alert), the
// Storybook stories (feedback/alert.stories.tsx) and the changelog. Its examples run live
// (Live.tsx); the figures are the real Alert, server-rendered.
import { Button } from "@qeetrix/react";
import { Alert } from "@qeetrix/react/experimental";
import type { ReactNode } from "react";
import { FEEDBACK_TESTED } from "../feedback";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

const Stage = ({ children }: { children: ReactNode }) => (
  <div className="qc-alert-stage">{children}</div>
);

export const alert: ComponentDoc = {
  name: "Alert",
  slug: "alert",
  category: "feedback",
  status: "experimental",
  since: "0.0.4",
  lede: "A message in the page: above a form, in a card, or across the top as a banner. It never takes focus, and never goes by itself.",
  exports: ["Alert"],
  renders: "<div>",
  source: "experimental/alert",
  story: "components/feedback/alert.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Why a form can't go on, above it.",
      "A state of the page: a sync behind, a trial ending.",
      "A notice about the whole app, as a banner.",
    ],
    notFor: [
      { text: "A passing confirmation", use: "Toast" },
      { text: "A field's error", use: "Text field" },
      { text: "A question that needs an answer", use: "Dialog" },
    ],
    anatomyFigure: (
      <Stage>
        <Alert
          tone="danger"
          title="Directory sync failed"
          actions={<Button size="sm">Retry sync</Button>}
          onDismiss={() => {}}
        >
          The last three attempts timed out.
        </Alert>
      </Stage>
    ),
    anatomy: [
      {
        slot: "alert-icon",
        element: "<svg>",
        note: "The tone's icon, aria-hidden; the 3px edge beside it.",
      },
      {
        slot: "alert-title",
        element: "<div>",
        note: 'What happened, led by a hidden word: "Error:".',
      },
      { slot: "alert-description", element: "<div>", note: "Why, and what to do." },
      { slot: "alert-actions", element: "<div>", note: "One primary action at most." },
      {
        slot: "dismiss",
        select: '[data-slot="alert"] > [data-slot="icon-button"]',
        element: "<button>",
        note: 'With onDismiss: "Dismiss".',
      },
    ],
    rules: [
      {
        title: "Say what to do",
        doLine: "What happened, and what to do about it.",
        dontLine: "An error with nowhere to go.",
        doIt: (
          <Stage>
            <Alert tone="danger" title="Directory sync failed">
              Azure AD rejected the client secret. Update it in Settings.
            </Alert>
          </Stage>
        ),
        dontIt: (
          <Stage>
            <Alert tone="danger" title="Error">
              Something went wrong.
            </Alert>
          </Stage>
        ),
      },
      {
        title: "The tone that's meant",
        doLine: "Warning for a risk; danger only for what failed.",
        dontLine: "Danger for a notice: the page shouts.",
        doIt: (
          <Stage>
            <Alert tone="warning" title="Your trial ends in 3 days" />
          </Stage>
        ),
        dontIt: (
          <Stage>
            <Alert tone="danger" title="Your trial ends in 3 days" />
          </Stage>
        ),
      },
    ],
    content: [
      'Titles say what happened, in a few words: "Directory sync failed".',
      "The description says why, and what to do, in a sentence or two.",
      "No exclamation marks; no Error or Warning in the title: the hidden word says it.",
    ],
  },

  api: {
    props: [
      {
        name: "tone",
        type: '"info" | "success" | "warning" | "danger"',
        default: '"info"',
        note: "The icon and a hidden word carry it, never colour alone.",
      },
      {
        name: "variant",
        type: '"default" | "banner"',
        default: '"default"',
        note: "In the page; or a banner about the whole app, one line across it.",
      },
      {
        name: "title",
        type: "ReactNode",
        default: "required",
        note: "What happened, in a few words.",
      },
      { name: "children", type: "ReactNode", default: "—", note: "Why, and what to do." },
      {
        name: "actions",
        type: "ReactNode",
        default: "—",
        note: "Buttons or links; a banner's at its end.",
      },
      {
        name: "icon",
        type: "QeetrixIcon",
        default: "the tone's",
        note: "In place of the tone's icon.",
      },
      {
        name: "onDismiss",
        type: "() => void",
        default: "—",
        note: "Adds Dismiss. Whether it comes back is yours.",
      },
      {
        name: "announce",
        type: '"polite" | "urgent"',
        default: "—",
        note: 'Only for an alert that appears: role="status", or role="alert" to interrupt.',
      },
    ],
    parts: [
      {
        slot: "alert",
        element: "<div>",
        note: "data-tone, data-variant; role only with announce.",
      },
      { slot: "alert-icon", element: "<svg>", note: "aria-hidden." },
      { slot: "alert-body", element: "<div>", note: "The text and the actions." },
      { slot: "alert-title", element: "<div>", note: "With the hidden tone word." },
      { slot: "alert-description", element: "<div>", note: "The children." },
      { slot: "alert-actions", element: "<div>", note: "The actions." },
    ],
    recipes: [
      {
        title: "Banners in the app shell",
        line: "AppShell's banners hold page banners, under the top bar and above everything else.",
        file: "console.tsx",
        code: `import { Alert, AppShell } from "@qeetrix/react/experimental";

<AppShell banners={impersonating && <Alert variant="banner" tone="warning" icon={EyeIcon} title="You're viewing as Priya Sharma" />} …>
  …
</AppShell>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "To its actions and Dismiss; it never takes focus itself." },
    ],
    checks: [
      {
        check: "Tone in words",
        result: 'A hidden word leads the title: "Warning: Directory sync is behind".',
      },
      {
        check: "Announced",
        result: "Only with announce, for an alert that appears: status politely, alert at once.",
      },
      { check: "Time", result: "It never disappears by itself." },
      {
        check: "Forced colours",
        result: "A CanvasText border, with the 3px edge at its start; a banner keeps its rule.",
      },
    ],
    tested: FEEDBACK_TESTED,
  },

  changelog: [
    {
      version: "0.1.0",
      items: ["A wrapped banner keeps its icon and Dismiss on the first line."],
    },
    {
      version: "0.0.8",
      items: [
        'variant="banner": a notice about the whole app, one line across the page, its actions and Dismiss at the end; icon, in place of the tone\'s.',
      ],
    },
    {
      version: "0.0.3",
      items: [
        "Alert: info, success, warning or danger on the status tint with the 3px status edge; a title led by a hidden tone word, a description, actions and an optional Dismiss. announce makes it a status or an alert only when it appears.",
      ],
    },
  ],

  related: [
    { name: "Toast", when: "A passing confirmation" },
    { name: "Empty state", when: "Nothing to show" },
    { name: "Form", when: "Its error summary" },
  ],
};
