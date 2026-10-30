// Components › Combobox: its documentation, from @qeetrix/react 0.2.0 (experimental/combobox) and
// the changelog. Its examples run live (Live.tsx); the do-and-don'ts render to HTML.
import { Field, Select } from "@qeetrix/react";
import { Combobox } from "@qeetrix/react/experimental";
import { FORM_TESTED } from "../forms";
import type { ComponentDoc } from "../types";
import { examples, PEOPLE } from "./examples";

export const combobox: ComponentDoc = {
  name: "Combobox",
  slug: "combobox",
  category: "forms",
  status: "experimental",
  since: "0.0.6",
  lede: "Pick from many by typing to filter: one value, or several as pills. It can ask a server.",
  exports: ["Combobox"],
  renders: '<input role="combobox">',
  source: "experimental/combobox",
  story: "components/data-entry/combobox.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Choosing from a list too long to scroll: people, apps, countries.",
      "Several from a long list, as pills.",
      "A directory searched on the server as you type.",
    ],
    notFor: [
      { text: "Up to about fifteen options", use: "Select" },
      { text: "Going anywhere in the console", use: "Command palette" },
      { text: "Free text, no list", use: "Text field" },
    ],
    anatomyFigure: (
      <div className="qc-anat-field">
        <Field label="Reviewers">
          <Combobox
            items={PEOPLE}
            multiple
            defaultValue={["usr_1"]}
            placeholder="e.g. Priya Sharma"
          />
        </Field>
      </div>
    ),
    anatomy: [
      { slot: "field-label", element: "<label>", note: "Names the input, and its Clear button." },
      {
        slot: "combobox-chip",
        element: "<div>",
        note: "A chosen value, with multiple: a pill with its remove button.",
      },
      {
        slot: "combobox-input",
        element: "<input>",
        note: "What's typed; the list narrows to the labels that match.",
      },
    ],
    rules: [
      {
        title: "Long lists only",
        doLine: "Hundreds of people: type a few letters.",
        dontLine: "Three options to type at: a Select shows them.",
        doIt: (
          <div className="qc-narrow">
            <Field label="Owner">
              <Combobox items={PEOPLE} placeholder="e.g. Priya Sharma" />
            </Field>
          </div>
        ),
        dontIt: (
          <div className="qc-narrow">
            <Field label="Billing cycle">
              <Combobox
                items={[
                  { value: "m", label: "Monthly" },
                  { value: "q", label: "Quarterly" },
                  { value: "y", label: "Yearly" },
                ]}
                placeholder="e.g. Monthly"
              />
            </Field>
          </div>
        ),
      },
      {
        title: "Values are IDs, labels are names",
        doLine: "value: usr_1; label: Priya Sharma, with her email to tell two Priyas apart.",
        dontLine: "A list of bare names that look alike.",
        doIt: (
          <div className="qc-narrow">
            <Field label="Owner">
              <Select
                items={[
                  { value: "usr_1", label: "Priya Sharma · priya@acme.in" },
                  { value: "usr_9", label: "Priya Sharma · priya.s@acme.in" },
                ]}
                defaultValue="usr_1"
              />
            </Field>
          </div>
        ),
        dontIt: (
          <div className="qc-narrow">
            <Field label="Owner">
              <Select
                items={[
                  { value: "a", label: "Priya Sharma" },
                  { value: "b", label: "Priya Sharma" },
                ]}
                defaultValue="a"
              />
            </Field>
          </div>
        ),
      },
    ],
    content: [
      'The placeholder is an example: "e.g. Priya Sharma".',
      "description tells options apart: an email, a code.",
      "Disabled options stay in view when their absence would puzzle.",
    ],
  },

  api: {
    props: [
      {
        name: "items",
        type: "ComboboxItem[] | ComboboxItemGroup[]",
        default: "required",
        note: "All flat, or all in groups: { value, label, description, disabled }.",
      },
      {
        name: "value · defaultValue · onValueChange",
        type: "Value | Value[]",
        default: "—",
        note: "The chosen ID, or IDs with multiple.",
      },
      { name: "multiple", type: "boolean", default: "false", note: "Several, as removable pills." },
      { name: "placeholder", type: "string", default: "—", note: "Shown while empty: an example." },
      { name: "icon", type: "IconSource", default: "—", note: "A leading icon, 16px." },
      {
        name: "filter",
        type: "(item, query) => boolean | null",
        default: "label contains",
        note: "How an option matches: its label, ignoring case and accents. null shows items as given; with onSearch it's null.",
      },
      {
        name: "allowCustom",
        type: "boolean",
        default: "false",
        note: 'Typed text that matches no option is offered ("Use …") and can be the value. String values, flat items.',
      },
      {
        name: "onSearch",
        type: "(query: string) => void",
        default: "—",
        note: 'Search the server when typing pauses; "" at once when cleared.',
      },
      {
        name: "searchDelay",
        type: "number",
        default: "300",
        note: "The pause before onSearch, in ms.",
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        note: 'Shows "Searching…", announced, and marks the list busy.',
      },
      {
        name: "messages",
        type: "Partial<…combobox>",
        default: "—",
        note: "Its words, over QeetrixProvider's.",
      },
    ],
    parts: [
      { slot: "combobox", element: "<div>", note: "The field's box." },
      {
        slot: "combobox-input",
        element: "<input>",
        note: "The input; ref lands here, and a Field labels it.",
      },
      {
        slot: "combobox-chips",
        element: "<div>",
        note: "The pills, with multiple; each combobox-chip has combobox-chip-remove.",
      },
      {
        slot: "combobox-clear",
        element: "<button>",
        note: "Clear: only while there's a value; named after the field.",
      },
      {
        slot: "combobox-popup",
        element: "<div>",
        note: "The list: combobox-list, its combobox-group and combobox-option.",
      },
      {
        slot: "combobox-status",
        element: '<div role="status">',
        note: '"Searching…" or "No matches".',
      },
    ],
    recipes: [
      {
        title: "A directory on the server",
        line: "onSearch and loading; the server's results show as given, and a chosen value keeps its label when they leave it out.",
        file: "owner.tsx",
        code: `const [query, setQuery] = useState("");
const { data, isFetching } = useQuery({ queryKey: ["people", query], queryFn: () => searchPeople(query) });

<Field label="Owner">
  <Combobox items={data ?? []} onSearch={setQuery} loading={isFetching} />
</Field>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      {
        keys: ["↑", "↓"],
        action: "Opens the list and moves through it, skipping disabled options.",
      },
      { keys: ["Enter"], action: "Chooses the highlighted option." },
      { keys: ["Esc"], action: "Closes the list." },
      { keys: ["Backspace"], action: "In an empty input with pills: removes the last." },
      { keys: ["←", "→"], action: "With pills: moves between them." },
    ],
    checks: [
      {
        check: "Role and name",
        result: "A combobox over a listbox, named by its Field; Clear is named after the field.",
      },
      {
        check: "Status",
        result:
          '"Searching…" and "No matches" are announced; the list is marked busy while it waits.',
      },
      { check: "Pills", result: "The input's description says how to reach them with the keys." },
    ],
    tested: FORM_TESTED,
  },

  changelog: [
    {
      version: "0.4.0",
      items: [
        "Read-only, its line is border.strong, the editable field's, so it keeps 3:1; the missing fill still tells it apart.",
      ],
    },
    {
      version: "0.3.0",
      items: [
        "icon takes an element as well as a component (icon={<PlusIcon />}), so a Server Component can pass one: its type is IconSource.",
      ],
    },
    {
      version: "0.2.0",
      items: ["allowCustom: text that isn't one of the options can be the value."],
    },
    {
      version: "0.1.0",
      items: [
        'Server search: onSearch, searchDelay and loading ("Searching…"); filter={null} for results already matched.',
        "Clear is named after its field.",
      ],
    },
    {
      version: "0.0.5",
      items: [
        "Combobox: type to filter, on Base UI's Combobox; Select's field and list; flat or grouped options with a description line; multiple as removable pills.",
      ],
    },
  ],

  related: [
    { name: "Select", when: "Up to about fifteen" },
    { name: "Command palette", when: "Go anywhere" },
    { name: "Text field", when: "Free text" },
  ],
};
