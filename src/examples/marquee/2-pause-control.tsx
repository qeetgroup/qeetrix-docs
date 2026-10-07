"use client";

import { PauseIcon, PlayIcon } from "@qeetrix/icons";
import { Button, Marquee, StatusPill } from "@qeetrix/ui";
import { useState } from "react";

const services = [
  { name: "Qeet ID sign-in", status: "up" },
  { name: "Qeet Pay UPI", status: "up" },
  { name: "Qeet Pay cards", status: "degraded" },
  { name: "Qeet Notify SMS", status: "up" },
  { name: "Qeet Notify WhatsApp", status: "up" },
  { name: "Qeet Logs ingest", status: "up" },
];

/**
 * A ticker that runs beside other content for more than five seconds needs a visible way to stop
 * it (WCAG 2.2.2). `paused` is controlled, so wire it to a button.
 *
 * @layout wide
 */
export default function MarqueePauseControl() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-2">
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={paused ? "Play status ticker" : "Pause status ticker"}
        onClick={() => setPaused(!paused)}
      >
        {paused ? <PlayIcon aria-hidden /> : <PauseIcon aria-hidden />}
      </Button>
      <Marquee paused={paused} speed={30} className="min-w-0 flex-1">
        {services.map((service) => (
          <span
            key={service.name}
            className="flex items-center gap-2 text-label whitespace-nowrap"
          >
            {service.name}
            <StatusPill status={service.status} />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
