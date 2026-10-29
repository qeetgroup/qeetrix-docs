// Components › Card › Playground: the spec the playground kit draws. An island.
import { Button, Card, Text } from "@qeetrix/react";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "api-key-card.tsx",
  imports: (v) => [[v.footer || v.actions ? ["Button", "Card"] : ["Card"], "@qeetrix/react"]],
  component: "Card",
  children: () => "Name the key so you can find it in the audit log.",
  controls: [
    {
      prop: "title",
      label: "Title",
      kind: "text",
      initial: "Create API key",
      code: (value) => (value ? ["title", `"${value}"`] : null),
    },
    {
      prop: "level",
      label: "Level",
      kind: "choice",
      initial: "2",
      options: [
        ["2", "h2"],
        ["3", "h3"],
        ["4", "h4"],
      ],
      code: (value, v) => (v.title ? ["level", `{${value}}`] : null),
    },
    {
      prop: "variant",
      label: "Variant",
      kind: "choice",
      initial: "default",
      omit: "default",
      options: [
        ["default", "Default"],
        ["subdued", "Subdued"],
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
        ["danger", "Danger"],
      ],
    },
    {
      prop: "actions",
      label: "Actions",
      kind: "switch",
      initial: false,
      code: (value) => (value ? ["actions", '{<Button variant="ghost">View docs</Button>}'] : null),
    },
    {
      prop: "footer",
      label: "Footer",
      kind: "switch",
      initial: true,
      code: (value) => (value ? ["footer", "{<Button>Create key</Button>}"] : null),
    },
  ],
  render: (v) => {
    const props = {
      variant: v.variant as "default",
      tone: v.tone as "neutral",
      actions: v.actions ? <Button variant="ghost">View docs</Button> : undefined,
      footer: v.footer ? <Button>Create key</Button> : undefined,
    };
    const body = <Text>Name the key so you can find it in the audit log.</Text>;
    return (
      <div className="qc-fold-stage">
        {v.title ? (
          <Card {...props} title={String(v.title)} level={Number(v.level) as 2}>
            {body}
          </Card>
        ) : (
          <Card {...props}>{body}</Card>
        )}
      </div>
    );
  },
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
