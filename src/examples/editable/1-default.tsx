import { Editable, EditableInput, EditablePreview } from "@qeetrix/ui";

/** Text that edits in place: click it to edit, Enter to save, Escape to cancel. */
export default function EditableDefault() {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-caption text-muted-foreground">Workspace name</span>
      <Editable
        defaultValue="Northwind Retail"
        className="text-heading font-semibold"
      >
        <EditablePreview />
        <EditableInput aria-label="Workspace name" />
      </Editable>
    </div>
  );
}
