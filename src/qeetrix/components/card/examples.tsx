// Components › Card: its examples, the real Card with the code for each. Server-safe, so they're
// rendered with the page: nothing here reads token data.
import { Button, Card, formatRelativeTime, Table, Text } from "@qeetrix/react";
import type { ExampleDoc } from "../types";

const NOW = Date.UTC(2026, 9, 29, 4, 0);
const SIGN_INS = [
  { id: "s1", name: "Priya Sharma", method: "Passkey", at: NOW - 2 * 60_000 },
  { id: "s2", name: "Rahul Verma", method: "Passkey", at: NOW - 18 * 60_000 },
  { id: "s3", name: "Ananya Iyer", method: "Authenticator", at: NOW - 64 * 60_000 },
];

export const ApiKeyCard = () => (
  <Card
    title="Create API key"
    level={3}
    description="Machine-to-machine access to Acme Pvt Ltd."
    actions={<Button variant="ghost">View docs</Button>}
    footer={
      <>
        <Button variant="ghost">Cancel</Button>
        <Button>Create key</Button>
      </>
    }
  >
    <Text>Name the key so you can find it in the audit log.</Text>
  </Card>
);

export const examples: ExampleDoc[] = [
  {
    id: "a-titled-card",
    title: "A titled card",
    line: "title with its level: a section named by it. A description under it, actions at the header's end, a ruled footer.",
    code: `<Card
  title="Create API key"
  level={2}
  description="Machine-to-machine access to Acme Pvt Ltd."
  actions={<Button variant="ghost">View docs</Button>}
  footer={
    <>
      <Button variant="ghost">Cancel</Button>
      <Button>Create key</Button>
    </>
  }
>
  Name the key so you can find it in the audit log.
</Card>`,
    render: () => (
      <div className="qc-fold-stage">
        <ApiKeyCard />
      </div>
    ),
  },
  {
    id: "subdued",
    title: "Subdued",
    line: 'variant="subdued": the sunken surface, for a secondary panel beside or below the main content.',
    code: `<Card variant="subdued" title="Usage this month" level={2}>48,210 sign-ins · 72% with a passkey</Card>`,
    render: () => (
      <div className="qc-fold-stage">
        <Card variant="subdued" title="Usage this month" level={3}>
          <Text>48,210 sign-ins · 72% with a passkey</Text>
        </Card>
      </div>
    ),
  },
  {
    id: "a-danger-zone",
    title: "A danger zone",
    line: 'tone="danger": the border and title in danger, for settings that delete. The title still says what it is.',
    code: `<Card tone="danger" title="Delete organisation" level={2} footer={<Button tone="danger">Delete Acme Pvt Ltd</Button>}>
  Every user, application and key goes with it.
</Card>`,
    render: () => (
      <div className="qc-fold-stage">
        <Card
          tone="danger"
          title="Delete organisation"
          level={3}
          footer={<Button tone="danger">Delete Acme Pvt Ltd</Button>}
        >
          <Text>Every user, application and key goes with it. This can't be undone.</Text>
        </Card>
      </div>
    ),
  },
  {
    id: "a-table-inside",
    title: "A table inside",
    line: "A Table as the body's direct child runs edge to edge.",
    code: `<Card title="Recent sign-ins" level={2}>
  <Table label="Recent sign-ins" … />
</Card>`,
    render: () => (
      <div className="qc-fold-stage">
        <Card title="Recent sign-ins" level={3}>
          <Table
            label="Recent sign-ins"
            rows={SIGN_INS}
            rowId={(row) => row.id}
            rowLabel={(row) => row.name}
            columns={[
              { id: "name", header: "Name", cell: (row) => row.name },
              { id: "method", header: "Method", cell: (row) => row.method },
              {
                id: "at",
                header: "When",
                align: "end",
                cell: (row) => formatRelativeTime(row.at, "en-IN", NOW),
              },
            ]}
          />
        </Card>
      </div>
    ),
  },
  {
    id: "untitled",
    title: "Untitled",
    line: "Without a title it's a plain surface, not a section.",
    code: `<Card>Passkeys are on for every admin.</Card>`,
    render: () => (
      <div className="qc-fold-stage">
        <Card>
          <Text>Passkeys are on for every admin.</Text>
        </Card>
      </div>
    ),
  },
];
