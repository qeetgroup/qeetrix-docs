// Components › Date range picker: its examples, the real DateRangePicker with the code for each.
// Shared by the page (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token
// data. Each sets today, so it reads the same on every day; the code leaves it out.
import { Button, Card, Field, Inline, QeetrixProvider } from "@qeetrix/react";
import { DateRangePicker } from "@qeetrix/react/experimental";
import { hi } from "@qeetrix/react/locales/hi";
import { isDayOff, TODAY } from "../dates";
import type { ExampleDoc } from "../types";

export const examples: ExampleDoc[] = [
  {
    id: "typed-or-chosen",
    title: "Typed or chosen",
    line: 'Type both dates, any separator, either order: "01/12/2026 – 31/12/2026". Or pick two days in the calendar.',
    code: `<Field label="Period">
  <DateRangePicker defaultValue={{ start: "2026-10-19", end: "2026-10-25" }} />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="Period">
          <DateRangePicker
            defaultValue={{ start: "2026-10-19", end: "2026-10-25" }}
            today={TODAY}
          />
        </Field>
      </div>
    ),
  },
  {
    id: "presets",
    title: "Presets",
    line: "Ranges in one step beside the calendar, cut to min and max: ready-made by name, or your own.",
    code: `<Field label="Sign-ins">
  <DateRangePicker presets={["today", "last7Days", "last30Days", "thisMonth", "lastMonth"]} max={today} />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="Sign-ins">
          <DateRangePicker
            presets={["today", "last7Days", "last30Days", "thisMonth", "lastMonth"]}
            max={TODAY}
            defaultValue={{ start: "2026-10-23", end: "2026-10-29" }}
            today={TODAY}
          />
        </Field>
      </div>
    ),
  },
  {
    id: "limits",
    title: "Limits",
    line: "min, max and isDateDisabled: a range whose ends aren't allowed keeps its text, and the field says why as you leave it.",
    code: `<Field label="Leave" validationMode="onBlur">
  <DateRangePicker min={today} isDateDisabled={isDayOff} />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="Leave" validationMode="onBlur">
          <DateRangePicker min={TODAY} isDateDisabled={isDayOff} today={TODAY} />
        </Field>
      </div>
    ),
  },
  {
    id: "in-a-form",
    title: "In a form",
    line: 'startName and endName: two hidden inputs submit "YYYY-MM-DD".',
    code: `<Card title="Export audit log" level={3} footer={<Inline justify="end"><Button>Export CSV</Button></Inline>}>
  <Field label="Period">
    <DateRangePicker max={today} startName="from" endName="to" defaultValue={{ start: "2026-10-19", end: "2026-10-25" }} />
  </Field>
</Card>`,
    render: () => (
      <div className="qc-narrow">
        <Card
          title="Export audit log"
          level={3}
          footer={
            <Inline justify="end">
              <Button>Export CSV</Button>
            </Inline>
          }
        >
          <Field label="Period">
            <DateRangePicker
              max={TODAY}
              startName="from"
              endName="to"
              defaultValue={{ start: "2026-10-19", end: "2026-10-25" }}
              today={TODAY}
            />
          </Field>
        </Card>
      </div>
    ),
  },
  {
    id: "in-hindi",
    title: "In Hindi",
    line: "Its presets, its calendar and its words come from QeetrixProvider.",
    code: `<QeetrixProvider locale="hi-IN" messages={hi}>
  <Field label="अवधि"><DateRangePicker presets={["last7Days", "thisMonth"]} /></Field>
</QeetrixProvider>`,
    render: () => (
      <QeetrixProvider locale="hi-IN" messages={hi}>
        <div className="qc-narrow">
          <Field label="अवधि">
            <DateRangePicker presets={["last7Days", "thisMonth"]} today={TODAY} />
          </Field>
        </div>
      </QeetrixProvider>
    ),
  },
];
