import { CopyableSecret } from "@qeetrix/ui";

/** `label` prefixes the value inside the box without being copied; `oneLine` and `size="sm"` fit a dense row. */
export default function CopyableSecretWithLabel() {
  return (
    <div className="w-full max-w-lg">
      <CopyableSecret
        label="QEET_WEBHOOK_SECRET="
        value="whsec_9Kd2xPq7Lm4Tz8Vb"
        oneLine
        size="sm"
      />
    </div>
  );
}
