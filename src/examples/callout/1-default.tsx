import { Callout } from "@qeetrix/ui";

/**
 * An inline note in the flow of the page, with an accent rule and an icon. It is static: a
 * `role="note"`, not a live region, and not dismissible (use Alert for that).
 */
export default function CalloutDefault() {
  return (
    <Callout title="Settlement timing" className="w-full max-w-xl">
      UPI and card payments settle the next business day. Net banking settles in
      two.
    </Callout>
  );
}
