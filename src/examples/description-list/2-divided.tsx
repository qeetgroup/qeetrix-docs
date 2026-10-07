import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@qeetrix/ui";

/**
 * `divided` rules a hairline between pairs, for longer lists where the rows need help to scan.
 *
 * @layout wide
 */
export default function DescriptionListDivided() {
  return (
    <DescriptionList divided className="max-w-xl">
      <DescriptionTerm>Account holder</DescriptionTerm>
      <DescriptionDetails>Northwind Retail Pvt Ltd</DescriptionDetails>
      <DescriptionTerm>Bank</DescriptionTerm>
      <DescriptionDetails>HDFC Bank, Koramangala</DescriptionDetails>
      <DescriptionTerm>Account number</DescriptionTerm>
      <DescriptionDetails className="font-mono">
        •••• •••• 4821
      </DescriptionDetails>
      <DescriptionTerm>IFSC</DescriptionTerm>
      <DescriptionDetails className="font-mono">HDFC0001234</DescriptionDetails>
      <DescriptionTerm>Payout schedule</DescriptionTerm>
      <DescriptionDetails>Daily, T+1 at 11:00 IST</DescriptionDetails>
    </DescriptionList>
  );
}
