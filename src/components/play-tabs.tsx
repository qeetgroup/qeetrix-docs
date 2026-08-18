"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Playground } from "@/components/playground";

// Sandpack is heavy — load the live sandbox only when its tab is opened.
const Sandbox = dynamic(() => import("@/components/sandbox").then((m) => m.Sandbox), {
  ssr: false,
  loading: () => <p className="text-sm text-muted-foreground">Loading sandbox…</p>,
});

type Tab = "controls" | "sandbox";

export function PlayTabs() {
  const [tab, setTab] = useState<Tab>("controls");
  const tabClass = (t: Tab) =>
    `rounded-lg border px-3 py-1.5 text-sm transition-colors ${
      tab === t
        ? "border-brand bg-brand/10 text-brand-text"
        : "border-border text-muted-foreground hover:text-foreground"
    }`;

  return (
    <div>
      <div role="tablist" aria-label="Playground mode" className="mb-6 flex gap-1.5">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "controls"}
          onClick={() => setTab("controls")}
          className={tabClass("controls")}
        >
          Controls
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "sandbox"}
          onClick={() => setTab("sandbox")}
          className={tabClass("sandbox")}
        >
          Live sandbox
        </button>
      </div>
      {tab === "controls" ? <Playground /> : <Sandbox />}
    </div>
  );
}
