"use client";

import { Field, FieldDescription, FieldLabel, TagInput } from "@qeetrix/ui";
import { useState } from "react";

/**
 * Type and press Enter or comma to add a tag; Backspace in the empty field removes the last one.
 * `validate` normalises each tag, or returns `null` to turn it away.
 */
export default function TagInputDefault() {
  const [domains, setDomains] = useState(["northwind.in", "northwind.co"]);
  return (
    <Field className="w-full max-w-md">
      <FieldLabel>Allowed email domains</FieldLabel>
      <TagInput
        value={domains}
        onChange={setDomains}
        maxTags={5}
        // Return the tag to keep (here lower-cased), or null to drop it.
        validate={(tag) => {
          const domain = tag.toLowerCase();
          return /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(domain) ? domain : null;
        }}
        placeholder="Add a domain…"
      />
      <FieldDescription>
        Anyone with an address at these domains can join. Up to 5.
      </FieldDescription>
    </Field>
  );
}
