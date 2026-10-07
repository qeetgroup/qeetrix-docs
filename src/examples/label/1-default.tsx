import { Input, Label } from "@qeetrix/ui";

/** `required` adds the required mark; `optional` adds "(optional)" or your own text. */
export default function LabelDefault() {
  return (
    <div className="flex w-72 flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="label-email" required>
          Work email
        </Label>
        <Input id="label-email" type="email" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="label-phone" optional>
          Phone
        </Label>
        <Input id="label-phone" type="tel" />
      </div>
    </div>
  );
}
