import { PlusIcon, RefreshCwIcon, UserPlusIcon } from "@qeetrix/icons";
import { Button, EmptyState } from "@qeetrix/ui";

/**
 * The variant says why there is nothing to show. It sets the icon tile's tone and gives
 * `no-results`, `no-permission` and `error` a default glyph. Only `first-use` takes the Qeet tint;
 * pair it with a primary button. The copy and the actions are yours.
 *
 * @layout wide
 */
export default function EmptyStateVariants() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-lg border border-border bg-card">
        <EmptyState
          variant="first-use"
          icon={UserPlusIcon}
          title="Invite your team"
          description="Add people from northwind.in, or sync them from your identity provider."
          action={
            <Button size="sm">
              <PlusIcon data-icon="inline-start" aria-hidden />
              Invite members
            </Button>
          }
        />
      </div>
      <div className="rounded-lg border border-border bg-card">
        <EmptyState
          variant="no-results"
          title="No members match “kabir@acme”"
          description="Check the spelling, or clear the filters to see everyone."
          action={
            <Button size="sm" variant="outline">
              Clear filters
            </Button>
          }
        />
      </div>
      <div className="rounded-lg border border-border bg-card">
        <EmptyState
          variant="no-permission"
          title="You can't view payroll"
          description="Ask a payroll admin, such as Meera Iyer, to give you access."
          action={
            <Button size="sm" variant="outline">
              Request access
            </Button>
          }
        />
      </div>
      <div className="rounded-lg border border-border bg-card">
        <EmptyState
          variant="error"
          title="Couldn't load audit logs"
          description="Qeet Logs didn't respond in time. Nothing was lost."
          action={
            <Button size="sm" variant="outline">
              <RefreshCwIcon data-icon="inline-start" aria-hidden />
              Try again
            </Button>
          }
        />
      </div>
    </div>
  );
}
