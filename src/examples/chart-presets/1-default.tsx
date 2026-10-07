"use client";

import { AreaChart, type ChartConfig } from "@qeetrix/ui";

const data = [
  { week: "Aug 18", passkey: 4120, password: 9860 },
  { week: "Aug 25", passkey: 5340, password: 9210 },
  { week: "Sep 1", passkey: 6810, password: 8470 },
  { week: "Sep 8", passkey: 8290, password: 7650 },
  { week: "Sep 15", passkey: 9730, password: 6920 },
  { week: "Sep 22", passkey: 11240, password: 6010 },
  { week: "Sep 29", passkey: 12480, password: 5380 },
  { week: "Oct 6", passkey: 13910, password: 4710 },
];

const config = {
  passkey: { label: "Passkey" },
  password: { label: "Password" },
} satisfies ChartConfig;

const compact = new Intl.NumberFormat("en-IN", { notation: "compact" });

/**
 * A complete chart from data and keys: grid, axis, tooltip, and a legend once there are two or
 * more series. `BarChart` and `LineChart` take the same props. `valueFormatter` formats the
 * tooltip and the value axis.
 *
 * @layout wide
 */
export default function ChartPresetsDefault() {
  return (
    <AreaChart
      data={data}
      config={config}
      categoryKey="week"
      dataKeys={["passkey", "password"]}
      showYAxis
      valueFormatter={(value) => compact.format(value)}
      className="aspect-auto h-72"
      accessibleTitle="Weekly sign-ins by method, 18 August to 6 October 2026"
      accessibleSummary="Passkey sign-ins overtook password sign-ins in the week of 8 September."
    />
  );
}
