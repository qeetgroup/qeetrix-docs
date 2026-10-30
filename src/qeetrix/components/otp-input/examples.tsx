// Components › OTP input: its examples, the real OTPInput with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { Field, Stack, Text } from "@qeetrix/react";
import { OTPInput } from "@qeetrix/react/experimental";
import { useState } from "react";
import type { ExampleDoc } from "../types";

function Verify() {
  const [state, setState] = useState("");
  return (
    <Stack gap="sm">
      <Field label="Verification code" description="Sent to +91 98765 •••10.">
        <OTPInput
          onValueComplete={(code) =>
            setState(code === "123456" ? "Verified." : `${code} isn't the code. Try 123456.`)
          }
        />
      </Field>
      <Text tone="subtle" size="sm">
        {state || "Type, or paste all six at once."}
      </Text>
    </Stack>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "six-digits",
    title: "Six digits",
    line: "Typing moves on, Backspace moves back, paste fills every slot; SMS autofill lands in one go.",
    code: `<Field label="Verification code" description="Sent to +91 98765 •••10.">
  <OTPInput onValueComplete={(code) => verify(code)} />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Verify />
      </div>
    ),
  },
  {
    id: "in-groups",
    title: "In groups",
    line: "groups splits the slots: 123 – 456, easier to read back.",
    code: `<Field label="Recovery code">
  <OTPInput length={8} groups={[4, 4]} validationType="alphanumeric" />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="Recovery code">
          <OTPInput length={8} groups={[4, 4]} validationType="alphanumeric" />
        </Field>
      </div>
    ),
  },
  {
    id: "sizes",
    title: "Sizes",
    line: "md in a console; lg on a sign-in page.",
    code: `<Stack gap="lg">
  <Field label="Code"><OTPInput size="md" /></Field>
  <Field label="Code"><OTPInput size="lg" /></Field>
</Stack>`,
    render: () => (
      <div className="qc-narrow">
        <Stack gap="lg">
          <Field label="Code">
            <OTPInput size="md" />
          </Field>
          <Field label="Code">
            <OTPInput size="lg" />
          </Field>
        </Stack>
      </div>
    ),
  },
  {
    id: "invalid",
    title: "Invalid",
    line: "The Field's error, under the slots.",
    code: `<Field label="Verification code" error="That code has expired. Send a new one.">
  <OTPInput defaultValue="482913" />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="Verification code" error="That code has expired. Send a new one.">
          <OTPInput defaultValue="482913" />
        </Field>
      </div>
    ),
  },
];
