"use client";

import { type ChartConfig, DonutChart } from "@qeetrix/ui";

const data = [
  { method: "upi", payments: 29980 },
  { method: "cards", payments: 7310 },
  { method: "netbanking", payments: 2140 },
  { method: "wallets", payments: 860 },
];

const config = {
  upi: { label: "UPI" },
  cards: { label: "Cards" },
  netbanking: { label: "Netbanking" },
  wallets: { label: "Wallets" },
} satisfies ChartConfig;

/**
 * `DonutChart` takes a `dataKey` for each slice's value and a `nameKey` whose values match the
 * `config` keys. The hole is half the radius by default; `innerRadius={0}` makes a solid pie.
 */
export default function ChartPresetsDonutChart() {
  return (
    <DonutChart
      data={data}
      config={config}
      dataKey="payments"
      nameKey="method"
      className="size-72"
      accessibleTitle="Successful payments by method, October 2026"
      accessibleSummary="UPI carried three in four payments."
    />
  );
}
