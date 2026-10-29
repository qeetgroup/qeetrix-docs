// Components › Menu: its examples, the real Menu with the code for each. Shared by the page (doc.tsx)
// and the island that runs them (Live.tsx): nothing here reads token data.
import { ArrowUpDownIcon } from "@qeetrix/icons/icons/arrow-up-down";
import { CopyIcon } from "@qeetrix/icons/icons/copy";
import { DownloadIcon } from "@qeetrix/icons/icons/download";
import { EllipsisIcon } from "@qeetrix/icons/icons/ellipsis";
import { FolderInputIcon } from "@qeetrix/icons/icons/folder-input";
import { PencilIcon } from "@qeetrix/icons/icons/pencil";
import { TrashIcon } from "@qeetrix/icons/icons/trash";
import {
  Button,
  IconButton,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuTrigger,
  Stack,
  Text,
} from "@qeetrix/react";
import { useState } from "react";
import type { ExampleDoc } from "../types";

function RowActions() {
  const [did, setDid] = useState("");
  return (
    <Stack gap="sm" align="center">
      <Menu>
        <MenuTrigger
          render={
            <IconButton icon={EllipsisIcon} aria-label="Actions for Priya Sharma" tone="neutral" />
          }
        />
        <MenuContent>
          <MenuItem icon={PencilIcon} shortcut="E" onClick={() => setDid("Edit")}>
            Edit
          </MenuItem>
          <MenuItem icon={CopyIcon} shortcut="Ctrl+D" onClick={() => setDid("Duplicate")}>
            Duplicate
          </MenuItem>
          <MenuSubmenu>
            <MenuSubmenuTrigger icon={FolderInputIcon}>Move to</MenuSubmenuTrigger>
            <MenuContent>
              <MenuItem onClick={() => setDid("Move to Engineering")}>Engineering</MenuItem>
              <MenuItem onClick={() => setDid("Move to Finance")}>Finance</MenuItem>
            </MenuContent>
          </MenuSubmenu>
          <MenuSeparator />
          <MenuItem icon={TrashIcon} tone="danger" onClick={() => setDid("Remove")}>
            Remove from Acme
          </MenuItem>
        </MenuContent>
      </Menu>
      <Text tone="subtle" size="sm">
        {did ? `Chose: ${did}.` : "Open it: arrows move, typing jumps, Escape closes."}
      </Text>
    </Stack>
  );
}

function ViewOptions() {
  const [archived, setArchived] = useState(false);
  const [sort, setSort] = useState("name");
  return (
    <Stack gap="sm" align="center">
      <Menu>
        <MenuTrigger
          render={
            <Button variant="soft" icon={ArrowUpDownIcon}>
              View
            </Button>
          }
        />
        <MenuContent>
          <MenuCheckboxItem checked={archived} onCheckedChange={setArchived}>
            Show archived
          </MenuCheckboxItem>
          <MenuSeparator />
          <MenuGroup>
            <MenuGroupLabel>Sort by</MenuGroupLabel>
            <MenuRadioGroup value={sort} onValueChange={setSort}>
              <MenuRadioItem value="name">Name</MenuRadioItem>
              <MenuRadioItem value="last-sign-in">Last sign-in</MenuRadioItem>
              <MenuRadioItem value="created">Created</MenuRadioItem>
            </MenuRadioGroup>
          </MenuGroup>
        </MenuContent>
      </Menu>
      <Text tone="subtle" size="sm">
        Sorted by {sort.replaceAll("-", " ")}
        {archived ? ", archived shown" : ""}.
      </Text>
    </Stack>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "row-actions",
    title: "Row actions",
    line: "Icons, shortcuts, a submenu, and the destructive action last, after a rule.",
    code: `<Menu>
  <MenuTrigger render={<IconButton icon={EllipsisIcon} aria-label="Actions for Priya Sharma" tone="neutral" />} />
  <MenuContent>
    <MenuItem icon={PencilIcon} shortcut="E">Edit</MenuItem>
    <MenuItem icon={CopyIcon} shortcut="Ctrl+D">Duplicate</MenuItem>
    <MenuSubmenu>
      <MenuSubmenuTrigger icon={FolderInputIcon}>Move to</MenuSubmenuTrigger>
      <MenuContent>
        <MenuItem>Engineering</MenuItem>
        <MenuItem>Finance</MenuItem>
      </MenuContent>
    </MenuSubmenu>
    <MenuSeparator />
    <MenuItem icon={TrashIcon} tone="danger">Remove from Acme</MenuItem>
  </MenuContent>
</Menu>`,
    render: () => <RowActions />,
  },
  {
    id: "checks-and-choices",
    title: "Checks and choices",
    line: "MenuCheckboxItem turns an option on or off and keeps the menu open; MenuRadioItem chooses one of a group and closes it.",
    code: `<MenuContent>
  <MenuCheckboxItem checked={archived} onCheckedChange={setArchived}>Show archived</MenuCheckboxItem>
  <MenuSeparator />
  <MenuGroup>
    <MenuGroupLabel>Sort by</MenuGroupLabel>
    <MenuRadioGroup value={sort} onValueChange={setSort}>
      <MenuRadioItem value="name">Name</MenuRadioItem>
      <MenuRadioItem value="last-sign-in">Last sign-in</MenuRadioItem>
      <MenuRadioItem value="created">Created</MenuRadioItem>
    </MenuRadioGroup>
  </MenuGroup>
</MenuContent>`,
    render: () => <ViewOptions />,
  },
  {
    id: "descriptions",
    title: "Descriptions",
    line: "description: a second line, for a menu whose choices need explaining.",
    code: `<MenuContent>
  <MenuItem icon={DownloadIcon} description="Opens in a spreadsheet">Export as CSV</MenuItem>
  <MenuItem icon={DownloadIcon} description="For another system to read">Export as JSON</MenuItem>
</MenuContent>`,
    render: () => (
      <Menu>
        <MenuTrigger
          render={
            <Button variant="soft" icon={DownloadIcon}>
              Export
            </Button>
          }
        />
        <MenuContent>
          <MenuItem icon={DownloadIcon} description="Opens in a spreadsheet">
            Export as CSV
          </MenuItem>
          <MenuItem icon={DownloadIcon} description="For another system to read">
            Export as JSON
          </MenuItem>
        </MenuContent>
      </Menu>
    ),
  },
];
