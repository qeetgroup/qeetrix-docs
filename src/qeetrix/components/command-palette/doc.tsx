// Components › Command palette: its documentation, from @qeetrix/react 0.2.0 (experimental/
// command-palette: .d.ts and .js, its strings in internal/messages.js), the Storybook stories
// (navigation/command-palette.stories.tsx) and the changelog. Its examples open the real palette
// (Live.tsx); the anatomy and the do-and-don'ts draw it still (Still.tsx).
import { AppWindowIcon } from "@qeetrix/icons/icons/app-window";
import { KeyRoundIcon } from "@qeetrix/icons/icons/key-round";
import { ShieldCheckIcon } from "@qeetrix/icons/icons/shield-check";
import { UserIcon } from "@qeetrix/icons/icons/user";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";
import Still from "./Still";

export const commandPalette: ComponentDoc = {
  name: "Command palette",
  slug: "command-palette",
  category: "actions",
  status: "experimental",
  since: "0.0.6",
  lede: "Search or jump to: anything in the console, by name, from the top bar or ⌘K.",
  exports: ["CommandPalette"],
  renders: '<div role="dialog">',
  source: "experimental/command-palette",
  story: "components/navigation/command-palette.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Finding any record, page, setting or action by its name, from anywhere.",
      "A console's search: the top bar's search and ⌘K open the same palette.",
      'Reaching a setting by what people call it: "MFA" finds Two-step sign-in.',
    ],
    notFor: [
      { text: "Choosing a value in a form", use: "Combobox" },
      { text: "A few actions from a button", use: "Menu" },
      { text: "Moving between a few views", use: "Tabs" },
    ],
    anatomyFigure: (
      <Still
        query="mfa"
        footer={false}
        groups={[
          {
            label: "Settings",
            items: [
              { label: "Two-step sign-in", meta: "Security › Policies", icon: ShieldCheckIcon },
              { label: "Signing keys", meta: "Developers", icon: KeyRoundIcon },
            ],
          },
        ]}
      />
    ),
    anatomy: [
      {
        slot: "command-palette",
        element: '<div role="dialog">',
        note: "The root: a modal dialog over the page, its search box first.",
      },
      {
        slot: "command-item",
        element: '<div role="option">',
        note: "A result: its icon or avatar, its label, its description.",
      },
      {
        slot: "command-item-meta",
        element: "<span>",
        note: "At its end: where it lives, or what kind it is.",
      },
    ],
    rules: [
      {
        title: "Say where it lives",
        doLine: "meta says where each setting is.",
        dontLine: "Bare labels: which Policies?",
        doIt: (
          <Still
            query="pol"
            footer={false}
            groups={[
              {
                label: "Settings",
                items: [
                  { label: "Password policy", meta: "Security › Policies", icon: ShieldCheckIcon },
                  { label: "Session policy", meta: "Security › Sessions", icon: ShieldCheckIcon },
                ],
              },
            ]}
          />
        ),
        dontIt: (
          <Still
            query="pol"
            footer={false}
            groups={[
              {
                label: "Settings",
                items: [
                  { label: "Policies", icon: ShieldCheckIcon },
                  { label: "Policies", icon: ShieldCheckIcon },
                ],
              },
            ]}
          />
        ),
      },
      {
        title: "Grouped by kind",
        doLine: "People, apps and settings, each under its label.",
        dontLine: "One list: a person beside an app beside a setting.",
        doIt: (
          <Still
            query="pay"
            footer={false}
            groups={[
              {
                label: "Users",
                items: [{ label: "Payal Mehta", description: "payal@acme.in", icon: UserIcon }],
              },
              {
                label: "Applications",
                items: [{ label: "Payroll", meta: "OIDC", icon: AppWindowIcon }],
              },
            ]}
          />
        ),
        dontIt: (
          <Still
            query="pay"
            footer={false}
            groups={[
              {
                items: [
                  { label: "Payal Mehta", icon: UserIcon },
                  { label: "Payroll", icon: AppWindowIcon },
                  { label: "Payment keys", icon: KeyRoundIcon },
                ],
              },
            ]}
          />
        ),
      },
    ],
    content: [
      'Results are named as the console names them: "Two-step sign-in".',
      'keywords hold what people type instead: "MFA", "2FA".',
      'meta says where it lives, "Security › Policies", or its kind, "OIDC".',
    ],
  },

  api: {
    props: [
      {
        name: "groups",
        type: "readonly CommandGroup[]",
        default: "required",
        note: "The results, grouped: { label, items }.",
      },
      {
        name: "onSelect",
        type: "(item: CommandItem) => void",
        default: "required",
        note: "Called with the chosen item; the palette then closes.",
      },
      {
        name: "open",
        type: "boolean",
        default: "—",
        note: "Open, controlled: wire it to the top bar's search.",
      },
      {
        name: "defaultOpen",
        type: "boolean",
        default: "false",
        note: "Open to start with, uncontrolled.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        default: "—",
        note: "Called as it opens or closes: ⌘K, Escape, a choice.",
      },
      {
        name: "hotkey",
        type: "boolean",
        default: "true",
        note: "Opens and closes with ⌘K or Ctrl+K anywhere on the page.",
      },
      {
        name: "onQueryChange",
        type: "(query: string) => void",
        default: "—",
        note: "Search yourself as the query changes; groups are then shown as given.",
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        note: 'Shows "Searching…", for onQueryChange.',
      },
      {
        name: "placeholder",
        type: "string",
        default: '"Search or jump to…"',
        note: "The search box's placeholder.",
      },
      {
        name: "messages",
        type: "Partial<…commandPalette>",
        default: "—",
        note: "This palette's words, over QeetrixProvider's.",
      },
    ],
    parts: [
      {
        slot: "command-palette",
        element: '<div role="dialog">',
        note: "The popup, over a backdrop.",
      },
      {
        slot: "command-list",
        element: '<div role="listbox">',
        note: "The results, in their groups.",
      },
      {
        slot: "command-item",
        element: '<div role="option">',
        note: "A result. data-highlighted on the one Enter opens.",
      },
      { slot: "command-item-leading", element: "<span>", note: "Its icon or avatar." },
      { slot: "command-item-meta", element: "<span>", note: "Where it lives, or its kind." },
    ],
    recipes: [
      {
        title: "A result's fields",
        line: "CommandItem: what it's called, how it's found, and where it lives.",
        file: "results.ts",
        code: `const groups: CommandGroup[] = [
  {
    label: "Settings",
    items: [
      {
        value: "set_mfa",
        label: "Two-step sign-in",
        meta: "Security › Policies",
        icon: ShieldCheckIcon,
        keywords: ["MFA", "2FA", "OTP"],
      },
    ],
  },
  {
    label: "Actions",
    items: [{ value: "invite", label: "Invite a user", icon: UserPlusIcon, shortcut: ["I"] }],
  },
];`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      {
        keys: ["Mod+K"],
        action: "Opens and closes it anywhere on the page; Ctrl+K on Windows and Linux.",
      },
      { keys: ["↑", "↓"], action: "Moves through the results, skipping disabled ones." },
      { keys: ["Enter"], action: "Opens the highlighted result." },
      { keys: ["Esc"], action: "Closes it, and returns focus to where it was." },
    ],
    checks: [
      {
        check: "Role and name",
        result:
          'A modal dialog named "Search or jump to"; the search box is a combobox over a listbox.',
      },
      {
        check: "Focus",
        result: "Moves into the search box as it opens; comes back to the trigger as it closes.",
      },
      {
        check: "Status",
        result: '"Searching…" and "No results for …" are announced, through a status region.',
      },
      {
        check: "Disabled results",
        result:
          "Shown and greyed, with the reason as their description; skipped by the arrows and by Enter.",
      },
    ],
    tested: [
      "axe, WCAG 2.2 A and AA, in Chromium on every pull request",
      "Firefox and WebKit every night",
      "Keyboard: open, move, choose and close",
      "Hindi: its words from QeetrixProvider",
    ],
  },

  changelog: [
    {
      version: "0.3.0",
      items: [
        "icon takes an element as well as a component (icon={<PlusIcon />}), so a Server Component can pass one: its type is IconSource.",
      ],
    },
    {
      version: "0.1.0",
      items: ["Results share one leading column.", "Counts sit on the label's baseline."],
    },
    {
      version: "0.0.6",
      items: [
        "CommandPalette: search or jump to, over the page, from the top bar's search or ⌘K / Ctrl+K, with grouped results. Filters by label, description and keywords, or the app searches with onQueryChange.",
      ],
    },
  ],

  related: [
    { name: "Top bar", when: "Its search opens the palette" },
    { name: "Combobox", when: "A value in a form" },
    { name: "Menu", when: "Actions from a button" },
    { name: "Dialog", when: "A focused decision" },
  ],
};
