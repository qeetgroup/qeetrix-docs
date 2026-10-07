import { CodeBlock } from "@qeetrix/ui";

const request = `GET /id/v1/sessions?user=usr_4f2a9c HTTP/1.1
Host: api.qeet.in
Authorization: Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6InFpZC0yMDI2LTEwIn0.eyJzdWIiOiJ1c3JfNGYyYTljIiwic2NvcGUiOiJzZXNzaW9uczpyZWFkIiwiZXhwIjoxNzkxNDQ4MDAwfQ.k3Rz9QmV7xLpA2cN8wYb
Accept: application/json`;

/**
 * Lines scroll sideways by default. `wrap` soft-wraps them instead, for long tokens, URLs and
 * log lines in a narrow panel.
 */
export default function CodeBlockWrap() {
  return (
    <CodeBlock
      className="w-full max-w-sm"
      value={request}
      language="http"
      wrap
      caption="Request"
    />
  );
}
