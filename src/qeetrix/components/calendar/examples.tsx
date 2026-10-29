// Components › Calendar: its examples, the real Calendar with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data. Each sets
// today, so it reads the same on every day; the code leaves it out.
import { Grid, QeetrixProvider, Stack, Text } from "@qeetrix/react";
import { Calendar } from "@qeetrix/react/experimental";
import { hi } from "@qeetrix/react/locales/hi";
import { useState } from "react";
import { isDayOff, TODAY } from "../dates";
import type { ExampleDoc } from "../types";

const long = (date: string) =>
  new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

function Review() {
  const [date, setDate] = useState("2026-11-03");
  return (
    <Stack gap="sm" align="center">
      <Calendar
        value={date}
        onValueChange={setDate}
        min={TODAY}
        max="2026-11-30"
        isDateDisabled={isDayOff}
        today={TODAY}
      />
      <Text tone="subtle" size="sm">
        Access review on {long(date)}.
      </Text>
    </Stack>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "a-month",
    title: "A month",
    line: "One day in the Tab order: arrows move by day and week, Page Up and Down by month, Enter chooses. The title opens the years.",
    code: `<Calendar defaultValue="2026-10-14" />`,
    render: () => <Calendar defaultValue="2026-10-14" today={TODAY} />,
  },
  {
    id: "limits",
    title: "Limits",
    line: "min and max, and isDateDisabled for weekends and holidays: ruled-out days are greyed and skipped.",
    code: `const isDayOff = (date: string) => isWeekend(date) || holidays.has(date);

<Calendar min={today} max="2026-11-30" isDateDisabled={isDayOff} />`,
    render: () => (
      <Calendar
        min={TODAY}
        max="2026-11-30"
        isDateDisabled={isDayOff}
        defaultMonth="2026-11"
        today={TODAY}
      />
    ),
  },
  {
    id: "controlled",
    title: "Controlled",
    line: 'value and onValueChange, as "YYYY-MM-DD": no Date objects, no time zones.',
    code: `const [date, setDate] = useState("2026-11-03");

<Calendar value={date} onValueChange={setDate} min={today} max="2026-11-30" isDateDisabled={isDayOff} />`,
    render: () => <Review />,
  },
  {
    id: "week-start",
    title: "The week's first day",
    line: "From the locale: Sunday for India and the US, Monday for Britain.",
    code: `<Calendar locale="en-IN" defaultValue="2026-10-14" />
<Calendar locale="en-GB" defaultValue="2026-10-14" />`,
    render: () => (
      <Grid columns={{ base: 1, expanded: 2 }} gap="lg">
        {["en-IN", "en-GB"].map((locale) => (
          <Stack key={locale} gap="sm" align="start">
            <Text size="sm" tone="subtle">
              {locale}
            </Text>
            <Calendar locale={locale} defaultValue="2026-10-14" today={TODAY} />
          </Stack>
        ))}
      </Grid>
    ),
  },
  {
    id: "states",
    title: "Disabled and read-only",
    line: "Disabled: dimmed, and the month stays put. Read-only: browse the months, choose nothing.",
    code: `<Calendar defaultValue="2026-10-14" disabled />
<Calendar defaultValue="2026-10-14" readOnly />`,
    render: () => (
      <Grid columns={{ base: 1, expanded: 2 }} gap="lg">
        <Calendar defaultValue="2026-10-14" disabled today={TODAY} />
        <Calendar defaultValue="2026-10-14" readOnly today={TODAY} />
      </Grid>
    ),
  },
  {
    id: "in-hindi",
    title: "In Hindi",
    line: "Its month, its weekdays and its words come from QeetrixProvider.",
    code: `<QeetrixProvider locale="hi-IN" messages={hi}>
  <Calendar defaultValue="2026-10-14" />
</QeetrixProvider>`,
    render: () => (
      <QeetrixProvider locale="hi-IN" messages={hi}>
        <Calendar defaultValue="2026-10-14" today={TODAY} />
      </QeetrixProvider>
    ),
  },
];
