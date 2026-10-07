"use client";

import { TerminalIcon } from "@qeetrix/icons";
import { Button, FloatingWindow } from "@qeetrix/ui";
import { useState } from "react";

const lines = [
  ["10:42:07", "INFO", "POST /v1/payments 201 84ms"],
  ["10:42:07", "WARN", "upi.collect retry 1/3"],
  ["10:42:08", "INFO", "GET /v1/payments/pay_7Fd2 200 12ms"],
  ["10:42:09", "ERROR", "settlement batch 7f3a: bank timeout"],
  ["10:42:11", "INFO", "POST /v1/refunds 201 96ms"],
];

/**
 * A non-modal panel that floats over the page and doesn't trap focus. Drag it by its title bar,
 * or focus the move handle and use the arrow keys; Escape or the close button calls `onClose`.
 * The window is fixed to the viewport in an app; here the frame's `transform` makes it the
 * window's containing block.
 *
 * @layout wide
 */
export default function FloatingWindowDefault() {
  const [open, setOpen] = useState(true);
  return (
    <div className="relative h-80 overflow-hidden rounded-lg border border-border bg-background transform-gpu">
      <div className="p-4">
        <Button
          variant="outline"
          size="sm"
          disabled={open}
          onClick={() => setOpen(true)}
        >
          <TerminalIcon data-icon="inline-start" aria-hidden />
          Open live tail
        </Button>
      </div>
      <FloatingWindow
        title="Live tail · checkout-api"
        open={open}
        onClose={() => setOpen(false)}
        defaultPosition={{ x: 160, y: 56 }}
        width={360}
      >
        <div className="flex flex-col gap-1 font-mono text-caption">
          {lines.map(([time, level, message]) => (
            <p key={`${time}-${message}`} className="flex gap-2">
              <span className="text-muted-foreground">{time}</span>
              <span
                className={
                  level === "ERROR"
                    ? "text-destructive-text"
                    : level === "WARN"
                      ? "text-warning-text"
                      : "text-muted-foreground"
                }
              >
                {level}
              </span>
              <span className="truncate">{message}</span>
            </p>
          ))}
        </div>
      </FloatingWindow>
    </div>
  );
}
