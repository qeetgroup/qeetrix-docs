"use client";

import { Spinner } from "@qeetrix/ui";

/**
 * An indeterminate busy indicator with `role="status"`. Its accessible name defaults to
 * "Loading"; pass `label` to say what is busy.
 */
export default function SpinnerDefault() {
  return (
    <div className="flex items-center gap-2 text-label text-muted-foreground">
      <Spinner label="Syncing members" />
      Syncing 724 members from Okta…
    </div>
  );
}
