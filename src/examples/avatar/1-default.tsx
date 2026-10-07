import { Avatar, AvatarFallback } from "@qeetrix/ui";

const sizes = ["xs", "sm", "default", "lg", "xl"] as const;

/**
 * Give the avatar a `name` and the fallback shows the initials, announced as the name; without
 * one it shows a neutral person icon. Sizes are fixed steps from `xs` (20px) to `xl` (48px), and
 * `shape="square"` marks an organisation or app rather than a person.
 */
export default function AvatarDefault() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Avatar key={size} size={size} name="Diya Sharma">
          <AvatarFallback />
        </Avatar>
      ))}
      <Avatar size="xl">
        <AvatarFallback />
      </Avatar>
      <Avatar size="xl" shape="square" name="Northwind Retail">
        <AvatarFallback />
      </Avatar>
    </div>
  );
}
