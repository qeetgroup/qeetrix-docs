import { Skeleton } from "@qeetrix/ui";

const rows = ["r1", "r2", "r3", "r4"];

/**
 * Shape the placeholders like the content they stand in for, so nothing shifts when it arrives.
 * Here the heading is already real and only the rows are loading.
 */
export default function SkeletonList() {
  return (
    <div className="w-full max-w-md rounded-lg border border-border bg-card">
      <div className="border-b border-border px-4 py-3 text-label font-medium">
        Recent payments
      </div>
      <ul aria-busy="true" className="divide-y divide-border">
        {rows.map((row) => (
          <li key={row} className="flex items-center gap-3 px-4 py-3">
            <Skeleton className="size-8 rounded-md" />
            <div className="flex flex-1 flex-col gap-1.5">
              <Skeleton className="h-3.5 w-36" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-3.5 w-16" />
          </li>
        ))}
      </ul>
    </div>
  );
}
