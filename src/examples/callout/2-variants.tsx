import { Callout } from "@qeetrix/ui";

/**
 * `variant` sets the accent, the default icon and the title colour. `muted` is a neutral note
 * with a graphite accent; `title` is optional.
 */
export default function CalloutVariants() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Callout variant="success" title="Ready for payroll">
        All 128 employees have a verified PAN and bank account.
      </Callout>
      <Callout variant="warning" title="Changing the PF wage ceiling">
        Applies from the next payroll run. Runs already approved are not
        recalculated.
      </Callout>
      <Callout variant="destructive" title="Deleting a tenant is permanent">
        Users, audit logs and invoices are erased after 30 days and cannot be
        restored.
      </Callout>
      <Callout variant="muted">
        Times are shown in India Standard Time (UTC+05:30).
      </Callout>
    </div>
  );
}
