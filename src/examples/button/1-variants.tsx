import { PlusIcon, TrashIcon } from "@qeetrix/icons";
import { Button } from "@qeetrix/ui";

/**
 * One primary action per view; secondary and outline beside it, ghost in toolbars, and
 * destructive for actions that can't be undone.
 */
export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>
        <PlusIcon data-icon="inline-start" aria-hidden />
        Invite member
      </Button>
      <Button variant="secondary">Export CSV</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="ghost">Skip for now</Button>
      <Button variant="destructive">
        <TrashIcon data-icon="inline-start" aria-hidden />
        Revoke key
      </Button>
      <Button variant="link">View audit log</Button>
    </div>
  );
}
