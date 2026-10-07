import { ScrollArea } from "@qeetrix/ui";

const tenants = [
  { id: "t1", name: "Northwind Retail", plan: "Enterprise", users: "1,842" },
  { id: "t2", name: "Acme India", plan: "Growth", users: "312" },
  { id: "t3", name: "Lotus Foods", plan: "Growth", users: "148" },
  { id: "t4", name: "Kaveri Textiles", plan: "Starter", users: "64" },
  { id: "t5", name: "Indus Logistics", plan: "Enterprise", users: "2,410" },
  { id: "t6", name: "Saffron Hotels", plan: "Growth", users: "205" },
];

/**
 * Content wider than the area, here a row of tenant cards, scrolls sideways under a horizontal
 * scrollbar.
 */
export default function ScrollAreaHorizontal() {
  return (
    <ScrollArea
      role="region"
      aria-label="Tenants"
      className="w-96 rounded-lg border border-border bg-card"
    >
      <ul className="flex gap-3 p-3">
        {tenants.map((tenant) => (
          <li
            key={tenant.id}
            className="flex w-40 flex-col gap-0.5 rounded-md border border-border bg-surface-subtle p-3"
          >
            <span className="truncate text-sm font-medium">{tenant.name}</span>
            <span className="text-caption text-muted-foreground">
              {tenant.plan} · {tenant.users} users
            </span>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
