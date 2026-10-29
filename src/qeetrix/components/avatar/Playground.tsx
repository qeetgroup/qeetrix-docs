// Components › Avatar › Playground: the spec the playground kit draws. An island.
import { Avatar } from "@qeetrix/react";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";
import { PHOTO } from "./examples";

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
    />
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
