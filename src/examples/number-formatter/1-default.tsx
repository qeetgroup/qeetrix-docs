import { NumberFormatter } from "@qeetrix/ui";

const inr = { style: "currency", currency: "INR" } as const;

/**
 * A display-only wrapper over `Intl.NumberFormat`. Pass a `locale` (`en-IN` groups by lakh and
 * crore) and any other format option through `options`; `decimals` fixes the fraction digits.
 * Tabular numerals keep a column of figures aligned.
 */
export default function NumberFormatterDefault() {
  return (
    <dl className="grid w-72 grid-cols-[1fr_auto] gap-x-6 gap-y-2 text-label">
      <dt className="text-muted-foreground">Gross volume</dt>
      <dd className="text-end font-medium">
        <NumberFormatter value={12450000} locale="en-IN" options={inr} />
      </dd>
      <dt className="text-muted-foreground">Refunds</dt>
      <dd className="text-end font-medium">
        <NumberFormatter value={-184250.5} locale="en-IN" options={inr} />
      </dd>
      <dt className="text-muted-foreground">Payments</dt>
      <dd className="text-end font-medium">
        <NumberFormatter value={48210} locale="en-IN" />
      </dd>
      <dt className="text-muted-foreground">Success rate</dt>
      <dd className="text-end font-medium">
        <NumberFormatter
          value={0.9842}
          locale="en-IN"
          decimals={2}
          options={{ style: "percent" }}
        />
      </dd>
    </dl>
  );
}
