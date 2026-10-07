import { QeetLogo } from "@qeetrix/icons";
import { cn } from "@/lib/cn";

/**
 * The Qeet mark, following the page theme. `@qeetrix/icons` draws one file per background, so
 * both are rendered and the `.dark` class shows the right one — no client JavaScript, no flash.
 */
export function BrandMark({
  height = 20,
  className,
}: {
  height?: number;
  className?: string;
}) {
  return (
    <>
      <QeetLogo height={height} className={cn("dark:hidden", className)} />
      <QeetLogo
        height={height}
        variant="dark"
        className={cn("hidden dark:block", className)}
      />
    </>
  );
}
