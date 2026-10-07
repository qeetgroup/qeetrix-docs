import { Spoiler } from "@qeetrix/ui";

/**
 * `maxLines` sets how much shows before the clamp, and `showLabel` / `hideLabel` replace the
 * default "Show more" and "Show less".
 */
export default function SpoilerCustomLabels() {
  return (
    <div className="w-md text-sm">
      <Spoiler
        maxLines={2}
        showLabel="Read full notice"
        hideLabel="Collapse notice"
      >
        Under the Digital Personal Data Protection Act, 2023, Northwind Retail
        is the data fiduciary for the details you share in Qeet People: your
        name, contact details, bank account for salary credit and PAN for TDS.
        We process them only to run payroll and meet statutory filings, keep
        them for eight years after you leave, and you can ask the grievance
        officer at privacy@northwind.in to correct them at any time.
      </Spoiler>
    </div>
  );
}
