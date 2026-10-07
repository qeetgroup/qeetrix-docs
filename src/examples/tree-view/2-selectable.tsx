"use client";

import { FolderIcon, ScrollTextIcon } from "@qeetrix/icons";
import { type TreeNode, TreeView } from "@qeetrix/ui";
import { useState } from "react";

const scopes: TreeNode[] = [
  {
    id: "qeet-pay",
    label: "qeet-pay",
    icon: FolderIcon,
    defaultOpen: true,
    children: [
      { id: "qeet-pay/api", label: "api", icon: ScrollTextIcon },
      { id: "qeet-pay/settlement", label: "settlement", icon: ScrollTextIcon },
      {
        id: "qeet-pay/legacy",
        label: "legacy-gateway (archived)",
        icon: ScrollTextIcon,
        disabled: true,
      },
    ],
  },
  {
    id: "qeet-id",
    label: "qeet-id",
    icon: FolderIcon,
    children: [
      { id: "qeet-id/auth", label: "auth", icon: ScrollTextIcon },
      { id: "qeet-id/scim", label: "scim", icon: ScrollTextIcon },
    ],
  },
];

/**
 * Passing `defaultSelectedId`, `selectedId` or `onSelectedIdChange` makes the tree single-select:
 * click, Enter or Space selects a node. A `disabled` node can't be selected but stays focusable
 * so it can be read.
 */
export default function TreeViewSelectable() {
  const [selected, setSelected] = useState("qeet-pay/api");

  return (
    <div className="flex w-72 flex-col gap-3">
      <TreeView
        data={scopes}
        aria-label="Log scopes"
        selectedId={selected}
        onSelectedIdChange={setSelected}
      />
      <p className="text-caption text-muted-foreground">
        Streaming logs from{" "}
        <span className="font-mono text-foreground">{selected}</span>
      </p>
    </div>
  );
}
