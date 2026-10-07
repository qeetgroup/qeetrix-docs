"use client";

import {
  Field,
  FieldControl,
  FieldLabel,
  PasswordInput,
  PasswordStrengthMeter,
} from "@qeetrix/ui";
import { useState } from "react";

/** Scores the password as it is typed and says how strong it is — not only in colour. */
export default function PasswordStrengthMeterDefault() {
  const [password, setPassword] = useState("qeet2026");
  return (
    <Field className="w-72">
      <FieldLabel>New password</FieldLabel>
      <FieldControl
        render={
          <PasswordInput
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        }
      />
      <PasswordStrengthMeter value={password} />
    </Field>
  );
}
