"use client";

import { Button, Chip } from "@qeetrix/ui";
import { useState } from "react";

const initial = ["Bengaluru", "Mumbai", "Pune", "Hyderabad"];

/**
 * `onRemove` adds a × button for applied values such as these office locations. Its accessible
 * name is "Remove" by default; override it per chip through `messages` so each button says what
 * it removes.
 */
export default function ChipRemovable() {
  const [offices, setOffices] = useState(initial);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {offices.map((office) => (
          <Chip
            key={office}
            messages={{ remove: `Remove ${office}` }}
            onRemove={() =>
              setOffices((current) =>
                current.filter((entry) => entry !== office),
              )
            }
          >
            {office}
          </Chip>
        ))}
      </div>
      {offices.length < initial.length ? (
        <Button variant="link" size="sm" onClick={() => setOffices(initial)}>
          Reset
        </Button>
      ) : null}
    </div>
  );
}
