// Components › Chip: its documentation, from @qeetrix/react 0.4.0 (experimental/chip: chip.d.ts,
// chip.js, chip.css) and the changelog. There's no Storybook story for it yet (QTRX-211). Its examples run
// live (Live.tsx); the figures are the real Chip and ChipGroup, server-rendered.
import { UsersIcon } from "@qeetrix/icons/icons/users";
import { Badge, Inline } from "@qeetrix/react";
import { Chip, ChipGroup } from "@qeetrix/react/experimental";
import { controlHeights } from "../sizes";
import type { ComponentDoc } from "../types";
import { DEPARTMENTS, examples, STATUSES } from "./examples";

const noop = () => {};

export const chip: ComponentDoc = {
  name: "Chip",
  slug: "chip",
  category: "data-display",
  status: "experimental",
  since: "0.4.0",
  lede: "An interactive tag: one that turns on and off, such as a filter, or a choice already made with a button that removes it.",
  exports: ["Chip", "ChipGroup"],
  renders: '<span role="checkbox">',
  source: "experimental/chip",
  examples,

  usage: {
    useFor: [
      "Filters over a list: Unread, Mentions, Starred.",
      "One or several values from a short set, chosen at once: a status, departments.",
      "A choice someone made, shown so it can be taken away: Status: Active ×.",
    ],
    notFor: [
      { text: "A status no one can change", use: "Badge" },
      { text: "A mode or a view of the same thing", use: "Toggle group" },
      { text: "A choice in a form that's submitted", use: "Checkbox" },
      { text: "Many options to search", use: "Combobox" },
    ],
    anatomyFigure: (
      <Inline gap="sm" align="center">
        <ChipGroup label="Departments, anatomy" multiple defaultValue={["eng"]} size="lg">
          <Chip value="eng">Engineering</Chip>
          <Chip value="fin">Finance</Chip>
        </ChipGroup>
        <Chip size="lg" icon={UsersIcon} onRemove={noop}>
          Team: Finance
        </Chip>
      </Inline>
    ),
    anatomy: [
      {
        slot: "chip-group",
        element: "<div>",
        note: 'ChipGroup: role="group" of checkboxes with multiple, a radiogroup for one value; named by label.',
      },
      {
        slot: "chip",
        select: '[data-slot="chip"][data-checked]',
        element: "<span>",
        note: 'A chip, role="checkbox"; chosen, the selected tint and a 2px Ember edge.',
      },
      {
        slot: "chip-check",
        element: "<span>",
        note: "The check before the label, so the choice never rests on colour.",
      },
      { slot: "chip-label", element: "<span>", note: "The label; a long one wraps." },
      { slot: "chip-icon", element: "<svg>", note: "A 16px sharp icon, in the check's place." },
      {
        slot: "icon-button",
        select: '[data-removable] > [data-slot="icon-button"]',
        element: "<button>",
        note: '"Remove Team: Finance": a small neutral IconButton.',
      },
    ],
    rules: [
      {
        title: "A status is a Badge",
        doLine: "A record's status, read only: a Badge.",
        dontLine: "A chip for a status no one can change: it reads as a control.",
        doIt: (
          <Inline gap="sm">
            <Badge tone="success">Active</Badge>
            <Badge tone="info">Invited</Badge>
          </Inline>
        ),
        dontIt: (
          <Inline gap="sm">
            <Chip defaultChecked>Active</Chip>
            <Chip>Invited</Chip>
          </Inline>
        ),
      },
      {
        title: "One value: a group",
        doLine: "One of a set: a ChipGroup, its chips radios with one Tab stop.",
        dontLine: "Loose chips for one choice: each a checkbox, so two can be on.",
        doIt: (
          <ChipGroup label="Status, one value" defaultValue="active">
            {STATUSES.slice(0, 3).map(([value, label]) => (
              <Chip key={value} value={value}>
                {label}
              </Chip>
            ))}
          </ChipGroup>
        ),
        dontIt: (
          <Inline gap="sm">
            {STATUSES.slice(0, 3).map(([value, label]) => (
              <Chip key={value} defaultChecked={value !== "all"}>
                {label}
              </Chip>
            ))}
          </Inline>
        ),
      },
    ],
    sizes: {
      specimen: (
        <Inline gap="md" align="center">
          {(["sm", "md", "lg"] as const).map((size) => (
            <Chip key={size} size={size} defaultChecked>
              {size}
            </Chip>
          ))}
        </Inline>
      ),
      columns: ["Size", "Height: compact / default / comfortable", "Label"],
      rows: [
        ["sm", controlHeights("sm"), "label.sm"],
        ["md", controlHeights("md"), "label.md"],
        ["lg", controlHeights("lg"), "label.md"],
      ],
    },
    content: [
      'One or two words: "Unread", or a filter and its value, "Status: Active".',
      "Name the group: label says what's being chosen, \"Status\". It isn't shown, so put a visible heading beside it where the page needs one.",
      "A label that isn't plain text needs removeLabel, so its remove button has a name.",
    ],
  },

  api: {
    props: [
      {
        name: "children",
        type: "ReactNode",
        default: "required",
        note: "The label. A string also names a removable chip's remove button.",
      },
      {
        name: "icon",
        type: "IconSource",
        default: "—",
        note: "A 16px sharp icon before the label; a selectable chip with one shows no check.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md", or the group\'s',
        note: "The controls' heights: sm for a filter row over a list, lg the fields'.",
      },
      {
        name: "checked · defaultChecked",
        type: "boolean",
        default: "— · false",
        note: "Selectable: on or off, as Base UI's Checkbox. Not in a one-value ChipGroup, whose value says which.",
      },
      {
        name: "onCheckedChange",
        type: "(checked, details) => void",
        default: "—",
        note: "Called with the new state.",
      },
      {
        name: "value",
        type: "string",
        default: "—",
        note: "In a ChipGroup, the value it stands for.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        note: "Greys it; on a removable chip, its remove button too.",
      },
      {
        name: "onRemove",
        type: "() => void",
        default: "—",
        note: "Makes it removable: a static label ending in a remove button. Taking it away, and moving focus, is yours.",
      },
      {
        name: "removeLabel",
        type: "string",
        default: '"Remove {label}"',
        note: "The remove button's name, for a label that isn't plain text.",
      },
      {
        name: "messages",
        type: "{ remove?, removePlain? }",
        default: "the provider's",
        note: 'A removable chip\'s strings: "Remove {label}", and "Remove" for a label that isn\'t text.',
      },
      {
        name: "ChipGroup: label",
        type: "string",
        default: "required",
        note: 'Names the group for assistive technology, "Status". It isn\'t shown.',
      },
      {
        name: "ChipGroup: multiple",
        type: "boolean",
        default: "false",
        note: "Several values, the chips checkboxes; otherwise one, the chips radios.",
      },
      {
        name: "ChipGroup: value · defaultValue",
        type: "string, or string[] with multiple",
        default: "—",
        note: "The chosen value, or values, as Base UI's RadioGroup and CheckboxGroup.",
      },
      {
        name: "ChipGroup: onValueChange",
        type: "(value, details) => void",
        default: "—",
        note: "Called with the new value, or values.",
      },
      {
        name: "ChipGroup: size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        note: "Every chip's size.",
      },
      {
        name: "ChipGroup: disabled",
        type: "boolean",
        default: "false",
        note: "Disables every chip.",
      },
    ],
    parts: [
      {
        slot: "chip-group",
        element: '<div role="radiogroup">',
        note: 'role="group" with multiple; aria-label from label.',
      },
      {
        slot: "chip",
        element: '<span role="checkbox">',
        note: 'role="radio" in a one-value group; aria-checked, data-checked, data-size. A removable chip is a <span> with data-removable.',
      },
      { slot: "chip-check", element: "<span>", note: "The check, while chosen, without an icon." },
      { slot: "chip-icon", element: "<svg>", note: "The icon, aria-hidden." },
      { slot: "chip-label", element: "<span>", note: "The label." },
      {
        slot: "icon-button",
        element: "<button>",
        note: 'A removable chip\'s remove button: aria-label "Remove {label}".',
      },
    ],
    recipes: [
      {
        title: "Filters over a list",
        line: "A one-value group, sm, in the toolbar of the table it filters.",
        file: "users.tsx",
        code: `const [status, setStatus] = useState("all");
const shown = status === "all" ? users : users.filter((user) => user.status === status);

<Table
  label="Users"
  rows={shown}
  columns={columns}
  rowId={(user) => user.id}
  rowLabel={(user) => user.name}
  toolbar={
    <ChipGroup label="Status" size="sm" value={status} onValueChange={setStatus}>
      <Chip value="all">All</Chip>
      <Chip value="active">Active</Chip>
      <Chip value="invited">Invited</Chip>
    </ChipGroup>
  }
/>`,
      },
      {
        title: "In a form",
        line: "A one-value group posts its value under name. With multiple, give each chip the name: the group takes none.",
        file: "invite.tsx",
        code: `<ChipGroup label="Plan" name="plan" defaultValue="growth">…</ChipGroup>

<ChipGroup label="Departments" multiple defaultValue={["eng"]}>
${DEPARTMENTS.slice(0, 2)
  .map(([value, label]) => `  <Chip name="departments" value="${value}">${label}</Chip>`)
  .join("\n")}
</ChipGroup>`,
      },
      {
        title: "A bar of applied filters",
        line: "Tags under a toolbar with Clear all, a summary of what's left, and focus moved for you: FilterTags.",
        file: "applied-filters.tsx",
        code: `import { FilterTags } from "@qeetrix/react/experimental";

<FilterTags
  filters={[{ id: "status", label: "Status", value: "Active" }]}
  onRemove={removeFilter}
  onClear={clearFilters}
  summary="412 of 1,284 users"
/>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      {
        keys: ["Tab"],
        action: "To each chip on its own; into a one-value group once, at its choice.",
      },
      { keys: ["Space"], action: "Turns the focused chip on or off." },
      {
        keys: ["←", "→"],
        action: "In a one-value group, moves the choice; ↑ and ↓ too. Mirrored in right to left.",
      },
      { keys: ["Enter", "Space"], action: "On a remove button, removes its chip." },
    ],
    checks: [
      {
        check: "Role and name",
        result:
          "A selectable chip is a checkbox (a radio in a one-value group), named by its label; the group is named by label.",
      },
      {
        check: "Chosen",
        result:
          "A check, or the 2px edge where there's an icon, as well as the tint: never colour alone.",
      },
      {
        check: "Remove",
        result: 'A button named "Remove Status: Active", "{label} हटाएँ" in Hindi.',
      },
      {
        check: "Forced colours",
        result: "Each chip is edged in ButtonText; a chosen one is drawn in Highlight.",
      },
    ],
    tested: [
      "axe, WCAG 2.2 A and AA, in light and dark, in Chromium on every pull request",
      "Firefox and WebKit every night",
      "Screenshots in both schemes at every density",
      "Right to left: the arrow keys mirror",
    ],
  },

  changelog: [
    {
      version: "0.4.0",
      items: [
        "Chip and ChipGroup: a selectable chip is a checkbox, chosen with the selected tint, a 2px Ember edge and a check; a removable one is a label ending in a remove button. ChipGroup chooses one value (radios) or several (multiple), and wraps.",
      ],
    },
  ],

  related: [
    { name: "Badge", when: "A static status" },
    { name: "Toggle group", when: "A mode or a view" },
    { name: "Checkbox", when: "A choice in a form" },
    { name: "Table", when: "What filters act on" },
  ],
};
