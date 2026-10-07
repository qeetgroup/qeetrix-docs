import { Button, PageHeader, StatusPill } from "@qeetrix/ui";

/**
 * The header responds to the width it is given, not to the viewport. The text claims at least
 * 20rem before it shares a line with the actions, so in a narrow detail pane the actions wrap
 * beneath the title instead of squeezing it.
 */
export default function PageHeaderNarrowPanel() {
  return (
    <div className="w-90 rounded-lg border border-border bg-card p-4">
      <PageHeader
        title="Kabir Singh"
        description="kabir.singh@northwind.in · Security Engineer"
        metadata={
          <>
            <StatusPill kind="success">Active</StatusPill>
            <span>Passkey · TOTP</span>
            <span>Hyderabad</span>
          </>
        }
        actions={
          <>
            <Button size="sm" variant="outline">
              Reset MFA
            </Button>
            <Button size="sm" variant="destructive">
              Suspend
            </Button>
          </>
        }
      />
    </div>
  );
}
