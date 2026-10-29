// Components › Number field: its examples, the real NumberField with the code for each. Shared by
// the page (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { Field, QeetrixProvider, Stack } from "@qeetrix/react";
import { NumberField } from "@qeetrix/react/experimental";
import { hi } from "@qeetrix/react/locales/hi";
import type { ExampleDoc } from "../types";

export const examples: ExampleDoc[] = [
  {
    id: "steps",
    title: "Typed or stepped",
    line: "The − and + buttons, the arrow keys, Shift for big steps; min and max stop them.",
    code: `<Field label="Seats" description="Up to 500 on your plan.">
  <NumberField min={1} max={500} defaultValue={25} />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="Seats" description="Up to 500 on your plan.">
          <NumberField min={1} max={500} defaultValue={25} />
        </Field>
      </div>
    ),
  },
  {
    id: "units",
    title: "Units",
    line: "The unit as an affix, before or after: ₹, minutes.",
    code: `<Stack gap="lg">
  <Field label="Session length"><NumberField endAdornment="minutes" min={5} max={720} step={5} defaultValue={30} /></Field>
  <Field label="Credit limit"><NumberField startAdornment="₹" steppers={false} defaultValue={124500} /></Field>
</Stack>`,
    render: () => (
      <div className="qc-narrow">
        <Stack gap="lg">
          <Field label="Session length">
            <NumberField endAdornment="minutes" min={5} max={720} step={5} defaultValue={30} />
          </Field>
          <Field label="Credit limit">
            <NumberField startAdornment="₹" steppers={false} defaultValue={124500} />
          </Field>
        </Stack>
      </div>
    ),
  },
  {
    id: "formats",
    title: "Formats",
    line: "Formatted for the locale: en-IN groups in lakhs. format takes currency or per cent.",
    code: `<Stack gap="lg">
  <Field label="Annual contract"><NumberField format={{ style: "currency", currency: "INR", maximumFractionDigits: 0 }} steppers={false} defaultValue={1284000} /></Field>
  <Field label="Discount"><NumberField format={{ style: "percent" }} step={0.01} defaultValue={0.12} /></Field>
</Stack>`,
    render: () => (
      <div className="qc-narrow">
        <Stack gap="lg">
          <Field label="Annual contract">
            <NumberField
              format={{ style: "currency", currency: "INR", maximumFractionDigits: 0 }}
              steppers={false}
              defaultValue={1284000}
            />
          </Field>
          <Field label="Discount">
            <NumberField format={{ style: "percent" }} step={0.01} defaultValue={0.12} />
          </Field>
        </Stack>
      </div>
    ),
  },
  {
    id: "in-hindi",
    title: "In Hindi",
    line: "Its buttons' names and its spoken role come from QeetrixProvider.",
    code: `<QeetrixProvider locale="hi-IN" messages={hi}>
  <Field label="सीटें"><NumberField min={1} max={500} defaultValue={25} /></Field>
</QeetrixProvider>`,
    render: () => (
      <QeetrixProvider locale="hi-IN" messages={hi}>
        <div className="qc-narrow">
          <Field label="सीटें">
            <NumberField min={1} max={500} defaultValue={25} />
          </Field>
        </div>
      </QeetrixProvider>
    ),
  },
];
