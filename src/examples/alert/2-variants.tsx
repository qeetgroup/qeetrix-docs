import {
  CircleAlertIcon,
  CircleCheckIcon,
  KeyRoundIcon,
  TriangleAlertIcon,
} from "@qeetrix/icons";
import { Alert, AlertDescription, AlertTitle } from "@qeetrix/ui";

/**
 * Each status variant tints the surface and puts its hue on the accent rule, the icon and the
 * title; the description stays neutral. `default` is a plain card with a muted icon.
 */
export default function AlertVariants() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Alert role="status">
        <KeyRoundIcon aria-hidden />
        <AlertTitle>SSO is managed by your identity provider</AlertTitle>
        <AlertDescription>
          Password changes for northwind.in happen in Okta.
        </AlertDescription>
      </Alert>
      <Alert variant="success" role="status">
        <CircleCheckIcon aria-hidden />
        <AlertTitle>Domain verified</AlertTitle>
        <AlertDescription>
          People with a northwind.in email can now join automatically.
        </AlertDescription>
      </Alert>
      <Alert variant="warning" role="status">
        <TriangleAlertIcon aria-hidden />
        <AlertTitle>API key expires in 7 days</AlertTitle>
        <AlertDescription>
          Rotate the live key before 15 Oct to avoid failed payments.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleAlertIcon aria-hidden />
        <AlertTitle>Webhook delivery failed</AlertTitle>
        <AlertDescription>
          payments.northwind.in returned 503 for the last 12 events.
        </AlertDescription>
      </Alert>
    </div>
  );
}
