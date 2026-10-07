"use client";

import { Badge, Button, Portal } from "@qeetrix/ui";
import { useCallback, useState } from "react";

/**
 * `container` renders the children into an element of your choosing instead of `document.body`.
 * The review card is declared in the request panel but lands in the review queue. `container`
 * takes the element itself, so keep it in state with a callback ref rather than in `useRef`.
 */
export default function PortalContainer() {
  const [queue, setQueue] = useState<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(true);
  // Read from the DOM, so the line below reports where the card really is.
  const [cardParent, setCardParent] = useState<string | null>(null);
  const cardRef = useCallback((node: HTMLDivElement | null) => {
    setCardParent(node?.parentElement?.dataset.name ?? null);
  }, []);

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col items-start gap-3 rounded-lg border border-border bg-card p-4">
          <span className="text-caption font-medium text-muted-foreground">
            Request panel · declares the Portal
          </span>
          <p className="text-label">
            Diya Sharma asked for Admin access to Qeet Pay.
          </p>
          <Button variant="secondary" size="sm" onClick={() => setOpen(!open)}>
            {open ? "Withdraw from queue" : "Send to review queue"}
          </Button>
          {queue && open ? (
            <Portal container={queue}>
              <div
                ref={cardRef}
                className="flex flex-col gap-1 rounded-md border border-border bg-card p-3 shadow-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-label font-medium">Diya Sharma</span>
                  <Badge variant="secondary">Admin · Qeet Pay</Badge>
                </div>
                <span className="text-caption text-muted-foreground">
                  Requested 4 minutes ago
                </span>
              </div>
            </Portal>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-dashed border-border-strong bg-surface-subtle p-4">
          <span className="text-caption font-medium text-muted-foreground">
            Review queue · the container
          </span>
          <div
            ref={setQueue}
            data-name="review queue"
            className="flex min-h-16 flex-col gap-2"
          />
        </div>
      </div>

      <p className="text-caption text-muted-foreground">
        {cardParent
          ? `In the DOM, the card is a child of the ${cardParent}.`
          : "The card is not rendered."}
      </p>
    </div>
  );
}
