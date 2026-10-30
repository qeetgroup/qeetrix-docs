// Components › Tree view: its documentation, from @qeetrix/react 0.2.0 (experimental/tree-view),
// the Storybook stories (data-display/tree-view.stories.tsx) and the changelog. Its examples run
// live (Live.tsx); the figures are the real TreeView, server-rendered.
import { TreeView } from "@qeetrix/react/experimental";
import type { ReactNode } from "react";
import { DISPLAY_TESTED } from "../display";
import type { ComponentDoc } from "../types";
import { examples, PERMISSIONS, UNITS } from "./examples";

const Fold = ({ children }: { children: ReactNode }) => (
  <div className="qc-fold-stage">{children}</div>
);

export const treeView: ComponentDoc = {
  name: "Tree view",
  slug: "tree-view",
  category: "data-display",
  status: "experimental",
  since: "0.0.6",
  lede: "A hierarchy to open, close and choose from: organisation units, nested groups, permissions.",
  exports: ["TreeView", "TreeNode"],
  renders: '<ul role="tree">',
  source: "experimental/tree-view",
  story: "components/data-display/tree-view.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Organisation units and nested groups, to choose one.",
      "A role's permissions, ticked by area.",
    ],
    notFor: [
      { text: "A flat list", use: "Table" },
      { text: "The site's navigation", use: "Sidebar" },
      { text: "Sections of content", use: "Accordion" },
    ],
    anatomyFigure: (
      <Fold>
        <TreeView
          label="Organisation units"
          items={UNITS}
          defaultExpanded={["acme", "eng"]}
          defaultSelected="platform"
        />
      </Fold>
    ),
    anatomy: [
      {
        slot: "tree-toggle",
        element: "<span>",
        note: "The chevron of a node with children: turns as it opens.",
      },
      { slot: "tree-icon", element: "<svg>", note: "16px, for the kind of node." },
      {
        slot: "tree-item",
        select: '[data-slot="tree-item"][aria-selected="true"]',
        element: '<li role="treeitem">',
        note: "The selected node: aria-selected.",
      },
      { slot: "tree-guide", element: "<span>", note: "A guide line per level." },
      { slot: "tree-meta", element: "<span>", note: "At the row's end: a count, a status." },
    ],
    rules: [
      {
        title: "Say how many",
        doLine: "A count at each row's end: where the people are.",
        dontLine: "Bare names: every node must be opened to find out.",
        doIt: (
          <Fold>
            <TreeView label="Units, counted" items={UNITS} defaultExpanded={["acme"]} />
          </Fold>
        ),
        dontIt: (
          <Fold>
            <TreeView
              label="Units, bare"
              items={UNITS.map(({ meta, children, ...unit }) => ({
                ...unit,
                children: children?.map(({ meta: _, ...child }) => child),
              }))}
              defaultExpanded={["acme"]}
            />
          </Fold>
        ),
      },
      {
        title: "Show what can't be granted",
        doLine: "Disabled, in place: the permission exists, and this role can't give it.",
        dontLine: "Left out: nobody can tell it exists.",
        doIt: (
          <Fold>
            <TreeView
              label="Permissions, all shown"
              items={PERMISSIONS.slice(1, 2)}
              checkable
              defaultExpanded={["apps"]}
              defaultChecked={["apps.view"]}
            />
          </Fold>
        ),
        dontIt: (
          <Fold>
            <TreeView
              label="Permissions, some hidden"
              items={[
                {
                  ...(PERMISSIONS[1] as (typeof PERMISSIONS)[number]),
                  children: PERMISSIONS[1]?.children?.slice(0, 1),
                },
              ]}
              checkable
              defaultExpanded={["apps"]}
              defaultChecked={["apps.view"]}
            />
          </Fold>
        ),
      },
    ],
    content: [
      "Labels as the thing is named elsewhere: Engineering, Reset MFA.",
      "label names the tree: Organisation units, Permissions.",
      "meta for a count or a status, not for a second label.",
    ],
  },

  api: {
    props: [
      {
        name: "label",
        type: "string",
        default: "required",
        note: 'Names the tree: "Organisation units".',
      },
      {
        name: "items",
        type: "TreeNode[]",
        default: "required",
        note: "Each node: id, label, and icon, meta, children, disabled.",
      },
      {
        name: "expanded · defaultExpanded · onExpandedChange",
        type: "string[]",
        default: "[]",
        note: "The open nodes' ids.",
      },
      {
        name: "selected · defaultSelected · onSelectedChange",
        type: "string | null",
        default: "null",
        note: "The selected node's id, by Enter, Space or a click. Not with checkable.",
      },
      {
        name: "checkable",
        type: "boolean",
        default: "false",
        note: "A checkbox per node; a parent is mixed while some of its nodes are on.",
      },
      {
        name: "checked · defaultChecked · onCheckedChange",
        type: "string[]",
        default: "[]",
        note: "The checked nodes without children.",
      },
      {
        name: "TreeNode: disabled",
        type: "boolean",
        default: "false",
        note: "Can't be selected, ticked, opened or closed; the keys and a parent's tick skip it, and so do the nodes under it.",
      },
    ],
    parts: [
      { slot: "tree-view", element: '<ul role="tree">', note: "aria-label." },
      {
        slot: "tree-item",
        element: '<li role="treeitem">',
        note: "aria-level, aria-setsize, aria-posinset, aria-expanded, aria-selected or aria-checked.",
      },
      {
        slot: "tree-row",
        element: "<div>",
        note: "The row's guides, toggle, check, icon, label and meta.",
      },
      { slot: "tree-group", element: '<ul role="group">', note: "An open node's children." },
      { slot: "tree-check", element: "<span>", note: "With checkable: the checkbox, aria-hidden." },
    ],
    recipes: [
      {
        title: "Loaded as it opens",
        line: "Fetch a node's children when it opens, and keep expanded in state while they come.",
        file: "units.tsx",
        code: `const [expanded, setExpanded] = useState<string[]>([]);
const items = useUnitTree(expanded);

<TreeView label="Organisation units" items={items} expanded={expanded} onExpandedChange={setExpanded} />`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "To the tree: one row is in the Tab order." },
      { keys: ["↓", "↑"], action: "The next or previous row, skipping disabled ones." },
      {
        keys: ["→"],
        action: "Opens a closed node, or steps into an open one. Left in right to left.",
      },
      { keys: ["←"], action: "Closes an open node, or steps out to its parent." },
      { keys: ["Home", "End"], action: "The first or last row." },
      { keys: ["Enter", "Space"], action: "Selects the node, or ticks it with checkable." },
      { keys: ["A–Z"], action: "The next row whose label starts with the letter." },
    ],
    checks: [
      {
        check: "Pattern",
        result: "The WAI-ARIA tree view: tree, treeitem and group, with level, size and position.",
      },
      {
        check: "State",
        result: "aria-expanded, and aria-selected or aria-checked (mixed for a parent).",
      },
      { check: "Right to left", result: "Right and Left swap, following the reading way." },
    ],
    tested: DISPLAY_TESTED,
  },

  changelog: [
    {
      version: "0.3.0",
      items: [
        "icon takes an element as well as a component (icon={<PlusIcon />}), so a Server Component can pass one: its type is IconSource.",
      ],
    },
    {
      version: "0.1.0",
      items: [
        "TreeNode disabled: skipped by the keys, never selected or ticked.",
        "Passes the caller's ref.",
      ],
    },
    {
      version: "0.0.6",
      items: [
        "TreeView: the WAI-ARIA tree view: arrows, Right and Left to open, close and step in or out (mirrored right to left), Home, End and type-ahead; select one node, or checkable with parents mixed while some nodes are on.",
      ],
    },
  ],

  related: [
    { name: "Checkbox", when: "A flat list to tick" },
    { name: "Sidebar", when: "Navigation" },
    { name: "Table", when: "Records" },
  ],
};
