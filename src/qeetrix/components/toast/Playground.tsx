// Components › Toast › Playground: the spec the playground kit draws, a button that shows the toast as
// set. An island.
import { Button, ToastProvider, type ToastTone, useToast } from "@qeetrix/react";
import PlaygroundKit, { type Spec, type Values } from "../PlaygroundKit";

function Show({ v }: { v: Values }) {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast.add({
          title: String(v.title) || "Title",
          description: String(v.description) || undefined,
          tone: v.tone as ToastTone,
          action: v.action ? { label: String(v.action), onClick: () => {} } : undefined,
        })
      }
    >
      Show the toast
    </Button>
  );
}

const spec: Spec = {
  file: "send-invoice.tsx",
  imports: [[["Button", "useToast"], "@qeetrix/react"]],
  preamble: ["const toast = useToast();"],
  component: "Button",
  controls: [
    { prop: "title", label: "Title", kind: "text", initial: "Invoice sent", code: () => null },
    {
      prop: "description",
      label: "Description",
      kind: "text",
      initial: "To finance@acme.in.",
      code: () => null,
    },
    {
      prop: "tone",
      label: "Tone",
      kind: "choice",
      initial: "success",
      options: [
        ["info", "Info"],
        ["success", "Success"],
        ["warning", "Warning"],
        ["danger", "Danger"],
      ],
      code: () => null,
    },
    { prop: "action", label: "Action", kind: "text", initial: "", code: () => null },
  ],
  fixed: (v) => {
    const fields = [
      `title: "${v.title || "Title"}"`,
      v.description ? `description: "${v.description}"` : "",
      v.tone !== "info" ? `tone: "${v.tone}"` : "",
      v.action ? `action: { label: "${v.action}", onClick: undo }` : "",
    ].filter(Boolean);
    return [["onClick", `{() => toast.add({ ${fields.join(", ")} })}`]];
  },
  children: () => "Send invoice",
  render: (v) => (
    <ToastProvider>
      <Show v={v} />
    </ToastProvider>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
