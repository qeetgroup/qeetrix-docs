"use client";

import { LaptopIcon, MonitorIcon, SmartphoneIcon } from "@qeetrix/icons";
import { Button, Label, Switch, VisuallyHidden } from "@qeetrix/ui";
import { useState } from "react";

const sessions = [
  { device: "Chrome on Pixel 8", place: "Bengaluru", icon: SmartphoneIcon },
  { device: "Safari on MacBook Air", place: "Pune", icon: LaptopIcon },
  { device: "Edge on Windows 11", place: "Hyderabad", icon: MonitorIcon },
] as const;

/**
 * @title Extra context
 *
 * Three buttons that all read "Revoke" sound the same out of context. Hidden text names the session
 * each one acts on, so every button has a distinct name. `className` is merged with the hidden
 * class, so the switch adds `not-sr-only` to show what screen readers get.
 */
export default function VisuallyHiddenExtraContext() {
  const [reveal, setReveal] = useState(false);

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Label className="font-normal">
        <Switch checked={reveal} onCheckedChange={setReveal} />
        Show the hidden text
      </Label>
      <ul className="divide-y divide-border rounded-lg border border-border bg-card">
        {sessions.map(({ device, place, icon: Icon }) => (
          <li key={device} className="flex items-center gap-3 p-3">
            <Icon aria-hidden className="size-5 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <div className="text-label font-medium">{device}</div>
              <div className="text-caption text-muted-foreground">{place}</div>
            </div>
            <Button variant="outline" size="sm">
              Revoke
              <VisuallyHidden
                className={
                  reveal
                    ? "not-sr-only rounded-sm bg-brand-subtle px-1"
                    : undefined
                }
              >
                {` ${device}`}
              </VisuallyHidden>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
