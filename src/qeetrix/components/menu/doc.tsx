// Components › Menu: its documentation, from @qeetrix/react 0.2.0 (menu.d.ts, menu.js), the
// Storybook stories (overlays/menu.stories.tsx) and the changelog. Its examples open the real menu
// (Live.tsx); the anatomy and the do-and-don'ts draw it still (still.tsx).
import { CopyIcon } from "@qeetrix/icons/icons/copy";
import { PencilIcon } from "@qeetrix/icons/icons/pencil";
import { TrashIcon } from "@qeetrix/icons/icons/trash";
import { OVERLAY_TESTED } from "../overlays";
import { StillMenu } from "../still";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const menu: ComponentDoc = {
  name: "Menu",
  slug: "menu",
  category: "overlays",
  status: "stable",
  since: "0.0.2",
  lede: "Actions in a list, from a button: arrows move, typing jumps, Escape closes. It never traps Tab.",
  exports: ["Menu", "MenuTrigger", "MenuContent", "MenuItem", "MenuSeparator"],
  renders: '<div role="menu">',
  source: "menu",
  story: "components/overlays/menu.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A row's or a card's actions, behind ⋯.",
      "Options that turn on or off, or choose one, for a view.",
      "More actions than fit as buttons.",
    ],
    notFor: [
      { text: "Choosing a value in a form", use: "Select" },
      { text: "Moving between pages", use: "Tabs" },
      { text: "The main action of a region", use: "Button" },
    ],
    anatomyFigure: (
      <div className="qc-anat-field">
        <StillMenu
          items={[
            { label: "Edit", icon: PencilIcon, shortcut: "E", highlighted: true },
            { label: "Duplicate", icon: CopyIcon, shortcut: "Ctrl+D" },
            { label: "line", separator: true },
            { label: "Remove from Acme", icon: TrashIcon, tone: "danger" },
          ]}
        />
      </div>
    ),
    anatomy: [
      {
        slot: "menu-item",
        select: '[data-slot="menu-item"][data-highlighted]',
        element: '<div role="menuitem">',
        note: "An action; highlighted, the 2px Ember bar at its start.",
      },
      { slot: "menu-item-icon", element: "<svg>", note: "A leading icon, sharp, 16px." },
      { slot: "menu-shortcut", element: "<span>", note: "Its key, hidden from screen readers." },
      {
        slot: "menu-separator",
        element: '<div role="separator">',
        note: "A 1px rule between groups, edge to edge.",
      },
      {
        slot: "menu-item",
        select: '[data-slot="menu-item"][data-tone="danger"]',
        element: '<div role="menuitem">',
        note: "The destructive action: danger, last, after a rule.",
      },
    ],
    rules: [
      {
        title: "Destructive last",
        doLine: "After a rule, at the end: hard to hit by accident.",
        dontLine: "First in the list, where the pointer lands.",
        doIt: (
          <StillMenu
            items={[
              { label: "Edit", icon: PencilIcon },
              { label: "Duplicate", icon: CopyIcon },
              { label: "line", separator: true },
              { label: "Remove from Acme", icon: TrashIcon, tone: "danger" },
            ]}
          />
        ),
        dontIt: (
          <StillMenu
            items={[
              { label: "Remove from Acme", icon: TrashIcon, tone: "danger" },
              { label: "Edit", icon: PencilIcon },
              { label: "Duplicate", icon: CopyIcon },
            ]}
          />
        ),
      },
      {
        title: "Verbs, not nouns",
        doLine: "Each item says what it does.",
        dontLine: "Nouns: what happens to the profile?",
        doIt: (
          <StillMenu
            items={[
              { label: "Edit profile", icon: PencilIcon },
              { label: "Duplicate role", icon: CopyIcon },
            ]}
          />
        ),
        dontIt: (
          <StillMenu
            items={[
              { label: "Profile", icon: PencilIcon },
              { label: "Role", icon: CopyIcon },
            ]}
          />
        ),
      },
    ],
    content: [
      'Items are verbs, in sentence case: "Remove from Acme".',
      'Name the trigger for its object: "Actions for Priya Sharma".',
      'Shortcuts as people type them: "Ctrl+D".',
    ],
  },

  api: {
    props: [
      {
        name: "Menu: open · defaultOpen · onOpenChange",
        type: "boolean",
        default: "false",
        note: "Its open state.",
      },
      {
        name: "MenuTrigger: render",
        type: "ReactElement",
        default: "—",
        note: "Your own control: an IconButton named for its object.",
      },
      {
        name: "MenuContent: side · align · sideOffset",
        type: "…",
        default: '"bottom" · "start" · 4',
        note: "A submenu opens at the inline end; a context menu at the pointer.",
      },
      {
        name: "MenuItem: icon · shortcut · description",
        type: "…",
        default: "—",
        note: "A leading icon; a key at the end; a second line.",
      },
      {
        name: "MenuItem: tone",
        type: '"default" | "danger"',
        default: '"default"',
        note: "danger for a destructive action: last, after a separator.",
      },
      {
        name: "MenuItem: onClick · disabled",
        type: "…",
        default: "—",
        note: "The action; or shown but not chosen.",
      },
      {
        name: "MenuCheckboxItem: checked · onCheckedChange",
        type: "boolean",
        default: "—",
        note: "An option on or off, with a sharp check.",
      },
      {
        name: "MenuRadioGroup: value · onValueChange",
        type: "string",
        default: "—",
        note: "MenuRadioItem choices, with a 6px dot.",
      },
      {
        name: "MenuRadioItem: closeOnClick",
        type: "boolean",
        default: "true",
        note: "Closes the menu on a choice; false where several settings change in a row.",
      },
      {
        name: "MenuGroup · MenuGroupLabel · MenuSeparator",
        type: "…",
        default: "—",
        note: "Labelled groups and the rules between them.",
      },
      {
        name: "MenuSubmenu · MenuSubmenuTrigger",
        type: "…",
        default: "—",
        note: "A nested menu: its trigger has a chevron that mirrors in right to left.",
      },
    ],
    parts: [
      { slot: "menu-popup", element: '<div role="menu">', note: "The list." },
      {
        slot: "menu-item",
        element: '<div role="menuitem">',
        note: "An action: data-highlighted, data-tone.",
      },
      { slot: "menu-item-icon", element: "<svg>", note: "Its icon." },
      {
        slot: "menu-item-text",
        element: "<span>",
        note: "menu-item-label and menu-item-description.",
      },
      { slot: "menu-shortcut", element: "<span>", note: "Its key." },
      {
        slot: "menu-checkbox-item · menu-radio-item",
        element: "<div>",
        note: "With menu-item-mark: the check or the dot.",
      },
      {
        slot: "menu-separator · menu-group-label",
        element: "<div>",
        note: "Between groups, and above one.",
      },
      {
        slot: "menu-submenu-trigger",
        element: "<div>",
        note: "With menu-submenu-icon, the chevron.",
      },
    ],
    recipes: [
      {
        title: "Name the trigger for its row",
        line: "Every row's ⋯ says whose actions it opens.",
        file: "row-actions.tsx",
        code: `<MenuTrigger render={<IconButton icon={EllipsisIcon} aria-label={\`Actions for \${member.name}\`} tone="neutral" />} />`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Enter", "Space", "↓"], action: "On its trigger: opens it, on the first item." },
      { keys: ["↑", "↓"], action: "Moves between items." },
      { keys: ["→", "←"], action: "Opens and closes a submenu; mirrored in right to left." },
      { keys: ["A–Z"], action: "Jumps to the item that starts with the letter." },
      { keys: ["Enter"], action: "Chooses the item." },
      { keys: ["Esc"], action: "Closes it; focus returns to the trigger." },
    ],
    checks: [
      { check: "Roles", result: 'role="menu" of menuitem, menuitemcheckbox and menuitemradio.' },
      { check: "Tab", result: "It never traps Tab: Tab closes it and moves on." },
      {
        check: "Highlight",
        result:
          "The 2px Ember start bar, following the text direction; Highlight in forced colours.",
      },
      {
        check: "Descriptions",
        result: "A description describes its item; the label alone names it.",
      },
    ],
    tested: OVERLAY_TESTED,
  },

  changelog: [
    {
      version: "0.2.0",
      items: ["MenuRadioItem closes its menu on a choice; closeOnClick={false} keeps it open."],
    },
    {
      version: "0.1.0",
      items: ["MenuItem description: a second, subtle line, also on checkbox and radio items."],
    },
    {
      version: "0.0.2",
      items: [
        "Menu: items with sharp icons, shortcuts and a danger tone; checkbox and radio items in a 16px mark column; group labels, separators and submenus; the 2px Ember start bar on the highlighted item.",
      ],
    },
  ],

  related: [
    { name: "Context menu", when: "At the pointer" },
    { name: "Select", when: "A value in a form" },
    { name: "Icon button", when: "Its trigger" },
    { name: "Popover", when: "Richer content" },
  ],
};
