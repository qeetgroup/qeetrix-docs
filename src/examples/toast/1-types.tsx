"use client";

import { Button, toast } from "@qeetrix/ui";

/** Each type sets the icon and accent. Toasts stack, pause on hover and announce politely. */
export default function ToastTypes() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast("New sign-in from Mumbai", {
            description: "ThinkPad X1 · Firefox · SSO (Okta)",
          })
        }
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Invoice sent", {
            description: "QP-INV-2026-00412 emailed to accounts@acme.in",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("API key expires in 7 days", {
            description: "Rotate it before 13 Oct.",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error("Webhook delivery failed", {
            description: "payments.example.com returned 503.",
          })
        }
      >
        Error
      </Button>
    </div>
  );
}
