// Components › Checkbox: its examples, the real Checkbox with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { FingerprintPatternIcon } from "@qeetrix/icons/icons/fingerprint-pattern";
import { KeyRoundIcon } from "@qeetrix/icons/icons/key-round";
import { MailIcon } from "@qeetrix/icons/icons/mail";
import { ShieldCheckIcon } from "@qeetrix/icons/icons/shield-check";
import { Checkbox, CheckboxGroup, Stack } from "@qeetrix/react";
import type { ExampleDoc } from "../types";

const EVENTS = ["sign-ins", "invites", "billing"];

export const examples: ExampleDoc[] = [
  {
    id: "on-its-own",
    title: "On its own",
    line: "Yes or no: the whole row is the target, the description says what it means.",
    code: `<Stack gap="md">
  <Checkbox label="Email me a weekly summary" description="Every Monday at 9 am." defaultChecked />
  <Checkbox label="Include deleted users" />
</Stack>`,
    render: () => (
      <Stack gap="md">
        <Checkbox
          label="Email me a weekly summary"
          description="Every Monday at 9 am."
          defaultChecked
        />
        <Checkbox label="Include deleted users" />
      </Stack>
    ),
  },
  {
    id: "a-group",
    title: "A group",
    line: "Several under one question: the group's label is its legend, its value the checked values.",
    code: `<CheckboxGroup label="Tell me about" name="events" defaultValue={["sign-ins"]}>
  <Checkbox value="sign-ins" label="New sign-ins" />
  <Checkbox value="invites" label="Accepted invites" />
  <Checkbox value="billing" label="Billing changes" />
</CheckboxGroup>`,
    render: () => (
      <CheckboxGroup label="Tell me about" name="events" defaultValue={["sign-ins"]}>
        <Checkbox value="sign-ins" label="New sign-ins" />
        <Checkbox value="invites" label="Accepted invites" />
        <Checkbox value="billing" label="Billing changes" />
      </CheckboxGroup>
    ),
  },
  {
    id: "select-all",
    title: "Select all",
    line: "A parent checkbox, with the group's allValues: a dash while some are checked.",
    code: `<CheckboxGroup label="Tell me about" allValues={["sign-ins", "invites", "billing"]} defaultValue={["sign-ins"]}>
  <Checkbox parent label="Everything" />
  <Checkbox value="sign-ins" label="New sign-ins" />
  <Checkbox value="invites" label="Accepted invites" />
  <Checkbox value="billing" label="Billing changes" />
</CheckboxGroup>`,
    render: () => (
      <CheckboxGroup label="Tell me about" allValues={EVENTS} defaultValue={["sign-ins"]}>
        <Checkbox parent label="Everything" />
        <Checkbox value="sign-ins" label="New sign-ins" />
        <Checkbox value="invites" label="Accepted invites" />
        <Checkbox value="billing" label="Billing changes" />
      </CheckboxGroup>
    ),
  },
  {
    id: "tiles",
    title: "Tiles",
    line: 'variant="tile": for choices that need explaining. The whole tile checks it.',
    code: `<CheckboxGroup label="Sign-in methods" variant="tile" columns={2} defaultValue={["passkey"]}>
  <Checkbox value="passkey" icon={FingerprintPatternIcon} label="Passkey" description="Face, fingerprint or a security key." />
  <Checkbox value="otp" icon={ShieldCheckIcon} label="One-time code" description="From an authenticator app." />
  <Checkbox value="email" icon={MailIcon} label="Email link" description="A link, valid for 10 minutes." />
  <Checkbox value="password" icon={KeyRoundIcon} label="Password" description="With two-step sign-in." />
</CheckboxGroup>`,
    render: () => (
      <div className="qc-wide">
        <CheckboxGroup
          label="Sign-in methods"
          variant="tile"
          columns={2}
          defaultValue={["passkey"]}
        >
          <Checkbox
            value="passkey"
            icon={FingerprintPatternIcon}
            label="Passkey"
            description="Face, fingerprint or a security key."
          />
          <Checkbox
            value="otp"
            icon={ShieldCheckIcon}
            label="One-time code"
            description="From an authenticator app."
          />
          <Checkbox
            value="email"
            icon={MailIcon}
            label="Email link"
            description="A link, valid for 10 minutes."
          />
          <Checkbox
            value="password"
            icon={KeyRoundIcon}
            label="Password"
            description="With two-step sign-in."
          />
        </CheckboxGroup>
      </div>
    ),
  },
  {
    id: "states",
    title: "Invalid and disabled",
    line: "The group's error says what's missing; a disabled option stays readable.",
    code: `<CheckboxGroup label="Tell me about" error="Choose at least one.">
  <Checkbox value="sign-ins" label="New sign-ins" />
  <Checkbox value="billing" label="Billing changes" disabled description="Only billing admins get these." />
</CheckboxGroup>`,
    render: () => (
      <CheckboxGroup label="Tell me about" error="Choose at least one.">
        <Checkbox value="sign-ins" label="New sign-ins" />
        <Checkbox
          value="billing"
          label="Billing changes"
          disabled
          description="Only billing admins get these."
        />
      </CheckboxGroup>
    ),
  },
];
