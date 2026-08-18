"use client";

import { NotFound } from "@qeetrix/ui/blocks";

/** Live previews for self-contained blocks. Others link to source until wired. */
export function BlockPreview({ slug }: { slug: string }) {
  if (slug === "page-state") {
    return (
      <div className="relative h-96 overflow-hidden rounded-xl border border-border bg-background">
        <NotFound />
      </div>
    );
  }
  return null;
}
