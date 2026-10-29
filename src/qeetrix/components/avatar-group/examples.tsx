// Components › Avatar group: its examples, the real AvatarGroup with the code for each. Shared by
// the page (doc.tsx) and the island that runs them (Live.tsx): its name lists the people for the
// locale, which the browser formats. Nothing here reads token data.
import { Card, QeetrixProvider, Table } from "@qeetrix/react";
import { AvatarGroup, type AvatarGroupPerson } from "@qeetrix/react/experimental";
import { hi } from "@qeetrix/react/locales/hi";
import type { ExampleDoc } from "../types";

export const PEOPLE: AvatarGroupPerson[] = [
  "Priya Sharma",
  "Rahul Verma",
  "Ananya Iyer",
  "Karthik Reddy",
  "Meera Nair",
  "Arjun Mehta",
  "Sneha Kulkarni",
].map((name) => ({ name }));

const APPS: AvatarGroupPerson[] = [
  "Payroll portal",
  "Expense claims",
  "Leave tracker",
  "Help desk",
].map((name) => ({ name }));

const GROUPS = [
  { name: "Engineering", people: PEOPLE, total: 412 },
  { name: "Admins", people: PEOPLE.slice(1, 3), total: 2 },
  { name: "Finance", people: PEOPLE.slice(3), total: 74 },
];

export const examples: ExampleDoc[] = [
  {
    id: "a-groups-members",
    title: "A group's members",
    line: "people: the first few; total: how many in all. The first max show, then +N.",
    code: `<AvatarGroup people={firstMembers} total={412} />`,
    render: () => <AvatarGroup people={PEOPLE} total={412} />,
  },
  {
    id: "how-many-show",
    title: "How many show",
    line: "max, 3 by default. Without total, +N counts the people not shown.",
    code: `<AvatarGroup people={people} max={5} />`,
    render: () => <AvatarGroup people={PEOPLE} max={5} size="md" />,
  },
  {
    id: "applications",
    title: "Applications",
    line: 'shape="square", with a square +N: say what they are in messages.label.',
    code: `<AvatarGroup
  people={apps}
  shape="square"
  messages={{ label: "{count} applications: {names}" }}
/>`,
    render: () => (
      <AvatarGroup
        people={APPS}
        shape="square"
        size="md"
        messages={{ label: "{count} applications: {names}" }}
      />
    ),
  },
  {
    id: "in-a-table",
    title: "In a table",
    line: "sm, by default, fits a table row.",
    code: `{ id: "members", header: "Members", cell: (group) => <AvatarGroup people={group.people} total={group.total} /> }`,
    render: () => (
      <div className="qc-group-table">
        <Card>
          <Table
            label="Groups"
            rows={GROUPS}
            rowId={(group) => group.name}
            rowLabel={(group) => group.name}
            columns={[
              { id: "name", header: "Group", cell: (group) => group.name },
              {
                id: "members",
                header: "Members",
                cell: (group) => <AvatarGroup people={group.people} total={group.total} />,
              },
            ]}
          />
        </Card>
      </div>
    ),
  },
  {
    id: "in-hindi",
    title: "In Hindi",
    line: "QeetrixProvider's locale and messages: the count and the list of names in the name.",
    code: `<QeetrixProvider locale="hi-IN" messages={hi}>
  <AvatarGroup people={people} total={1284} />
</QeetrixProvider>`,
    render: () => (
      <div lang="hi">
        <QeetrixProvider locale="hi-IN" messages={hi}>
          <AvatarGroup people={PEOPLE} total={1284} size="md" />
        </QeetrixProvider>
      </div>
    ),
  },
];
