"use client";

import { Field, FieldControl, FieldLabel, Highlight, Input } from "@qeetrix/ui";
import { useState } from "react";

const settings = [
  { title: "Passkeys", section: "Security" },
  { title: "Password policy", section: "Security" },
  { title: "Session timeout", section: "Security" },
  { title: "Single sign-on (SAML)", section: "Authentication" },
  { title: "Bypass codes for passwordless sign-in", section: "Authentication" },
  { title: "Directory sync", section: "Users" },
];

/**
 * Wraps each match in `<mark>`, case-insensitively by default. The match is set in medium
 * weight as well as tinted, and the tint adds no width, so results don't shift as you type.
 */
export default function HighlightDefault() {
  const [query, setQuery] = useState("pass");
  const results = settings.filter((item) =>
    item.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="flex w-80 flex-col gap-3">
      <Field>
        <FieldLabel>Search settings</FieldLabel>
        <FieldControl
          render={
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          }
        />
      </Field>
      <ul className="divide-y divide-border rounded-lg border border-border bg-card">
        {results.map((item) => (
          <li key={item.title} className="flex flex-col px-3 py-2">
            <Highlight query={query} className="text-label">
              {item.title}
            </Highlight>
            <span className="text-caption text-muted-foreground">
              {item.section}
            </span>
          </li>
        ))}
        {results.length === 0 ? (
          <li className="px-3 py-2 text-label text-muted-foreground">
            No settings match “{query}”.
          </li>
        ) : null}
      </ul>
    </div>
  );
}
