// Components › Tree view: its examples, the real TreeView with the code for each. Shared by the
// page (doc.tsx) and the island that runs them (Live.tsx), as they open and select: nothing here
// reads token data.
import { BuildingIcon } from "@qeetrix/icons/icons/building";
import { UserGroupIcon } from "@qeetrix/icons/icons/user-group";
import { Card, Stack, Text } from "@qeetrix/react";
import { type TreeNode, TreeView } from "@qeetrix/react/experimental";
import { useState } from "react";
import type { ExampleDoc } from "../types";

export const UNITS: TreeNode[] = [
  {
    id: "acme",
    label: "Acme Pvt Ltd",
    icon: BuildingIcon,
    meta: "1,284",
    children: [
      {
        id: "eng",
        label: "Engineering",
        icon: UserGroupIcon,
        meta: "412",
        children: [
          { id: "platform", label: "Platform", icon: UserGroupIcon, meta: "96" },
          { id: "mobile", label: "Mobile", icon: UserGroupIcon, meta: "58" },
        ],
      },
      { id: "fin", label: "Finance", icon: UserGroupIcon, meta: "74" },
      {
        id: "sales",
        label: "Sales",
        icon: UserGroupIcon,
        meta: "203",
        children: [
          { id: "north", label: "North India", meta: "88" },
          { id: "south", label: "South India", meta: "115" },
        ],
      },
    ],
  },
];

export const PERMISSIONS: TreeNode[] = [
  {
    id: "users",
    label: "Users",
    children: [
      { id: "users.view", label: "View users" },
      { id: "users.mfa", label: "Reset MFA" },
      { id: "users.delete", label: "Delete users" },
    ],
  },
  {
    id: "apps",
    label: "Applications",
    children: [
      { id: "apps.view", label: "View applications" },
      { id: "apps.secrets", label: "Rotate client secrets", disabled: true },
    ],
  },
  { id: "audit", label: "Audit log" },
];

function Choosing() {
  const [unit, setUnit] = useState("platform");
  return (
    <Stack gap="sm">
      <TreeView
        label="Organisation units, choosing"
        items={UNITS}
        defaultExpanded={["acme", "eng"]}
        selected={unit}
        onSelectedChange={setUnit}
      />
      <Text size="sm" tone="subtle">
        Selected: {unit}
      </Text>
    </Stack>
  );
}

function Ticking() {
  const [checked, setChecked] = useState<string[]>(["users.view", "users.mfa", "audit"]);
  return (
    <Stack gap="sm">
      <TreeView
        label="Permissions"
        items={PERMISSIONS}
        checkable
        defaultExpanded={["users", "apps"]}
        checked={checked}
        onCheckedChange={setChecked}
      />
      <Text size="sm" tone="subtle">
        {checked.length} granted: {checked.join(", ")}
      </Text>
    </Stack>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "organisation-units",
    title: "Organisation units",
    line: "One Tab stop: Up and Down move, Right opens a node or steps in, Left closes it or steps out, and a letter jumps.",
    code: `<TreeView
  label="Organisation units"
  items={units}
  defaultExpanded={["acme"]}
/>

// Each node: { id, label, icon?, meta?, children?, disabled? }`,
    render: () => (
      <div className="qc-fold-stage">
        <TreeView label="Organisation units" items={UNITS} defaultExpanded={["acme"]} />
      </div>
    ),
  },
  {
    id: "choosing-one",
    title: "Choosing one",
    line: "selected and onSelectedChange: Enter, Space or a click selects a node.",
    code: `const [unit, setUnit] = useState("platform");

<TreeView label="Organisation units" items={units} selected={unit} onSelectedChange={setUnit} />`,
    render: () => (
      <div className="qc-fold-stage">
        <Choosing />
      </div>
    ),
  },
  {
    id: "permissions",
    title: "Permissions",
    line: "checkable: a checkbox per node; a parent is mixed while some of its nodes are on. A disabled node is skipped by the keys and by its parent's tick.",
    code: `<TreeView
  label="Permissions"
  items={permissions}
  checkable
  checked={checked}
  onCheckedChange={setChecked}
/>`,
    render: () => (
      <div className="qc-fold-stage">
        <Ticking />
      </div>
    ),
  },
  {
    id: "in-a-card",
    title: "In a card",
    line: "Beside the members of the unit that's selected.",
    code: `<Card title="Organisation units">
  <TreeView label="Organisation units" items={units} defaultExpanded={["acme", "eng"]} defaultSelected="platform" />
</Card>`,
    render: () => (
      <div className="qc-fold-stage">
        <Card title="Organisation units" level={3}>
          <TreeView
            label="Organisation units, in a card"
            items={UNITS}
            defaultExpanded={["acme", "eng"]}
            defaultSelected="platform"
          />
        </Card>
      </div>
    ),
  },
];
