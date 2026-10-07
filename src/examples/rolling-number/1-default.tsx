"use client";

import { PlusIcon } from "@qeetrix/icons";
import { Button, RollingNumber } from "@qeetrix/ui";
import { useState } from "react";

const payments = [2926.4, 18450, 749, 12999, 5200.5];

/**
 * Counts up or down to each new `value` instead of jumping. Screen readers hear only the final
 * value, once per change; under reduced motion it jumps straight there; and a change mid-count
 * continues from the number on screen.
 */
export default function RollingNumberDefault() {
  const [total, setTotal] = useState(482300);
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <div className="text-caption text-muted-foreground">Settled today</div>
        <div className="font-heading text-3xl font-semibold">
          ₹<RollingNumber value={total} decimals={2} locale="en-IN" />
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setTotal((current) => current + payments[count % payments.length]);
          setCount(count + 1);
        }}
      >
        <PlusIcon data-icon="inline-start" aria-hidden />
        Capture a payment
      </Button>
    </div>
  );
}
