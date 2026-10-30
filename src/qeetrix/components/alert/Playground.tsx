// Components › Alert › Playground: the spec the playground kit draws. An island.
import { Button } from "@qeetrix/react";
import { Alert } from "@qeetrix/react/experimental";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "sync-status.tsx",
  imports: (v) => [
    ...(v.actions ? ([[["Button"], "@qeetrix/react"]] as Array<[string[], string]>) : []),
    [["Alert"], "@qeetrix/react/experimental"],
  ],
  component: "Alert",
  children: (v) => String(v.description) || undefined,
  controls: [
    { prop: "title", label: "Title", kind: "text", initial: "Directory sync is behind" },
    {
      prop: "description",
      label: "Description",
      kind: "text",
      initial: "Users added in the last hour may be missing.",
      code: () => null,
    },
    {
      prop: "tone",
      label: "Tone",
      kind: "choice",
      initial: "warning",
      omit: "info",
      options: [
        ["info", "Info"],
        ["success", "Success"],
        ["warning", "Warning"],
        ["danger", "Danger"],
      ],
    },
    {
      prop: "variant",
      label: "Variant",
      kind: "choice",
      initial: "default",
      omit: "default",
      options: [
        ["default", "Default"],
        ["banner", "Banner"],
      ],
    },
    {
      prop: "actions",
      label: "An action",
      kind: "switch",
      initial: false,
      code: (value) => (value ? ["actions", '{<Button size="sm">Sync now</Button>}'] : null),
    },
    {
      prop: "onDismiss",
      label: "Dismiss",
      kind: "switch",
      initial: false,
      code: (value) => (value ? ["onDismiss", "{dismiss}"] : null),
    },
  ],
  render: (v) => (
    <div className={v.variant === "banner" ? "qc-banner-stage" : "qc-alert-stage"}>
      <Alert
        tone={v.tone as "warning"}
        variant={v.variant as "default"}
        title={String(v.title) || "Directory sync is behind"}
        actions={v.actions ? <Button size="sm">Sync now</Button> : undefined}
        onDismiss={v.onDismiss ? () => {} : undefined}
      >
        {String(v.description) || undefined}
      </Alert>
    </div>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
