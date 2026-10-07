import {
  Avatar,
  AvatarFallback,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Link,
} from "@qeetrix/ui";

/**
 * Hovering or focusing the link shows who is behind it. Hover cards don't open on touch, so they
 * only add detail: anything a user needs in order to act belongs on the page or in a Popover.
 */
export default function HoverCardDefault() {
  return (
    <p className="max-w-sm text-sm text-muted-foreground">
      Access to the payouts workspace was approved by{" "}
      <HoverCard>
        <HoverCardTrigger render={<Link inline href="#diya-sharma" />}>
          Diya Sharma
        </HoverCardTrigger>
        <HoverCardContent className="flex w-72 gap-3">
          <Avatar size="lg">
            <AvatarFallback aria-hidden>DS</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="font-medium text-foreground">Diya Sharma</p>
            <p className="text-caption text-muted-foreground">
              Finance admin · Northwind Retail
            </p>
            <p className="text-caption text-muted-foreground">
              diya@northwind.in
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>{" "}
      on 4 October.
    </p>
  );
}
