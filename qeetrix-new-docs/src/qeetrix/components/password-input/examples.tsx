// Components › Password input: its examples, the real PasswordInput with the code for each. Shared
// by the page (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { Field, Stack } from "@qeetrix/react";
import { CopyButton, PasswordInput } from "@qeetrix/react/experimental";
import type { ExampleDoc } from "../types";

export const examples: ExampleDoc[] = [
  {
    id: "to-sign-in",
    title: "To sign in",
    line: 'autoComplete="current-password": the password manager fills it. Show password is a pressed toggle.',
    code: `<Field label="Password">
  <PasswordInput autoComplete="current-password" />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="Password">
          <PasswordInput autoComplete="current-password" defaultValue="correct-horse-battery" />
        </Field>
      </div>
    ),
  },
  {
    id: "a-new-one",
    title: "A new one",
    line: "new-password, so the manager suggests one; the description states the rule. Type with Caps Lock on to see its warning.",
    code: `<Field label="New password" description="At least 12 characters.">
  <PasswordInput autoComplete="new-password" minLength={12} />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="New password" description="At least 12 characters.">
          <PasswordInput autoComplete="new-password" minLength={12} />
        </Field>
      </div>
    ),
  },
  {
    id: "a-secret",
    title: "A secret",
    line: "off for a secret that isn't the person's password, with a Copy button at its end.",
    code: `<Field label="Client secret" description="Shown once. Store it in your vault.">
  <PasswordInput autoComplete="off" readOnly defaultValue={secret} endAdornment={<CopyButton value={secret} label="Copy client secret" size="sm" />} />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Stack gap="lg">
          <Field label="Client secret" description="Shown once. Store it in your vault.">
            <PasswordInput
              autoComplete="off"
              readOnly
              defaultValue="qsk_live_8f2c1a9b3e47d6"
              endAdornment={
                <CopyButton value="qsk_live_8f2c1a9b3e47d6" label="Copy client secret" size="sm" />
              }
            />
          </Field>
        </Stack>
      </div>
    ),
  },
];
