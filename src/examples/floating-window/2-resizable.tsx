"use client";

import { NotebookPenIcon } from "@qeetrix/icons";
import { Button, FloatingWindow, Textarea } from "@qeetrix/ui";
import { useState } from "react";

/**
 * `resizable` adds a grip in the corner for resizing the window. The grip is pointer-only, so the
 * default size, set with `width`, has to work on its own.
 *
 * @layout wide
 */
export default function FloatingWindowResizable() {
  const [open, setOpen] = useState(true);
  return (
    <div className="relative h-80 overflow-hidden rounded-lg border border-border bg-background transform-gpu">
      <div className="p-4">
        <Button
          variant="outline"
          size="sm"
          disabled={open}
          onClick={() => setOpen(true)}
        >
          <NotebookPenIcon data-icon="inline-start" aria-hidden />
          Interview notes
        </Button>
      </div>
      <FloatingWindow
        title="Interview notes · Kabir Rao"
        open={open}
        onClose={() => setOpen(false)}
        defaultPosition={{ x: 200, y: 40 }}
        width={300}
        resizable
      >
        <Textarea
          aria-label="Notes"
          className="min-h-28"
          defaultValue="Strong on payments reconciliation. Walked through a UPI refund race clearly. Follow up on on-call experience."
        />
      </FloatingWindow>
    </div>
  );
}
