// Components › OTP input: its documentation, from @qeetrix/react 0.2.0 (experimental/otp-input, on
// Base UI's OTP Field) and the changelog. Its examples run live (Live.tsx).
import { Field } from "@qeetrix/react";
import { OTPInput } from "@qeetrix/react/experimental";
import { FORM_TESTED } from "../forms";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const otpInput: ComponentDoc = {
  name: "OTP input",
  slug: "otp-input",
  category: "forms",
  status: "experimental",
  since: "0.0.4",
  lede: "A one-time code in slots. Paste fills them all; the phone's SMS autofill lands in one go.",
  exports: ["OTPInput"],
  renders: "<input> per slot",
  source: "experimental/otp-input",
  story: "components/data-entry/otp-input.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A code sent by SMS or email, or from an authenticator app.",
      "A recovery code, in groups.",
    ],
    notFor: [
      { text: "A password", use: "Password input" },
      { text: "A number that's a quantity", use: "Number field" },
    ],
    anatomyFigure: (
      <div className="qc-anat-field">
        <Field label="Verification code">
          <OTPInput defaultValue="4829" groups={[3, 3]} />
        </Field>
      </div>
    ),
    anatomy: [
      {
        slot: "field-label",
        element: "<label>",
        note: "Names the slots' group, and the first slot.",
      },
      {
        slot: "otp-input",
        element: '<div role="group">',
        note: "The slots, sharing the width; they shrink to fit.",
      },
      {
        slot: "otp-input-slot",
        element: "<input>",
        note: 'One character; the others say where they are: "Character 2 of 6".',
      },
    ],
    rules: [
      {
        title: "Say where it went",
        doLine: "The description says where the code was sent.",
        dontLine: "A code from somewhere.",
        doIt: (
          <div className="qc-narrow">
            <Field label="Verification code" description="Sent to +91 98765 •••10.">
              <OTPInput />
            </Field>
          </div>
        ),
        dontIt: (
          <div className="qc-narrow">
            <Field label="Code">
              <OTPInput />
            </Field>
          </div>
        ),
      },
    ],
    content: [
      "Say where the code was sent, and for how long it lasts.",
      'Offer a new code in words: "Send a new code".',
      'Errors say what to do: "That code has expired. Send a new one."',
    ],
  },

  api: {
    props: [
      { name: "length", type: "number", default: "6", note: "How many characters." },
      {
        name: "groups",
        type: "readonly number[]",
        default: "—",
        note: "Splits the slots: [3, 3] shows 123 – 456; they must add up to length.",
      },
      {
        name: "size",
        type: '"md" | "lg"',
        default: '"md"',
        note: "md in consoles; lg on sign-in pages.",
      },
      {
        name: "value · defaultValue · onValueChange",
        type: "string",
        default: "—",
        note: "The code so far.",
      },
      {
        name: "onValueComplete",
        type: "(value: string) => void",
        default: "—",
        note: "Called once every slot is filled: verify here.",
      },
      {
        name: "validationType",
        type: '"numeric" | "alpha" | "alphanumeric" | "none"',
        default: '"numeric"',
        note: "What each slot takes.",
      },
      {
        name: "mask",
        type: "boolean",
        default: "false",
        note: "Hides the characters as they're typed.",
      },
      {
        name: "aria-label",
        type: "string",
        default: "—",
        note: "Without a Field label: names the code.",
      },
      {
        name: "disabled · name · required",
        type: "…",
        default: "—",
        note: "As on a form control.",
      },
    ],
    parts: [
      { slot: "otp-input", element: '<div role="group">', note: "The slots' group." },
      {
        slot: "otp-input-slot",
        element: "<input>",
        note: 'A slot; autocomplete="one-time-code" for SMS autofill.',
      },
    ],
    recipes: [
      {
        title: "Verify when it's full",
        line: "onValueComplete, then the Field's error if it's wrong.",
        file: "verify.tsx",
        code: `<Field label="Verification code" error={error} description="Sent to +91 98765 •••10.">
  <OTPInput onValueComplete={async (code) => setError(await verify(code) ? undefined : "That code isn't right.")} />
</Field>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["0–9"], action: "Fills a slot and moves on." },
      { keys: ["Backspace"], action: "Clears and moves back." },
      { keys: ["←", "→"], action: "Moves between slots." },
      { keys: ["Mod+V"], action: "Pastes the whole code into every slot." },
    ],
    checks: [
      {
        check: "Name",
        result:
          "The slots are a group named by the field's label; the first slot takes that name too.",
      },
      { check: "Position", result: 'Each other slot says where it is: "Character 2 of 6".' },
      {
        check: "Autofill",
        result: 'autocomplete="one-time-code": the phone\'s SMS code lands in one go.',
      },
      { check: "Narrow screens", result: "The slots share the width and shrink to fit." },
    ],
    tested: FORM_TESTED,
  },

  changelog: [
    {
      version: "0.4.0",
      items: [
        "The focused slot of an invalid code shows the Ember focus frame; the other slots keep the danger frame.",
        "A read-only code looks read-only, as a read-only Input: no fill, no hover tint, a border.strong line and a default cursor.",
      ],
    },
    {
      version: "0.1.0",
      items: ["Its name reaches every slot.", "The slots shrink to fit narrow columns."],
    },
    {
      version: "0.0.3",
      items: [
        'OTPInput: one-time codes in slots on Base UI\'s OTP Field: typing moves on, paste fills every slot, SMS autofill lands at once; numeric by default; groups; md and lg; "Character 2 of 6".',
      ],
    },
  ],

  related: [
    { name: "Password input", when: "A password" },
    { name: "Text field", when: "Other text" },
    { name: "Form", when: "Validation and summary" },
  ],
};
