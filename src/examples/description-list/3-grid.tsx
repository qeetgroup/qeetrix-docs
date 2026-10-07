import {
  DescriptionDetails,
  DescriptionItem,
  DescriptionList,
  DescriptionTerm,
} from "@qeetrix/ui";

const summary = [
  { term: "Invoice", details: "QP-INV-2026-00412" },
  { term: "Customer", details: "Acme India Pvt Ltd" },
  { term: "Issued", details: "1 Oct 2026" },
  { term: "Due", details: "15 Oct 2026" },
  { term: "GSTIN", details: "29ABCDE1234F1Z5" },
  { term: "Total", details: "₹1,41,600.00" },
];

/**
 * `layout="grid"` flows the pairs into as many columns as fit, for a summary above a record.
 * In a grid each pair must be wrapped in a `DescriptionItem`.
 *
 * @layout wide
 */
export default function DescriptionListGrid() {
  return (
    <DescriptionList layout="grid">
      {summary.map((item) => (
        <DescriptionItem key={item.term}>
          <DescriptionTerm>{item.term}</DescriptionTerm>
          <DescriptionDetails className="font-medium">
            {item.details}
          </DescriptionDetails>
        </DescriptionItem>
      ))}
    </DescriptionList>
  );
}
