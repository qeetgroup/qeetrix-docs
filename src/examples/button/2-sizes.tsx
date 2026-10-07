import { RefreshCwIcon } from "@qeetrix/icons";
import { Button } from "@qeetrix/ui";

/** Four text sizes, and icon-only sizes that need an `aria-label`. */
export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" variant="outline" aria-label="Refresh">
        <RefreshCwIcon aria-hidden />
      </Button>
    </div>
  );
}
