"use client";

import { ChevronDownIcon } from "@qeetrix/icons";
// @qeetrix/ui's cn knows the type-role sizes (text-label, text-body, …); the plain one drops them.
import { cn } from "@qeetrix/ui";
import { type ReactNode, useId, useState } from "react";

/**
 * The client half of <ComponentPreview />: the canvas above, the example's code below. Long code
 * starts folded to a few lines under a fade, with a button to unfold it; short code shows whole.
 */
export function PreviewFrame({
  preview,
  code,
  toolbar,
  foldable,
  wide,
}: {
  preview: ReactNode;
  code: ReactNode;
  toolbar?: ReactNode;
  foldable: boolean;
  wide: boolean;
}) {
  const [open, setOpen] = useState(!foldable);
  const codeId = useId();
  return (
    <div
      data-preview=""
      className="not-prose my-6 overflow-hidden rounded-xl border border-border-subtle bg-card shadow-xs dark:border-border"
    >
      <div className="preview-canvas relative">
        {toolbar ? (
          <div className="absolute end-2.5 top-2.5 z-10 flex items-center gap-1">
            {toolbar}
          </div>
        ) : null}
        <div
          className={cn(
            "flex min-h-56 w-full justify-center overflow-x-auto px-6 py-12 *:max-w-full md:px-10",
            wide ? "flex-col" : "items-center",
          )}
        >
          {preview}
        </div>
      </div>
      <div
        id={codeId}
        data-folded={!open || undefined}
        className="preview-code relative border-t border-border-subtle"
      >
        {code}
        {foldable ? (
          <div
            className={cn(
              "flex justify-center",
              open
                ? "border-t border-border-subtle bg-surface-subtle py-1.5"
                : "absolute inset-x-0 bottom-0 bg-linear-to-t from-surface-subtle via-surface-subtle/90 to-transparent pt-14 pb-3",
            )}
          >
            <button
              type="button"
              aria-expanded={open}
              aria-controls={codeId}
              onClick={() => setOpen(!open)}
              className="inline-flex h-7 items-center gap-1.5 rounded-full border border-border-subtle bg-card px-3 text-caption font-medium text-foreground shadow-xs transition-colors duration-fast hover:bg-surface-interactive focus-visible:focus-ring"
            >
              {open ? "Collapse code" : "Expand code"}
              <ChevronDownIcon
                aria-hidden
                className={cn(
                  "size-3.5 transition-transform duration-fast",
                  open && "rotate-180",
                )}
              />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
