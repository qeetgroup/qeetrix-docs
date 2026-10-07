import {
  BanIcon,
  DownloadIcon,
  EllipsisIcon,
  EyeIcon,
  SendIcon,
} from "@qeetrix/icons";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@qeetrix/ui";

/**
 * Row actions behind an icon-only trigger. `DropdownMenuSub` nests a submenu that opens from its
 * trigger item (hover, or the arrow key toward it), and `variant="destructive"` marks the action
 * that can't be taken back.
 */
export default function DropdownMenuSubmenu() {
  return (
    <div className="flex w-96 items-center justify-between rounded-lg border border-border bg-card py-2 ps-4 pe-2">
      <div>
        <p className="text-sm font-medium">INV-2041</p>
        <p className="text-caption text-muted-foreground">
          Northwind Retail · ₹48,260.00
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Actions for INV-2041"
            />
          }
        >
          <EllipsisIcon aria-hidden />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <EyeIcon aria-hidden />
            View invoice
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SendIcon aria-hidden />
            Send reminder
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <DownloadIcon aria-hidden />
              Download
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>PDF</DropdownMenuItem>
              <DropdownMenuItem>GST e-invoice (JSON)</DropdownMenuItem>
              <DropdownMenuItem>CSV</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <BanIcon aria-hidden />
            Void invoice
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
