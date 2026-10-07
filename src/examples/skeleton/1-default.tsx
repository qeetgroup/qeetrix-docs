import { Skeleton } from "@qeetrix/ui";

/**
 * Size and shape each block with `className`. A skeleton has no text of its own, so mark the
 * region it stands in for with `aria-busy="true"`, or put a labelled Spinner beside it.
 */
export default function SkeletonDefault() {
  return (
    <div
      aria-busy="true"
      className="flex w-72 items-center gap-3 rounded-lg border border-border bg-card p-4"
    >
      <Skeleton className="size-10 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-44" />
      </div>
    </div>
  );
}
