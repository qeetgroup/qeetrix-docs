import { CircleCheckIcon, CircleXIcon } from "@qeetrix/icons";
import { Icon } from "@qeetrix/ui";

const members = [
  { name: "Aarav Mehta", mfa: true },
  { name: "Diya Sharma", mfa: true },
  { name: "Rohan Gupta", mfa: false },
];

/**
 * When an icon carries meaning on its own, as in this MFA column, give it a `title`. It then
 * renders with `role="img"` and that name instead of being hidden.
 */
export default function IconAccessibleName() {
  return (
    <ul className="w-64 divide-y divide-border rounded-lg border border-border bg-card text-label">
      {members.map((member) => (
        <li
          key={member.name}
          className="flex items-center justify-between px-4 py-2.5"
        >
          {member.name}
          {member.mfa ? (
            <Icon
              icon={CircleCheckIcon}
              size="sm"
              title="MFA enabled"
              className="text-success-text"
            />
          ) : (
            <Icon
              icon={CircleXIcon}
              size="sm"
              title="MFA not set up"
              className="text-destructive-text"
            />
          )}
        </li>
      ))}
    </ul>
  );
}
