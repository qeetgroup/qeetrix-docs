// Components › OTP input › Playground: the spec the playground kit draws. An island.
import { Field } from "@qeetrix/react";
import { OTPInput } from "@qeetrix/react/experimental";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const GROUPS: Record<string, number[] | undefined> = {
  none: undefined,
  "3-3": [3, 3],
  "2-2-2": [2, 2, 2],
};

const spec: Spec = {
  file: "verify.tsx",
  imports: [
    [["Field"], "@qeetrix/react"],
    [["OTPInput"], "@qeetrix/react/experimental"],
  ],
  component: "OTPInput",
  field: true,
  wrap: (v) => ({ component: "Field", props: [["label", `"${v.label || "Label"}"`]] }),
  controls: [
    {
      prop: "label",
      label: "Field label",
      kind: "text",
      initial: "Verification code",
      code: () => null,
    },
    {
      prop: "groups",
      label: "Groups",
      kind: "choice",
      initial: "none",
      options: [
        ["none", "None"],
        ["3-3", "3 + 3"],
        ["2-2-2", "2 + 2 + 2"],
      ],
      code: (value) =>
        value === "none" ? null : ["groups", `{[${GROUPS[String(value)]?.join(", ")}]}`],
    },
    {
      prop: "size",
      label: "Size",
      kind: "choice",
      initial: "md",
      omit: "md",
      options: [
        ["md", "md"],
        ["lg", "lg"],
      ],
    },
    {
      prop: "validationType",
      label: "Characters",
      kind: "choice",
      initial: "numeric",
      omit: "numeric",
      options: [
        ["numeric", "Digits"],
        ["alphanumeric", "Letters and digits"],
      ],
    },
    { prop: "disabled", label: "Disabled", kind: "switch", initial: false },
  ],
  render: (v) => (
    <Field label={String(v.label) || "Label"} key={`${v.groups}-${v.validationType}`}>
      <OTPInput
        groups={GROUPS[String(v.groups)]}
        size={v.size as "md" | "lg"}
        validationType={v.validationType as "numeric"}
        disabled={Boolean(v.disabled)}
      />
    </Field>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
