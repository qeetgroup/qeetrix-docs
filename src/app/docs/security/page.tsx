import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Consuming-side security notes for Qeetrix UIs — sanitising rich content, CSP basics, and avoiding dangerouslySetInnerHTML.",
};

export default function SecurityPage() {
  return (
    <PageShell
      title="Security"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "Security" }]}
      lead="Qeetrix renders the props you give it — the data you feed a component is yours to keep safe. Here are the consuming-side basics."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">
            Qeetrix does not render raw HTML for you
          </h2>
          <p className="mt-2 text-muted-foreground">
            Components take React children and typed props, and React escapes text by default. There
            is no component that injects a string as markup on your behalf — so cross-site scripting
            surfaces only where <em>you</em> introduce one.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Sanitise rich content</h2>
          <p className="mt-2 text-muted-foreground">
            If you must render user- or CMS-authored HTML, sanitise it first with a vetted library
            (for example DOMPurify) and only then pass the cleaned string. Never pass untrusted HTML
            straight through.
          </p>
          <CodeBlock
            title="rich-text.tsx"
            code={`import DOMPurify from "dompurify";\n\nfunction RichText({ html }: { html: string }) {\n  const clean = DOMPurify.sanitize(html);\n  return <div dangerouslySetInnerHTML={{ __html: clean }} />;\n}`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Avoid dangerouslySetInnerHTML</h2>
          <p className="mt-2 text-muted-foreground">
            Prefer rendering structured children over{" "}
            <code className="font-mono text-sm">dangerouslySetInnerHTML</code>. When markdown or
            rich text is genuinely required, parse it to React elements with a safe renderer rather
            than setting inner HTML. Treat any use as a reviewable exception.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Content Security Policy</h2>
          <p className="mt-2 text-muted-foreground">
            Qeetrix ships static CSS and JS and does not require inline scripts, so it fits a strict
            CSP. Qeetrix uses CSS custom properties, not inline{" "}
            <code className="font-mono text-sm">style</code> attributes with dynamic values, so a
            nonce-based policy works cleanly. If you inline the theme-init script to prevent a
            dark-mode flash, give it a nonce and allow that nonce in{" "}
            <code className="font-mono text-sm">script-src</code>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Auth stays in Qeet ID</h2>
          <p className="mt-2 text-muted-foreground">
            Qeetrix is a presentation layer — it holds no secrets, tokens, or session state.
            Authentication and authorization belong to Qeet ID (OIDC) and your backend; the auth{" "}
            <Link href="/blocks" className="text-brand-text underline-offset-4 hover:underline">
              block
            </Link>{" "}
            only renders the form.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
