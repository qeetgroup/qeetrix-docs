"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type { TokenLeaf } from "@/lib/tokens";
import { isColorLike } from "@/lib/tokens";

function Preview({ t }: { t: TokenLeaf }) {
  const cat = t.category;
  if (cat === "color" || isColorLike(t.light)) {
    return (
      <div className="flex overflow-hidden rounded-md border border-border">
        <span className="size-9" style={{ background: t.light }} title={`light: ${t.light}`} />
        <span className="size-9" style={{ background: t.dark }} title={`dark: ${t.dark}`} />
      </div>
    );
  }
  if (cat === "gradient") {
    return (
      <span
        className="block h-9 w-20 rounded-md border border-border"
        style={{ background: t.light }}
      />
    );
  }
  if (cat === "shadow") {
    return <span className="block size-9 rounded-md bg-card" style={{ boxShadow: t.light }} />;
  }
  if (cat === "radii") {
    return (
      <span
        className="block size-9 border-2 border-brand bg-brand/10"
        style={{ borderRadius: t.light }}
      />
    );
  }
  if (cat === "space" || (cat === "icon" && t.name.startsWith("size"))) {
    return (
      <span className="flex h-9 w-24 items-center">
        <span className="h-3 rounded-sm bg-brand" style={{ width: `min(${t.light}, 100%)` }} />
      </span>
    );
  }
  if (cat === "font" && t.name.startsWith("size")) {
    return (
      <span className="w-24 truncate" style={{ fontSize: `min(${t.light}, 28px)` }}>
        Ag
      </span>
    );
  }
  if (cat === "font" && t.name.startsWith("weight")) {
    return (
      <span className="w-24" style={{ fontWeight: Number(t.light) || undefined }}>
        Ag
      </span>
    );
  }
  if (cat === "font" && t.name.startsWith("family")) {
    return (
      <span className="w-24 truncate text-sm" style={{ fontFamily: t.light }}>
        Ag 123
      </span>
    );
  }
  return <span className="inline-block h-9 w-9" aria-hidden />;
}

export function TokenTable({ tokens }: { tokens: TokenLeaf[] }) {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (leaf: TokenLeaf) => {
    void navigator.clipboard.writeText(`var(${leaf.varName})`);
    setCopied(leaf.path);
    setTimeout(() => setCopied((c) => (c === leaf.path ? null : c)), 1500);
  };
  return (
    <div className="divide-y divide-border rounded-xl border border-border">
      {tokens.map((t) => (
        <div key={t.path} className="flex items-center gap-4 p-3">
          <Preview t={t} />
          <div className="min-w-0 flex-1">
            <button
              type="button"
              onClick={() => copy(t)}
              className="group flex items-center gap-1.5 font-mono text-sm text-foreground hover:text-brand-text"
              aria-label={`Copy var(${t.varName})`}
            >
              {t.varName}
              {copied === t.path ? (
                <Check className="size-3.5 text-brand" />
              ) : (
                <Copy className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              )}
            </button>
            <p className="truncate font-mono text-xs text-muted-foreground">
              {t.light}
              {t.dark !== t.light && <span className="ml-2 opacity-70">dark: {t.dark}</span>}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
