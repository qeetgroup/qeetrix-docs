import { Sparkline, Stat } from "@qeetrix/ui";

/**
 * `children` is the tile's footer, for a `Sparkline` or a link. `size` is `sm`, `default` or
 * `lg`, and `loading` keeps the label while the value and hint become placeholders.
 *
 * @layout wide
 */
export default function StatWithSparkline() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
      <Stat
        size="sm"
        label="UPI payments"
        value="29,980"
        delta="+8.5%"
        trend="up"
      >
        <Sparkline
          data={[18, 20, 23, 24, 26, 27, 29, 30]}
          type="area"
          tone="positive"
          label="UPI payments, last 8 weeks, rising"
        />
      </Stat>
      <Stat
        size="sm"
        label="Card payments"
        value="7,310"
        delta="+3.7%"
        trend="up"
      >
        <Sparkline
          data={[62, 65, 64, 67, 66, 70, 71, 73]}
          type="area"
          tone="positive"
          label="Card payments, last 8 weeks, rising"
        />
      </Stat>
      <Stat size="sm" label="Refunds" value="—" hint="Last 8 weeks" loading />
    </div>
  );
}
