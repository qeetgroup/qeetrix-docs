import { Separator } from "@qeetrix/ui";

/**
 * `orientation="vertical"` stretches to the height of a flex row, here between a tenant's
 * metadata. Inside a block or grid parent, give it a height (`h-4`) yourself.
 */
export default function SeparatorVertical() {
  return (
    <div className="flex h-5 items-center gap-3 text-sm">
      <span className="font-medium">Northwind Retail</span>
      <Separator orientation="vertical" />
      <span className="text-muted-foreground">Enterprise</span>
      <Separator orientation="vertical" />
      <span className="font-mono text-caption text-muted-foreground">
        ap-south-1
      </span>
    </div>
  );
}
