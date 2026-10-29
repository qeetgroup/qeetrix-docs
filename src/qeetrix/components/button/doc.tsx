// Components › Button: its documentation, from @qeetrix/react 0.2.0 (button.d.ts, button.css and
// internal/control.js), its spec, the Storybook stories (actions/button.stories.tsx) and the
// changelog. Every example and every do-and-don't is the real Button, rendered to HTML.
import { ArrowRightIcon } from "@qeetrix/icons/icons/arrow-right";
import { DownloadIcon } from "@qeetrix/icons/icons/download";
import { PlusIcon } from "@qeetrix/icons/icons/plus";
import { Button, Inline, Link, mirrorInRtl, Stack } from "@qeetrix/react";
import { controlHeights as heights } from "../sizes";
import type { ComponentDoc } from "../types";

const Next = mirrorInRtl(ArrowRightIcon);

export const button: ComponentDoc = {
  name: "Button",
  slug: "button",
  category: "actions",
  status: "stable",
  since: "0.0.2",
  lede: "An action. One solid and one soft per region; everything else ghost.",
  exports: ["Button"],
  renders: "<button>",
  source: "button",
  story: "components/actions/button.stories.tsx",

  examples: [
    {
      id: "variants",
      title: "Variants and tones",
      line: "Emphasis from the variant, intent from the tone.",
      code: `<Stack gap="md">
  <Inline gap="md">
    <Button>Save changes</Button>
    <Button variant="soft">Preview</Button>
    <Button variant="ghost">Cancel</Button>
  </Inline>
  <Inline gap="md">
    <Button tone="danger">Delete user</Button>
    <Button tone="danger" variant="soft">Revoke key</Button>
    <Button tone="danger" variant="ghost">Remove</Button>
  </Inline>
  <Inline gap="md">
    <Button tone="neutral" variant="ghost">Cancel</Button>
  </Inline>
</Stack>`,
      render: () => (
        <Stack gap="md">
          <Inline gap="md">
            <Button>Save changes</Button>
            <Button variant="soft">Preview</Button>
            <Button variant="ghost">Cancel</Button>
          </Inline>
          <Inline gap="md">
            <Button tone="danger">Delete user</Button>
            <Button tone="danger" variant="soft">
              Revoke key
            </Button>
            <Button tone="danger" variant="ghost">
              Remove
            </Button>
          </Inline>
          <Inline gap="md">
            <Button tone="neutral" variant="ghost">
              Cancel
            </Button>
          </Inline>
        </Stack>
      ),
    },
    {
      id: "sizes",
      title: "Sizes",
      line: "Heights from the density tokens: a compact region gets shorter buttons, with no new prop.",
      code: `<Inline gap="md" align="center">
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</Inline>`,
      render: () => (
        <Inline gap="md" align="center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Inline>
      ),
    },
    {
      id: "with-an-icon",
      title: "With an icon",
      line: "The icon trails the label, in its own zone. An arrow that points forward flips in right to left.",
      code: `import { ArrowRightIcon, PlusIcon } from "@qeetrix/icons";
import { Button, Inline, mirrorInRtl } from "@qeetrix/react";

const Next = mirrorInRtl(ArrowRightIcon);

<Inline gap="md">
  <Button icon={PlusIcon}>Invite users</Button>
  <Button variant="soft" icon={Next}>Continue</Button>
</Inline>`,
      render: () => (
        <Inline gap="md">
          <Button icon={PlusIcon}>Invite users</Button>
          <Button variant="soft" icon={Next}>
            Continue
          </Button>
        </Inline>
      ),
    },
    {
      id: "loading-and-disabled",
      title: "Loading and disabled",
      line: "Loading keeps the width and the focus. Disabled stays focusable, so its reason can be read.",
      code: `<Inline gap="md">
  <Button loading icon={PlusIcon}>Saving…</Button>
  <Button disabled>Create invoice</Button>
  <Button variant="soft" disabled>Preview</Button>
</Inline>`,
      render: () => (
        <Inline gap="md">
          <Button loading icon={PlusIcon}>
            Saving…
          </Button>
          <Button disabled>Create invoice</Button>
          <Button variant="soft" disabled>
            Preview
          </Button>
        </Inline>
      ),
    },
    {
      id: "full-width",
      title: "Full width",
      line: "Fills its container: the one action of a narrow form or a phone screen.",
      code: `<Button fullWidth icon={Next}>Continue with a passkey</Button>`,
      render: () => (
        <div className="qc-narrow">
          <Button fullWidth icon={Next}>
            Continue with a passkey
          </Button>
        </div>
      ),
    },
  ],

  usage: {
    useFor: [
      "Doing something here: saving, creating, confirming.",
      "Opening a dialog, menu or drawer.",
      "The one main action of a form, card or dialog.",
    ],
    notFor: [
      { text: "Going to another page", use: "Link" },
      { text: "An action shown only as an icon", use: "Icon button" },
      { text: "Turning a setting on or off", use: "Switch" },
      { text: "A pressed or not-pressed state", use: "Toggle" },
    ],
    anatomyFigure: (
      <Button size="lg" icon={PlusIcon}>
        Invite users
      </Button>
    ),
    anatomy: [
      { slot: "button", element: "<button>", note: 'The root: a native button, type="button".' },
      { slot: "button-label", element: "<span>", note: "Leads. A verb." },
      {
        slot: "button-zone",
        element: "<span>",
        note: "Trails, behind a 1px rule. Only with an icon, or while loading.",
      },
      { slot: "button-icon", element: "<svg>", note: "Sharp. 16px; 20px at lg." },
    ],
    rules: [
      {
        title: "One solid, one soft",
        doLine: "One solid and one soft in a region; the rest ghost.",
        dontLine: "Three solids: nothing leads.",
        doIt: (
          <Inline gap="sm">
            <Button>Save changes</Button>
            <Button variant="soft">Preview</Button>
            <Button variant="ghost">Cancel</Button>
          </Inline>
        ),
        dontIt: (
          <Inline gap="sm">
            <Button>Save changes</Button>
            <Button>Preview</Button>
            <Button>Cancel</Button>
          </Inline>
        ),
      },
      {
        title: "A verb for a label",
        doLine: "Say what happens.",
        dontLine: '"OK" and "Submit" say nothing.',
        doIt: (
          <Inline gap="sm">
            <Button>Create invoice</Button>
            <Button variant="ghost">Cancel</Button>
          </Inline>
        ),
        dontIt: (
          <Inline gap="sm">
            <Button>OK</Button>
            <Button variant="ghost">Cancel</Button>
          </Inline>
        ),
      },
      {
        title: "The icon trails",
        doLine: "Pass it as icon: it trails, in its zone.",
        dontLine: "An icon before the label.",
        doIt: <Button icon={PlusIcon}>Invite users</Button>,
        dontIt: (
          <Button>
            <PlusIcon size={16} aria-hidden /> Invite users
          </Button>
        ),
      },
      {
        title: "Confirm what can't be undone",
        doLine: "The danger action alone, in a dialog that asks.",
        dontLine: "Danger beside the primary, one slip away.",
        doIt: (
          <div className="qc-mini-dialog">
            <b>Delete 3 users?</b>
            <Inline gap="sm" justify="end">
              <Button variant="ghost" tone="neutral">
                Cancel
              </Button>
              <Button tone="danger">Delete users</Button>
            </Inline>
          </div>
        ),
        dontIt: (
          <Inline gap="sm">
            <Button>Save changes</Button>
            <Button tone="danger">Delete</Button>
          </Inline>
        ),
      },
      {
        title: "Links go places",
        doLine: "Going somewhere is a link.",
        dontLine: "A button that only navigates.",
        doIt: <Link href="#usage">Billing settings</Link>,
        dontIt: (
          <Button variant="ghost" icon={Next}>
            Billing settings
          </Button>
        ),
      },
    ],
    sizes: {
      specimen: (
        <Inline gap="md" align="center">
          <Button size="sm" icon={DownloadIcon}>
            Small
          </Button>
          <Button size="md" icon={DownloadIcon}>
            Medium
          </Button>
          <Button size="lg" icon={DownloadIcon}>
            Large
          </Button>
        </Inline>
      ),
      columns: [
        "Size",
        "Height: compact / default / comfortable",
        "Before the label",
        "Icon",
        "Type",
      ],
      rows: [
        ["sm", heights("sm"), "10px", "16px", "label.sm"],
        ["md", heights("md"), "14px", "16px", "label.md"],
        ["lg", heights("lg"), "16px", "20px", "label.md"],
      ],
    },
    content: [
      'A verb: "Create invoice", "Invite users".',
      "Sentence case, no full stop.",
      'Two or three words; never "OK" or "Submit".',
    ],
  },

  api: {
    props: [
      {
        name: "variant",
        type: '"solid" | "soft" | "ghost"',
        default: '"solid"',
        note: "Emphasis: primary, secondary, tertiary.",
      },
      {
        name: "tone",
        type: '"brand" | "danger" | "neutral"',
        default: '"brand"',
        note: "danger confirms a destructive flow; neutral is for ghost utility actions.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        note: "Height from the density tokens.",
      },
      {
        name: "icon",
        type: "QeetrixIcon",
        default: "—",
        note: "A trailing icon from @qeetrix/icons, drawn sharp.",
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        note: "A spinner replaces the icon; clicks are ignored; aria-busy is set.",
      },
      { name: "fullWidth", type: "boolean", default: "false", note: "Fills its container." },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        note: "Sets aria-disabled; the button stays focusable.",
      },
      {
        name: "render",
        type: 'Button.Props["render"]',
        default: "—",
        note: "Another element through Base UI. For navigation, LinkButton: it's announced as a link.",
      },
      { name: "children", type: "ReactNode", default: "—", note: "The label: a verb." },
    ],
    parts: [
      {
        slot: "button",
        element: "<button>",
        note: "The root. data-variant, data-tone, data-size; data-icon, data-loading when set.",
      },
      { slot: "button-label", element: "<span>", note: "The label." },
      { slot: "button-zone", element: "<span>", note: "The icon's zone, behind its rule." },
      { slot: "button-icon", element: "<svg>", note: "The icon." },
      { slot: "button-spinner", element: "<span>", note: "In the zone while loading." },
    ],
    recipes: [
      {
        title: "A link that looks like one",
        line: "LinkButton: Button's look, a link's semantics. Enter follows it, and it can open in a new tab.",
        file: "invite.tsx",
        code: `import { LinkButton } from "@qeetrix/react";
import { Link } from "@tanstack/react-router";

<LinkButton render={<Link to="/users/invite" />} icon={PlusIcon}>Invite users</LinkButton>`,
      },
      {
        title: "Placement only",
        line: "className and style place it; its look comes from the props and the tokens.",
        file: "toolbar.tsx",
        code: `<Button className="toolbar-end" variant="ghost" tone="neutral">Cancel</Button>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Enter"], action: "Activates it." },
      { keys: ["Space"], action: "Activates it." },
      { keys: ["Tab"], action: "Moves focus to it, even when it's disabled." },
    ],
    checks: [
      { check: "Role and name", result: "A native <button>; its name is its label." },
      { check: "Busy", result: "aria-busy while loading; clicks are ignored and focus stays." },
      {
        check: "Disabled",
        result: "aria-disabled, not disabled: it stays focusable, so its reason can be read.",
      },
      { check: "Focus", result: "A 2px Ember ring on :focus-visible, inside a 1px surface gap." },
      {
        check: "Forced colours",
        result: "The zone's rule becomes ButtonText; GrayText when disabled.",
      },
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
      version: "0.2.0",
      items: ["LinkButton: navigation drawn as a Button, announced as a link."],
    },
    {
      version: "0.1.1",
      items: ["mirrorInRtl(Icon): an icon that points forward flips in right to left."],
    },
    {
      version: "0.1.0",
      items: ["Keeps its name in the build (Button, not Button$1) in DevTools."],
    },
    {
      version: "0.0.3",
      items: [
        "The neutral tone, for ghost utility actions.",
        "The icon's own zone (button-zone), behind a 1px rule.",
      ],
    },
    { version: "0.0.2", items: ["Button, on Base UI's Button."] },
  ],

  related: [
    { name: "Icon button", when: "An action as an icon" },
    { name: "Link", when: "To go to another page" },
    { name: "Toggle", when: "Pressed or not" },
    { name: "Copy button", when: "To copy a value" },
  ],
};
