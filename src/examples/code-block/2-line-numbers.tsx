import { CodeBlock } from "@qeetrix/ui";

const script = `curl https://api.qeet.in/id/v1/users \\
  -H "Authorization: Bearer $QEET_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "kabir@northwind.in",
    "name": "Kabir Rao",
    "send_invite": true
  }'`;

/**
 * `lineNumbers` adds a gutter. The numbers are CSS counters, so they are neither copied with a
 * selection nor read out line by line. Without a header, the copy button appears on hover or
 * focus.
 */
export default function CodeBlockLineNumbers() {
  return (
    <CodeBlock
      className="w-full max-w-xl"
      value={script}
      language="shell"
      lineNumbers
    />
  );
}
