// Components › Drawer: its documentation, from @qeetrix/react 0.2.0 (drawer.d.ts, drawer.js), the
// Storybook stories (overlays/drawer.stories.tsx) and the changelog. Its examples open the real
// drawer (Live.tsx); the anatomy and the do-and-don'ts draw it still (still.tsx).
import { Button, TextField } from "@qeetrix/react";
import { OVERLAY_TESTED } from "../overlays";
import { StillDialog, StillDrawer } from "../still";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const drawer: ComponentDoc = {
  name: "Drawer",
  slug: "drawer",
  category: "overlays",
  status: "stable",
  since: "0.0.2",
  lede: "A full-height panel from the edge: a task beside the page, with the page still in view.",
  exports: [
    "Drawer",
    "DrawerTrigger",
    "DrawerContent",
    "DrawerBody",
    "DrawerFooter",
    "DrawerClose",
  ],
  renders: '<div role="dialog">',
  source: "drawer",
  story: "components/overlays/drawer.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Editing one row of a list without leaving it.",
      "A longer form or detail that needs height.",
      "Filters and settings beside what they change.",
    ],
    notFor: [
      { text: "A decision that stops the page", use: "Dialog" },
      { text: "A few fields anchored to a control", use: "Popover" },
      { text: "The console's own navigation", use: "Sidebar" },
    ],
    anatomyFigure: (
      <div className="qc-anat-wide">
        <StillDrawer
          title="Priya Sharma"
          description="Engineering · joined 2 March 2026"
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
      { slot: "drawer-title", element: "<h2>", note: "Names the drawer." },
      {
        slot: "drawer-description",
        element: "<p>",
        note: "A line under it; it describes the drawer.",
      },
      {
        slot: "drawer-body",
        element: "<div>",
        note: "Scrolls; its text can be selected without starting a swipe.",
      },
      { slot: "drawer-footer", element: "<div>", note: "The actions, under a rule, end-aligned." },
      { slot: "drawer-close", element: "<div>", note: "Close, when it's dismissible." },
    ],
    rules: [
      {
        title: "A task, not a question",
        doLine: "Editing beside the list: a drawer.",
        dontLine: "A one-line question in a full-height panel.",
        doIt: (
          <StillDrawer
            title="Priya Sharma"
            body={<TextField label="Display name" defaultValue="Priya Sharma" />}
            footer={
              <>
                <Button variant="ghost">Cancel</Button>
                <Button>Save changes</Button>
              </>
            }
          />
        ),
        dontIt: (
          <StillDrawer
            title="Revoke this key?"
            body={null}
            footer={
              <>
                <Button variant="ghost">Cancel</Button>
                <Button tone="danger">Revoke</Button>
              </>
            }
          />
        ),
      },
      {
        title: "Decisions in a dialog",
        doLine: "Revoking stops the page: a dialog asks.",
        dontLine: "A destructive question at the edge of the page.",
        doIt: (
          <StillDialog
            intent="danger"
            dismissible={false}
            title="Revoke this key?"
            description="The reconciler stops at once."
            footer={
              <>
                <Button variant="ghost">Cancel</Button>
                <Button tone="danger">Revoke key</Button>
              </>
            }
          />
        ),
        dontIt: (
          <StillDrawer
            title="Revoke this key?"
            description="The reconciler stops at once."
            body={null}
            footer={<Button tone="danger">Revoke key</Button>}
          />
        ),
      },
    ],
    content: [
      "The title names what's open: a person, an app.",
      'The description places it: "Engineering · joined 2 March 2026".',
      "Footer actions as in a dialog: Cancel, then the action in its own words.",
    ],
  },

  api: {
    props: [
      {
        name: "Drawer: open · defaultOpen · onOpenChange",
        type: "boolean",
        default: "false",
        note: "Its open state.",
      },
      {
        name: "Drawer: side",
        type: '"start" | "end"',
        default: '"end"',
        note: "The edge it opens from; right to left needs Base UI's DirectionProvider.",
      },
      {
        name: "Drawer: dismissible",
        type: "boolean",
        default: "true",
        note: "Whether Escape, an outside click, a swipe and Close dismiss it.",
      },
      {
        name: "DrawerContent: title",
        type: "ReactNode",
        default: "required",
        note: "Names the drawer.",
      },
      {
        name: "DrawerContent: description",
        type: "ReactNode",
        default: "—",
        note: "Describes it.",
      },
      {
        name: "DrawerContent: size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        note: "400, 560 or 800px wide.",
      },
      {
        name: "DrawerFooter: start",
        type: "ReactNode",
        default: "—",
        note: "A quiet link or a one-line summary at the footer's start; the actions stay at its end.",
      },
      {
        name: "DrawerTrigger · DrawerClose: render",
        type: "ReactElement",
        default: "—",
        note: "Your own control.",
      },
    ],
    parts: [
      { slot: "drawer-backdrop", element: "<div>", note: "The scrim." },
      {
        slot: "drawer-popup",
        element: '<div role="dialog">',
        note: "The panel: data-side, data-size.",
      },
      {
        slot: "drawer-header",
        element: "<div>",
        note: "drawer-title and drawer-description, ruled.",
      },
      { slot: "drawer-body", element: "<div>", note: "DrawerBody." },
      { slot: "drawer-footer", element: "<div>", note: "DrawerFooter, ruled." },
      { slot: "drawer-footer-start", element: "<div>", note: "start: before the actions." },
      { slot: "drawer-close", element: "<div>", note: "Close." },
    ],
    recipes: [
      {
        title: "Edit a row",
        line: "Open on a row, save, close, and the list shows the change.",
        file: "member-row.tsx",
        code: `<Drawer open={editing !== null} onOpenChange={(open) => !open && setEditing(null)}>
  <DrawerContent title={editing?.name} description={editing?.team}>
    <DrawerBody><MemberForm member={editing} /></DrawerBody>
    <DrawerFooter>
      <DrawerClose render={<Button variant="ghost">Cancel</Button>} />
      <Button onClick={save}>Save changes</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "Moves through the drawer; focus stays inside while it's open." },
      { keys: ["Esc"], action: "Closes it, when it's dismissible; focus returns to the trigger." },
    ],
    checks: [
      {
        check: "Role and name",
        result: "A dialog named by its title, described by its description.",
      },
      {
        check: "Focus on open",
        result:
          "The first field in the body; on touch, the drawer itself, so the phone's keyboard doesn't open over it.",
      },
      {
        check: "Swipe",
        result: "A swipe toward its edge closes it; text in the body selects without starting one.",
      },
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
        "DrawerFooter: start, a link or summary before the actions.",
        "Opened from the keyboard, the first Escape closes it: Close shows no tooltip.",
      ],
    },
    {
      version: "0.1.0",
      items: [
        "dismissible, like Dialog's.",
        "A scrolling body with nothing focusable can be scrolled from the keyboard.",
        "Its close button uses the neutral tone.",
      ],
    },
    {
      version: "0.0.2",
      items: [
        "Drawer: a full-height side panel at the end or start edge, with a ruled header and footer and a scrolling body; focus to the first field, except on touch; swiped away.",
      ],
    },
  ],

  related: [
    { name: "Dialog", when: "A decision" },
    { name: "Popover", when: "Anchored to a control" },
    { name: "Sidebar", when: "Console navigation" },
  ],
};
