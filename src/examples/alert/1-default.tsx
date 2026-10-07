import { InfoIcon } from "@qeetrix/icons";
import { Alert, AlertDescription, AlertTitle } from "@qeetrix/ui";

/**
 * A status icon first, then `AlertTitle` and `AlertDescription`. Alert is `role="alert"`, which
 * interrupts a screen reader; a message that is already there when the page loads takes
 * `role="status"` instead.
 */
export default function AlertDefault() {
  return (
    <Alert variant="info" role="status" className="max-w-xl">
      <InfoIcon aria-hidden />
      <AlertTitle>Passkeys required from 1 November</AlertTitle>
      <AlertDescription>
        Members of Northwind Retail without a passkey will be asked to enrol one
        at their next sign-in.
      </AlertDescription>
    </Alert>
  );
}
