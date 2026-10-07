import { CopyIcon, ListFilterIcon } from "@qeetrix/icons";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@qeetrix/ui";

const lines = [
  "10:42:07.118 INFO  checkout-api  POST /v1/payments 201 84ms",
  "10:42:07.402 WARN  checkout-api  upi.collect retry 1/3 vpa=meera@okhdfc",
  "10:42:08.951 ERROR payouts-svc   settlement batch 7f3a failed: bank timeout",
];

/**
 * Checkbox items toggle a setting and leave the menu open. `ContextMenuLabel` names a group and
 * has to sit inside a `ContextMenuGroup` or `ContextMenuRadioGroup`. Here a log viewer offers
 * copy and filter actions, plus view options.
 *
 * @title Checkbox items
 * @layout wide
 */
export default function ContextMenuCheckboxItems() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="mx-auto flex w-full max-w-xl flex-col gap-1 rounded-lg border border-dashed border-border-strong bg-surface-subtle p-3 select-none">
        <p className="text-caption text-muted-foreground">
          Right-click a log line
        </p>
        <div className="rounded-md border border-border bg-card p-3 font-mono text-caption leading-relaxed">
          {lines.map((line) => (
            <p key={line} className="truncate">
              {line}
            </p>
          ))}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem>
          <CopyIcon aria-hidden />
          Copy line
        </ContextMenuItem>
        <ContextMenuItem>
          <CopyIcon aria-hidden />
          Copy trace ID
        </ContextMenuItem>
        <ContextMenuItem>
          <ListFilterIcon aria-hidden />
          Show only checkout-api
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>View</ContextMenuLabel>
          <ContextMenuCheckboxItem defaultChecked>
            Timestamps
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Wrap long lines</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem defaultChecked>
            Highlight errors
          </ContextMenuCheckboxItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
