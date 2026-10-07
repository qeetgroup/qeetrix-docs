import { JSONTree } from "@qeetrix/ui";

const delivery = {
  id: "whd_01J9ZR8B3Q",
  event: "payment.captured",
  attempt: 2,
  delivered: true,
  response: { status: 200, duration_ms: 184 },
  payload: {
    payment_id: "pay_8KxR2mVq",
    amount: 292640,
    currency: "INR",
    method: "upi",
    notes: null,
  },
  headers: ["Qeet-Signature", "Qeet-Event-Id", "Content-Type"],
};

/**
 * A collapsible tree for any JSON value. Objects and arrays get a disclosure chevron, and a
 * collapsed one shows a summary such as "5 keys" or "3 items". By default only the top level
 * starts open. The tree takes the arrow keys, Home and End.
 *
 * @layout wide
 */
export default function JSONTreeDefault() {
  return (
    <JSONTree
      value={delivery}
      rootLabel="delivery"
      label="Webhook delivery"
      className="w-full max-w-xl"
    />
  );
}
