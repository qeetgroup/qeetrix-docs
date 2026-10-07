import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@qeetrix/ui";

const sides = ["top", "bottom", "inline-start", "inline-end"] as const;

/**
 * `side` picks the edge the sheet is attached to. `top`, `right`, `bottom` and `left` are
 * physical; `inline-start` and `inline-end` follow the reading direction, so an `inline-end`
 * panel is on the right in English and on the left in Arabic.
 */
export default function SheetSide() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {sides.map((side) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant="outline" />}>
            {side}
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Audit log filters</SheetTitle>
              <SheetDescription>
                This sheet is attached with side="{side}".
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
