import { PaginationBar } from "@qeetrix/ui/components/pagination-bar";

/**
 * Deprecated since 1.0.0: `PaginationBar` is the old name of Pagination, kept only at this deep
 * import. Import `Pagination` from `@qeetrix/ui` instead and rename `PaginationBarProps` to
 * `PaginationProps`; the props and the rendering are the same.
 *
 * @layout wide
 */
export default function PaginationBarDefault() {
  return (
    <div className="mx-auto w-full max-w-xl overflow-hidden rounded-lg border border-border bg-card">
      <PaginationBar hasNext itemsOnPage={25} total={340} />
    </div>
  );
}
