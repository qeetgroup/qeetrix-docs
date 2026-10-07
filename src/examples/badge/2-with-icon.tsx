import { CrownIcon, KeyRoundIcon, ShieldCheckIcon } from "@qeetrix/icons";
import { Badge } from "@qeetrix/ui";

/** A leading icon sizes itself to the badge. */
export default function BadgeWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success">
        <ShieldCheckIcon aria-hidden />
        Passkey
      </Badge>
      <Badge variant="secondary">
        <KeyRoundIcon aria-hidden />
        TOTP
      </Badge>
      <Badge variant="outline">
        <CrownIcon aria-hidden />
        Owner
      </Badge>
    </div>
  );
}
