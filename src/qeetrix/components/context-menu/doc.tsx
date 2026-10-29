// Components › Context menu: its documentation, from @qeetrix/react 0.2.0 (menu.d.ts, menu.js: the
// ContextMenu parts) and the changelog. Its examples open the real menu (Live.tsx); the anatomy
// draws its menu still (still.tsx), beside a real trigger.
import { CopyIcon } from "@qeetrix/icons/icons/copy";
import { EllipsisIcon } from "@qeetrix/icons/icons/ellipsis";
import { PencilIcon } from "@qeetrix/icons/icons/pencil";
import { TrashIcon } from "@qeetrix/icons/icons/trash";
import { ContextMenu, ContextMenuTrigger, IconButton, Inline, Stack, Text } from "@qeetrix/react";
import { OVERLAY_TESTED } from "../overlays";
import { StillMenu } from "../still";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

const ITEMS = [
  { label: "Edit", icon: PencilIcon, highlighted: true },
  { label: "Copy email", icon: CopyIcon },
  { label: "line", separator: true },
  { label: "Remove from Acme", icon: TrashIcon, tone: "danger" as const },
];

const Row = ({ more = false }: { more?: boolean }) => (
  <ContextMenu>
    <ContextMenuTrigger className="qc-context-row" tabIndex={0}>
      <Inline gap="md" align="center" justify="between">
        <Stack gap="xs">
          <Text weight="semibold">Priya Sharma</Text>
          <Text tone="subtle" size="sm">
            priya@acme.in
          </Text>
        </Stack>
        {more && (
          <IconButton
            icon={EllipsisIcon}
            aria-label="Actions for Priya Sharma"
            tone="neutral"
            tooltip={false}
          />
        )}
      </Inline>
    </ContextMenuTrigger>
  </ContextMenu>
);

export const contextMenu: ComponentDoc = {
  name: "Context menu",
  slug: "context-menu",
  category: "overlays",
  status: "stable",
  since: "0.1.0",
  lede: "A menu at the pointer: right-click, a long press, or Shift+F10. Menu's items, on any area.",
  exports: ["ContextMenu", "ContextMenuTrigger", "MenuContent", "MenuItem"],
  renders: '<div role="menu">',
  source: "menu",
  story: "components/overlays/menu.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Shortcuts to a row's, a file's or a card's actions, where people look for them.",
      "Dense tools: a canvas, a tree, a table.",
    ],
    notFor: [
      { text: "The only way to an action", use: "Menu" },
      { text: "A choice in a form", use: "Select" },
    ],
    anatomyFigure: (
      <div className="qc-anat-wide">
        <Inline gap="lg" align="start">
          <Row />
          <StillMenu items={ITEMS} />
        </Inline>
      </div>
    ),
    anatomy: [
      {
        slot: "context-menu-trigger",
        element: "<div>",
        note: "The area that opens it: give it tabIndex={0} if nothing in it takes focus.",
      },
      {
        slot: "menu-popup",
        element: '<div role="menu">',
        note: "Menu's list, at the pointer, or at the focused element by key.",
      },
    ],
    rules: [
      {
        title: "A shortcut, not the only way",
        doLine: "The same actions behind a visible ⋯ too.",
        dontLine: "Actions only a right-click finds.",
        doIt: <Row more />,
        dontIt: <Row />,
      },
    ],
    content: [
      "The same items, in the same order, as the visible menu.",
      "Destructive last, after a rule.",
    ],
  },

  api: {
    props: [
      {
        name: "ContextMenu: open · defaultOpen · onOpenChange",
        type: "boolean",
        default: "false",
        note: "Its open state.",
      },
      {
        name: "ContextMenuTrigger: children",
        type: "ReactNode",
        default: "—",
        note: "The area: a row, a card, a canvas.",
      },
      {
        name: "ContextMenuTrigger: tabIndex",
        type: "number",
        default: "—",
        note: "0 if nothing inside takes focus, so Shift+F10 can reach it.",
      },
      {
        name: "MenuContent and items",
        type: "…",
        default: "—",
        note: "Menu's: MenuItem, MenuCheckboxItem, MenuRadioGroup, MenuSeparator, MenuSubmenu.",
      },
    ],
    parts: [
      { slot: "context-menu-trigger", element: "<div>", note: "The area." },
      { slot: "menu-popup", element: '<div role="menu">', note: "Menu's parts throughout." },
    ],
    recipes: [
      {
        title: "Share the items",
        line: "One list of items for the ⋯ menu and the context menu, so they never drift apart.",
        file: "row.tsx",
        code: `const items = (
  <>
    <MenuItem icon={PencilIcon}>Edit</MenuItem>
    <MenuSeparator />
    <MenuItem icon={TrashIcon} tone="danger">Remove</MenuItem>
  </>
);

<ContextMenu>
  <ContextMenuTrigger tabIndex={0}>
    {row}
    <Menu><MenuTrigger render={<IconButton icon={EllipsisIcon} aria-label="Actions" />} /><MenuContent>{items}</MenuContent></Menu>
  </ContextMenuTrigger>
  <MenuContent>{items}</MenuContent>
</ContextMenu>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      {
        keys: ["Shift+F10"],
        action: "With focus in the area: opens it at the focused element.",
      },
      { keys: ["Menu"], action: "The context-menu key: the same." },
      { keys: ["↑", "↓", "Enter", "Esc"], action: "As Menu's." },
    ],
    checks: [
      { check: "Roles", result: 'Menu\'s: role="menu" of menuitems.' },
      {
        check: "Opening",
        result: "Right-click or a long press, at the pointer; by key, at the focused element.",
      },
      {
        check: "Reachable",
        result:
          "Only by key if the area takes focus: give it tabIndex={0}, or put it around content that does.",
      },
    ],
    tested: OVERLAY_TESTED,
  },

  changelog: [
    {
      version: "0.2.0",
      items: ["MenuRadioItem closes the menu on a choice, as in Menu."],
    },
    {
      version: "0.1.0",
      items: [
        "ContextMenu and ContextMenuTrigger: right-click, Shift+F10 and the context-menu key, with every Menu part.",
      ],
    },
  ],

  related: [
    { name: "Menu", when: "From a button" },
    { name: "Icon button", when: "The visible ⋯" },
    { name: "Table", when: "Rows with actions" },
  ],
};
