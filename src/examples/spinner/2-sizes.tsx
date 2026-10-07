"use client";

import { Spinner } from "@qeetrix/ui";

/** `sm` (16 px), `default` (20 px), `lg` (24 px) and `xl` (32 px). */
export default function SpinnerSizes() {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  );
}
