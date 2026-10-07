import { ShieldCheckIcon } from "@qeetrix/icons";
import { Icon } from "@qeetrix/ui";

const sizes = [
  { size: "xs", px: 14 },
  { size: "sm", px: 16 },
  { size: "md", px: 20 },
  { size: "lg", px: 24 },
] as const;

/**
 * Puts any `@qeetrix/icons` icon on the Qeetrix size and stroke scale. `size` takes a token
 * (`md`, 20px, by default) or a pixel number; the icon is decorative unless given a `title`.
 */
export default function IconDefault() {
  return (
    <div className="flex items-end gap-8">
      {sizes.map(({ size, px }) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon icon={ShieldCheckIcon} size={size} />
          <span className="text-caption text-muted-foreground">
            {size} · {px}px
          </span>
        </div>
      ))}
    </div>
  );
}
