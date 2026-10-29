// Components › Steps › Playground: the spec the playground kit draws. An island.
import { Steps } from "@qeetrix/react/experimental";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";
import { SAML } from "./examples";

const spec: Spec = {
  file: "saml-setup.tsx",
  imports: [[["Steps"], "@qeetrix/react/experimental"]],
  component: "Steps",
  preamble: (v) => [
    "const steps = [",
    ...SAML.map(({ label, description }) =>
      v.descriptions
        ? `  { label: "${label}", description: "${description}" },`
        : `  { label: "${label}" },`,
    ),
    "];",
  ],
  fixed: () => [["steps", "{steps}"]],
  controls: [
    {
      prop: "current",
      label: "Current step",
      kind: "choice",
      initial: "1",
      options: [
        ["0", "1"],
        ["1", "2"],
        ["2", "3"],
        ["3", "4"],
        ["4", "Done"],
      ],
      code: (value) => ["current", `{${value}}`],
    },
    {
      prop: "orientation",
      label: "Orientation",
      kind: "choice",
      initial: "horizontal",
      omit: "horizontal",
      options: [
        ["horizontal", "Horizontal"],
        ["vertical", "Vertical"],
      ],
    },
    {
      prop: "descriptions",
      label: "Descriptions",
      kind: "switch",
      initial: false,
      code: () => null,
    },
    {
      prop: "onStepSelect",
      label: "Back to done steps",
      kind: "switch",
      initial: false,
      code: (value) => (value ? ["onStepSelect", "{setCurrent}"] : null),
    },
  ],
  render: (v) => (
    <div className="qc-steps-stage">
      <Steps
        steps={SAML.map(({ label, description }) => ({
          label,
          description: v.descriptions ? description : undefined,
        }))}
        current={Number(v.current)}
        orientation={v.orientation as "horizontal"}
        onStepSelect={v.onStepSelect ? () => {} : undefined}
      />
    </div>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
