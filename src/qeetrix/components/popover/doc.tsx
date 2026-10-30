// Components › Popover: its documentation, from @qeetrix/react 0.2.0 (popover.d.ts, popover.js), the
// Storybook stories (overlays/popover.stories.tsx) and the changelog. Its examples open the real
// popover (Live.tsx); the anatomy and the do-and-don'ts draw it still (still.tsx).
import { Button, Checkbox, CheckboxGroup, Inline, Stack, Text } from "@qeetrix/react";
import { OVERLAY_TESTED } from "../overlays";
import { StillDialog, StillPopover } from "../still";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

const filters = (
  <Stack gap="md">
    <CheckboxGroup label="Status" defaultValue={["active"]}>
      <Checkbox value="active" label="Active" />
      <Checkbox value="invited" label="Invited" />
    </CheckboxGroup>
    <Inline gap="sm" justify="end">
      <Button variant="ghost">Clear</Button>
      <Button>Apply</Button>
    </Inline>
  </Stack>
);

export const popover: ComponentDoc = {
  name: "Popover",
  slug: "popover",
  category: "overlays",
  status: "stable",
  since: "0.0.2",
  lede: "Content on demand, anchored to its trigger: filters, a quick edit, a detail. Not modal.",
  exports: ["Popover", "PopoverTrigger", "PopoverContent", "PopoverClose"],
  renders: '<div role="dialog">',
  source: "popover",
  story: "components/overlays/popover.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Filters for the list beside it.",
      "A quick edit: rename, reschedule.",
      "Detail that would crowd the page.",
    ],
    notFor: [
      { text: "A decision that stops the page", use: "Dialog" },
      { text: "A short label for a control", use: "Tooltip" },
      { text: "A list of actions", use: "Menu" },
    ],
    anatomyFigure: (
      <div className="qc-anat-field">
        <StillPopover title="Filter members" description="Shown: 1,284 of 1,284.">
          {filters}
        </StillPopover>
      </div>
    ),
    anatomy: [
      {
        slot: "popover-popup",
        element: '<div role="dialog">',
        note: "The panel, anchored to its trigger; not modal.",
      },
      { slot: "popover-title", element: "<h2>", note: "Names it; without one, aria-label." },
      { slot: "popover-description", element: "<p>", note: "A line under the title." },
    ],
    rules: [
      {
        title: "Not for decisions",
        doLine: "A destructive question stops the page: a dialog.",
        dontLine: "Delete, asked in a corner that an outside click closes.",
        doIt: (
          <StillDialog
            intent="danger"
            dismissible={false}
            title="Delete this view?"
            footer={
              <>
                <Button variant="ghost">Cancel</Button>
                <Button tone="danger">Delete view</Button>
              </>
            }
          />
        ),
        dontIt: (
          <StillPopover title="Delete this view?">
            <Inline gap="sm" justify="end">
              <Button tone="danger">Delete view</Button>
            </Inline>
          </StillPopover>
        ),
      },
      {
        title: "Every popover has a name",
        doLine: "A title, or aria-label when there's no room for one.",
        dontLine: "Unnamed content: a dialog nobody can identify.",
        doIt: <StillPopover title="Filter members">{filters}</StillPopover>,
        dontIt: (
          <StillPopover>
            <Text size="sm">Active, invited, suspended.</Text>
          </StillPopover>
        ),
      },
    ],
    content: [
      'The title says what it holds: "Filter members".',
      "Its actions end-aligned: Clear, then Apply.",
      "Keep it short: a long form belongs in a drawer.",
    ],
  },

  api: {
    props: [
      {
        name: "Popover: open · defaultOpen · onOpenChange",
        type: "boolean",
        default: "false",
        note: "Its open state.",
      },
      {
        name: "PopoverContent: title · description",
        type: "ReactNode",
        default: "—",
        note: "Its heading names it; the line describes it.",
      },
      {
        name: "PopoverContent: aria-label · aria-labelledby",
        type: "string",
        default: "—",
        note: "Its name without a visible title; in development it warns without one.",
      },
      {
        name: "PopoverContent: side · align",
        type: "…",
        default: '"bottom" · "center"',
        note: "Where it opens; it flips when there's no room.",
      },
      {
        name: "PopoverContent: sideOffset",
        type: "number",
        default: "6",
        note: "Distance from the trigger, in px.",
      },
      {
        name: "PopoverContent: anchor",
        type: "Element | ref",
        default: "the trigger",
        note: "Position against another element: the field a button sits in.",
      },
      {
        name: "PopoverTrigger · PopoverClose: render",
        type: "ReactElement",
        default: "—",
        note: "Your own control.",
      },
    ],
    parts: [
      { slot: "popover-positioner", element: "<div>", note: "Places it." },
      { slot: "popover-popup", element: '<div role="dialog">', note: "The panel." },
      { slot: "popover-header", element: "<div>", note: "popover-title and popover-description." },
    ],
    recipes: [
      {
        title: "Against the whole field",
        line: "anchor: a button at a field's end opens its popover under the field.",
        file: "schedule.tsx",
        code: `const field = useRef<HTMLDivElement>(null);

<div ref={field}>
  <Input endAdornment={<PopoverTrigger render={<IconButton icon={ClockIcon} aria-label="Pick a time" />} />} />
</div>
<PopoverContent anchor={field} aria-label="Pick a time">…</PopoverContent>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Enter", "Space"], action: "On its trigger: opens it; focus moves in." },
      { keys: ["Esc"], action: "Closes it; focus returns to the trigger." },
      { keys: ["Tab"], action: "Moves through it, and out of it: it doesn't trap focus." },
    ],
    checks: [
      {
        check: "Role and name",
        result: "A non-modal dialog, named by its title, aria-label or aria-labelledby.",
      },
      { check: "Focus", result: "In on open, back to the trigger on close." },
      { check: "Dismiss", result: "Escape or an outside click." },
    ],
    tested: OVERLAY_TESTED,
  },

  changelog: [
    { version: "0.1.0", items: ["aria-label and aria-labelledby, for a popover without a title."] },
    { version: "0.0.6", items: ["anchor: position against another element than the trigger."] },
    {
      version: "0.0.2",
      items: [
        "Popover: an anchored panel with an optional title and description; focus moves in on open and returns to the trigger on close.",
      ],
    },
  ],

  related: [
    { name: "Dialog", when: "A decision" },
    { name: "Tooltip", when: "A short label" },
    { name: "Menu", when: "A list of actions" },
    { name: "Drawer", when: "A longer task" },
  ],
};
