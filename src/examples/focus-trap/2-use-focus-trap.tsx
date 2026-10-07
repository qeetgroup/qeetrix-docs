"use client";

import { KeyRoundIcon, XIcon } from "@qeetrix/icons";
import {
  Button,
  Field,
  FieldControl,
  FieldLabel,
  IconButton,
  Input,
  useFocusTrap,
} from "@qeetrix/ui";
import { useRef, useState } from "react";

/**
 * @title useFocusTrap
 *
 * `useFocusTrap` is the hook behind `FocusTrap`, for a container you render yourself: attach the
 * `containerRef` it returns. `initialFocusRef` sends focus to the name field instead of the first
 * control (Close), and closing the editor returns focus to Rename.
 */
export default function FocusTrapUseFocusTrap() {
  const [name, setName] = useState("MacBook Pro Touch ID");
  const [editing, setEditing] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const { containerRef } = useFocusTrap(editing, { initialFocusRef: nameRef });

  return (
    <div className="w-full max-w-md rounded-lg border border-border bg-card">
      <div className="flex items-center gap-3 p-4">
        <KeyRoundIcon aria-hidden className="size-5 text-muted-foreground" />
        <div className="min-w-0 flex-1">
          <div className="truncate font-medium">{name}</div>
          <div className="text-caption text-muted-foreground">
            Passkey · last used today
          </div>
        </div>
        <Button
          variant="secondary"
          aria-expanded={editing}
          onClick={() => setEditing(true)}
        >
          Rename
        </Button>
      </div>

      {editing ? (
        <div ref={containerRef} className="border-t border-border p-4">
          <form
            className="flex flex-col gap-3"
            // Escape is this example's own; the hook only handles focus.
            onKeyDown={(event) => {
              if (event.key === "Escape") setEditing(false);
            }}
            onSubmit={(event) => {
              event.preventDefault();
              setName(nameRef.current?.value.trim() || name);
              setEditing(false);
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-label font-medium">Rename passkey</span>
              <IconButton
                type="button"
                icon={XIcon}
                aria-label="Close"
                variant="ghost"
                size="icon-sm"
                onClick={() => setEditing(false)}
              />
            </div>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <FieldControl
                render={
                  <Input ref={nameRef} defaultValue={name} autoComplete="off" />
                }
              />
            </Field>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
