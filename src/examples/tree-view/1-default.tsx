"use client";

import { BuildingIcon, StoreIcon, UsersIcon } from "@qeetrix/icons";
import { type TreeNode, TreeView } from "@qeetrix/ui";

const units: TreeNode[] = [
  {
    id: "northwind",
    label: "Northwind Retail",
    icon: BuildingIcon,
    defaultOpen: true,
    children: [
      {
        id: "head-office",
        label: "Head office",
        icon: BuildingIcon,
        defaultOpen: true,
        children: [
          { id: "finance", label: "Finance", icon: UsersIcon },
          { id: "technology", label: "Technology", icon: UsersIcon },
          { id: "people", label: "People & HR", icon: UsersIcon },
        ],
      },
      {
        id: "stores",
        label: "Stores",
        icon: StoreIcon,
        children: [
          { id: "north", label: "North region", icon: StoreIcon },
          { id: "south", label: "South region", icon: StoreIcon },
          { id: "west", label: "West region", icon: StoreIcon },
        ],
      },
    ],
  },
];

/**
 * A data-driven hierarchy: branches expand and collapse, and `defaultOpen` sets where each
 * starts. It follows the WAI-ARIA tree pattern: arrow keys move and expand, Home and End jump,
 * `*` expands every sibling, and typing a letter jumps to the next match.
 */
export default function TreeViewDefault() {
  return (
    <TreeView data={units} aria-label="Organisation units" className="w-64" />
  );
}
