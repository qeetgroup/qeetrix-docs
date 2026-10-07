import {
  Field,
  FieldControl,
  FieldLabel,
  Input,
  ToggleTip,
  ToggleTipContent,
  ToggleTipTrigger,
} from "@qeetrix/ui";

/**
 * Help that opens on click, Enter or Space rather than on hover, so it works on touch and can
 * hold a full sentence. The trigger sits inline beside the label; `label` gives it a specific
 * accessible name in place of the default "More information".
 */
export default function ToggleTipDefault() {
  return (
    <Field className="w-72">
      <div className="flex items-center gap-1">
        <FieldLabel>GSTIN</FieldLabel>
        <ToggleTip>
          <ToggleTipTrigger label="About GSTIN" />
          <ToggleTipContent>
            Your 15-character GST Identification Number. Qeet Pay prints it on
            every tax invoice you issue, so buyers can claim input tax credit.
          </ToggleTipContent>
        </ToggleTip>
      </div>
      <FieldControl render={<Input placeholder="29ABCDE1234F1Z5" />} />
    </Field>
  );
}
