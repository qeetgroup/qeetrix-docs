"use client";

import { Avatar, AvatarFallback, OrgChart, type OrgNode } from "@qeetrix/ui";

const people: OrgNode = {
  id: "diya",
  label: "Diya Sharma",
  sublabel: "Chief Financial Officer",
  children: [
    { id: "kabir", label: "Kabir Rao", sublabel: "Payroll lead" },
    { id: "meera", label: "Meera Iyer", sublabel: "Billing admin" },
    { id: "rohan", label: "Rohan Gupta", sublabel: "Accounts payable" },
  ],
};

/**
 * `renderNode` replaces the default card, here with an avatar beside the name (hidden from
 * screen readers, since the name is visible). The connectors and collapse toggles stay the
 * chart's.
 *
 * @layout wide
 */
export default function OrgChartCustomNode() {
  return (
    <OrgChart
      data={people}
      renderNode={(node) => (
        <div className="flex min-w-44 items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2 shadow-xs">
          <Avatar name={String(node.label)}>
            <AvatarFallback aria-hidden />
          </Avatar>
          <div className="min-w-0 text-start">
            <div className="text-label font-medium">{node.label}</div>
            <div className="text-caption text-muted-foreground">
              {node.sublabel}
            </div>
          </div>
        </div>
      )}
    />
  );
}
