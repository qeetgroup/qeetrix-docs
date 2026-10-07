import { OrgChart, type OrgNode } from "@qeetrix/ui";

/** A manager and a team of `size` people under them. */
const unit = (id: string, label: string, size: number): OrgNode => ({
  id,
  label,
  sublabel: `${size} people`,
  children: Array.from({ length: size }, (_, index) => ({
    id: `${id}-${index}`,
    label: `Team member ${index + 1}`,
  })),
});

const northwind: OrgNode = {
  id: "aarav",
  label: "Aarav Mehta",
  sublabel: "Chief Executive Officer",
  children: [
    {
      id: "diya",
      label: "Diya Sharma",
      sublabel: "Finance",
      children: [
        unit("accounts", "Accounts", 6),
        unit("payroll", "Payroll", 4),
      ],
    },
    {
      id: "rohan",
      label: "Rohan Gupta",
      sublabel: "Technology",
      children: [
        unit("platform", "Platform", 12),
        unit("security", "Security", 5),
        unit("data", "Data", 7),
      ],
    },
    {
      id: "priya",
      label: "Priya Nair",
      sublabel: "Operations",
      children: [
        unit("north", "North stores", 31),
        unit("south", "South stores", 44),
        unit("west", "West stores", 27),
      ],
    },
  ],
};

/**
 * Large organisations read better a level at a time. `initialOpenDepth={1}` opens the root and
 * its direct reports, and each collapsed branch shows how many people it holds.
 *
 * @layout wide
 */
export default function OrgChartCollapsed() {
  return <OrgChart data={northwind} initialOpenDepth={1} />;
}
