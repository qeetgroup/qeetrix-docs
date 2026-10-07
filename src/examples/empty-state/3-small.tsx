import { KeyRoundIcon, PlusIcon } from "@qeetrix/icons";
import {
  Button,
  EmptyState,
  Table,
  TableBody,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from "@qeetrix/ui";

/**
 * `size="sm"` tightens the spacing and the icon tile to fit a table body or a side panel. Here it
 * sits in a `TableEmpty` row.
 */
export default function EmptyStateSmall() {
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last used</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableEmpty colSpan={3} className="p-0">
            <EmptyState
              size="sm"
              icon={KeyRoundIcon}
              title="No API keys"
              description="Create a key to call the Qeet Pay API from your servers."
              action={
                <Button size="sm" variant="outline">
                  <PlusIcon data-icon="inline-start" aria-hidden />
                  Create key
                </Button>
              }
            />
          </TableEmpty>
        </TableBody>
      </Table>
    </div>
  );
}
