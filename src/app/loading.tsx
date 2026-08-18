import { Skeleton } from "@qeetrix/ui";

export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl space-y-4 px-4 py-12 sm:px-6">
      <Skeleton className="h-9 w-56" />
      <Skeleton className="h-4 w-full max-w-lg" />
      <div className="grid gap-4 pt-6 sm:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Skeleton key={n} className="h-24 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
