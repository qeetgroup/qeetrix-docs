// Components › Password input: its documentation, from @qeetrix/react 0.2.0 (experimental/
// password-input) and the changelog. Its examples run live (Live.tsx).
import { Field, Input } from "@qeetrix/react";
import { PasswordInput } from "@qeetrix/react/experimental";
import { FORM_TESTED } from "../forms";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const passwordInput: ComponentDoc = {
  name: "Password input",
  slug: "password-input",
  category: "forms",
  status: "experimental",
  since: "0.0.4",
  lede: "A password or a secret, with Show password. Paste always works, and there's no length cap.",
  exports: ["PasswordInput"],
  renders: '<input type="password">',
  source: "experimental/password-input",
  story: "components/data-entry/password-input.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Signing in, or setting a new password.",
      "A secret shown once: a client secret, a key.",
    ],
    notFor: [
      { text: "A one-time code", use: "OTP input" },
      { text: "Any other text", use: "Text field" },
    ],
    anatomyFigure: (
      <div className="qc-anat-field">
        <Field label="Password">
          <PasswordInput autoComplete="current-password" defaultValue="correct-horse-battery" />
        </Field>
      </div>
    ),
    anatomy: [
      { slot: "field-label", element: "<label>", note: "Names it, from its Field." },
      {
        slot: "input-control",
        element: "<input>",
        note: "Hidden until shown; spelling and capitalisation tools off.",
      },
      {
        slot: "input-end",
        element: "<span>",
        note: "Show password: a toggle with aria-pressed; showing and hiding is announced.",
      },
    ],
    rules: [
      {
        title: "Let it be shown",
        doLine: "Show password, so people can check what they typed.",
        dontLine: "A plain password input: typing blind.",
        doIt: (
          <div className="qc-narrow">
            <Field label="Password">
              <PasswordInput autoComplete="current-password" />
            </Field>
          </div>
        ),
        dontIt: (
          <div className="qc-narrow">
            <Field label="Password">
              <Input type="password" />
            </Field>
          </div>
        ),
      },
    ],
    content: [
      'State the rule before it\'s broken: "At least 12 characters."',
      "Never cap the length, never block paste: password managers need both.",
    ],
  },

  api: {
    props: [
      {
        name: "autoComplete",
        type: '"current-password" | "new-password" | "off"',
        default: "—",
        note: "Sign in, create one, or a secret that isn't theirs: so managers fill or suggest.",
      },
      {
        name: "visible · defaultVisible · onVisibleChange",
        type: "boolean",
        default: "false",
        note: "Whether it shows as text; hidden to start: people may not be alone.",
      },
      {
        name: "capsLockWarning",
        type: "boolean",
        default: "true",
        note: '"Caps Lock is on" while typing with it on.',
      },
      {
        name: "endAdornment",
        type: "ReactNode",
        default: "—",
        note: "Before Show password: a Copy button for a secret.",
      },
      {
        name: "messages",
        type: "Partial<…passwordInput>",
        default: "—",
        note: "Its words, over QeetrixProvider's.",
      },
      {
        name: "… Input's props",
        type: "",
        default: "—",
        note: "Everything Input takes, but type.",
      },
    ],
    parts: [
      { slot: "input-control", element: "<input>", note: "The input: Input's parts throughout." },
      {
        slot: "password-input-caps",
        element: "<span>",
        note: '"Caps Lock is on", at the box\'s end, while it is.',
      },
    ],
    recipes: [
      {
        title: "A new password",
        line: "new-password and the rule; it hides again when the form submits.",
        file: "new-password.tsx",
        code: `<Field label="New password" description="At least 12 characters." name="password">
  <PasswordInput autoComplete="new-password" minLength={12} required />
</Field>`,
      },
    ],
  },

  accessibility: {
    keyboard: [{ keys: ["Tab"], action: "To the input, then to Show password." }],
    checks: [
      {
        check: "Show password",
        result: "A toggle with aria-pressed; showing and hiding is announced.",
      },
      {
        check: "Caps Lock",
        result: '"Caps Lock is on" shows in the box while it is, with an arrow, not by colour.',
      },
      {
        check: "Hides on submit",
        result: "It hides again as its form submits, so the browser never stores it as text.",
      },
      { check: "Paste and managers", result: "Paste always works; there's no length cap." },
    ],
    tested: FORM_TESTED,
  },

  changelog: [
    {
      version: "0.0.3",
      items: [
        "PasswordInput: Input with a pressed-state Show password toggle, announced; hidden by default and again when its form submits; current-password, new-password or off; spelling and capitalisation tools off; a Caps Lock warning; endAdornment for a Copy button.",
      ],
    },
  ],

  related: [
    { name: "OTP input", when: "A one-time code" },
    { name: "Text field", when: "Other text" },
    { name: "Copy button", when: "For a secret" },
  ],
};
