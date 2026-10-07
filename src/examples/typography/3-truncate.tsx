import { Typography } from "@qeetrix/ui";

/**
 * `truncate` clips overflow with an ellipsis: `true` for one line, a number to clamp to that
 * many lines. The full text stays in the DOM for screen readers; offer a way to see it when it
 * matters.
 */
export default function TypographyTruncate() {
  return (
    <div className="flex w-72 flex-col gap-4 rounded-lg border border-border bg-card p-4">
      <Typography variant="h4" truncate>
        Northwind Retail — Quarterly access review for store managers
      </Typography>
      <Typography variant="muted" truncate={2}>
        Review who can approve refunds above ₹50,000, export customer data and
        change payout accounts. Access that isn't confirmed by 31 October is
        removed automatically.
      </Typography>
    </div>
  );
}
