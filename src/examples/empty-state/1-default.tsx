import { ReceiptIcon } from "@qeetrix/icons";
import { EmptyState } from "@qeetrix/ui";

/**
 * Icon, title and description for an empty collection, on a neutral tile. `icon` takes the icon
 * component itself (`icon={ReceiptIcon}`), not an element.
 */
export default function EmptyStateDefault() {
  return (
    <div className="w-full max-w-md rounded-lg border border-border bg-card">
      <EmptyState
        icon={ReceiptIcon}
        title="No invoices yet"
        description="Invoices you send from Qeet Pay appear here, with their GST breakdown and payment status."
      />
    </div>
  );
}
