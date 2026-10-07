"use client";

import { CircleCheckIcon, SmartphoneIcon, XIcon } from "@qeetrix/icons";
import { Button, IconButton, Label, Portal, Switch } from "@qeetrix/ui";
import { useState } from "react";

/**
 * With no `container`, `Portal` renders its children into `document.body`. The notice is
 * `position: fixed`: through the portal it pins to the corner of the window, while rendered in
 * place it is caught by the frame's `transform` and pins to the frame instead.
 */
export default function PortalDefault() {
  const [portalled, setPortalled] = useState(true);
  const [shown, setShown] = useState(false);

  const notice = shown ? (
    <div className="fixed end-4 bottom-4 z-(--qx-z-toast) flex items-center gap-2 rounded-lg border border-border bg-popover py-2 ps-3 pe-2 text-popover-foreground shadow-lg">
      <CircleCheckIcon aria-hidden className="size-4 text-success" />
      <span className="text-label">Signed out of Pixel 8</span>
      <IconButton
        icon={XIcon}
        aria-label="Dismiss"
        variant="ghost"
        size="icon-xs"
        onClick={() => setShown(false)}
      />
    </div>
  ) : null;

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Label className="font-normal">
        <Switch checked={portalled} onCheckedChange={setPortalled} />
        Render the notice through Portal
      </Label>

      <div className="relative h-40 overflow-hidden rounded-lg border border-border bg-background p-4 transform-gpu">
        <div className="flex items-center gap-3">
          <SmartphoneIcon
            aria-hidden
            className="size-5 text-muted-foreground"
          />
          <div className="min-w-0 flex-1">
            <div className="font-medium">Chrome on Pixel 8</div>
            <div className="text-caption text-muted-foreground">
              Bengaluru · active 2 hours ago
            </div>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShown(true)}
          >
            Sign out
          </Button>
        </div>
        {portalled ? <Portal>{notice}</Portal> : notice}
      </div>

      <p className="text-caption text-muted-foreground">
        {portalled
          ? "The notice renders into document.body, so it pins to the window."
          : "The notice renders inside the frame, so it pins to the frame."}
      </p>
    </div>
  );
}
