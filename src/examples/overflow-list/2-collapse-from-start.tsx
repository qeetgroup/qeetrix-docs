import { ChevronRightIcon } from "@qeetrix/icons";
import { OverflowList } from "@qeetrix/ui";

const path = [
  "Northwind Retail",
  "Platform",
  "Payments",
  "Checkout service",
  "Webhooks",
  "Endpoint settings",
];

/**
 * `collapseFrom="start"` hides the leading items and keeps the last ones visible, so a long path
 * still ends on the current page.
 */
export default function OverflowListCollapseFromStart() {
  return (
    <div className="w-80 rounded-lg border border-border bg-card p-3">
      <OverflowList
        collapseFrom="start"
        gap="gap-1"
        items={path.map((segment, index) => (
          <span
            key={segment}
            className="flex items-center gap-1 text-sm whitespace-nowrap"
          >
            {index > 0 && (
              <ChevronRightIcon
                aria-hidden
                className="size-3.5 text-muted-foreground"
              />
            )}
            <span
              className={
                index === path.length - 1
                  ? "font-medium"
                  : "text-muted-foreground"
              }
            >
              {segment}
            </span>
          </span>
        ))}
      />
    </div>
  );
}
