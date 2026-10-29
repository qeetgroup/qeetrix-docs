// Components › Code block: its examples, the real CodeBlock with the code for each. Shared by the
// page (doc.tsx) and the island that runs them (Live.tsx), as Copy copies: nothing here reads
// token data.
import { CodeBlock } from "@qeetrix/react/experimental";
import type { ExampleDoc } from "../types";

export const SNIPPET = `import { PlusIcon } from "@qeetrix/icons";
import { Button } from "@qeetrix/react";

export function InviteButton({ onInvite }: { onInvite: () => void }) {
  return <Button icon={PlusIcon} onClick={onInvite}>Invite users</Button>;
}`;

export const EVENT = `{
  "type": "user.signed_in",
  "tenant": "acme",
  "user": { "id": "usr_0001", "email": "priya@acme.in" },
  "method": "passkey",
  "at": "2026-10-29T03:58:00Z"
}`;

export const METADATA = `<EntityDescriptor xmlns="urn:oasis:names:tc:SAML:2.0:metadata" entityID="https://id.qeet.in/saml/acme">
  <IDPSSODescriptor protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
    <SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://id.qeet.in/saml/acme/sso"/>
  </IDPSSODescriptor>
</EntityDescriptor>`;

export const examples: ExampleDoc[] = [
  {
    id: "a-command",
    title: "A command",
    line: "One line: the code and its Copy button, no header.",
    code: `<CodeBlock language="shell" code="bun add @qeetrix/react @qeetrix/tokens" />`,
    render: () => (
      <div className="qc-code-stage">
        <CodeBlock language="shell" code="bun add @qeetrix/react @qeetrix/tokens" />
      </div>
    ),
  },
  {
    id: "a-snippet",
    title: "A snippet",
    line: "More than one line: a header with the language and Copy, and line numbers that copying never picks up.",
    code: `<CodeBlock language="tsx" code={snippet} />`,
    render: () => (
      <div className="qc-code-stage">
        <CodeBlock language="tsx" code={SNIPPET} />
      </div>
    ),
  },
  {
    id: "a-title",
    title: "A title",
    line: "title: the header's label in place of the language, such as the file's name.",
    code: `<CodeBlock language="json" title="user.signed_in" code={event} />`,
    render: () => (
      <div className="qc-code-stage">
        <CodeBlock language="json" title="user.signed_in" code={EVENT} />
      </div>
    ),
  },
  {
    id: "long-lines",
    title: "Long lines",
    line: "They scroll sideways in a named region that takes focus, so the keyboard can scroll it.",
    code: `<CodeBlock language="xml" title="SAML metadata" code={metadata} />`,
    render: () => (
      <div className="qc-code-stage">
        <CodeBlock language="xml" title="SAML metadata" code={METADATA} />
      </div>
    ),
  },
  {
    id: "wrapped",
    title: "Wrapped",
    line: "wrap: long lines wrap under their own start, the indent kept.",
    code: `<CodeBlock language="xml" title="SAML metadata" code={metadata} wrap />`,
    render: () => (
      <div className="qc-code-stage">
        <CodeBlock language="xml" title="SAML metadata" code={METADATA} wrap />
      </div>
    ),
  },
];
