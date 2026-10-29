// Components › Textarea: its examples, the real Textarea with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { Field, Stack, Textarea } from "@qeetrix/react";
import type { ExampleDoc } from "../types";

const NOTE =
  "Renewal due in November. Send the quote to finance by the 15th, with the new seat count and the GST details.";

export const examples: ExampleDoc[] = [
  {
    id: "grows",
    title: "Grows as you type",
    line: "From rows to maxRows, then it scrolls. CSS field-sizing does it: no script measures it.",
    code: `<Field label="Note">
  <Textarea rows={2} maxRows={6} defaultValue="Renewal due in November…" />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="Note">
          <Textarea rows={2} maxRows={6} defaultValue={NOTE} />
        </Field>
      </div>
    ),
  },
  {
    id: "with-a-limit",
    title: "With a limit",
    line: "Say the limit in the description; maxLength holds it.",
    code: `<Field label="Reason for access" description="Up to 200 characters. Your admin sees it.">
  <Textarea maxLength={200} placeholder="e.g. Quarter-end audit of payroll" />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="Reason for access" description="Up to 200 characters. Your admin sees it.">
          <Textarea maxLength={200} placeholder="e.g. Quarter-end audit of payroll" />
        </Field>
      </div>
    ),
  },
  {
    id: "states",
    title: "Invalid, disabled, read-only",
    line: "The same states as Input, from the field around it.",
    code: `<Stack gap="lg">
  <Field label="Address" error="Add the PIN code."><Textarea defaultValue="12 MG Road, Bengaluru" /></Field>
  <Field label="Address" disabled><Textarea defaultValue="12 MG Road, Bengaluru 560001" /></Field>
  <Field label="Address"><Textarea readOnly defaultValue="12 MG Road, Bengaluru 560001" /></Field>
</Stack>`,
    render: () => (
      <div className="qc-narrow">
        <Stack gap="lg">
          <Field label="Address" error="Add the PIN code.">
            <Textarea defaultValue="12 MG Road, Bengaluru" />
          </Field>
          <Field label="Address" disabled>
            <Textarea defaultValue="12 MG Road, Bengaluru 560001" />
          </Field>
          <Field label="Address">
            <Textarea readOnly defaultValue="12 MG Road, Bengaluru 560001" />
          </Field>
        </Stack>
      </div>
    ),
  },
];
