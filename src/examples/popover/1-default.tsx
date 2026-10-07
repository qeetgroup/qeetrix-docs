import {
  Button,
  Field,
  FieldControl,
  FieldLabel,
  Input,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@qeetrix/ui";

/**
 * A panel anchored to its trigger, for a quick setting that doesn't need a dialog. It isn't
 * modal: Escape or a click outside closes it, and focus goes back to the trigger.
 */
export default function PopoverDefault() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Payout threshold
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <PopoverTitle>Payout threshold</PopoverTitle>
          <PopoverDescription>
            Qeet Pay settles to your bank account once your balance passes this
            amount.
          </PopoverDescription>
        </div>
        <Field>
          <FieldLabel>Amount (₹)</FieldLabel>
          <FieldControl
            render={<Input inputMode="numeric" defaultValue="50,000" />}
          />
        </Field>
        <div className="flex justify-end gap-2">
          <PopoverClose render={<Button variant="ghost" size="sm" />}>
            Cancel
          </PopoverClose>
          <PopoverClose render={<Button size="sm" />}>Save</PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
