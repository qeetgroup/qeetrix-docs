"use client";

import {
  CurrencyInput,
  Field,
  FieldDescription,
  FieldLabel,
} from "@qeetrix/ui";
import { useState } from "react";

/** The currency symbol and grouping follow `currency` and `locale`; the value you get back is a plain number. */
export default function CurrencyInputDefault() {
  const [amount, setAmount] = useState<number | undefined>(125000);
  return (
    <Field className="w-72">
      <FieldLabel>Invoice amount</FieldLabel>
      <CurrencyInput
        currency="INR"
        locale="en-IN"
        value={amount}
        onValueChange={setAmount}
      />
      <FieldDescription>
        Value: <code className="font-mono">{amount ?? "—"}</code>
      </FieldDescription>
    </Field>
  );
}
