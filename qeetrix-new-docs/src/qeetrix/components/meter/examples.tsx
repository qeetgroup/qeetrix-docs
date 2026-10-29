// Components › Meter: its examples, the real Meter with the code for each. Rendered with the page:
// nothing here reads token data.
import { Card, Meter, QeetrixProvider, Stack } from "@qeetrix/react";
import { hi } from "@qeetrix/react/locales/hi";
import type { ExampleDoc } from "../types";

export const examples: ExampleDoc[] = [
  {
    id: "a-measurement",
    title: "A measurement",
    line: "value within min and max, 0 and 100 by default: storage used, a quota spent. It isn't a task.",
    code: `<Meter label="Storage used" showValue value={68} />`,
    render: () => (
      <div className="qc-bar-stage">
        <Meter label="Storage used" showValue value={68} />
      </div>
    ),
  },
  {
    id: "tones",
    title: "Tones",
    line: "neutral or info for a plain amount; success, warning or danger for how it stands. Brand by default.",
    code: `<Meter label="Seats used" showValue value={36} />
<Meter label="Audit log storage" showValue value={52} tone="neutral" />
<Meter label="Uptime" showValue value={99.9} tone="success" />
<Meter label="SMS credits used" showValue value={84} tone="warning" />
<Meter label="API quota used" showValue value={97} tone="danger" />`,
    render: () => (
      <Stack gap="lg" className="qc-bar-stage">
        <Meter label="Seats used" showValue value={36} />
        <Meter label="Audit log storage" showValue value={52} tone="neutral" />
        <Meter label="Emails sent" showValue value={41} tone="info" />
        <Meter label="Uptime" showValue value={99.9} tone="success" />
        <Meter label="SMS credits used" showValue value={84} tone="warning" />
        <Meter label="API quota used" showValue value={97} tone="danger" />
      </Stack>
    ),
  },
  {
    id: "a-target",
    title: "A target",
    line: 'target: a goal on the range, a tick on the track, read out with the value: "40%, target 80%".',
    code: `<Meter label="People with two-step" showValue value={40} target={80} tone="warning" />`,
    render: () => (
      <div className="qc-bar-stage">
        <Meter label="People with two-step" showValue value={40} target={80} tone="warning" />
      </div>
    ),
  },
  {
    id: "counts-and-units",
    title: "Counts and units",
    line: 'format: the value as a count or a unit, { style: "unit", unit: "gigabyte" }; a percentage of the range by default.',
    code: `<Meter label="Members" showValue value={47} max={100} format={{ style: "decimal" }} />
<Meter label="File storage" showValue value={34} max={50} format={{ style: "unit", unit: "gigabyte" }} />`,
    render: () => (
      <Stack gap="lg" className="qc-bar-stage">
        <Meter label="Members" showValue value={47} max={100} format={{ style: "decimal" }} />
        <Meter
          label="File storage"
          showValue
          value={34}
          max={50}
          format={{ style: "unit", unit: "gigabyte" }}
        />
      </Stack>
    ),
  },
  {
    id: "plan-usage",
    title: "Plan usage",
    line: "A card of meters: each a limit, and how close it is.",
    code: `<Card title="Plan usage">
  <Stack gap="lg">
    <Meter label="Members" showValue value={47} max={100} format={{ style: "decimal" }} />
    <Meter label="Monthly active users" showValue value={27400} max={50000} />
    <Meter label="Log retention" showValue value={73} tone="warning" />
  </Stack>
</Card>`,
    render: () => (
      <div className="qc-bar-stage">
        <Card title="Plan usage" level={3}>
          <Stack gap="lg">
            <Meter label="Members" showValue value={47} max={100} format={{ style: "decimal" }} />
            <Meter label="Monthly active users" showValue value={27400} max={50000} />
            <Meter label="Log retention" showValue value={73} tone="warning" />
          </Stack>
        </Card>
      </div>
    ),
  },
  {
    id: "in-hindi",
    title: "In Hindi",
    line: "The provider's locale writes the value, grouped for India: 1,28,400.",
    code: `<QeetrixProvider locale="hi-IN" messages={hi}>
  <Meter label="उपयोग की गई स्टोरेज" showValue value={128400} max={200000} format={{ style: "decimal" }} />
</QeetrixProvider>`,
    render: () => (
      <div className="qc-bar-stage" lang="hi">
        <QeetrixProvider locale="hi-IN" messages={hi}>
          <Meter
            label="उपयोग की गई स्टोरेज"
            showValue
            value={128400}
            max={200000}
            format={{ style: "decimal" }}
          />
        </QeetrixProvider>
      </div>
    ),
  },
];
