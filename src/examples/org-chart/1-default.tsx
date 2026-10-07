import { OrgChart, type OrgNode } from "@qeetrix/ui";

const northwind: OrgNode = {
  id: "aarav",
  label: "Aarav Mehta",
  sublabel: "Chief Executive Officer",
  children: [
    {
      id: "diya",
      label: "Diya Sharma",
      sublabel: "Chief Financial Officer",
      children: [{ id: "kabir", label: "Kabir Rao", sublabel: "Payroll lead" }],
    },
    {
      id: "rohan",
      label: "Rohan Gupta",
      sublabel: "Chief Technology Officer",
      children: [
        { id: "meera", label: "Meera Iyer", sublabel: "Security lead" },
        { id: "arjun", label: "Arjun Rao", sublabel: "Platform lead" },
      ],
    },
    {
      id: "priya",
      label: "Priya Nair",
      sublabel: "Chief Operating Officer",
      children: [
        { id: "neha", label: "Neha Joshi", sublabel: "Store operations" },
      ],
    },
  ],
};

/**
 * A top-down hierarchy from nested `OrgNode`s, built from nested lists so a screen reader hears
 * each level's size. Every branch has a toggle to collapse it. `highlightedId` gives one card
 * the selected outline, such as the signed-in person; it is not a selection control.
 *
 * @layout wide
 */
export default function OrgChartDefault() {
  return <OrgChart data={northwind} highlightedId="meera" />;
}
