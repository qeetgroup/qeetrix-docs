// Components › Menu › Playground: the spec the playground kit draws. An island.
import { CopyIcon } from "@qeetrix/icons/icons/copy";
import { EllipsisIcon } from "@qeetrix/icons/icons/ellipsis";
import { PencilIcon } from "@qeetrix/icons/icons/pencil";
import { TrashIcon } from "@qeetrix/icons/icons/trash";
import {
  IconButton,
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@qeetrix/react";
import { element, indent, opening, type Piece } from "../PlaygroundCode";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "row-actions.tsx",
  imports: [
    [["CopyIcon", "EllipsisIcon", "PencilIcon", "TrashIcon"], "@qeetrix/icons"],
    [
      ["IconButton", "Menu", "MenuContent", "MenuItem", "MenuSeparator", "MenuTrigger"],
      "@qeetrix/react",
    ],
  ],
  component: "Menu",
  controls: [
    { prop: "icons", label: "Icons", kind: "switch", initial: true, code: () => null },
    { prop: "shortcuts", label: "Shortcuts", kind: "switch", initial: true, code: () => null },
    {
      prop: "danger",
      label: "A destructive action",
      kind: "switch",
      initial: true,
      code: () => null,
    },
    {
      prop: "side",
      label: "Side",
      kind: "choice",
      initial: "bottom",
      options: [
        ["bottom", "Bottom"],
        ["top", "Top"],
      ],
      code: () => null,
    },
  ],
  inner: (v) => {
    const item = (
      label: string,
      icon: string,
      shortcut?: string,
      extra: Array<[string, string?]> = [],
    ) =>
      element(
        "MenuItem",
        [
          ...(v.icons ? ([["icon", `{${icon}}`]] as Array<[string, string?]>) : []),
          ...(v.shortcuts && shortcut
            ? ([["shortcut", `"${shortcut}"`]] as Array<[string, string?]>)
            : []),
          ...extra,
        ],
        label,
      );
    const items: Piece[][] = [
      ...item("Edit", "PencilIcon", "E"),
      ...item("Duplicate", "CopyIcon", "Ctrl+D"),
    ];
    if (v.danger)
      items.push(
        ...element("MenuSeparator", []),
        ...item("Remove", "TrashIcon", undefined, [["tone", '"danger"']]),
      );
    return [
      ...element("MenuTrigger", [
        ["render", '{<IconButton icon={EllipsisIcon} aria-label="Actions" />}'],
      ]),
      ...opening("MenuContent", v.side === "top" ? [["side", '"top"']] : []),
      ...indent(items),
      [["</"], ["MenuContent"], [">"]],
    ];
  },
  render: (v) => (
    <Menu>
      <MenuTrigger
        render={<IconButton icon={EllipsisIcon} aria-label="Actions" tone="neutral" />}
      />
      <MenuContent side={v.side as "bottom"}>
        <MenuItem icon={v.icons ? PencilIcon : undefined} shortcut={v.shortcuts ? "E" : undefined}>
          Edit
        </MenuItem>
        <MenuItem
          icon={v.icons ? CopyIcon : undefined}
          shortcut={v.shortcuts ? "Ctrl+D" : undefined}
        >
          Duplicate
        </MenuItem>
        {v.danger && <MenuSeparator />}
        {v.danger && (
          <MenuItem icon={v.icons ? TrashIcon : undefined} tone="danger">
            Remove
          </MenuItem>
        )}
      </MenuContent>
    </Menu>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
