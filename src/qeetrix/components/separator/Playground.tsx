// Components › Separator › Playground: the spec the playground kit draws. An island.
import { Inline, Separator, Stack, Text } from "@qeetrix/react";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "groups.tsx",
  imports: [[["Separator"], "@qeetrix/react"]],
  component: "Separator",
  controls: [
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
      prop: "tone",
      label: "Tone",
      kind: "choice",
      initial: "subtle",
      omit: "subtle",
      options: [
        ["subtle", "Subtle"],
        ["default", "Default"],
        ["strong", "Strong"],
      ],
    },
    { prop: "decorative", label: "Decorative", kind: "switch", initial: false },
  ],
  render: (v) => {
    const line = (
      <Separator
        orientation={v.orientation as "horizontal"}
        tone={v.tone as "subtle"}
        decorative={Boolean(v.decorative)}
      />
    );
    return v.orientation === "vertical" ? (
      <Inline gap="md" align="stretch">
        <Text>Privacy</Text>
        {line}
        <Text>Terms</Text>
      </Inline>
    ) : (
      <Stack gap="md" className="qc-cells">
        <Text>Passkeys</Text>
        {line}
        <Text>Authenticator app</Text>
      </Stack>
    );
  },
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
