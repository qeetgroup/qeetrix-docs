import { ArrowRightIcon } from "@qeetrix/icons";
import { Link } from "@qeetrix/ui";

/**
 * A standalone link, underlined on hover, with room for a leading or trailing icon. `variant`
 * switches the colour to the muted or the destructive text role.
 */
export default function LinkDefault() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <Link href="#">
        View audit log
        <ArrowRightIcon aria-hidden className="rtl:rotate-180" />
      </Link>
      <Link href="#" variant="muted">
        Help centre
      </Link>
      <Link href="#" variant="destructive">
        Delete tenant
      </Link>
    </div>
  );
}
