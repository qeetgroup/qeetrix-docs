import {
  CopyIcon,
  DownloadIcon,
  FilePlusIcon,
  FolderOpenIcon,
  SaveIcon,
  TrashIcon,
} from "@qeetrix/icons";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@qeetrix/ui";

/**
 * A row of menus for an app's commands. Click a menu to open it; while one is open, hovering
 * another trigger or pressing ← and → moves along the bar. `MenubarShortcut` only displays a key
 * hint, `MenubarSub` nests a menu, and `variant="destructive"` marks a dangerous item.
 */
export default function MenubarDefault() {
  return (
    <Menubar aria-label="Log explorer">
      <MenubarMenu>
        <MenubarTrigger>Query</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <FilePlusIcon aria-hidden />
            New query
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <FolderOpenIcon aria-hidden />
            Open saved query…
            <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <SaveIcon aria-hidden />
            Save
            <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>
              <DownloadIcon aria-hidden />
              Export results
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>CSV</MenubarItem>
              <MenubarItem>NDJSON</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem variant="destructive">
            <TrashIcon aria-hidden />
            Delete query
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <CopyIcon aria-hidden />
            Copy link to query
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Query syntax</MenubarItem>
          <MenubarItem>
            Keyboard shortcuts
            <MenubarShortcut>?</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
