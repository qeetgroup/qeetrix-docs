import { ReactionBar } from "@qeetrix/ui";

/**
 * `readOnly` shows the reactions without letting the viewer change them: no picker, and the pills
 * aren't buttons. Counts of 1,000 and up are shown compact.
 */
export default function ReactionBarReadOnly() {
  return (
    <div className="w-full max-w-md space-y-3 rounded-lg border border-border bg-card p-4">
      <div className="space-y-1">
        <p className="text-label font-medium">
          Qeet ID is now generally available
        </p>
        <p className="text-caption text-muted-foreground">
          Announcement · Archived
        </p>
      </div>
      <ReactionBar
        readOnly
        locale="en-IN"
        reactions={[
          { emoji: "🎉", label: "party popper", count: 1284 },
          { emoji: "❤️", label: "red heart", count: 342, reacted: true },
          { emoji: "🙏", label: "folded hands", count: 57 },
        ]}
      />
    </div>
  );
}
