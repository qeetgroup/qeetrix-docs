// Components › Copy button: its documentation, from @qeetrix/react 0.2.0 (experimental/copy-button:
// .d.ts and .js, the strings in internal/messages.js and locales/hi.js), the Storybook stories
// (actions/copy-button.stories.tsx) and the changelog. Its examples run live (Live.tsx), so they
// copy; the do-and-don'ts render to HTML.
import { CopyIcon } from "@qeetrix/icons/icons/copy";
import { IconButton, Inline, Text } from "@qeetrix/react";
import { controlHeights } from "../sizes";
import { StillTooltip } from "../still";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

/** A copy button drawn still, for the do-and-don'ts: CopyButton itself needs React. */
const Still = ({ label, variant = "ghost" }: { label: string; variant?: "ghost" | "solid" }) => (
  <IconButton
    icon={CopyIcon}
    aria-label={label}
    variant={variant}
    tone={variant === "solid" ? "brand" : "neutral"}
    tooltip={false}
  />
);

export const copyButton: ComponentDoc = {
  name: "Copy button",
  slug: "copy-button",
  category: "actions",
  status: "experimental",
  since: "0.0.4",
  lede: 'Copies a value. The icon turns to a check, "Copied" is announced, and focus stays.',
  exports: ["CopyButton"],
  renders: "<button>",
  source: "experimental/copy-button",
  story: "components/actions/copy-button.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Ids, keys, URLs and commands that are pasted somewhere else.",
      "Values too long, or too exact, to select by hand.",
      "A value made at the moment it's copied: an invite link, a token.",
    ],
    notFor: [
      { text: "Code to read, then copy", use: "Code block" },
      { text: "Any other action as an icon", use: "Icon button" },
      { text: "An action with its own words", use: "Button" },
    ],
    anatomyFigure: (
      <IconButton
        size="lg"
        variant="soft"
        tone="neutral"
        icon={CopyIcon}
        aria-label="Copy user ID"
        tooltip={false}
      />
    ),
    anatomy: [
      {
        slot: "icon-button",
        element: "<button>",
        note: "The root: an Icon button, or a Button with a label. data-state: idle, copied, failed.",
      },
      {
        slot: "button-icon",
        element: "<svg>",
        note: "Copy; a check once copied; an alert if it couldn't.",
      },
    ],
    rules: [
      {
        title: "Beside what it copies",
        doLine: "Next to its value, so it's clear what goes.",
        dontLine: "A copy button on its own: copy what?",
        doIt: (
          <Inline gap="xs" align="center">
            <Text mono>qid_app_01J9ZK4T7B2R</Text>
            <Still label="Copy client ID" />
          </Inline>
        ),
        dontIt: <Still label="Copy" />,
      },
      {
        title: "Named for its value",
        doLine: 'label says what it copies: "Copy client ID".',
        dontLine: 'Three buttons, each just "Copy".',
        doIt: (
          <span className="qc-tip-pair">
            <StillTooltip>Copy client ID</StillTooltip>
            <Still label="Copy client ID" />
          </span>
        ),
        dontIt: (
          <Inline gap="md">
            {["client", "redirect", "tenant"].map((key) => (
              <span key={key} className="qc-tip-pair">
                <StillTooltip>Copy</StillTooltip>
                <Still label="Copy" />
              </span>
            ))}
          </Inline>
        ),
      },
      {
        title: "Quiet beside its value",
        doLine: "Ghost and neutral: the value leads.",
        dontLine: "A solid brand button for a utility.",
        doIt: (
          <Inline gap="xs" align="center">
            <Text mono>tnt_acme_01HZX3</Text>
            <Still label="Copy tenant ID" />
          </Inline>
        ),
        dontIt: (
          <Inline gap="xs" align="center">
            <Text mono>tnt_acme_01HZX3</Text>
            <Still label="Copy tenant ID" variant="solid" />
          </Inline>
        ),
      },
    ],
    sizes: {
      specimen: (
        <Inline gap="md" align="center">
          <IconButton
            size="sm"
            variant="soft"
            tone="neutral"
            icon={CopyIcon}
            aria-label="Small"
            tooltip={false}
          />
          <IconButton
            size="md"
            variant="soft"
            tone="neutral"
            icon={CopyIcon}
            aria-label="Medium"
            tooltip={false}
          />
          <IconButton
            size="lg"
            variant="soft"
            tone="neutral"
            icon={CopyIcon}
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
      'Name what it copies: "Copy client ID", "Copy redirect URI".',
      'Leave "Copied" to it: it shows it, and announces it.',
      'A visible label only where there\'s room: "Copy invite link".',
    ],
  },

  api: {
    props: [
      {
        name: "value",
        type: "string | () => string | Promise<string>",
        default: "required",
        note: "The text, or a function that makes it, even asynchronously.",
      },
      {
        name: "label",
        type: "string",
        default: '"Copy"',
        note: "What it copies: its name and its tooltip.",
      },
      {
        name: "children",
        type: "ReactNode",
        default: "—",
        note: "A visible label: then it's a Button, label first.",
      },
      {
        name: "variant",
        type: '"ghost" | "soft" | "solid"',
        default: '"ghost"',
        note: "As Icon button's.",
      },
      {
        name: "tone",
        type: '"brand" | "danger" | "neutral"',
        default: '"neutral"',
        note: "Neutral for a utility, as most are.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        note: "Height from the density tokens.",
      },
      {
        name: "tooltipSide",
        type: '"top" | "bottom" | "left" | "right" | "inline-start" | "inline-end"',
        default: '"top"',
        note: "The side its tooltip opens on.",
      },
      {
        name: "onCopied",
        type: "(value: string) => void",
        default: "—",
        note: "Called once the text is on the clipboard.",
      },
      {
        name: "onCopyError",
        type: "(error: unknown) => void",
        default: "—",
        note: "Called when copying fails, e.g. with no clipboard access.",
      },
      {
        name: "resetAfter",
        type: "number",
        default: "2000",
        note: 'How long "Copied" shows, in milliseconds.',
      },
      {
        name: "messages",
        type: "Partial<{ copy, copied, failed }>",
        default: "—",
        note: "This button's words, over QeetrixProvider's.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        note: "Sets aria-disabled; it stays focusable.",
      },
    ],
    parts: [
      {
        slot: "icon-button",
        element: "<button>",
        note: "The root, icon-only. data-state: idle, copied or failed. button with a label.",
      },
      { slot: "button-icon", element: "<svg>", note: "Copy, check or alert." },
      {
        slot: "—",
        element: '<span role="status">',
        note: 'Visually hidden: announces "Copied" or "Couldn\'t copy".',
      },
    ],
    recipes: [
      {
        title: "A value made when it's copied",
        line: "A function, even async: fetched or made at the moment of the copy.",
        file: "invite.tsx",
        code: `<CopyButton
  value={async () => (await createInvite({ role: "member" })).url}
  label="Copy an invite link"
  onCopied={() => track("invite_copied")}
>
  Copy invite link
</CopyButton>`,
      },
      {
        title: "In another language",
        line: "Its words come from QeetrixProvider; messages overrides one button's.",
        file: "hindi.tsx",
        code: `import { QeetrixProvider } from "@qeetrix/react";
import { CopyButton } from "@qeetrix/react/experimental";
import { hi } from "@qeetrix/react/locales/hi";

<QeetrixProvider locale="hi-IN" messages={hi}>
  <CopyButton value="usr_01J8K2M4PQ" />
</QeetrixProvider>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Enter"], action: "Copies." },
      { keys: ["Space"], action: "Copies." },
      { keys: ["Tab"], action: "Moves focus to it; its tooltip opens." },
    ],
    checks: [
      { check: "Name", result: 'label, or "Copy"; with a visible label, the label names it.' },
      {
        check: "Copied",
        result:
          'Announced politely through a status region; the tooltip says "Copied"; focus stays.',
      },
      {
        check: "Fails visibly",
        result:
          'With no clipboard access: the icon turns to an alert and "Couldn\'t copy" is announced.',
      },
      { check: "Resets", result: "Back to Copy after resetAfter, 2 seconds by default." },
      { check: "Focus", result: "A 2px Ember ring on :focus-visible, inside a 1px surface gap." },
    ],
    tested: [
      "axe, WCAG 2.2 A and AA, in Chromium on every pull request",
      "Firefox and WebKit every night",
      "A stubbed clipboard: copied, and failed",
      "Hindi: its words from QeetrixProvider",
    ],
  },

  changelog: [
    {
      version: "0.1.0",
      items: ['With a visible label it keeps its tooltip and its "Copied" message.'],
    },
    {
      version: "0.0.3",
      items: [
        'CopyButton: copies a value or what a function returns, even asynchronously; the icon turns to a check, "Copied" is announced, focus stays, and it resets after 2 seconds. It fails visibly where there\'s no clipboard.',
      ],
    },
  ],

  related: [
    { name: "Icon button", when: "Any other action as an icon" },
    { name: "Code block", when: "Code to read and copy" },
    { name: "Button", when: "An action with its words" },
    { name: "Tooltip", when: "A short hint" },
  ],
};
