import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common Qeetrix questions — React-only support, Base UI vs Radix, theming, licensing, and versioning.",
};

const FAQS = [
  {
    q: "Is Qeetrix React-only?",
    a: (
      <>
        Yes. Qeetrix targets React 19 exclusively. Vue, Svelte, and Angular are under evaluation but
        are not supported today — do not plan around them. The tokens (
        <code className="font-mono text-sm">@qeetrix/ui/tokens.css</code> and{" "}
        <code className="font-mono text-sm">tokens.json</code>) are framework-agnostic if you only
        need the design values.
      </>
    ),
  },
  {
    q: "Base UI or Radix?",
    a: (
      <>
        Base UI (<code className="font-mono text-sm">@base-ui/react</code>). Qeetrix is not built on
        Radix. One practical consequence: the Button and other trigger components use Base UI's{" "}
        <code className="font-mono text-sm">render</code> prop rather than{" "}
        <code className="font-mono text-sm">asChild</code>. To make a link look like a button, style
        a <code className="font-mono text-sm">Link</code> with{" "}
        <code className="font-mono text-sm">buttonVariants()</code> instead of wrapping it in{" "}
        <code className="font-mono text-sm">&lt;Button asChild&gt;</code>.
      </>
    ),
  },
  {
    q: "How do I theme it?",
    a: (
      <>
        Everything is CSS variables. Flip light/dark with the{" "}
        <code className="font-mono text-sm">.dark</code> class via{" "}
        <code className="font-mono text-sm">ThemeProvider</code>, override bridge variables (
        <code className="font-mono text-sm">--primary</code>,{" "}
        <code className="font-mono text-sm">--radius</code>) for global tweaks, or apply a whole
        brand overlay with <code className="font-mono text-sm">data-qx-brand</code>. See the{" "}
        <Link href="/docs/theming" className="text-brand-text underline-offset-4 hover:underline">
          theming guide
        </Link>
        .
      </>
    ),
  },
  {
    q: "Why OKLCH tokens?",
    a: (
      <>
        Colours are authored as DTCG JSON and compiled through Style Dictionary into OKLCH{" "}
        <code className="font-mono text-sm">--qx-*</code> variables. OKLCH is perceptually uniform,
        so ramps stay even and lightness is predictable — which is what makes the WCAG-AA contrast
        gate reliable across light, dark, and every brand.
      </>
    ),
  },
  {
    q: 'Do I need to add "use client"?',
    a: (
      <>
        No. Interactive components already declare it internally, so you can import them straight
        into Server Components. You only add <code className="font-mono text-sm">"use client"</code>{" "}
        to your own files when you write hooks or event handlers. See{" "}
        <Link href="/docs/ssr" className="text-brand-text underline-offset-4 hover:underline">
          SSR &amp; RSC
        </Link>
        .
      </>
    ),
  },
  {
    q: "Is it production-ready?",
    a: (
      <>
        It is pre-1.0 (currently <code className="font-mono text-sm">v0.4.0</code>) but already live
        in production across Qeet ID, this docs site, Qeet Notify, and Qeet Logs. The API can still
        shift between minor versions — pin your version and check the{" "}
        <Link href="/changelog" className="text-brand-text underline-offset-4 hover:underline">
          changelog
        </Link>{" "}
        before upgrading.
      </>
    ),
  },
  {
    q: "How is it published and versioned?",
    a: (
      <>
        Qeetrix ships as one package, <code className="font-mono text-sm">@qeetrix/ui</code>, from a
        Bun + Turborepo monorepo, released via Changesets. Components, tokens, brand assets, and
        blocks all live in that single package — there is no separate tokens or brand package to
        keep in sync.
      </>
    ),
  },
  {
    q: "Can I customise a component's markup?",
    a: (
      <>
        For styling, use <code className="font-mono text-sm">className</code>, extend a{" "}
        <code className="font-mono text-sm">cva</code> variant, or target a{" "}
        <code className="font-mono text-sm">data-slot</code>. When you need to own the source
        outright, vendor the component through the registry. The full ladder is on the{" "}
        <Link
          href="/docs/customization"
          className="text-brand-text underline-offset-4 hover:underline"
        >
          customization
        </Link>{" "}
        page.
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <PageShell
      title="FAQ"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "FAQ" }]}
      lead="The questions we hear most, answered honestly."
    >
      <dl className="space-y-8">
        {FAQS.map((item) => (
          <div key={item.q}>
            <dt className="font-display text-xl font-semibold">{item.q}</dt>
            <dd className="mt-2 text-muted-foreground">{item.a}</dd>
          </div>
        ))}
      </dl>
    </PageShell>
  );
}
