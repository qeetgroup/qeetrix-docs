// Components › Empty state › Playground: the spec the playground kit draws. An island.
import { PlusIcon } from "@qeetrix/icons/icons/plus";
import { UsersIcon } from "@qeetrix/icons/icons/users";
import { Button } from "@qeetrix/react";
import { EmptyState } from "@qeetrix/react/experimental";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "users-empty.tsx",
  imports: (v) => [
    [["PlusIcon", "UsersIcon"], "@qeetrix/icons"],
    ...(v.action ? ([[["Button"], "@qeetrix/react"]] as Array<[string[], string]>) : []),
    [["EmptyState"], "@qeetrix/react/experimental"],
  ],
  component: "EmptyState",
  fixed: () => [["icon", "{UsersIcon}"]],
  controls: [
    { prop: "title", label: "Title", kind: "text", initial: "No users yet" },
    {
      prop: "description",
      label: "Description",
      kind: "text",
      initial: "Invite your team, or connect a directory to sync them.",
    },
    {
      prop: "size",
      label: "Size",
      kind: "choice",
      initial: "page",
      omit: "page",
      options: [
        ["page", "Page"],
        ["section", "Section"],
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
      prop: "action",
      label: "An action",
      kind: "switch",
      initial: true,
      code: (value) =>
        value ? ["actions", "{<Button icon={PlusIcon}>Invite users</Button>}"] : null,
    },
  ],
  render: (v) => (
    <div className="qc-empty-stage">
      <EmptyState
        icon={UsersIcon}
        title={String(v.title) || "No users yet"}
        description={String(v.description) || undefined}
        size={v.size as "page"}
        tone={v.tone as "neutral"}
        actions={v.action ? <Button icon={PlusIcon}>Invite users</Button> : undefined}
      />
    </div>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
