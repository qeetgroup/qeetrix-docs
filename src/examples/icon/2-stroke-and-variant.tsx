import { BellIcon, StarIcon } from "@qeetrix/icons";
import { Icon } from "@qeetrix/ui";

/**
 * `stroke` is `regular` (2) or `thin` (1.5), `shape="sharp"` squares off caps and corners, and
 * `variant="filled"` picks the filled drawing — typed, so it only compiles for icons that have
 * one.
 */
export default function IconStrokeAndVariant() {
  return (
    <div className="grid grid-cols-4 gap-8 text-center">
      {[
        { label: "Regular", node: <Icon icon={BellIcon} size="lg" /> },
        {
          label: "Thin",
          node: <Icon icon={BellIcon} size="lg" stroke="thin" />,
        },
        {
          label: "Sharp",
          node: <Icon icon={BellIcon} size="lg" shape="sharp" />,
        },
        {
          label: "Filled",
          node: (
            <Icon
              icon={StarIcon}
              size="lg"
              variant="filled"
              className="text-warning"
            />
          ),
        },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-2">
          {item.node}
          <span className="text-caption text-muted-foreground">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
