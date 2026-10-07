import { Button } from "@qeetrix/ui";

/**
 * `loading` shows a spinner, sets `aria-busy` and ignores clicks while keeping focus.
 * `loadingLabel` replaces the label for the duration and holds the button's width.
 */
export default function ButtonLoading() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button loading loadingLabel="Saving…">
        Save changes
      </Button>
      <Button variant="outline" loading>
        Syncing directory
      </Button>
    </div>
  );
}
