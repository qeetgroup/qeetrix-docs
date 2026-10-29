// Components › Input: its examples, the real Input with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { SearchIcon } from "@qeetrix/icons/icons/search";
import { Field, Input, Stack } from "@qeetrix/react";
import { CopyButton } from "@qeetrix/react/experimental";
import type { ExampleDoc } from "../types";

export const examples: ExampleDoc[] = [
  {
    id: "in-a-field",
    title: "In a field",
    line: "Field gives it a label, a description and an error; TextField is the two in one.",
    code: `<Field label="Legal name" description="As on your GST certificate.">
  <Input defaultValue="Acme Private Limited" />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="Legal name" description="As on your GST certificate.">
          <Input defaultValue="Acme Private Limited" />
        </Field>
      </div>
    ),
  },
  {
    id: "icon-and-affixes",
    title: "Icon and affixes",
    line: "A leading icon; text before or after the value, in the box.",
    code: `<Stack gap="lg">
  <Field label="Amount"><Input startAdornment="₹" defaultValue="1,24,500" /></Field>
  <Field label="Discount"><Input endAdornment="%" defaultValue="12" /></Field>
  <Field label="Subdomain"><Input endAdornment=".qeet.in" defaultValue="acme" /></Field>
</Stack>`,
    render: () => (
      <div className="qc-narrow">
        <Stack gap="lg">
          <Field label="Amount">
            <Input startAdornment="₹" defaultValue="1,24,500" />
          </Field>
          <Field label="Discount">
            <Input endAdornment="%" defaultValue="12" />
          </Field>
          <Field label="Subdomain">
            <Input endAdornment=".qeet.in" defaultValue="acme" />
          </Field>
        </Stack>
      </div>
    ),
  },
  {
    id: "with-a-tool",
    title: "With a tool",
    line: "endAdornment holds a control too: a Copy button beside a read-only key.",
    code: `<Field label="Client ID">
  <Input readOnly defaultValue="qid_app_01J9ZK4T7B2R" endAdornment={<CopyButton value="qid_app_01J9ZK4T7B2R" label="Copy client ID" size="sm" />} />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="Client ID">
          <Input
            readOnly
            defaultValue="qid_app_01J9ZK4T7B2R"
            endAdornment={
              <CopyButton value="qid_app_01J9ZK4T7B2R" label="Copy client ID" size="sm" />
            }
          />
        </Field>
      </div>
    ),
  },
  {
    id: "search-in-a-toolbar",
    title: "Search in a toolbar",
    line: "The one place a label hides: hideLabel keeps it for screen readers.",
    code: `<Field label="Search users" hideLabel>
  <Input type="search" icon={SearchIcon} placeholder="Name, email or ID" />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="Search users" hideLabel>
          <Input type="search" icon={SearchIcon} placeholder="Name, email or ID" />
        </Field>
      </div>
    ),
  },
];
