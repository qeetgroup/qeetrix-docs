"use client";

import { CurrencyInput, Field, FieldLabel } from "@qeetrix/ui";
import { useState } from "react";

/** The same control in other currencies and locales — note the German decimal comma. */
export default function CurrencyInputLocales() {
  const [usd, setUsd] = useState<number | undefined>(4999.5);
  const [eur, setEur] = useState<number | undefined>(4999.5);
  return (
    <div className="flex flex-wrap gap-4">
      <Field className="w-56">
        <FieldLabel>Price (USD)</FieldLabel>
        <CurrencyInput
          currency="USD"
          locale="en-US"
          value={usd}
          onValueChange={setUsd}
        />
      </Field>
      <Field className="w-56">
        <FieldLabel>Price (EUR)</FieldLabel>
        <CurrencyInput
          currency="EUR"
          locale="de-DE"
          value={eur}
          onValueChange={setEur}
        />
      </Field>
    </div>
  );
}
