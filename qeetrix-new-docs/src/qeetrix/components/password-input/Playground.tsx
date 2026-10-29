// Components › Password input › Playground: the spec the playground kit draws. An island.
import { Field } from "@qeetrix/react";
import { PasswordInput } from "@qeetrix/react/experimental";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "password.tsx",
  imports: [
    [["Field"], "@qeetrix/react"],
    [["PasswordInput"], "@qeetrix/react/experimental"],
  ],
  component: "PasswordInput",
  field: true,
  wrap: (v) => ({ component: "Field", props: [["label", `"${v.label || "Label"}"`]] }),
  controls: [
    { prop: "label", label: "Field label", kind: "text", initial: "Password", code: () => null },
    {
      prop: "autoComplete",
      label: "For",
      kind: "choice",
      initial: "current-password",
      options: [
        ["current-password", "Signing in"],
        ["new-password", "A new one"],
        ["off", "A secret"],
      ],
    },
    { prop: "defaultVisible", label: "Shown to start", kind: "switch", initial: false },
    {
      prop: "capsLockWarning",
      label: "Caps Lock warning",
      kind: "switch",
      initial: true,
      code: (value) => (value ? null : ["capsLockWarning", "{false}"]),
    },
    { prop: "disabled", label: "Disabled", kind: "switch", initial: false },
  ],
  render: (v) => (
    <Field label={String(v.label) || "Label"} key={String(v.defaultVisible)}>
      <PasswordInput
        autoComplete={v.autoComplete as "current-password"}
        defaultVisible={Boolean(v.defaultVisible)}
        capsLockWarning={Boolean(v.capsLockWarning)}
        disabled={Boolean(v.disabled)}
      />
    </Field>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
