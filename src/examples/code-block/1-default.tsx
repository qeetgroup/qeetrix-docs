import { CodeBlock } from "@qeetrix/ui";

const payload = `{
  "id": "evt_01J9ZQ4M7T",
  "type": "payment.captured",
  "created_at": "2026-10-08T09:41:12+05:30",
  "data": {
    "payment_id": "pay_8KxR2mVq",
    "amount": 292640, // in paise
    "currency": "INR",
    "method": "upi",
    "customer": "diya@northwind.in"
  }
}`;

/**
 * JSON, shell and HTTP get light syntax highlighting; anything else is plain monospace. A
 * `caption` or `showLanguage` adds a header, and the copy button then stays visible.
 */
export default function CodeBlockDefault() {
  return (
    <CodeBlock
      className="w-full max-w-xl"
      value={payload}
      language="json"
      showLanguage
      caption="payment.captured"
    />
  );
}
