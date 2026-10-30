// Components › Toast: its documentation, from @qeetrix/react 0.2.0 (toast.d.ts, toast.js), the
// Storybook stories (feedback/toast.stories.tsx) and the changelog. Its examples show real toasts
// (Live.tsx); the anatomy and the do-and-don'ts draw one still (still.tsx).
import { OVERLAY_TESTED } from "../overlays";
import { StillToast } from "../still";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const toast: ComponentDoc = {
  name: "Toast",
  slug: "toast",
  category: "overlays",
  status: "stable",
  since: "0.0.2",
  lede: "A brief word that something happened, at the bottom end. One action at most, such as Undo.",
  exports: ["ToastProvider", "useToast"],
  renders: '<div role="region">',
  source: "toast",
  story: "components/feedback/toast.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Confirming something done: sent, saved, removed.",
      "Undo, for a moment.",
      "Work finishing in the background.",
    ],
    notFor: [
      { text: "A problem with the page that must be fixed", use: "Alert" },
      { text: "A decision", use: "Dialog" },
      { text: "Errors on a form", use: "Form" },
    ],
    anatomyFigure: (
      <div className="qc-anat-field">
        <StillToast
          tone="success"
          title="Priya Sharma removed"
          description="From Acme Pvt Ltd."
          action="Undo"
        />
      </div>
    ),
    anatomy: [
      { slot: "toast-icon", element: "<svg>", note: "The tone's icon, 16px, on the title's line." },
      { slot: "toast-title", element: "<h2>", note: "What happened, in a few words." },
      { slot: "toast-description", element: "<p>", note: "One more line, if it helps." },
      {
        slot: "toast-action",
        select: ".qx-toast-action",
        element: "<button>",
        note: "One action at most: Undo.",
      },
      {
        slot: "close",
        select: '[data-slot="toast"] > [data-slot="icon-button"]',
        element: "<button>",
        note: "Close, neutral.",
      },
    ],
    rules: [
      {
        title: "What happened, in a few words",
        doLine: "The fact, then one line if it helps.",
        dontLine: "A paragraph that's gone in five seconds.",
        doIt: <StillToast tone="success" title="Invoice sent" description="To finance@acme.in." />,
        dontIt: (
          <StillToast
            tone="success"
            title="Your invoice has been successfully sent to the finance team, who will review it shortly."
          />
        ),
      },
      {
        title: "Not for what must be fixed",
        doLine: "A failure the page can't continue past belongs in the page: an Alert.",
        dontLine: "A toast for a broken form, gone before it's read.",
        doIt: (
          <StillToast
            tone="danger"
            title="Couldn't send the invoice"
            description="The network dropped."
            action="Retry"
          />
        ),
        dontIt: <StillToast tone="danger" title="3 fields have errors" />,
      },
    ],
    content: [
      'Titles in the past tense: "Invoice sent", "Priya Sharma removed".',
      'One action, a verb: "Undo", "Retry".',
      "Danger stays until closed: say what failed and what to do.",
    ],
  },

  api: {
    props: [
      {
        name: "ToastProvider: limit",
        type: "number",
        default: "3",
        note: "The most shown at once; older ones wait.",
      },
      {
        name: "ToastProvider: timeout",
        type: "number",
        default: "5000",
        note: "Milliseconds before one closes, unless it sets its own.",
      },
      {
        name: "useToast().add",
        type: "(options) => string",
        default: "—",
        note: "Shows a toast; returns its id.",
      },
      {
        name: "useToast().update · close",
        type: "(id, options) · (id?)",
        default: "—",
        note: "Changes one that's showing; closes one, or all.",
      },
      {
        name: "useToast().promise",
        type: "(promise, { loading, success, error })",
        default: "—",
        note: "A spinner while pending, then success or error; returns the promise.",
      },
      {
        name: "options: title · description",
        type: "ReactNode",
        default: "—",
        note: "What happened; one more line.",
      },
      {
        name: "options: tone",
        type: '"info" | "success" | "warning" | "danger"',
        default: '"info"',
        note: "danger stays until dismissed and is announced at once.",
      },
      {
        name: "options: action",
        type: "{ label, onClick }",
        default: "—",
        note: "At most one: Undo.",
      },
      {
        name: "options: timeout · id · onClose",
        type: "…",
        default: "5000 · —",
        note: "Its own time; your own id; called however it closes.",
      },
    ],
    parts: [
      {
        slot: "toast-viewport",
        element: '<div role="region">',
        note: 'The region: a landmark named "Notifications", at the bottom end, reached with F6.',
      },
      {
        slot: "toast",
        element: '<div role="dialog">',
        note: 'One toast: data-tone; data-loading while a promise is pending. A danger one is role="alertdialog".',
      },
      { slot: "toast-icon", element: "<svg>", note: "Its icon, or a spinner." },
      { slot: "toast-content", element: "<div>", note: "toast-title and toast-description." },
    ],
    recipes: [
      {
        title: "Once, at the root",
        line: "ToastProvider wraps the app once; useToast works anywhere inside it.",
        file: "app.tsx",
        code: `<QeetrixProvider locale="en-IN">
  <ToastProvider>
    <App />
  </ToastProvider>
</QeetrixProvider>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["F6"], action: "Moves to the Notifications region." },
      { keys: ["Tab"], action: "Through a toast's action and Close." },
      { keys: ["Esc"], action: "Closes the focused toast." },
    ],
    checks: [
      { check: "Announced", result: "Politely; a danger toast at once, assertively." },
      {
        check: "Time",
        result: "Toasts pause while hovered or focused; danger ones stay until closed.",
      },
      { check: "Region", result: 'A landmark named "Notifications", at the bottom end.' },
      { check: "Touch", result: "Swipe one away." },
    ],
    tested: OVERLAY_TESTED,
  },

  changelog: [
    { version: "0.1.1", items: ["Its icon is 16px, Alert's size, centred on the title's line."] },
    {
      version: "0.1.0",
      items: [
        "A danger toast passes axe and is still announced assertively.",
        "useToast is stable.",
        "Its close button uses the neutral tone.",
      ],
    },
    {
      version: "0.0.2",
      items: [
        "ToastProvider and useToast: add, close, update and promise; tones info, success, warning and danger, each with a 3px status edge and a sharp icon; one action at most; danger toasts stay until dismissed and are announced at once.",
      ],
    },
  ],

  related: [
    { name: "Alert", when: "A message in the page" },
    { name: "Dialog", when: "A decision" },
    { name: "Progress", when: "Work under way" },
  ],
};
