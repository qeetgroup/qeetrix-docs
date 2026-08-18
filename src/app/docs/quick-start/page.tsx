import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Quick start",
  description:
    "Build a small sign-in form end to end with Field, Input, and Button from @qeetrix/ui.",
};

export default function QuickStartPage() {
  return (
    <PageShell
      title="Quick start"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "Quick start" }]}
      lead="Let's build something real — a compact sign-in form composed from Field, Input, and Button."
    >
      <div className="space-y-8">
        <section>
          <p className="text-muted-foreground">
            This assumes you have already installed{" "}
            <code className="font-mono text-sm">@qeetrix/ui</code> and imported the stylesheet. If
            not, run through{" "}
            <Link
              href="/docs/getting-started"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              Getting started
            </Link>{" "}
            first.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Compose the form</h2>
          <p className="mt-2 text-muted-foreground">
            The <code className="font-mono text-sm">Field</code> family owns layout and validation
            display; you own state and submission.{" "}
            <code className="font-mono text-sm">FieldGroup</code> stacks fields with consistent
            rhythm, <code className="font-mono text-sm">FieldLabel</code> wires the label to its{" "}
            <code className="font-mono text-sm">FieldControl</code>, and{" "}
            <code className="font-mono text-sm">FieldDescription</code> adds helper text.
          </p>
          <CodeBlock
            title="sign-in-form.tsx"
            code={`import {\n  Button,\n  Field,\n  FieldControl,\n  FieldDescription,\n  FieldGroup,\n  FieldLabel,\n  Input,\n} from "@qeetrix/ui";\n\nexport function SignInForm() {\n  return (\n    <form className="mx-auto max-w-sm">\n      <FieldGroup>\n        <Field>\n          <FieldLabel>Email</FieldLabel>\n          <FieldControl render={<Input type="email" placeholder="you@qeet.in" required />} />\n          <FieldDescription>We'll never share your address.</FieldDescription>\n        </Field>\n\n        <Field>\n          <FieldLabel>Password</FieldLabel>\n          <FieldControl render={<Input type="password" required />} />\n        </Field>\n\n        <Button type="submit">Sign in</Button>\n      </FieldGroup>\n    </form>\n  );\n}`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Why it works out of the box</h2>
          <p className="mt-2 text-muted-foreground">
            Focus rings, disabled and invalid states, spacing, and dark-mode colours all come from
            the shared tokens — you did not write a single colour. The label/input association is
            accessible by default through <code className="font-mono text-sm">FieldControl</code>,
            and <code className="font-mono text-sm">Button</code> already handles keyboard and focus
            semantics via its Base UI primitive.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Next steps</h2>
          <p className="mt-2 text-muted-foreground">
            Swap in <code className="font-mono text-sm">FieldError</code> to surface validation from
            your form library, or reach for the pre-built{" "}
            <Link href="/blocks" className="text-brand-text underline-offset-4 hover:underline">
              auth block
            </Link>
            . Browse the full{" "}
            <Link href="/components" className="text-brand-text underline-offset-4 hover:underline">
              component catalog
            </Link>{" "}
            to keep going.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
