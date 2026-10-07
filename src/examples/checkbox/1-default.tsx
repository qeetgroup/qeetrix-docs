import { Checkbox, Label } from "@qeetrix/ui";

/** Wrap the checkbox in a `Label` to name it. */
export default function CheckboxDefault() {
  return (
    <div className="flex flex-col gap-3">
      <Label className="font-normal">
        <Checkbox defaultChecked />
        Email me when a new device signs in
      </Label>
      <Label className="font-normal">
        <Checkbox />
        Send a weekly security digest
      </Label>
    </div>
  );
}
