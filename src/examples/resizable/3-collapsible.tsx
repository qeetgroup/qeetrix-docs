import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@qeetrix/ui";

const tenants = [
  "Northwind Retail",
  "Acme India",
  "Lotus Foods",
  "Kaveri Textiles",
  "Indus Logistics",
];

/**
 * Three panels and handles without a grip. The tenant list is `collapsible`: drag its divider
 * far enough below `minSize` and it collapses to `collapsedSize`; drag it back out to restore it.
 *
 * @layout wide
 */
export default function ResizableCollapsible() {
  return (
    <div className="h-64 overflow-hidden rounded-lg border border-border bg-background">
      <ResizablePanelGroup>
        <ResizablePanel
          defaultSize="24%"
          minSize="15%"
          collapsible
          collapsedSize="0%"
          className="overflow-auto bg-surface-subtle"
        >
          <ul
            aria-label="Tenants"
            className="flex flex-col gap-0.5 p-2 text-sm"
          >
            {tenants.map((tenant, index) => (
              <li
                key={tenant}
                className={
                  index === 0
                    ? "truncate rounded-md bg-brand-subtle px-2 py-1.5 font-medium"
                    : "truncate rounded-md px-2 py-1.5"
                }
              >
                {tenant}
              </li>
            ))}
          </ul>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          defaultSize="46%"
          minSize="30%"
          className="overflow-auto"
        >
          <div className="flex flex-col gap-1 p-4">
            <p className="text-sm font-medium">Northwind Retail Pvt Ltd</p>
            <p className="text-caption text-muted-foreground">
              Enterprise · ap-south-1 · 1,842 users
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Passkeys are required for every admin role. SCIM provisioning from
              Okta ran 12 minutes ago.
            </p>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize="20%" className="overflow-auto">
          <div className="flex flex-col gap-1.5 p-4">
            <p className="text-sm font-medium">Activity</p>
            <p className="text-caption text-muted-foreground">
              Diya Sharma changed Kabir Singh's role · 5 min ago
            </p>
            <p className="text-caption text-muted-foreground">
              Aarav Mehta revoked a high-risk session · 31 min ago
            </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
