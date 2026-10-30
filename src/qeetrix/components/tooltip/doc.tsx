// Components › Tooltip: its documentation, from @qeetrix/react 0.2.0 (tooltip.d.ts, tooltip.js), the
// Storybook stories (overlays/tooltip.stories.tsx) and the changelog. Its examples open the real
// tooltip (Live.tsx); the anatomy and the do-and-don'ts draw it still (still.tsx).
import { DownloadIcon } from "@qeetrix/icons/icons/download";
import { IconButton } from "@qeetrix/react";
import { OVERLAY_TESTED } from "../overlays";
import { StillTooltip } from "../still";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

const Pair = ({ text }: { text: string }) => (
  <span className="qc-tip-pair">
    <StillTooltip>{text}</StillTooltip>
    <IconButton icon={DownloadIcon} aria-label="Download invoice" variant="soft" tooltip={false} />
  </span>
);

export const tooltip: ComponentDoc = {
  name: "Tooltip",
  slug: "tooltip",
  category: "overlays",
  status: "stable",
  since: "0.0.2",
  lede: "A short label for a control, most often an icon-only button. Never essential, never interactive.",
  exports: ["Tooltip", "TooltipProvider"],
  renders: '<div role="tooltip">',
  source: "tooltip",
  story: "components/overlays/tooltip.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Naming an icon-only control.",
      'A shortcut beside a tool\'s name: "Bold (Ctrl+B)".',
      "A detail nice to know: the full file name.",
    ],
    notFor: [
      { text: "Anything essential, or interactive", use: "Popover" },
      { text: "An error, or why something's disabled", use: "Text field" },
    ],
    anatomyFigure: <Pair text="Download INV-2026-0042 (PDF)" />,
    anatomy: [
      {
        slot: "tooltip-popup",
        element: '<div role="tooltip">',
        note: "The text: short, on the side it opens on.",
      },
      {
        slot: "tooltip-arrow",
        element: "<div>",
        note: "The pointer, facing the trigger; it follows it as the popup shifts.",
      },
      {
        slot: "icon-button",
        element: "<button>",
        note: "Its trigger: one element that takes a ref.",
      },
    ],
    rules: [
      {
        title: "A few words",
        doLine: "A label, read at a glance.",
        dontLine: "A paragraph that vanishes when the pointer moves.",
        doIt: <Pair text="Download invoice" />,
        dontIt: (
          <Pair text="Downloads the invoice as a PDF, which you can then forward to your finance team for approval." />
        ),
      },
    ],
    content: [
      'A label or a shortcut: "Download invoice", "Bold (Ctrl+B)".',
      "Sentence case, no full stop.",
      "Never the only place something is said.",
    ],
  },

  api: {
    props: [
      {
        name: "content",
        type: "ReactNode",
        default: "required",
        note: "The text: short, never interactive, never essential.",
      },
      {
        name: "children",
        type: "ReactElement",
        default: "required",
        note: "The trigger: one element that takes a ref and props.",
      },
      {
        name: "side · align",
        type: "…",
        default: '"top" · "center"',
        note: "Where it opens; it flips when there's no room.",
      },
      {
        name: "sideOffset",
        type: "number",
        default: "8",
        note: "Distance from the trigger, in px; the pointer fills 5 of them.",
      },
      {
        name: "delay · closeDelay",
        type: "number",
        default: "500 · 0",
        note: "Hover time before it opens, and after the pointer leaves, in ms.",
      },
      {
        name: "TooltipProvider: delay · closeDelay",
        type: "number",
        default: "500 · 0",
        note: "For a group: once one is open, the next opens at once.",
      },
    ],
    parts: [
      { slot: "tooltip-positioner", element: "<div>", note: "Places it." },
      { slot: "tooltip-popup", element: '<div role="tooltip">', note: "The text." },
      { slot: "tooltip-arrow", element: "<div>", note: "The pointer: data-side." },
    ],
    recipes: [
      {
        title: "On an icon button",
        line: "An IconButton already shows its aria-label as a tooltip; wrap it only for other words, with tooltip={false}.",
        file: "download.tsx",
        code: `<Tooltip content="Download INV-2026-0042 (PDF)">
  <IconButton icon={DownloadIcon} aria-label="Download invoice" tooltip={false} />
</Tooltip>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "Focus on its trigger opens it at once." },
      { keys: ["Esc"], action: "Closes it." },
    ],
    checks: [
      {
        check: "Role",
        result: 'role="tooltip", describing its trigger through aria-describedby while it\'s open.',
      },
      {
        check: "No repeats",
        result:
          "When its text only repeats the trigger's name, it isn't linked, so the name isn't read twice.",
      },
      { check: "Touch", result: "It doesn't appear on touch: never put anything only there." },
    ],
    tested: OVERLAY_TESTED,
  },

  changelog: [
    {
      version: "0.2.0",
      items: ["A pointer on the side facing the trigger; sideOffset is 8 by default (it was 6)."],
    },
    {
      version: "0.1.0",
      items: [
        "sideOffset.",
        "It describes its trigger without repeating a label it shows.",
        "TooltipProvider's delay now applies.",
      ],
    },
    {
      version: "0.0.2",
      items: [
        "Tooltip: one component around its trigger; it opens after 500ms of hover, or at once on focus. TooltipProvider groups neighbours, so the next opens at once.",
      ],
    },
  ],

  related: [
    { name: "Icon button", when: "Its usual trigger" },
    { name: "Popover", when: "Richer content" },
    { name: "Toggle", when: "Icon-only tools" },
  ],
};
