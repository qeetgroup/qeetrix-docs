import { Blockquote } from "@qeetrix/ui";

/** `sm` for side panels and cards, `md` (the default) in body copy, `lg` for a feature quote. */
export default function BlockquoteSizes() {
  return (
    <div className="flex max-w-lg flex-col gap-8">
      <Blockquote size="sm" attribution="Kabir Rao, Payroll lead">
        Salary runs reconcile with the bank file before anyone has to ask.
      </Blockquote>
      <Blockquote size="lg" attribution="Diya Sharma, CFO, Northwind Retail">
        GST invoices go out the moment a payment settles. Month-end close takes
        two days now, not eight.
      </Blockquote>
    </div>
  );
}
