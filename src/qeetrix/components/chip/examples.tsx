// Components › Chip: its examples, the real Chip and ChipGroup with the code for each. Shared by the
// page (doc.tsx) and the island that runs them (Live.tsx), so a chip turns on and off, a group's
// arrow keys move and a remove button removes: nothing here reads token data.
import { MailIcon } from "@qeetrix/icons/icons/mail";
import { StarIcon } from "@qeetrix/icons/icons/star";
import { Button, Inline, QeetrixProvider, Stack, Text } from "@qeetrix/react";
import { Chip, ChipGroup } from "@qeetrix/react/experimental";
import { hi } from "@qeetrix/react/locales/hi";
import { useRef, useState } from "react";
import type { ExampleDoc } from "../types";

export const STATUSES = [
  ["all", "All"],
  ["active", "Active"],
  ["invited", "Invited"],
  ["blocked", "Blocked"],
] as const;

export const DEPARTMENTS = [
  ["eng", "Engineering"],
  ["fin", "Finance"],
  ["ops", "Operations"],
  ["people", "People"],
] as const;

/** Several values, the chosen ones read by the page. */
function Departments() {
  const [value, setValue] = useState<string[]>(["eng"]);
  const names = DEPARTMENTS.filter(([id]) => value.includes(id)).map(([, name]) => name);
  return (
    <Stack gap="sm" align="start">
      <ChipGroup label="Departments" multiple value={value} onValueChange={setValue}>
        {DEPARTMENTS.map(([id, name]) => (
          <Chip key={id} value={id}>
            {name}
          </Chip>
        ))}
      </ChipGroup>
      <Text tone="subtle">{names.length ? `Showing ${names.join(", ")}` : "Showing everyone"}</Text>
    </Stack>
  );
}

const FILTERS = ["Status: Active", "Role: Admin", "Department: Finance"];

