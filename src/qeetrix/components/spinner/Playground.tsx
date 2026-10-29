// Components › Spinner › Playground: the spec the playground kit draws. An island.
import { Spinner } from "@qeetrix/react";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "loading.tsx",
  imports: [[["Spinner"], "@qeetrix/react"]],
  component: "Spinner",
  controls: [
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
      prop: "tone",
      label: "Tone",
      kind: "choice",
      initial: "neutral",
      omit: "neutral",
      options: [
        ["neutral", "Neutral"],
        ["brand", "Brand"],
      ],
    },
    { prop: "label", label: "Label", kind: "text", initial: "Loading users" },
  ],
  render: (v) => (
    <Spinner
      size={v.size as "md"}
      tone={v.tone as "neutral"}
      label={String(v.label) || undefined}
    />
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
