"use client";

import { TrashIcon } from "@qeetrix/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  toast,
} from "@qeetrix/ui";

/** The action names what it does. Focus starts on Cancel, the safe choice. */
export default function AlertDialogDestructive() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        <TrashIcon data-icon="inline-start" aria-hidden />
        Revoke key
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Revoke API key qk_live_7Fd2…?</AlertDialogTitle>
          <AlertDialogDescription>
            Checkout service stops authenticating immediately and its requests
            fail with 401. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep key</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => toast.success("qk_live_7Fd2… revoked")}
          >
            Revoke key
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
