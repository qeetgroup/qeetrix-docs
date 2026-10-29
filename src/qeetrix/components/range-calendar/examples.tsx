// Components › Range calendar: its examples, the real RangeCalendar with the code for each. Shared by
// the page (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data. Each
// sets today, so it reads the same on every day; the code leaves it out.
import { Card, Grid, QeetrixProvider, Stack, Text } from "@qeetrix/react";
import { type DateRange, RangeCalendar } from "@qeetrix/react/experimental";
import { hi } from "@qeetrix/react/locales/hi";
import { useState } from "react";
import { isDayOff, TODAY } from "../dates";
import type { ExampleDoc } from "../types";

const days = (range: DateRange) =>
  Math.round((Date.parse(range.end) - Date.parse(range.start)) / 86_400_000) + 1;

function Leave() {
  const [range, setRange] = useState<DateRange>({ start: "2026-11-02", end: "2026-11-06" });
  return (
    <div className="qc-narrow">
      <Card title="Request leave" level={3}>
        <Stack gap="sm" align="center">
          <RangeCalendar
            value={range}
            onValueChange={setRange}
            min={TODAY}
            isDateDisabled={isDayOff}
            today={TODAY}
          />
          <Text tone="subtle" size="sm">
            {range.start} to {range.end}: {days(range)} days.
          </Text>
        </Stack>
      </Card>
    </div>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "a-range",
    title: "A range",
    line: "The first day picked is one end; the range follows the pointer or focus until the second. Escape undoes a half-chosen one.",
    code: `<RangeCalendar defaultValue={{ start: "2026-10-12", end: "2026-10-23" }} />`,
    render: () => (
      <RangeCalendar defaultValue={{ start: "2026-10-12", end: "2026-10-23" }} today={TODAY} />
    ),
  },
  {
    id: "limits",
    title: "Limits",
    line: "min, max and isDateDisabled: a ruled-out day can't be an end, and stays grey inside a range.",
    code: `<RangeCalendar min={today} max="2026-11-30" isDateDisabled={isDayOff} defaultValue={{ start: "2026-11-02", end: "2026-11-13" }} />`,
    render: () => (
      <RangeCalendar
        min={TODAY}
        max="2026-11-30"
        isDateDisabled={isDayOff}
        defaultValue={{ start: "2026-11-02", end: "2026-11-13" }}
        today={TODAY}
      />
    ),
  },
  {
    id: "controlled",
    title: "Controlled",
    line: "onValueChange is called once both ends are chosen, with { start, end }.",
    code: `const [range, setRange] = useState<DateRange>({ start: "2026-11-02", end: "2026-11-06" });

<Card title="Request leave" level={3}>
  <RangeCalendar value={range} onValueChange={setRange} min={today} isDateDisabled={isDayOff} />
</Card>`,
    render: () => <Leave />,
  },
  {
    id: "states",
    title: "Disabled and read-only",
    line: "As Calendar's: disabled stays put; read-only can be browsed.",
    code: `<RangeCalendar defaultValue={range} disabled />
<RangeCalendar defaultValue={range} readOnly />`,
    render: () => (
      <Grid columns={{ base: 1, expanded: 2 }} gap="lg">
        <RangeCalendar
          defaultValue={{ start: "2026-10-12", end: "2026-10-23" }}
          disabled
          today={TODAY}
        />
        <RangeCalendar
          defaultValue={{ start: "2026-10-12", end: "2026-10-23" }}
          readOnly
          today={TODAY}
        />
      </Grid>
    ),
  },
  {
    id: "in-hindi",
    title: "In Hindi",
    line: "Its month, weekdays and announcements come from QeetrixProvider.",
    code: `<QeetrixProvider locale="hi-IN" messages={hi}>
  <RangeCalendar defaultValue={{ start: "2026-10-12", end: "2026-10-23" }} />
</QeetrixProvider>`,
    render: () => (
      <QeetrixProvider locale="hi-IN" messages={hi}>
        <RangeCalendar defaultValue={{ start: "2026-10-12", end: "2026-10-23" }} today={TODAY} />
      </QeetrixProvider>
    ),
  },
];
