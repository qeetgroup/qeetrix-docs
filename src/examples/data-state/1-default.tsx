"use client";

import { BanknoteIcon } from "@qeetrix/icons";
import { DataState, SegmentedControl, SegmentedControlItem } from "@qeetrix/ui";
import { useState } from "react";

const payouts = [
  { id: "po_8f2k", date: "7 Oct", amount: "₹4,82,300" },
  { id: "po_7d1m", date: "6 Oct", amount: "₹3,15,940" },
  { id: "po_6c9p", date: "5 Oct", amount: "₹2,07,615" },
];

type View = "loading" | "error" | "empty" | "data";

/**
 * Pass the loading, error and empty flags from your query; the children render only when all
 * three are false. Without overrides you get skeleton rows, an error state showing the error's
 * `message`, and an empty state built from the `empty*` props. Switch states to compare.
 */
export default function DataStateDefault() {
  const [view, setView] = useState<View>("loading");

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <SegmentedControl
        aria-label="Query state"
        size="sm"
        value={view}
        onValueChange={(value) => setView(value as View)}
        className="self-center"
      >
        <SegmentedControlItem value="loading">Loading</SegmentedControlItem>
        <SegmentedControlItem value="error">Error</SegmentedControlItem>
        <SegmentedControlItem value="empty">Empty</SegmentedControlItem>
        <SegmentedControlItem value="data">Data</SegmentedControlItem>
      </SegmentedControl>
      <div className="min-h-56 rounded-lg border border-border bg-card">
        <DataState
          isLoading={view === "loading"}
          isError={view === "error"}
          error={new Error("Qeet Pay didn't respond. Try again in a moment.")}
          isEmpty={view === "empty"}
          emptyIcon={BanknoteIcon}
          emptyTitle="No payouts yet"
          emptyDescription="Payouts appear here after your first settlement."
          skeletonRows={3}
        >
          <ul className="divide-y divide-border">
            {payouts.map((payout) => (
              <li
                key={payout.id}
                className="flex items-center justify-between gap-4 px-4 py-3 text-label"
              >
                <span>
                  <span className="font-medium">Payout {payout.date}</span>
                  <span className="block font-mono text-caption text-muted-foreground">
                    {payout.id}
                  </span>
                </span>
                <span className="font-medium tabular-nums">
                  {payout.amount}
                </span>
              </li>
            ))}
          </ul>
        </DataState>
      </div>
    </div>
  );
}
