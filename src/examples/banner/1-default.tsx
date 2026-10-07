import { Banner } from "@qeetrix/ui";

const totals = [
  { label: "Collected", value: "₹12,48,300" },
  { label: "Pending", value: "₹1,92,000" },
  { label: "Refunded", value: "₹18,450" },
];

/**
 * A full-width bar across the top of the app for notices that last days, like maintenance or
 * plan limits. Links inside are underlined for you. Give it an `aria-label` so screen-reader
 * users can find the region.
 *
 * @layout wide
 */
export default function BannerDefault() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background">
      <Banner variant="info" aria-label="Scheduled maintenance">
        <span>
          Qeet Pay is read-only on Sun 12 Oct, 02:00–03:00 IST for maintenance.{" "}
          <a href="#status">View status</a>
        </span>
      </Banner>
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-label font-medium">Payments</span>
        <span className="text-caption text-muted-foreground">
          Northwind Retail · October
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3 p-4">
        {totals.map((total) => (
          <div
            key={total.label}
            className="rounded-lg border border-border bg-card px-3 py-2.5"
          >
            <div className="text-caption text-muted-foreground">
              {total.label}
            </div>
            <div className="font-medium tabular-nums">{total.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
