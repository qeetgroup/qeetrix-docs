"use client";

import { Field, FieldControl, FieldLabel, MentionInput } from "@qeetrix/ui";
import { useState } from "react";

const people = [
  { id: "aarav", label: "Aarav Mehta" },
  { id: "diya", label: "Diya Sharma" },
  { id: "kabir", label: "Kabir Rao" },
  { id: "meera", label: "Meera Iyer" },
];

/** Type `@` to mention someone; arrow keys and Enter pick from the suggestions. */
export default function MentionInputDefault() {
  const [value, setValue] = useState(
    "Looks good — @Diya Sharma can you approve the refund?",
  );
  return (
    <Field className="w-full max-w-md">
      <FieldLabel>Comment</FieldLabel>
      <FieldControl
        render={
          <MentionInput
            value={value}
            onValueChange={setValue}
            people={people}
            rows={3}
          />
        }
      />
    </Field>
  );
}
