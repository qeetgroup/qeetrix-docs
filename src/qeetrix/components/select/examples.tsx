// Components › Select: its examples, the real Select with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { Field, Select, Stack, Text } from "@qeetrix/react";
import { useState } from "react";
import type { ExampleDoc } from "../types";

export const CYCLES = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
];

const ROLES = [
  {
    label: "Admins",
    items: [
      { value: "owner", label: "Owner" },
      { value: "admin", label: "Admin" },
      { value: "billing", label: "Billing admin" },
    ],
  },
  {
    label: "Members",
    items: [
      { value: "member", label: "Member" },
      { value: "auditor", label: "Auditor" },
      { value: "guest", label: "Guest", disabled: true },
    ],
  },
];

const REGIONS = [
  { value: "mum", label: "Mumbai" },
  { value: "hyd", label: "Hyderabad" },
  { value: "che", label: "Chennai" },
  { value: "del", label: "Delhi NCR" },
];

function Cycle() {
  const [cycle, setCycle] = useState<string | null>("yearly");
  return (
    <Stack gap="sm">
      <Field label="Billing cycle">
        <Select items={CYCLES} value={cycle} onValueChange={setCycle} />
      </Field>
      <Text tone="subtle" size="sm">
        {cycle === "yearly"
          ? "Billed once a year, two months free."
          : cycle
            ? `Billed ${cycle}.`
            : "Choose a cycle."}
      </Text>
    </Stack>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "in-a-field",
    title: "In a field",
    line: "One of up to about fifteen. Field labels it; the chosen option carries the Ember check.",
    code: `const cycles = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
];

<Field label="Billing cycle">
  <Select items={cycles} placeholder="e.g. Monthly" />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="Billing cycle">
          <Select items={CYCLES} placeholder="e.g. Monthly" />
        </Field>
      </div>
    ),
  },
  {
    id: "grouped",
    title: "Grouped",
    line: "items in groups, each with its label; an option can be shown but not chosen.",
    code: `const roles = [
  { label: "Admins", items: [{ value: "owner", label: "Owner" }, { value: "admin", label: "Admin" }, …] },
  { label: "Members", items: [{ value: "member", label: "Member" }, { value: "guest", label: "Guest", disabled: true }, …] },
];

<Field label="Role">
  <Select items={roles} defaultValue="member" />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="Role">
          <Select items={ROLES} defaultValue="member" />
        </Field>
      </div>
    ),
  },
  {
    id: "several",
    title: "Several",
    line: "multiple: the trigger lists the chosen labels.",
    code: `<Field label="Data regions">
  <Select items={regions} multiple defaultValue={["mum", "hyd"]} />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="Data regions">
          <Select items={REGIONS} multiple defaultValue={["mum", "hyd"]} />
        </Field>
      </div>
    ),
  },
  {
    id: "controlled",
    title: "Controlled",
    line: "value and onValueChange: the page follows the choice.",
    code: `const [cycle, setCycle] = useState<string | null>("yearly");

<Field label="Billing cycle">
  <Select items={cycles} value={cycle} onValueChange={setCycle} />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Cycle />
      </div>
    ),
  },
  {
    id: "states",
    title: "Invalid and disabled",
    line: "An error from its Field; disabled from its own prop.",
    code: `<Stack gap="lg">
  <Field label="Billing cycle" error="Choose how often to bill.">
    <Select items={cycles} placeholder="e.g. Monthly" />
  </Field>
  <Field label="Billing cycle">
    <Select items={cycles} defaultValue="yearly" disabled />
  </Field>
</Stack>`,
    render: () => (
      <div className="qc-narrow">
        <Stack gap="lg">
          <Field label="Billing cycle" error="Choose how often to bill.">
            <Select items={CYCLES} placeholder="e.g. Monthly" />
          </Field>
          <Field label="Billing cycle">
            <Select items={CYCLES} defaultValue="yearly" disabled />
          </Field>
        </Stack>
      </div>
    ),
  },
];
