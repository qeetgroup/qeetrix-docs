// Components › Description list: its examples, the real DescriptionList with the code for each.
// Shared by the page (doc.tsx) and the island that runs them (Live.tsx), as their copy buttons
// copy: nothing here reads token data.
import { Badge, Card, QeetrixProvider, Text } from "@qeetrix/react";
import { CopyButton, DescriptionItem, DescriptionList } from "@qeetrix/react/experimental";
import { hi } from "@qeetrix/react/locales/hi";
import type { ExampleDoc } from "../types";

export const Priya = () => (
  <DescriptionList>
    <DescriptionItem term="Email">
      priya@acme.in
      <CopyButton value="priya@acme.in" label="Copy email" size="sm" />
    </DescriptionItem>
    <DescriptionItem term="Status">
      <Badge tone="success">Active</Badge>
    </DescriptionItem>
    <DescriptionItem term="Groups">
      <Badge>Engineering</Badge>
      <Badge>Admins</Badge>
    </DescriptionItem>
    <DescriptionItem term="Manager" />
    <DescriptionItem term="Last sign-in">2 minutes ago · Bengaluru</DescriptionItem>
  </DescriptionList>
);

export const examples: ExampleDoc[] = [
  {
    id: "a-records-facts",
    title: "A record's facts",
    line: "Rows: each term beside its value, a line between. Under 24rem the term moves above.",
    code: `<DescriptionList>
  <DescriptionItem term="Email">
    priya@acme.in
    <CopyButton value="priya@acme.in" label="Copy email" size="sm" />
  </DescriptionItem>
  <DescriptionItem term="Status"><Badge tone="success">Active</Badge></DescriptionItem>
  <DescriptionItem term="Manager" />
</DescriptionList>`,
    render: () => (
      <div className="qc-fold-stage">
        <Priya />
      </div>
    ),
  },
  {
    id: "columns",
    title: "Columns",
    line: 'layout="columns": the term above the value, in up to columns columns of at least 8rem.',
    code: `<DescriptionList layout="columns" columns={4}>
  <DescriptionItem term="Sessions">3 active</DescriptionItem>
  <DescriptionItem term="MFA">Passkey</DescriptionItem>
  <DescriptionItem term="Applications">12</DescriptionItem>
  <DescriptionItem term="Source">Azure AD</DescriptionItem>
</DescriptionList>`,
    render: () => (
      <div className="qc-crumb-header">
        <DescriptionList layout="columns" columns={4}>
          <DescriptionItem term="Sessions">3 active</DescriptionItem>
          <DescriptionItem term="MFA">Passkey</DescriptionItem>
          <DescriptionItem term="Applications">12</DescriptionItem>
          <DescriptionItem term="Source">Azure AD</DescriptionItem>
        </DescriptionList>
      </div>
    ),
  },
  {
    id: "in-a-card",
    title: "In a card",
    line: "A Card's rows run edge to edge.",
    code: `<Card title="Production backend">
  <DescriptionList>
    <DescriptionItem term="Key ID">
      <Text mono>kid_8f2c1a9b</Text>
      <CopyButton value="kid_8f2c1a9b" label="Copy key ID" size="sm" />
    </DescriptionItem>
    …
  </DescriptionList>
</Card>`,
    render: () => (
      <div className="qc-fold-stage">
        <Card title="Production backend" level={3}>
          <DescriptionList>
            <DescriptionItem term="Key ID">
              <Text mono>kid_8f2c1a9b</Text>
              <CopyButton value="kid_8f2c1a9b" label="Copy key ID" size="sm" />
            </DescriptionItem>
            <DescriptionItem term="Scopes">read:users write:sessions</DescriptionItem>
            <DescriptionItem term="Last used">2 minutes ago</DescriptionItem>
            <DescriptionItem term="Expires" />
            <DescriptionItem term="Status">
              <Badge tone="success">Live</Badge>
            </DescriptionItem>
          </DescriptionList>
        </Card>
      </div>
    ),
  },
  {
    id: "not-set",
    title: "Not set",
    line: 'An empty value shows "—", read as "Not set".',
    code: `<DescriptionItem term="Manager" />`,
    render: () => (
      <div className="qc-fold-stage">
        <DescriptionList>
          <DescriptionItem term="Manager" />
          <DescriptionItem term="Expires" />
        </DescriptionList>
      </div>
    ),
  },
  {
    id: "in-hindi",
    title: "In Hindi",
    line: 'QeetrixProvider\'s messages: "Not set", in Hindi.',
    code: `<QeetrixProvider messages={hi}>
  <DescriptionList>…</DescriptionList>
</QeetrixProvider>`,
    render: () => (
      <div className="qc-fold-stage" lang="hi">
        <QeetrixProvider messages={hi}>
          <DescriptionList>
            <DescriptionItem term="ईमेल">priya@acme.in</DescriptionItem>
            <DescriptionItem term="मैनेजर" />
          </DescriptionList>
        </QeetrixProvider>
      </div>
    ),
  },
];
