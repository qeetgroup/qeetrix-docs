"use client";

import { Sparkline } from "@qeetrix/ui";

const services = [
  {
    name: "Payments captured",
    value: "29,980",
    data: [21, 22, 24, 23, 26, 27, 29, 30],
    tone: "positive",
    label: "Payments captured, last 8 weeks, rising",
  },
  {
    name: "Failed sign-ins",
    value: "1,204",
    data: [640, 720, 690, 810, 930, 1010, 1120, 1204],
    tone: "negative",
    label: "Failed sign-ins, last 8 weeks, rising",
  },
  {
    name: "Webhook retries",
    value: "312",
    data: [330, 318, 341, 305, 322, 309, 316, 312],
    tone: "neutral",
    label: "Webhook retries, last 8 weeks, flat",
  },
] as const;

/**
 * A tiny trend line for KPI tiles and table cells, with no axes, grid or tooltip. `tone` says
 * what the trend means: more failed sign-ins is bad news, so that line is `negative`. Give it
 * a `label` to make it an image; without one it is decorative.
 */
export default function ChartPresetsSparkline() {
  return (
    <ul className="w-80 divide-y divide-border rounded-lg border border-border bg-card">
      {services.map((service) => (
        <li
          key={service.name}
          className="flex items-center justify-between gap-4 px-4 py-3"
        >
          <div>
            <div className="text-caption text-muted-foreground">
              {service.name}
            </div>
            <div className="text-label font-semibold tabular-nums">
              {service.value}
            </div>
          </div>
          <Sparkline
            data={[...service.data]}
            tone={service.tone}
            label={service.label}
            width={96}
            height={32}
          />
        </li>
      ))}
    </ul>
  );
}
