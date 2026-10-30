// Components › Chip › Playground: the spec the playground kit draws. An island.
import { StarIcon } from "@qeetrix/icons/icons/star";
import { Chip } from "@qeetrix/react/experimental";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const selectable = (v: Record<string, unknown>) => v.kind === "selectable";

const spec: Spec = {
  file: "filter.tsx",
  imports: (v) => [
    ...(v.icon ? ([[["StarIcon"], "@qeetrix/icons"]] as Array<[string[], string]>) : []),
    [["Chip"], "@qeetrix/react/experimental"],
  ],
  component: "Chip",
  children: (v) => String(v.text) || "Starred",
  controls: [
    { prop: "text", label: "Label", kind: "text", initial: "Starred", code: () => null },
    {
      prop: "kind",
      label: "Kind",
      kind: "choice",
      initial: "selectable",
      options: [
        ["selectable", "Selectable"],
        ["removable", "Removable"],
      ],
      code: (value) => (value === "removable" ? ["onRemove", "{remove}"] : null),
    },
    {
      prop: "size",
      label: "Size",
      kind: "choice",
      initial: "md",
      omit: "md",
      options: [
        ["sm", "sm"],
        ["md", "md"],
        ["lg", "lg"],
      ],
    },
    {
      prop: "icon",
      label: "Icon",
      kind: "switch",
      initial: false,
      code: (value) => (value ? ["icon", "{StarIcon}"] : null),
    },
    {
      prop: "defaultChecked",
      label: "Chosen",
      kind: "switch",
      initial: true,
      when: selectable,
    },
    { prop: "disabled", label: "Disabled", kind: "switch", initial: false },
  ],
  render: (v) =>
    selectable(v) ? (
      <Chip
        key={String(v.defaultChecked)}
        size={v.size as "md"}
        icon={v.icon ? StarIcon : undefined}
        defaultChecked={Boolean(v.defaultChecked)}
        disabled={Boolean(v.disabled)}
      >
        {String(v.text) || "Starred"}
      </Chip>
    ) : (
      <Chip
        size={v.size as "md"}
        icon={v.icon ? StarIcon : undefined}
        disabled={Boolean(v.disabled)}
        onRemove={() => {}}
      >
        {String(v.text) || "Starred"}
      </Chip>
    ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
