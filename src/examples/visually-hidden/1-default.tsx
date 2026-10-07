"use client";

import { CopyIcon, RefreshCwIcon, TrashIcon } from "@qeetrix/icons";
import { Button, VisuallyHidden } from "@qeetrix/ui";
import { type SyntheticEvent, useState } from "react";

const actions = [
  { label: "Copy API key", icon: CopyIcon, variant: "ghost" },
  { label: "Rotate API key", icon: RefreshCwIcon, variant: "ghost" },
  { label: "Delete API key", icon: TrashIcon, variant: "destructive" },
] as const;

/**
 * An icon-only button still needs a name. `VisuallyHidden` puts it in the button as text that is
 * hidden on screen but read by screen readers. Hover or focus a button to see the text it carries.
 */
export default function VisuallyHiddenDefault() {
  const [heard, setHeard] = useState<string | null>(null);
  const announce = (event: SyntheticEvent<HTMLElement>) =>
    setHeard(event.currentTarget.textContent);

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
        <div className="min-w-0 flex-1">
          <div className="text-label font-medium">Production key</div>
          <code className="font-mono text-code">qk_live_••••••••7Hq2</code>
        </div>
        {actions.map(({ label, icon: Icon, variant }) => (
          <Button
            key={label}
            variant={variant}
            size="icon-sm"
            onFocus={announce}
            onPointerEnter={announce}
          >
            <Icon aria-hidden />
            <VisuallyHidden>{label}</VisuallyHidden>
          </Button>
        ))}
      </div>
      <p className="text-caption text-muted-foreground">
        Screen reader hears:{" "}
        <span className="font-medium text-foreground">
          {heard ? `“${heard}”, button` : "hover or focus a button"}
        </span>
      </p>
    </div>
  );
}
