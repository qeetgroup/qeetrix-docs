// Components › Date picker: its examples, the real DatePicker with the code for each. Shared by the
// page (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data. Each sets
// today, so it reads the same on every day; the code leaves it out.
import { Card, Field, QeetrixProvider, Stack } from "@qeetrix/react";
import { DatePicker } from "@qeetrix/react/experimental";
import { hi } from "@qeetrix/react/locales/hi";
import { isWeekend, TODAY } from "../dates";
import type { ExampleDoc } from "../types";

export const examples: ExampleDoc[] = [
  {
    id: "typed-or-chosen",
    title: "Typed or chosen",
    line: "Type it in the locale's order (25/10/2026), or open the calendar: the button, or Alt+↓ in the field.",
    code: `<Field label="Joining date">
  <DatePicker defaultValue="2026-11-02" />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="Joining date">
          <DatePicker defaultValue="2026-11-02" today={TODAY} />
        </Field>
      </div>
    ),
  },
  {
    id: "limits",
    title: "Limits",
    line: 'min, max and isDateDisabled. Type a Saturday: it keeps its text, and the field says why (validationMode="onBlur"; else on submit).',
    code: `<Field label="Probation review" description="A weekday in November or December." validationMode="onBlur">
  <DatePicker min="2026-11-01" max="2026-12-31" isDateDisabled={isWeekend} defaultValue="2026-11-12" />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field
          label="Probation review"
          description="A weekday in November or December."
          validationMode="onBlur"
        >
          <DatePicker
            min="2026-11-01"
            max="2026-12-31"
            isDateDisabled={isWeekend}
            defaultValue="2026-11-12"
            today={TODAY}
          />
        </Field>
      </div>
    ),
  },
  {
    id: "states",
    title: "Invalid, disabled, read-only",
    line: "Its Field's error; disabled and read-only on the picker.",
    code: `<Stack gap="lg">
  <Field label="Joining date" error="18/10/2026 is a Sunday."><DatePicker defaultValue="2026-10-18" /></Field>
  <Field label="Billing starts" disabled><DatePicker defaultValue="2026-04-01" disabled /></Field>
  <Field label="Account created"><DatePicker defaultValue="2026-10-01" readOnly /></Field>
</Stack>`,
    render: () => (
      <div className="qc-narrow">
        <Stack gap="lg">
          <Field label="Joining date" error="18/10/2026 is a Sunday.">
            <DatePicker defaultValue="2026-10-18" today={TODAY} />
          </Field>
          <Field label="Billing starts" disabled>
            <DatePicker defaultValue="2026-04-01" disabled today={TODAY} />
          </Field>
          <Field label="Account created">
            <DatePicker defaultValue="2026-10-01" readOnly today={TODAY} />
          </Field>
        </Stack>
      </div>
    ),
  },
  {
    id: "in-a-form",
    title: "In a form",
    line: 'With name, a hidden input submits "YYYY-MM-DD".',
    code: `<Card title="Employment" level={3}>
  <Field label="Joining date"><DatePicker name="joinedOn" defaultValue="2026-10-20" /></Field>
  <Field label="Last working day" optional><DatePicker name="leftOn" min="2026-10-20" /></Field>
</Card>`,
    render: () => (
      <div className="qc-narrow">
        <Card title="Employment" level={3}>
          <Stack gap="lg">
            <Field label="Joining date">
              <DatePicker name="joinedOn" defaultValue="2026-10-20" today={TODAY} />
            </Field>
            <Field label="Last working day" optional>
              <DatePicker name="leftOn" min="2026-10-20" today={TODAY} />
            </Field>
          </Stack>
        </Card>
      </div>
    ),
  },
  {
    id: "in-hindi",
    title: "In Hindi",
    line: "Its button's name, the calendar and its words come from QeetrixProvider.",
    code: `<QeetrixProvider locale="hi-IN" messages={hi}>
  <Field label="जॉइनिंग की तारीख़" optional><DatePicker /></Field>
</QeetrixProvider>`,
    render: () => (
      <QeetrixProvider locale="hi-IN" messages={hi}>
        <div className="qc-narrow">
          <Field label="जॉइनिंग की तारीख़" optional>
            <DatePicker today={TODAY} />
          </Field>
        </div>
      </QeetrixProvider>
    ),
  },
];
