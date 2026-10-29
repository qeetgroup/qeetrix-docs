// Components › Link: its examples, the real Link with the code for each. Server-safe, so they're
// rendered with the page: nothing here reads token data.
import { Link, Stack, Text } from "@qeetrix/react";
import type { ExampleDoc } from "../types";

export const examples: ExampleDoc[] = [
  {
    id: "in-a-sentence",
    title: "In a sentence",
    line: "Inline: a long link wraps with its sentence.",
    code: `<Text>Read the <Link href="/docs/passkeys">passkey setup guide</Link> before you turn them on.</Text>`,
    render: () => (
      <div className="qc-cells">
        <Text render={<p />}>
          Read the{" "}
          <Link href="#passkeys">passkey setup guide for administrators and their teams</Link>{" "}
          before you turn them on.
        </Text>
      </div>
    ),
  },
  {
    id: "tones",
    title: "Tones",
    line: "default, the link colour; subtle for footers and metadata; inherit takes the text's.",
    code: `<Link href="/privacy" tone="subtle">Privacy</Link>`,
    render: () => (
      <Stack gap="sm">
        <Link href="#users">View all users</Link>
        <Link href="#privacy" tone="subtle">
          Privacy
        </Link>
        <Text tone="danger">
          <Link href="#blocked" tone="inherit">
            3 sign-ins blocked
          </Link>
        </Text>
      </Stack>
    ),
  },
  {
    id: "another-site",
    title: "Another site",
    line: 'external: a new tab, rel="noopener noreferrer", an arrow on the last word, and "(opens in a new tab)" for screen readers.',
    code: `<Link href="https://www.w3.org/TR/webauthn-3/" external>The WebAuthn specification</Link>`,
    render: () => (
      <Link href="https://www.w3.org/TR/webauthn-3/" external>
        The WebAuthn specification
      </Link>
    ),
  },
];
