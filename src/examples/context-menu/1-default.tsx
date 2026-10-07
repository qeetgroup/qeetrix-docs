import {
  CopyIcon,
  DownloadIcon,
  ExternalLinkIcon,
  FileTextIcon,
  PencilIcon,
  TrashIcon,
} from "@qeetrix/icons";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@qeetrix/ui";

/**
 * Right-clicking the trigger area, or long-pressing it on touch, opens the menu at the pointer.
 * The items are Dropdown Menu's: icons, shortcuts, separators and a destructive variant.
 */
export default function ContextMenuDefault() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-44 w-80 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border-strong bg-surface-subtle text-caption text-muted-foreground select-none">
        <div className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2">
          <FileTextIcon className="size-5 text-muted-foreground" aria-hidden />
          <div>
            <p className="text-sm font-medium text-foreground">INV-2041.pdf</p>
            <p className="text-caption text-muted-foreground">182 KB</p>
          </div>
        </div>
        Right-click a file
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem>
          <ExternalLinkIcon aria-hidden />
          Open
          <ContextMenuShortcut>⌘O</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <PencilIcon aria-hidden />
          Rename
        </ContextMenuItem>
        <ContextMenuItem>
          <DownloadIcon aria-hidden />
          Download
        </ContextMenuItem>
        <ContextMenuItem>
          <CopyIcon aria-hidden />
          Copy link
          <ContextMenuShortcut>⌘L</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <TrashIcon aria-hidden />
          Delete
          <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
