import { Link } from "@qeetrix/ui";

/**
 * `disabled` removes the destination and the tab stop and dims the link, while screen readers
 * still find it as an unavailable link. Prefer removing a link nobody can follow; use this when
 * its absence would confuse more than its presence.
 */
export default function LinkDisabled() {
  return (
    <div className="flex flex-col items-start gap-1">
      <Link href="#" disabled>
        Send invoice
      </Link>
      <span className="text-caption text-muted-foreground">
        Add the customer's GSTIN to send this invoice.
      </span>
    </div>
  );
}
