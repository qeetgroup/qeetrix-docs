import { Label, Radio, RadioGroup } from "@qeetrix/ui";

/** One choice from a short list. Wrap each radio in a `Label`; the group takes an accessible name. */
export default function RadioGroupDefault() {
  return (
    <div className="flex flex-col gap-3">
      <span id="sign-in-method" className="text-label font-medium">
        Sign-in method
      </span>
      <RadioGroup
        aria-labelledby="sign-in-method"
        defaultValue="passkey"
        className="flex flex-col gap-3"
      >
        <Label className="font-normal">
          <Radio value="passkey" />
          Passkey
        </Label>
        <Label className="font-normal">
          <Radio value="password" />
          Password and one-time code
        </Label>
        <Label className="font-normal">
          <Radio value="sso" disabled />
          Single sign-on (Growth plan)
        </Label>
      </RadioGroup>
    </div>
  );
}
