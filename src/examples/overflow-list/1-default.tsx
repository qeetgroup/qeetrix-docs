import { Badge, OverflowList } from "@qeetrix/ui";

const scopes = [
  "payments:write",
  "invoices:read",
  "refunds:write",
  "settlements:read",
  "webhooks:manage",
  "customers:read",
  "audit:read",
];

/**
 * As many scopes as fit stay on one line, and the rest fold into a "+N" pill whose popover lists
 * them. Drag the frame's corner: the list re-measures whenever its container resizes.
 */
export default function OverflowListDefault() {
  return (
    <div className="w-80 min-w-40 resize-x overflow-hidden rounded-lg border border-border bg-card p-3">
      <p className="mb-2 text-caption text-muted-foreground">
        API key scopes · Northwind POS
      </p>
      <OverflowList
        items={scopes.map((scope) => (
          <Badge key={scope} variant="outline" className="font-mono">
            {scope}
          </Badge>
        ))}
      />
    </div>
  );
}
