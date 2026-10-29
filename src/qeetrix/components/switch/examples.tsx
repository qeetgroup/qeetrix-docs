// Components › Switch: its examples, the real Switch with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { Stack, Switch, Text } from "@qeetrix/react";
import { useState } from "react";
import type { ExampleDoc } from "../types";

function Saved() {
  const [on, setOn] = useState(true);
  return (
    <Stack gap="sm">
      <Switch
        label="Two-step sign-in for everyone"
        description="Asked at the next sign-in."
        checked={on}
        onCheckedChange={setOn}
      />
      <Text tone="subtle" size="sm">
        {on ? "On for 1,284 people. Saved." : "Off. Saved."}
      </Text>
    </Stack>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "a-setting",
    title: "A setting",
    line: "On or off, at once: no Save. The thumb moves to the end side in either direction.",
    code: `<Switch label="Email me a weekly summary" description="Every Monday at 9 am." defaultChecked />`,
    render: () => (
      <Switch
        label="Email me a weekly summary"
        description="Every Monday at 9 am."
        defaultChecked
      />
    ),
  },
  {
    id: "a-list-of-settings",
    title: "A list of settings",
    line: "Each its own row, each applied as it's switched.",
    code: `<Stack gap="md">
  <Switch label="New sign-ins" defaultChecked />
  <Switch label="Accepted invites" defaultChecked />
  <Switch label="Billing changes" />
</Stack>`,
    render: () => (
      <Stack gap="md">
        <Switch label="New sign-ins" defaultChecked />
        <Switch label="Accepted invites" defaultChecked />
        <Switch label="Billing changes" />
      </Stack>
    ),
  },
  {
    id: "applied-at-once",
    title: "Applied at once",
    line: "checked and onCheckedChange: save as it changes, and say so.",
    code: `const [on, setOn] = useState(true);

<Switch
  label="Two-step sign-in for everyone"
  description="Asked at the next sign-in."
  checked={on}
  onCheckedChange={(next) => { setOn(next); savePolicy({ mfa: next }); }}
/>`,
    render: () => <Saved />,
  },
  {
    id: "disabled",
    title: "Disabled",
    line: "Say why in the description.",
    code: `<Switch label="Single sign-on only" description="Needs a verified domain." disabled />`,
    render: () => (
      <Switch label="Single sign-on only" description="Needs a verified domain." disabled />
    ),
  },
];
