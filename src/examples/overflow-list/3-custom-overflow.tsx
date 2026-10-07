"use client";

import {
  Badge,
  OverflowList,
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@qeetrix/ui";

const groups = [
  "Platform engineering",
  "On-call: payments",
  "Finance & billing",
  "Bengaluru office",
  "Contractors",
  "Security champions",
];

/**
 * `renderOverflow` replaces the "+N" pill. It receives the hidden items and their count, here
 * for an "and N more" link that opens a titled popover.
 */
export default function OverflowListCustomOverflow() {
  return (
    <div className="w-80 rounded-lg border border-border bg-card p-3">
      <p className="mb-2 text-caption text-muted-foreground">
        Diya Sharma is a member of
      </p>
      <OverflowList
        items={groups.map((group) => (
          <Badge key={group} variant="secondary">
            {group}
          </Badge>
        ))}
        renderOverflow={(hidden, count) => (
          <Popover>
            <PopoverTrigger className="rounded-sm text-caption font-medium whitespace-nowrap text-link outline-none hover:text-link-hover focus-visible:focus-ring">
              and {count} more
            </PopoverTrigger>
            <PopoverContent className="flex max-w-xs flex-col gap-2">
              <PopoverTitle className="text-sm">Also a member of</PopoverTitle>
              <div className="flex flex-wrap gap-1.5">{hidden}</div>
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  );
}
