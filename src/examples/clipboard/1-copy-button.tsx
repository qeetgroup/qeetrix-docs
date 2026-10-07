import { CopyButton } from "@qeetrix/ui";

/**
 * `CopyButton` copies its `value` and confirms in place. It only shows "Copied!" once the browser
 * has confirmed the write, and keeps its width so nothing beside it moves.
 */
export default function ClipboardCopyButton() {
  return (
    <div className="flex w-full max-w-md items-center justify-between gap-4 rounded-lg border border-border bg-card px-4 py-3">
      <div className="min-w-0">
        <div className="text-caption text-muted-foreground">Tenant ID</div>
        <code className="font-mono text-code">tnt_8f3k2q9xw1</code>
      </div>
      <CopyButton value="tnt_8f3k2q9xw1" variant="outline" size="sm" />
    </div>
  );
}
