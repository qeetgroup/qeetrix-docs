import { Highlight } from "@qeetrix/ui";

const results = [
  "Payroll run for October is ready to approve",
  "Pay slips were sent to 214 employees",
  "Qeet Pay settled ₹4,82,300 to HDFC Bank",
];

/**
 * `query` also takes several terms. They are matched longest first, so `["pay", "payroll"]`
 * marks all of "Payroll" rather than stopping at "Pay".
 */
export default function HighlightMultipleTerms() {
  return (
    <ul className="flex max-w-md flex-col gap-2 text-label">
      {results.map((result) => (
        <li key={result}>
          <Highlight query={["pay", "payroll"]}>{result}</Highlight>
        </li>
      ))}
    </ul>
  );
}
