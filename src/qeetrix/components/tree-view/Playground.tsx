// Components › Tree view › Playground: the spec the playground kit draws. An island.
import { TreeView } from "@qeetrix/react/experimental";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";
import { PERMISSIONS, UNITS } from "./examples";

const spec: Spec = {
  file: "units.tsx",
  imports: [[["TreeView"], "@qeetrix/react/experimental"]],
  component: "TreeView",
  controls: [
    {
      prop: "items",
      label: "Tree",
      kind: "choice",
      initial: "units",
      options: [
        ["units", "Units"],
        ["permissions", "Permissions"],
      ],
      code: (value) => ["label", value === "units" ? '"Organisation units"' : '"Permissions"'],
    },
    {
      prop: "checkable",
      label: "Checkable",
      kind: "switch",
      initial: false,
    },
    {
      prop: "open",
      label: "Open at first",
      kind: "switch",
      initial: true,
      code: (value, v) =>
        value
          ? ["defaultExpanded", v.items === "units" ? '{["acme"]}' : '{["users", "apps"]}']
          : null,
    },
  ],
  fixed: (v) => [["items", v.items === "units" ? "{units}" : "{permissions}"]],
  render: (v) => (
    <div className="qc-fold-stage">
      <TreeView
        key={`${v.items}-${v.checkable}-${v.open}`}
        label={v.items === "units" ? "Organisation units, playground" : "Permissions, playground"}
        items={v.items === "units" ? UNITS : PERMISSIONS}
        checkable={Boolean(v.checkable)}
        defaultExpanded={v.open ? (v.items === "units" ? ["acme"] : ["users", "apps"]) : []}
      />
    </div>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
