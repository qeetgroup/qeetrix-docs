import { Spoiler } from "@qeetrix/ui";

/**
 * Long text is clamped to three lines with a fade, and "Show more" discloses the rest. Content
 * that already fits gets no toggle at all.
 */
export default function SpoilerDefault() {
  return (
    <div className="w-md text-sm">
      <Spoiler>
        Between 09:42 and 10:18 IST, SMS one-time passwords sent through one of
        our Jio routes were delayed by up to four minutes. Sign-ins that use
        passkeys, TOTP or WhatsApp were not affected. We failed the route over
        to a secondary aggregator at 10:05 and confirmed normal delivery at
        10:18. Tenants on the Enterprise plan will see the affected sign-in
        attempts flagged in the Qeet ID audit log; no action is needed from
        administrators.
      </Spoiler>
    </div>
  );
}
