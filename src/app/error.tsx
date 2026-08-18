"use client";

import { Button } from "@qeetrix/ui";
import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Report to your monitoring here (Sentry, etc.). Kept dependency-free.
    if (process.env.NODE_ENV !== "production") console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-32 text-center">
      <p className="font-mono text-sm text-destructive">Something went wrong</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        An unexpected error occurred
      </h1>
      <p className="text-muted-foreground">
        Try again, or head back home. If it persists, please report it.
      </p>
      {error.digest && (
        <code className="font-mono text-xs text-muted-foreground">ref: {error.digest}</code>
      )}
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
