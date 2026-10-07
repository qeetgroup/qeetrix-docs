"use client";

import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
  MaskInput,
} from "@qeetrix/ui";
import { useState } from "react";

/** `onValueChange` gives you the raw characters and the formatted text — here an Indian PAN. */
export default function MaskInputPan() {
  const [raw, setRaw] = useState("");
  return (
    <Field className="w-64">
      <FieldLabel>PAN</FieldLabel>
      <FieldControl
        render={
          <MaskInput
            mask="AAAAA####A"
            onValueChange={(next) => setRaw(next)}
            className="uppercase"
          />
        }
      />
      <FieldDescription>
        Raw value: <code className="font-mono">{raw || "—"}</code>
      </FieldDescription>
    </Field>
  );
}
