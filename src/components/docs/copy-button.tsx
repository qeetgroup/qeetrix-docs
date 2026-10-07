"use client";

import { CheckIcon, CopyIcon } from "@qeetrix/icons";
// @qeetrix/ui's cn knows the type-role sizes (text-label, text-body, …); the plain one drops them.
import { cn } from "@qeetrix/ui";
import { useEffect, useRef, useState } from "react";

/** Copies text, and reports `true` for a moment afterwards. */
export function useCopy(timeout = 1600) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), timeout);
  };
  return [copied, copy] as const;
}

/**
 * A copy button: an icon that turns into a check, with an optional visible label ("Copy" →
 * "Copied"). `value` is the text, or a function that reads it when clicked.
 */
export function CopyButton({
  value,
  label = "Copy",
  showLabel = false,
  className,
}: {
  value: string | (() => string);
  label?: string;
  showLabel?: boolean;
  className?: string;
}) {
  const [copied, copy] = useCopy();
  return (
    <button
      type="button"
      onClick={() => copy(typeof value === "function" ? value() : value)}
      aria-label={showLabel ? undefined : copied ? "Copied" : label}
      data-copied={copied || undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md text-muted-foreground transition-colors duration-fast hover:bg-surface-interactive hover:text-foreground focus-visible:focus-ring data-copied:text-success-text",
        showLabel ? "h-7 px-2 text-caption font-medium" : "size-7",
        className,
      )}
    >
      {copied ? (
        <CheckIcon className="size-3.5" aria-hidden />
      ) : (
        <CopyIcon className="size-3.5" aria-hidden />
      )}
      {showLabel ? (
        <span aria-live="polite">{copied ? "Copied" : label}</span>
      ) : (
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied" : ""}
        </span>
      )}
    </button>
  );
}
