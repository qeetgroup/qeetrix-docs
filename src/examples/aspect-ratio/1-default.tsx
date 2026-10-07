import { PlayIcon } from "@qeetrix/icons";
import { AspectRatio } from "@qeetrix/ui";

/**
 * A 16:9 video thumbnail that keeps its shape at any width. The child fills the box with
 * `size-full`; for an `<img>` or `<video>` add `object-cover`.
 */
export default function AspectRatioDefault() {
  return (
    <div className="w-96">
      <AspectRatio ratio={16 / 9} className="rounded-lg border border-border">
        <div className="flex size-full flex-col justify-between bg-linear-to-br from-brand-subtle to-surface-sunken p-3">
          <span className="self-start rounded-sm bg-background/80 px-1.5 py-0.5 text-caption font-medium">
            16:9 video thumbnail
          </span>
          <span className="flex size-10 items-center justify-center self-center rounded-full bg-background text-foreground shadow-xs">
            <PlayIcon aria-hidden className="size-4" />
          </span>
          <div className="flex items-end justify-between gap-2 text-sm">
            <span className="font-medium">Set up passkeys in Qeet ID</span>
            <span className="text-caption tabular-nums text-muted-foreground">
              2:14
            </span>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
}
