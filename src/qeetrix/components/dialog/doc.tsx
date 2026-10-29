// Components › Dialog: its documentation, from @qeetrix/react 0.2.0 (dialog.d.ts, dialog.js), the
// Storybook stories (overlays/dialog.stories.tsx) and the changelog. Its examples open the real
// dialog (Live.tsx); the anatomy and the do-and-don'ts draw it still (still.tsx).
import { Button, TextField } from "@qeetrix/react";
import { OVERLAY_TESTED } from "../overlays";
import { StillDialog } from "../still";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const dialog: ComponentDoc = {
  name: "Dialog",
  slug: "dialog",
  category: "overlays",
  status: "stable",
  since: "0.0.2",
  lede: "A focused decision or a short task, over the page. Danger and warning ask before something happens.",
  exports: [
    "Dialog",
    "DialogTrigger",
    "DialogContent",
    "DialogBody",
    "DialogFooter",
    "DialogClose",
  ],
  renders: '<div role="dialog">',
  source: "dialog",
  story: "components/overlays/dialog.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A decision that stops the page: revoke, delete, turn off.",
      "A short task: edit a profile, invite a person.",
      "Terms to read and accept.",
    ],
    notFor: [
      { text: "A task beside the page, with the page in view", use: "Drawer" },
      { text: "A few options from a button", use: "Menu" },
      { text: "Content anchored to its trigger", use: "Popover" },
      { text: "Saying something happened", use: "Toast" },
    ],
    anatomyFigure: (
      <div className="qc-anat-wide">
        <StillDialog
          title="Edit profile"
          description="Members of Acme Pvt Ltd see this name."
          body={<TextField label="Display name" defaultValue="Priya Sharma" />}
          footer={
            <>
              <Button variant="ghost">Cancel</Button>
              <Button>Save changes</Button>
            </>
          }
        />
      </div>
    ),
    anatomy: [
      {
        slot: "dialog-title",
        element: "<h2>",
        note: "The question or the task; it names the dialog.",
      },
      {
        slot: "dialog-description",
        element: "<p>",
        note: "A line under it; it describes the dialog.",
      },
      {
        slot: "dialog-body",
        element: "<div>",
        note: "The content; it scrolls when the dialog is at its tallest.",
      },
      {
        slot: "dialog-footer",
        element: "<div>",
        note: "The actions, end-aligned: the least destructive first.",
      },
      {
        slot: "dialog-close",
        element: "<div>",
        note: "Close: last in the focus order, so focus lands on the content first.",
      },
    ],
    rules: [
      {
        title: "The title asks the question",
        doLine: "What's about to happen, and what follows.",
        dontLine: '"Are you sure?": sure of what?',
        doIt: (
          <StillDialog
            intent="danger"
            dismissible={false}
            title="Revoke this API key?"
            description="The qeet-pay reconciler stops working at once."
            footer={
              <>
                <Button variant="ghost">Cancel</Button>
                <Button tone="danger">Revoke key</Button>
              </>
            }
          />
        ),
        dontIt: (
          <StillDialog
            intent="danger"
            dismissible={false}
            title="Are you sure?"
            description="This action cannot be undone."
            footer={
              <>
                <Button variant="ghost">No</Button>
                <Button tone="danger">Yes</Button>
              </>
            }
          />
        ),
      },
      {
        title: "Buttons say what they do",
        doLine: "Cancel, then the action in its own words.",
        dontLine: "OK and Cancel: which one revokes?",
        doIt: (
          <StillDialog
            title="Turn off passkey enforcement?"
            description="Members can sign in with a password again."
            intent="warning"
            footer={
              <>
                <Button variant="ghost">Cancel</Button>
                <Button>Turn off</Button>
              </>
            }
          />
        ),
        dontIt: (
          <StillDialog
            title="Turn off passkey enforcement?"
            description="Members can sign in with a password again."
            intent="warning"
            footer={
              <>
                <Button>OK</Button>
                <Button variant="ghost">Cancel</Button>
              </>
            }
          />
        ),
      },
    ],
    content: [
      'The title is the question or the task: "Revoke this API key?", "Edit profile".',
      'The description says what follows, plainly: "This can\'t be undone."',
      'Buttons are verbs: "Revoke key", never "OK" or "Yes".',
    ],
  },

  api: {
    props: [
      {
        name: "Dialog: open · defaultOpen · onOpenChange",
        type: "boolean",
        default: "false",
        note: "Its open state, controlled or not.",
      },
      {
        name: "Dialog: intent",
        type: '"standard" | "warning" | "danger"',
        default: '"standard"',
        note: "warning and danger are alert dialogs, with an amber or red line.",
      },
      {
        name: "Dialog: dismissible",
        type: "boolean",
        default: "true; false for danger",
        note: "Whether Escape, an outside click and the close button dismiss it.",
      },
      {
        name: "DialogContent: title",
        type: "ReactNode",
        default: "required",
        note: "The question or the task; it labels the dialog.",
      },
      {
        name: "DialogContent: description",
        type: "ReactNode",
        default: "—",
        note: "A line under the title; it describes the dialog.",
      },
      {
        name: "DialogContent: size",
        type: '"sm" | "md" | "lg" | "xl" | "fullscreen"',
        default: '"md"',
        note: "400, 560, 800 or 1120px; or the whole viewport.",
      },
      {
        name: "DialogContent: initialFocus",
        type: "…",
        default: "the first field",
        note: "Where focus lands as it opens.",
      },
      {
        name: "DialogFooter: start",
        type: "ReactNode",
        default: "—",
        note: "A quiet link or a one-line summary at the footer's start; the actions stay at its end.",
      },
      {
        name: "DialogTrigger · DialogClose: render",
        type: "ReactElement",
        default: "—",
        note: "Your own control: render={<Button>…</Button>}.",
      },
    ],
    parts: [
      { slot: "dialog-backdrop", element: "<div>", note: "The scrim." },
      { slot: "dialog-viewport", element: "<div>", note: "Centres the dialog." },
      {
        slot: "dialog-popup",
        element: '<div role="dialog">',
        note: 'The dialog: data-intent, data-size; role="alertdialog" for warning and danger.',
      },
      { slot: "dialog-header", element: "<div>", note: "dialog-title and dialog-description." },
      { slot: "dialog-body", element: "<div>", note: "DialogBody." },
      { slot: "dialog-footer", element: "<div>", note: "DialogFooter." },
      { slot: "dialog-footer-start", element: "<div>", note: "start: before the actions." },
      { slot: "dialog-close", element: "<div>", note: "The close button, when it's dismissible." },
    ],
    recipes: [
      {
        title: "Close when the work is done",
        line: "Control it: close once the action has succeeded, and keep it open with the error if it fails.",
        file: "delete-users.tsx",
        code: `const [open, setOpen] = useState(false);

<Dialog intent="danger" open={open} onOpenChange={setOpen}>
  <DialogTrigger render={<Button tone="danger">Delete users</Button>} />
  <DialogContent title="Delete 3 users?" size="sm">
    <DialogFooter>
      <DialogClose render={<Button variant="ghost">Cancel</Button>} />
      <Button tone="danger" loading={pending} onClick={async () => { await deleteUsers(); setOpen(false); }}>Delete users</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Enter", "Space"], action: "On its trigger: opens it." },
      { keys: ["Tab"], action: "Moves through the dialog; focus stays inside while it's open." },
      { keys: ["Esc"], action: "Closes it, when it's dismissible; focus returns to the trigger." },
    ],
    checks: [
      {
        check: "Role and name",
        result:
          'role="dialog", or "alertdialog" for warning and danger; named by its title, described by its description.',
      },
      {
        check: "Focus on open",
        result:
          "The first field, or else the footer's first, least destructive action: the close button comes last.",
      },
      { check: "Focus on close", result: "Back to the element that opened it." },
      { check: "Outside click", result: "Closes a standard dialog; never an alert dialog." },
      {
        check: "Scrolling body",
        result: "With nothing to focus in it, it takes focus, so it can be scrolled with the keys.",
      },
    ],
    tested: OVERLAY_TESTED,
  },

  changelog: [
    {
      version: "0.2.0",
      items: [
        "DialogFooter: start, a link or summary before the actions.",
        "Opened from the keyboard, the first Escape closes it: Close shows no tooltip.",
      ],
    },
    {
      version: "0.1.0",
      items: [
        "Sizes xl (1120px) and fullscreen.",
        "A scrolling body with nothing focusable can be scrolled from the keyboard.",
        "Its close button uses the neutral tone, not Ember.",
      ],
    },
    {
      version: "0.0.2",
      items: [
        "Dialog: intent standard, danger or warning, the last two as alert dialogs with a red or amber line; dismissible, off by default for danger; sizes 400, 560 and 800px; the close button last in the focus order.",
      ],
    },
  ],

  related: [
    { name: "Drawer", when: "A task beside the page" },
    { name: "Popover", when: "Anchored to its trigger" },
    { name: "Toast", when: "Something happened" },
    { name: "Button", when: "Its trigger and actions" },
  ],
};
