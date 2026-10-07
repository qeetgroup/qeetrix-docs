"use client";

import { ArchiveIcon } from "@qeetrix/icons";
import { Button, toast } from "@qeetrix/ui";

function archiveTenant() {
  const id = toast("Northwind Retail archived", {
    description: "724 users lose access at the end of the billing cycle.",
    timeout: 8000,
    actionProps: {
      children: "Undo",
      onClick: () => {
        toast.dismiss(id);
        toast.success("Northwind Retail restored");
      },
    },
  });
}

/** `actionProps` adds one button, typically Undo for a reversible action. */
export default function ToastWithAction() {
  return (
    <Button variant="outline" onClick={archiveTenant}>
      <ArchiveIcon data-icon="inline-start" aria-hidden />
      Archive tenant
    </Button>
  );
}
