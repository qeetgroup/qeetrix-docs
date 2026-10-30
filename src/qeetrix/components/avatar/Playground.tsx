// Components › Avatar › Playground: the spec the playground kit draws. An island.
import { Avatar } from "@qeetrix/react";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";
import { STATUSES as ALL, PHOTO } from "./examples";

/** Three statuses, so the choice fits its column: one in each kind of tone, neutral the default. */
const STATUSES = ALL.filter(([, label]) => label !== "Busy");

/** The status a choice names: its words and its tone, or none. */
const statusOf = (choice: string) => {
  const status = STATUSES.find(([, label]) => label === choice);
  return status ? { label: status[1], tone: status[2] } : undefined;
};

const spec: Spec = {
  file: "member.tsx",
  imports: [[["Avatar"], "@qeetrix/react"]],
  component: "Avatar",
  controls: [
    { prop: "name", label: "Name", kind: "text", initial: "Priya Sharma" },
    {
      prop: "size",
      label: "Size",
      kind: "choice",
      initial: "lg",
      omit: "md",
      options: [
        ["sm", "sm"],
        ["md", "md"],
        ["lg", "lg"],
        ["xl", "xl"],
      ],
    },
    {
      prop: "shape",
      label: "Shape",
      kind: "choice",
      initial: "circle",
      omit: "circle",
      options: [
        ["circle", "Circle"],
        ["square", "Square"],
      ],
    },
    {
      prop: "status",
      label: "Status",
      kind: "choice",
      initial: "none",
      options: [["none", "None"], ...STATUSES.map(([, label]): [string, string] => [label, label])],
      code: (value) => {
        const status = STATUSES.find(([, label]) => label === value);
        if (!status) return null;
        const [, label, tone] = status;
        return [
          "status",
          tone === "neutral"
            ? `{{ label: "${label}" }}`
            : `{{ label: "${label}", tone: "${tone}" }}`,
        ];
      },
    },
    {
      prop: "src",
      label: "Photo",
      kind: "switch",
      initial: false,
      code: (value) => (value ? ["src", "{user.photoUrl}"] : null),
    },
  ],
  render: (v) => (
    <Avatar
      name={String(v.name) || "Priya Sharma"}
      size={v.size as "md"}
      shape={v.shape as "circle"}
      src={v.src ? PHOTO : undefined}
      status={statusOf(String(v.status))}
    />
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
