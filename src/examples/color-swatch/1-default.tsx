"use client";

import { ColorSwatch, ColorSwatchGroup } from "@qeetrix/ui";
import { useState } from "react";

const labels = [
  { color: "#E03131", label: "Red" },
  { color: "#F08C00", label: "Amber" },
  { color: "#2F9E44", label: "Green" },
  { color: "#1971C2", label: "Blue" },
  { color: "#7048E8", label: "Violet" },
  { color: "#868E96", label: "Grey" },
];

/** With `onClick` a swatch becomes a button; `selected` marks the current one. Each needs a `label`. */
export default function ColorSwatchDefault() {
  const [selected, setSelected] = useState("#1971C2");
  return (
    <ColorSwatchGroup aria-label="Label colour" className="flex gap-2">
      {labels.map((entry) => (
        <ColorSwatch
          key={entry.color}
          color={entry.color}
          label={entry.label}
          selected={selected === entry.color}
          onClick={() => setSelected(entry.color)}
        />
      ))}
    </ColorSwatchGroup>
  );
}
