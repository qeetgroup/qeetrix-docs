import {
  BellIcon,
  FingerprintPatternIcon,
  ScrollTextIcon,
  UsersIcon,
  WalletIcon,
} from "@qeetrix/icons";
import { AspectRatio } from "@qeetrix/ui";

const apps = [
  {
    id: "id",
    name: "Qeet ID",
    detail: "Identity & access",
    icon: FingerprintPatternIcon,
  },
  {
    id: "pay",
    name: "Qeet Pay",
    detail: "Payments & GST invoicing",
    icon: WalletIcon,
  },
  {
    id: "people",
    name: "Qeet People",
    detail: "HR & payroll",
    icon: UsersIcon,
  },
  {
    id: "notify",
    name: "Qeet Notify",
    detail: "Email, SMS, push",
    icon: BellIcon,
  },
  {
    id: "logs",
    name: "Qeet Logs",
    detail: "Logs, metrics & traces",
    icon: ScrollTextIcon,
  },
];

/**
 * Without `ratio` the box is square (the default is `1`), so a grid of tiles stays even however
 * long each caption is.
 */
export default function AspectRatioSquare() {
  return (
    <ul className="grid w-md grid-cols-3 gap-3">
      {apps.map((app) => (
        <li key={app.id}>
          <AspectRatio className="flex flex-col justify-end gap-0.5 rounded-lg border border-border bg-surface-subtle p-3">
            <app.icon
              aria-hidden
              className="mb-auto size-5 text-muted-foreground"
            />
            <span className="text-sm font-medium">{app.name}</span>
            <span className="text-caption text-muted-foreground">
              {app.detail}
            </span>
          </AspectRatio>
        </li>
      ))}
    </ul>
  );
}