/** Applied filters: removing one moves focus to the next remove button, or to Reset at the end. */
function AppliedFilters() {
  const [filters, setFilters] = useState(FILTERS);
  const box = useRef<HTMLDivElement>(null);
  const remove = (index: number) => {
    setFilters((current) => current.filter((_, at) => at !== index));
    requestAnimationFrame(() => {
      const buttons = box.current?.querySelectorAll<HTMLButtonElement>('[data-slot="chip"] button');
      const next = buttons?.length ? buttons[Math.min(index, buttons.length - 1)] : undefined;
      (next ?? box.current?.querySelector<HTMLButtonElement>("[data-reset]"))?.focus();
    });
  };
  return (
    <div ref={box}>
      <Stack gap="sm" align="start">
        <Inline gap="sm">
          {filters.map((filter, index) => (
            <Chip key={filter} onRemove={() => remove(index)}>
              {filter}
            </Chip>
          ))}
        </Inline>
        <Button
          variant="ghost"
          size="sm"
          disabled={filters.length === FILTERS.length}
          onClick={() => setFilters(FILTERS)}
          data-reset=""
        >
          Reset filters
        </Button>
      </Stack>
    </div>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "on-and-off",
    title: "On and off",
    line: "A Chip on its own is a checkbox named by its label: a click or Space turns it on, with the selected tint, a 2px Ember edge and a check.",
    code: `<Chip>Unread</Chip>
<Chip defaultChecked>Mentions</Chip>`,
    render: () => (
      <Inline gap="sm">
        <Chip>Unread</Chip>
        <Chip defaultChecked>Mentions</Chip>
      </Inline>
    ),
  },
  {
    id: "one-of-a-set",
    title: "One of a set",
    line: "ChipGroup: one value, so the chips are radios. One Tab stop; the arrow keys move the choice, mirrored in right to left. label names the group and isn't shown.",
    code: `<ChipGroup label="Status" defaultValue="all">
  <Chip value="all">All</Chip>
  <Chip value="active">Active</Chip>
  <Chip value="invited">Invited</Chip>
  <Chip value="blocked">Blocked</Chip>
</ChipGroup>`,
    render: () => (
      <ChipGroup label="Status" defaultValue="all">
        {STATUSES.map(([value, label]) => (
          <Chip key={value} value={value}>
            {label}
          </Chip>
        ))}
      </ChipGroup>
    ),
  },
  {
    id: "several-of-a-set",
    title: "Several of a set",
    line: "multiple: each chip a checkbox, and value the chosen ones.",
    code: `const [departments, setDepartments] = useState(["eng"]);

<ChipGroup label="Departments" multiple value={departments} onValueChange={setDepartments}>
  <Chip value="eng">Engineering</Chip>
  <Chip value="fin">Finance</Chip>
  <Chip value="ops">Operations</Chip>
  <Chip value="people">People</Chip>
</ChipGroup>`,
    render: () => <Departments />,
  },
  {
    id: "removable",
    title: "Removable",
    line: 'onRemove: a static label ending in a remove button, named "Remove Status: Active". Taking the chip away, and moving focus to the next, is yours.',
    code: `{filters.map((filter, index) => (
  <Chip key={filter} onRemove={() => remove(index)}>{filter}</Chip>
))}`,
    render: () => <AppliedFilters />,
  },
  {
    id: "with-an-icon",
    title: "With an icon",
    line: "icon: a 16px sharp icon before the label. It takes the check's place, so a chosen chip with one is marked by its tint and edge.",
    code: `<Chip icon={StarIcon} defaultChecked>Starred</Chip>
<Chip icon={MailIcon}>Unread</Chip>`,
    render: () => (
      <Inline gap="sm">
        <Chip icon={StarIcon} defaultChecked>
          Starred
        </Chip>
        <Chip icon={MailIcon}>Unread</Chip>
      </Inline>
    ),
  },
  {
    id: "sizes",
    title: "Sizes",
    line: "size: sm for a filter row over a list, md by default, lg at the fields' height. On ChipGroup it sizes every chip.",
    code: `<ChipGroup label="Status" size="sm" defaultValue="all">…</ChipGroup>
<ChipGroup label="Status" defaultValue="all">…</ChipGroup>
<ChipGroup label="Status" size="lg" defaultValue="all">…</ChipGroup>`,
    render: () => (
      <Stack gap="md" align="start">
        {(["sm", "md", "lg"] as const).map((size) => (
          <ChipGroup key={size} label={`Status, ${size}`} size={size} defaultValue="all">
            {STATUSES.slice(0, 3).map(([value, label]) => (
              <Chip key={value} value={value}>
                {label}
              </Chip>
            ))}
          </ChipGroup>
        ))}
      </Stack>
    ),
  },
  {
    id: "in-a-narrow-column",
    title: "In a narrow column",
    line: "The chips wrap onto more lines, a small gap apart, and a long label wraps inside its chip: nothing is cut.",
    code: `<ChipGroup label="Approval" defaultValue="waiting">
  <Chip value="waiting">Awaiting approval from the finance team</Chip>
  <Chip value="approved">Approved</Chip>
  <Chip value="rejected">Rejected</Chip>
</ChipGroup>`,
    render: () => (
      <div className="qc-chip-narrow">
        <ChipGroup label="Approval" defaultValue="waiting">
          <Chip value="waiting">Awaiting approval from the finance team</Chip>
          <Chip value="approved">Approved</Chip>
          <Chip value="rejected">Rejected</Chip>
        </ChipGroup>
      </div>
    ),
  },
  {
    id: "disabled",
    title: "Disabled",
    line: "disabled greys a chip; a removable one's remove button with it.",
    code: `<Chip disabled>Archived</Chip>
<Chip disabled onRemove={remove}>Owner: Priya</Chip>`,
    render: () => (
      <Inline gap="sm">
        <Chip disabled>Archived</Chip>
        <Chip disabled onRemove={() => {}}>
          Owner: Priya
        </Chip>
      </Inline>
    ),
  },
  {
    id: "in-hindi",
    title: "In Hindi",
    line: 'QeetrixProvider\'s messages: the remove button is "{label} हटाएँ".',
    code: `<QeetrixProvider locale="hi-IN" messages={hi}>
  <Chip onRemove={remove}>स्थिति: सक्रिय</Chip>
</QeetrixProvider>`,
    render: () => (
      <div lang="hi">
        <QeetrixProvider locale="hi-IN" messages={hi}>
          <Chip onRemove={() => {}}>स्थिति: सक्रिय</Chip>
        </QeetrixProvider>
      </div>
    ),
  },
];
