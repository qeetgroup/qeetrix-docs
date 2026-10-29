// Components › Combobox: its examples, the real Combobox with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { UserIcon } from "@qeetrix/icons/icons/user";
import { Field } from "@qeetrix/react";
import { Combobox } from "@qeetrix/react/experimental";
import { useState } from "react";
import type { ExampleDoc } from "../types";

export const PEOPLE = [
  { value: "usr_1", label: "Priya Sharma", description: "priya@acme.in" },
  { value: "usr_2", label: "Priyanka Rao", description: "priyanka@acme.in" },
  { value: "usr_3", label: "Rahul Verma", description: "rahul.verma@acme.in" },
  { value: "usr_4", label: "Ananya Iyer", description: "ananya@acme.in" },
  { value: "usr_5", label: "Vikram Singh", description: "vikram@acme.in", disabled: true },
];

const POLICIES = [
  {
    label: "Security",
    items: [
      { value: "mfa", label: "Two-step sign-in" },
      { value: "pwd", label: "Password policy" },
      { value: "ses", label: "Session length" },
    ],
  },
  {
    label: "Access",
    items: [
      { value: "ip", label: "IP allow list" },
      { value: "geo", label: "Country rules" },
    ],
  },
];

/** A directory searched on the server: a short wait, then what matches. */
function Directory() {
  const [items, setItems] = useState(PEOPLE);
  const [loading, setLoading] = useState(false);
  return (
    <Field label="Owner">
      <Combobox
        items={items}
        loading={loading}
        placeholder="e.g. Priya Sharma"
        onSearch={(query) => {
          setLoading(true);
          window.setTimeout(() => {
            setItems(
              PEOPLE.filter((person) =>
                `${person.label} ${person.description}`.toLowerCase().includes(query.toLowerCase()),
              ),
            );
            setLoading(false);
          }, 600);
        }}
      />
    </Field>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "type-to-filter",
    title: "Type to filter",
    line: "A Select that narrows as you type: labels are matched, ignoring case and accents; values are IDs.",
    code: `<Field label="Owner">
  <Combobox items={people} icon={UserIcon} placeholder="e.g. Priya Sharma" />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="Owner">
          <Combobox items={PEOPLE} icon={UserIcon} placeholder="e.g. Priya Sharma" />
        </Field>
      </div>
    ),
  },
  {
    id: "grouped",
    title: "Grouped",
    line: "Options in groups, each with its heading.",
    code: `<Field label="Policy">
  <Combobox items={policies} placeholder="e.g. Two-step sign-in" />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="Policy">
          <Combobox items={POLICIES} placeholder="e.g. Two-step sign-in" />
        </Field>
      </div>
    ),
  },
  {
    id: "several",
    title: "Several",
    line: "multiple: chosen values as pills. Backspace removes the last; the arrow keys reach the rest.",
    code: `<Field label="Reviewers">
  <Combobox items={people} multiple defaultValue={["usr_1", "usr_3"]} placeholder="e.g. Priya Sharma" />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Field label="Reviewers">
          <Combobox
            items={PEOPLE}
            multiple
            defaultValue={["usr_1", "usr_3"]}
            placeholder="e.g. Priya Sharma"
          />
        </Field>
      </div>
    ),
  },
  {
    id: "searching-on-the-server",
    title: "Searching on the server",
    line: 'onSearch runs when typing pauses, and shows the results as given; loading says "Searching…".',
    code: `const { data, isFetching } = useDirectory(query);

<Field label="Owner">
  <Combobox items={data ?? []} onSearch={setQuery} loading={isFetching} placeholder="e.g. Priya Sharma" />
</Field>`,
    render: () => (
      <div className="qc-narrow">
        <Directory />
      </div>
    ),
  },
];
