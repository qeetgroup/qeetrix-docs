"use client";

import { CircleAlertIcon, TriangleAlertIcon, XIcon } from "@qeetrix/icons";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Button,
  IconButton,
} from "@qeetrix/ui";
import { useState } from "react";

/**
 * `AlertAction` gives buttons their own column at the inline end, such as a fix or a dismiss
 * button; you decide when the alert goes away. `emphasis="strong"` is a solid fill for a message
 * that must not be missed, like a blocking error: use it sparingly.
 */
export default function AlertWithActions() {
  const [showWarning, setShowWarning] = useState(true);

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Alert variant="destructive" emphasis="strong">
        <CircleAlertIcon aria-hidden />
        <AlertTitle>Payouts on hold</AlertTitle>
        <AlertDescription>
          Your bank account could not be verified. Settlements resume once it is
          updated.
        </AlertDescription>
        <AlertAction>
          <Button size="sm" variant="secondary">
            Update bank details
          </Button>
        </AlertAction>
      </Alert>

      {showWarning ? (
        <Alert variant="warning" role="status">
          <TriangleAlertIcon aria-hidden />
          <AlertTitle>3 members haven't enrolled a passkey</AlertTitle>
          <AlertDescription>
            They will be locked out after 1 November.
          </AlertDescription>
          <AlertAction>
            <Button size="sm" variant="outline">
              Send reminder
            </Button>
            <IconButton
              icon={XIcon}
              variant="ghost"
              size="icon-sm"
              aria-label="Dismiss"
              onClick={() => setShowWarning(false)}
            />
          </AlertAction>
        </Alert>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="self-start"
          onClick={() => setShowWarning(true)}
        >
          Show the warning again
        </Button>
      )}
    </div>
  );
}
