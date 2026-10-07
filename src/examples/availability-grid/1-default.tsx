"use client";

import { AvailabilityGrid } from "@qeetrix/ui";
import { useState } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const times = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

/**
 * A week of time slots to mark yourself free in. Slots are keyed `"<day>:<time>"` by index;
 * `unavailable` ones are already booked. The grid is a single tab stop — the arrow keys move
 * between slots.
 *
 * @layout wide
 */
export default function AvailabilityGridDefault() {
  const [slots, setSlots] = useState(["0:0", "0:1", "2:4", "2:5", "2:6"]);
  return (
    <div className="flex flex-col gap-2">
      <span id="interview-slots" className="text-label font-medium">
        When can you interview?{" "}
        <span className="text-muted-foreground">({slots.length} slots)</span>
      </span>
      <AvailabilityGrid
        aria-labelledby="interview-slots"
        days={days}
        times={times}
        value={slots}
        onValueChange={setSlots}
        unavailable={["1:2", "1:3", "3:0", "4:7"]}
      />
    </div>
  );
}
