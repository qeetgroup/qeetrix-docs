"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartDataTable,
  ChartTooltip,
  ChartTooltipContent,
} from "@qeetrix/ui";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const data = [
  { day: "Mon", p95: 182 },
  { day: "Tue", p95: 176 },
  { day: "Wed", p95: 241 },
  { day: "Thu", p95: 198 },
  { day: "Fri", p95: 169 },
  { day: "Sat", p95: 151 },
  { day: "Sun", p95: 148 },
];

const config = {
  p95: { label: "p95 latency (ms)" },
} satisfies ChartConfig;

/**
 * `accessibilityTable` takes a native table of the plotted data, usually a `ChartDataTable`. It
 * is screen-reader-only by default; `accessibilityTableVisibility="visible"` shows it below the
 * plot.
 *
 * @layout wide
 */
export default function ChartDataTableExample() {
  return (
    <ChartContainer
      config={config}
      className="aspect-auto h-56"
      accessibleTitle="Token endpoint p95 latency, last 7 days"
      accessibleSummary="Latency peaked at 241 ms on Wednesday and fell to 148 ms by Sunday."
      accessibilityTableVisibility="visible"
      accessibilityTable={
        <ChartDataTable
          caption="p95 latency of /oauth/token by day"
          data={data}
          columns={[
            { key: "day", header: "Day" },
            {
              key: "p95",
              header: "p95 latency",
              format: (value) => `${value} ms`,
            },
          ]}
        />
      }
    >
      <LineChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          padding={{ left: 16, right: 16 }}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Line
          dataKey="p95"
          type="monotone"
          stroke="var(--color-p95)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
