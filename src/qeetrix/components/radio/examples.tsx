// Components › Radio: its examples, the real RadioGroup with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { AppWindowIcon } from "@qeetrix/icons/icons/app-window";
import { ServerIcon } from "@qeetrix/icons/icons/server";
import { SmartphoneIcon } from "@qeetrix/icons/icons/smartphone";
import { Radio, RadioGroup, Stack, Text } from "@qeetrix/react";
import { useState } from "react";
import type { ExampleDoc } from "../types";

function Plan() {
  const [cycle, setCycle] = useState<"monthly" | "yearly">("yearly");
  return (
    <Stack gap="sm">
      <RadioGroup<"monthly" | "yearly">
        label="Billing cycle"
        value={cycle}
        onValueChange={setCycle}
      >
        <Radio value="monthly" label="Monthly" description="₹2,400 a seat" />
        <Radio value="yearly" label="Yearly" description="₹24,000 a seat: two months free" />
      </RadioGroup>
      <Text tone="subtle" size="sm">
        {cycle === "yearly" ? "Renews on 1 November 2027." : "Renews on 1 December 2026."}
      </Text>
    </Stack>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "a-group",
    title: "A group",
    line: "One answer from a few, always answered. Arrow keys move and choose; the group is one Tab stop.",
    code: `<RadioGroup label="Billing cycle" defaultValue="yearly">
  <Radio value="monthly" label="Monthly" description="₹2,400 a seat" />
  <Radio value="yearly" label="Yearly" description="₹24,000 a seat: two months free" />
</RadioGroup>`,
    render: () => (
      <RadioGroup label="Billing cycle" defaultValue="yearly">
        <Radio value="monthly" label="Monthly" description="₹2,400 a seat" />
        <Radio value="yearly" label="Yearly" description="₹24,000 a seat: two months free" />
      </RadioGroup>
    ),
  },
  {
    id: "in-a-row",
    title: "In a row",
    line: 'orientation="horizontal", for short options.',
    code: `<RadioGroup label="Session length" orientation="horizontal" defaultValue="8h">
  <Radio value="1h" label="1 hour" />
  <Radio value="8h" label="8 hours" />
  <Radio value="24h" label="24 hours" />
</RadioGroup>`,
    render: () => (
      <RadioGroup label="Session length" orientation="horizontal" defaultValue="8h">
        <Radio value="1h" label="1 hour" />
        <Radio value="8h" label="8 hours" />
        <Radio value="24h" label="24 hours" />
      </RadioGroup>
    ),
  },
  {
    id: "tiles",
    title: "Tiles",
    line: 'variant="tile": for choices that need explaining, such as an application\'s type.',
    code: `<RadioGroup label="Application type" variant="tile" columns={3} defaultValue="web">
  <Radio value="web" icon={AppWindowIcon} label="Web app" description="Signs people in on a server." />
  <Radio value="native" icon={SmartphoneIcon} label="Mobile app" description="iOS or Android, with PKCE." />
  <Radio value="machine" icon={ServerIcon} label="Service" description="Machine to machine, no people." />
</RadioGroup>`,
    render: () => (
      <div className="qc-wide">
        <RadioGroup label="Application type" variant="tile" columns={3} defaultValue="web">
          <Radio
            value="web"
            icon={AppWindowIcon}
            label="Web app"
            description="Signs people in on a server."
          />
          <Radio
            value="native"
            icon={SmartphoneIcon}
            label="Mobile app"
            description="iOS or Android, with PKCE."
          />
          <Radio
            value="machine"
            icon={ServerIcon}
            label="Service"
            description="Machine to machine, no people."
          />
        </RadioGroup>
      </div>
    ),
  },
  {
    id: "controlled",
    title: "Controlled",
    line: 'Generic over its value: RadioGroup<"monthly" | "yearly">, and the page follows it.',
    code: `const [cycle, setCycle] = useState<"monthly" | "yearly">("yearly");

<RadioGroup<"monthly" | "yearly"> label="Billing cycle" value={cycle} onValueChange={setCycle}>
  <Radio value="monthly" label="Monthly" />
  <Radio value="yearly" label="Yearly" />
</RadioGroup>`,
    render: () => <Plan />,
  },
  {
    id: "states",
    title: "Invalid and disabled",
    line: "The group's error; an option that can't be chosen, and why.",
    code: `<RadioGroup label="Data region" error="Choose where Acme's data lives.">
  <Radio value="mum" label="Mumbai" />
  <Radio value="hyd" label="Hyderabad" />
  <Radio value="fra" label="Frankfurt" disabled description="Not on your plan." />
</RadioGroup>`,
    render: () => (
      <RadioGroup label="Data region" error="Choose where Acme's data lives.">
        <Radio value="mum" label="Mumbai" />
        <Radio value="hyd" label="Hyderabad" />
        <Radio value="fra" label="Frankfurt" disabled description="Not on your plan." />
      </RadioGroup>
    ),
  },
];
