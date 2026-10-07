"use client";

import { DateRangePicker, Field, FieldLabel } from "@qeetrix/ui";

/** `DateRangePicker` picks a start and end over two months; `min` stops it reaching into the past. */
export default function DatePickerRange() {
  return (
    <Field className="w-80">
      <FieldLabel>Leave dates</FieldLabel>
      <DateRangePicker
        placeholder="Select dates"
        numberOfMonths={2}
        min={new Date()}
        clearable
      />
    </Field>
  );
}
