"use client";

import { Banner, Button } from "@qeetrix/ui";
import { useState } from "react";

/**
 * `onDismiss` adds a trailing dismiss button and calls your handler; hiding the banner, and
 * remembering that it was dismissed, is up to you.
 *
 * @layout wide
 */
export default function BannerDismissible() {
  const [open, setOpen] = useState(true);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background">
      {open ? (
        <Banner
          variant="warning"
          aria-label="Seat limit"
          onDismiss={() => setOpen(false)}
        >
          <span>
            You have used 470 of 500 seats. <a href="#plans">Upgrade plan</a>
          </span>
        </Banner>
      ) : null}
      <div className="flex min-h-28 flex-col items-start gap-3 p-4">
        <div>
          <div className="text-label font-medium">Members</div>
          <div className="text-caption text-muted-foreground">
            470 active · 12 invited
          </div>
        </div>
        {open ? null : (
          <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
            Show the banner again
          </Button>
        )}
      </div>
    </div>
  );
}
