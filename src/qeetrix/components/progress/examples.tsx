// Components › Progress: its examples, the real Progress with the code for each. Shared by the
// page (doc.tsx) and the island that runs them (Live.tsx), as an upload advances: nothing here
// reads token data.
import { Button, Card, Progress, Stack, Text } from "@qeetrix/react";
import { useEffect, useState } from "react";
import type { ExampleDoc } from "../types";

function Upload() {
  const [value, setValue] = useState<number | null>(null);
  useEffect(() => {
    if (value === null || value >= 100) return;
    const timer = setTimeout(() => setValue((current) => Math.min(100, (current ?? 0) + 10)), 250);
    return () => clearTimeout(timer);
  }, [value]);
  const done = value === 100;
  return (
    <Stack gap="md">
      <Progress
        label={done ? "Uploaded invoices.csv" : "Uploading invoices.csv"}
        showValue
        value={value ?? 0}
        tone={done ? "success" : "brand"}
      />
      <div>
        <Button variant="soft" onClick={() => setValue(0)} disabled={value !== null && !done}>
          {done ? "Upload again" : "Upload"}
        </Button>
      </div>
    </Stack>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "a-task",
    title: "A task",
    line: "value, from min to max (0 and 100 by default); label above it, and showValue at its end.",
    code: `<Progress label="Uploading invoices.csv" showValue value={percent} />`,
    render: () => (
      <div className="qc-bar-stage">
        <Upload />
      </div>
    ),
  },
  {
    id: "states",
    title: "States",
    line: "value={null} while the end is unknown: a segment slides, and fades under reduced motion. tone marks how it ended.",
    code: `<Progress label="Importing customers" value={null} />
<Progress label="Uploaded invoices.csv" showValue value={100} tone="success" />
<Progress label="Couldn't upload payroll-oct.csv" showValue value={72} tone="danger" />`,
    render: () => (
      <Stack gap="lg" className="qc-bar-stage">
        <Progress label="Importing customers" value={null} />
        <Progress label="Uploaded invoices.csv" showValue value={100} tone="success" />
        <Progress label="Couldn't upload payroll-oct.csv" showValue value={72} tone="danger" />
      </Stack>
    ),
  },
  {
    id: "a-count",
    title: "A count",
    line: "max and format: the value as a count, written and read for the locale.",
    code: `<Progress label="Records imported" showValue value={1360} max={2000} format={{ maximumFractionDigits: 0 }} />`,
    render: () => (
      <Stack gap="lg" className="qc-bar-stage">
        <Progress label="Records imported" showValue value={1360} max={2000} />
        <Progress
          label="Records imported"
          showValue
          value={1360}
          max={2000}
          format={{ maximumFractionDigits: 0 }}
        />
      </Stack>
    ),
  },
  {
    id: "in-a-card",
    title: "In a card",
    line: "No visible label: aria-label names it, and the count beside it is a status.",
    code: `<Progress aria-label="Users imported" value={1360} max={2000} />
<Text role="status" size="sm" tone="subtle">1,360 of 2,000 users</Text>`,
    render: () => (
      <div className="qc-bar-stage">
        <Card
          title="Importing users"
          level={3}
          description="acme-employees-oct.csv"
          footer={
            <Button variant="ghost" tone="neutral">
              Cancel import
            </Button>
          }
        >
          <Stack gap="sm">
            <Progress aria-label="Users imported" value={1360} max={2000} />
            <Text role="status" size="sm" tone="subtle">
              1,360 of 2,000 users
            </Text>
          </Stack>
        </Card>
      </div>
    ),
  },
];
