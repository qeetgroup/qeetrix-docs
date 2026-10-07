"use client";

import {
  Button,
  Field,
  FieldControl,
  FieldLabel,
  FocusTrap,
  Input,
  Label,
  Switch,
} from "@qeetrix/ui";
import { useState } from "react";

/**
 * Switch the trap on and focus moves to the panel's first control; Tab and Shift+Tab then cycle
 * inside it, and switching it off returns focus to where it was. It only contains focus — the
 * page behind is not inert — so use `AlertDialog` for a confirmation that must be modal.
 */
export default function FocusTrapDefault() {
  const [trapped, setTrapped] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const release = () => {
    setTrapped(false);
    setConfirmation("");
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Label className="font-normal">
        <Switch checked={trapped} onCheckedChange={setTrapped} />
        Trap focus
      </Label>

      <FocusTrap
        active={trapped}
        data-trapped={trapped || undefined}
        onFocus={() => setFocusInside(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setFocusInside(false);
          }
        }}
        // The trap has no Escape handling of its own; this example adds it.
        onKeyDown={(event) => {
          if (event.key === "Escape") release();
        }}
        className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 transition-colors duration-fast data-trapped:border-border-brand"
      >
        <div className="flex flex-col gap-1">
          <span className="font-medium">Revoke all sessions</span>
          <span className="text-caption text-muted-foreground">
            Signs you out on 6 devices, including this browser. You sign in
            again with your passkey.
          </span>
        </div>
        <Field>
          <FieldLabel>Type REVOKE to confirm</FieldLabel>
          <FieldControl
            render={
              <Input
                autoComplete="off"
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
              />
            }
          />
        </Field>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={release}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={confirmation !== "REVOKE"}
            onClick={release}
          >
            Revoke all sessions
          </Button>
        </div>
      </FocusTrap>

      <p className="text-caption text-muted-foreground">
        {trapped
          ? "Trapped: Tab and Shift+Tab stay in the panel. Esc releases it."
          : "Not trapped: Tab moves on past the panel."}{" "}
        Focus is {focusInside ? "inside" : "outside"} the panel.
      </p>
    </div>
  );
}
