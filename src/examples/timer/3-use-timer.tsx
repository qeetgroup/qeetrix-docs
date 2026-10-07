"use client";

import { Button, useTimer } from "@qeetrix/ui";

/** `useTimer` is the logic without the readout — here, a "Resend code" button that waits out its cooldown. */
export default function TimerUseTimer() {
  const { remaining, status, reset, start } = useTimer({
    mode: "countdown",
    initialSeconds: 45,
    autoStart: true,
  });
  const waiting = status !== "completed";
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <p className="text-label text-muted-foreground">
        We sent a code to +91 98••• ••210.
      </p>
      <Button
        variant="outline"
        disabled={waiting}
        onClick={() => {
          reset();
          start();
        }}
      >
        {waiting ? `Resend code in ${remaining}s` : "Resend code"}
      </Button>
    </div>
  );
}
