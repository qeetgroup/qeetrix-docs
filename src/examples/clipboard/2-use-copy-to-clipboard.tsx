"use client";

import { CheckIcon, LinkIcon } from "@qeetrix/icons";
import { Button, useCopyToClipboard } from "@qeetrix/ui";

const inviteLink = "https://id.qeet.in/invite/7Hq2-xKd9";

/**
 * `useCopyToClipboard` is the hook behind `CopyButton`, for a trigger of your own. `copy`
 * resolves `true` once the write is confirmed, and `copied` stays true for the timeout.
 */
export default function ClipboardUseCopyToClipboard() {
  const { copied, copy } = useCopyToClipboard(2000);
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <span className="text-label font-medium">Invite link</span>
      <div className="flex items-center gap-2">
        <code className="min-w-0 flex-1 truncate rounded-md border border-border bg-surface-subtle px-3 py-2 font-mono text-code">
          {inviteLink}
        </code>
        <Button variant="secondary" onClick={() => copy(inviteLink)}>
          {copied ? (
            <CheckIcon data-icon="inline-start" aria-hidden />
          ) : (
            <LinkIcon data-icon="inline-start" aria-hidden />
          )}
          {copied ? "Link copied" : "Copy link"}
        </Button>
      </div>
    </div>
  );
}
