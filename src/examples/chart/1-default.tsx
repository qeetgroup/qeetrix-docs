"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@qeetrix/ui";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const data = [
  { month: "May", upi: 18420, cards: 6210 },
  { month: "Jun", upi: 20150, cards: 6480 },
  { month: "Jul", upi: 22890, cards: 6390 },
  { month: "Aug", upi: 24310, cards: 6720 },
  { month: "Sep", upi: 27640, cards: 7050 },
  { month: "Oct", upi: 29980, cards: 7310 },
];

const config = {
  upi: { label: "UPI" },
  cards: { label: "Cards" },
} satisfies ChartConfig;

/**
 * `ChartContainer` themes a Recharts chart you compose yourself. Each `config` entry names a
 * series and, unless it sets a `color`, takes the categorical colour for its position in the
 * config, as `--color-<key>`. The tooltip and legend content read their labels from it too.
 *
 * @layout wide
 */
export default function ChartDefault() {
  return (
    <ChartContainer
      config={config}
      className="aspect-auto h-72"
      accessibleTitle="Successful payments by method, May to October 2026"
      accessibleSummary="UPI payments rose every month, from 18,420 to 29,980; card payments stayed between 6,200 and 7,300."
    >
      <BarChart data={data} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} itemSorter={null} />
        <Bar
          dataKey="upi"
          fill="var(--color-upi)"
          radius={[4, 4, 0, 0]}
          maxBarSize={24}
        />
        <Bar
          dataKey="cards"
          fill="var(--color-cards)"
          radius={[4, 4, 0, 0]}
          maxBarSize={24}
        />
      </BarChart>
    </ChartContainer>
  );
}
