// Components › Icon button: its documentation, from @qeetrix/react 0.2.0 (button.d.ts, button.js,
// internal/control.js), the Storybook stories (actions/icon-button.stories.tsx) and the changelog.
// Its examples run live (Live.tsx), for their tooltips; the do-and-don'ts render to HTML.
import { ArchiveIcon } from "@qeetrix/icons/icons/archive";
import { CopyIcon } from "@qeetrix/icons/icons/copy";
import { OrbitIcon } from "@qeetrix/icons/icons/orbit";
import { PencilIcon } from "@qeetrix/icons/icons/pencil";
import { SettingsIcon } from "@qeetrix/icons/icons/settings";
import { ShapesIcon } from "@qeetrix/icons/icons/shapes";
import { SparklesIcon } from "@qeetrix/icons/icons/sparkles";
import { TrashIcon } from "@qeetrix/icons/icons/trash";
import { Button, IconButton, Inline } from "@qeetrix/react";
import { controlHeights } from "../sizes";
import { StillTooltip } from "../still";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const iconButton: ComponentDoc = {
  name: "Icon button",
  slug: "icon-button",
  category: "actions",
  status: "stable",
  since: "0.0.2",
  lede: "An action shown as an icon. Its name is required, and shows as its tooltip.",
  exports: ["IconButton"],
  renders: "<button>",
  source: "button",
  story: "components/actions/icon-button.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A familiar action in a tight space: a toolbar, a row, a card's corner.",
      "The same action on every row of a list.",
      "Close, more, edit, copy.",
    ],
    notFor: [
      { text: "An action that needs its words", use: "Button" },
      { text: "A tool that's pressed or not", use: "Toggle" },
      { text: "Copying a value", use: "Copy button" },
      { text: "Going to another page", use: "Link" },
    ],
    anatomyFigure: (
      <IconButton size="lg" variant="soft" icon={PencilIcon} aria-label="Edit" tooltip={false} />
    ),
    anatomy: [
      { slot: "icon-button", element: "<button>", note: "The root: square, a native button." },
      { slot: "button-icon", element: "<svg>", note: "Sharp. 16px; 20px at lg." },
    ],
    rules: [
      {
        title: "A name for every icon",
        doLine: "aria-label names it, and its tooltip shows the name.",
        dontLine: "An icon alone, with no name to read.",
        doIt: (
          <span className="qc-tip-pair">
            <StillTooltip>Edit user</StillTooltip>
            <IconButton variant="soft" icon={PencilIcon} aria-label="Edit user" tooltip={false} />
          </span>
        ),
        dontIt: (
          <IconButton variant="soft" icon={PencilIcon} aria-label="Edit user" tooltip={false} />
        ),
      },
      {
        title: "Icons people know",
        doLine: "Edit, copy, delete, settings: read at a glance.",
        dontLine: "Icons that must be learned.",
        doIt: (
          <Inline gap="xs">
            <IconButton tone="neutral" icon={PencilIcon} aria-label="Edit" tooltip={false} />
            <IconButton tone="neutral" icon={CopyIcon} aria-label="Copy" tooltip={false} />
            <IconButton tone="neutral" icon={SettingsIcon} aria-label="Settings" tooltip={false} />
            <IconButton tone="danger" icon={TrashIcon} aria-label="Delete" tooltip={false} />
          </Inline>
        ),
        dontIt: (
          <Inline gap="xs">
            <IconButton tone="neutral" icon={OrbitIcon} aria-label="Sync" tooltip={false} />
            <IconButton tone="neutral" icon={ShapesIcon} aria-label="Templates" tooltip={false} />
            <IconButton tone="neutral" icon={SparklesIcon} aria-label="Clean up" tooltip={false} />
            <IconButton tone="neutral" icon={ArchiveIcon} aria-label="Hide" tooltip={false} />
          </Inline>
        ),
      },
      {
        title: "Ghost in a toolbar",
        doLine: "Neutral ghosts: the content leads.",
        dontLine: "A row of solids: every action shouts.",
        doIt: (
          <Inline gap="xs">
            <IconButton tone="neutral" icon={PencilIcon} aria-label="Edit" tooltip={false} />
            <IconButton tone="neutral" icon={CopyIcon} aria-label="Copy" tooltip={false} />
            <IconButton tone="neutral" icon={TrashIcon} aria-label="Delete" tooltip={false} />
          </Inline>
        ),
        dontIt: (
          <Inline gap="xs">
            <IconButton variant="solid" icon={PencilIcon} aria-label="Edit" tooltip={false} />
            <IconButton variant="solid" icon={CopyIcon} aria-label="Copy" tooltip={false} />
            <IconButton
              variant="solid"
              tone="danger"
              icon={TrashIcon}
              aria-label="Delete"
              tooltip={false}
            />
          </Inline>
        ),
      },
      {
        title: "Words for what can't be undone",
        doLine: "The main destructive action says what it does.",
        dontLine: "A lone bin as the page's main action.",
        doIt: <Button tone="danger">Delete workspace</Button>,
        dontIt: (
          <IconButton
            variant="solid"
            tone="danger"
            icon={TrashIcon}
            aria-label="Delete workspace"
            tooltip={false}
          />
        ),
      },
    ],
    sizes: {
      specimen: (
        <Inline gap="md" align="center">
          <IconButton
            size="sm"
            variant="soft"
            icon={SettingsIcon}
            aria-label="Small"
            tooltip={false}
          />
          <IconButton
            size="md"
            variant="soft"
            icon={SettingsIcon}
            aria-label="Medium"
            tooltip={false}
          />
          <IconButton
            size="lg"
            variant="soft"
            icon={SettingsIcon}
            aria-label="Large"
            tooltip={false}
          />
        </Inline>
      ),
      columns: ["Size", "Square: compact / default / comfortable", "Icon"],
      rows: [
        ["sm", controlHeights("sm"), "16px"],
        ["md", controlHeights("md"), "16px"],
        ["lg", controlHeights("lg"), "20px"],
      ],
    },
    content: [
      'Name the action and its object: "Edit Priya Sharma", not "Edit".',
      "Sentence case; the tooltip shows the name as written.",
      'Say why it\'s disabled in the name: "Delete workspace: only an owner can".',
    ],
  },

  api: {
    props: [
      {
        name: "icon",
        type: "QeetrixIcon",
        default: "required",
        note: "The icon, from @qeetrix/icons, drawn sharp.",
      },
      {
        name: "aria-label",
        type: "string",
        default: "required",
        note: "Its name: announced, and shown as its tooltip.",
      },
      {
        name: "variant",
        type: '"ghost" | "soft" | "solid"',
        default: '"ghost"',
        note: "Emphasis: tertiary, secondary, primary.",
      },
      {
        name: "tone",
        type: '"brand" | "danger" | "neutral"',
        default: '"brand"',
        note: "neutral for utility actions in toolbars and rows.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        note: "A square, at a control's height.",
      },
      {
        name: "tooltip",
        type: "ReactNode | false",
        default: "aria-label",
        note: "Other text to show, or false where the name is visible nearby.",
      },
      {
        name: "tooltipSide",
        type: '"top" | "bottom" | "left" | "right" | "inline-start" | "inline-end"',
        default: '"top"',
        note: "The side it opens on; it flips when there's no room.",
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        note: "A spinner replaces the icon; clicks are ignored; aria-busy is set.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        note: "Sets aria-disabled; it stays focusable, and its tooltip still shows.",
      },
      {
        name: "render",
        type: 'Button.Props["render"]',
        default: "—",
        note: "Renders another element through Base UI, e.g. a router link.",
      },
    ],
    parts: [
      {
        slot: "icon-button",
        element: "<button>",
        note: "The root. data-variant, data-tone, data-size; data-loading when set.",
      },
      { slot: "button-icon", element: "<svg>", note: "The icon." },
      { slot: "button-spinner", element: "<span>", note: "In the icon's place while loading." },
    ],
    recipes: [
      {
        title: "Beside the value it copies",
        line: "Where the words are in view, the tooltip would only repeat them.",
        file: "user-id.tsx",
        code: `<Inline gap="xs" align="center">
  <Text mono>usr_01J8K2M4PQ</Text>
  <IconButton icon={CopyIcon} aria-label="Copy user ID" tooltip={false} />
</Inline>`,
      },
      {
        title: "As a router link",
        line: "render swaps the element; it keeps its look, its name and its tooltip.",
        file: "settings-link.tsx",
        code: `import { SettingsIcon } from "@qeetrix/icons";
import { IconButton } from "@qeetrix/react";
import { Link } from "@tanstack/react-router";

<IconButton render={<Link to="/settings" />} icon={SettingsIcon} aria-label="Settings" />`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Enter"], action: "Activates it." },
      { keys: ["Space"], action: "Activates it." },
      { keys: ["Tab"], action: "Moves focus to it, even when it's disabled; its tooltip opens." },
      { keys: ["Esc"], action: "Closes its tooltip." },
    ],
    checks: [
      {
        check: "Name",
        result:
          "aria-label is required by its type; the tooltip shows it, without announcing it twice.",
      },
      { check: "Tooltip", result: "Opens on mouse hover and on keyboard focus; Escape closes it." },
      { check: "Busy", result: "aria-busy while loading; clicks are ignored and focus stays." },
      {
        check: "Disabled",
        result: "aria-disabled, not disabled: it stays focusable, so its tooltip can say why.",
      },
      {
        check: "Target size",
        result: "24px square at its smallest, compact sm: WCAG 2.5.8's minimum.",
      },
      { check: "Focus", result: "A 2px Ember ring on :focus-visible, inside a 1px surface gap." },
    ],
    tested: [
      "axe, WCAG 2.2 A and AA, in Chromium on every pull request",
      "Firefox and WebKit every night",
      "Forced colours, reduced motion and right to left",
      "Server rendering",
    ],
  },

  changelog: [
    {
      version: "0.1.1",
      items: ["mirrorInRtl(Icon): an icon that points forward flips in right to left."],
    },
    {
      version: "0.1.0",
      items: [
        "tooltipSide: the side its tooltip opens on.",
        "Its tooltip describes it without repeating its name to a screen reader.",
      ],
    },
    { version: "0.0.3", items: ["The neutral tone, for utility actions in toolbars and headers."] },
    {
      version: "0.0.2",
      items: [
        "IconButton: square, icon-only, its aria-label required.",
        "Its aria-label shows as a tooltip; tooltip={false} turns it off.",
      ],
    },
  ],

  related: [
    { name: "Button", when: "An action with its words" },
    { name: "Toggle", when: "Pressed or not" },
    { name: "Copy button", when: "To copy a value" },
    { name: "Tooltip", when: "A short hint" },
  ],
};
