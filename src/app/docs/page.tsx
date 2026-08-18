import { Badge, Card, CardDescription, CardHeader, CardTitle } from "@qeetrix/ui";
import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Guides and concepts for adopting Qeetrix — installation, theming, architecture, and framework how-tos.",
};

const SECTIONS = [
  {
    href: "/docs/introduction",
    title: "Introduction",
    desc: "What Qeetrix is, the one-package philosophy, and when to reach for it.",
  },
  {
    href: "/docs/getting-started",
    title: "Getting started",
    desc: "Zero to a rendered component in about two minutes.",
  },
  {
    href: "/docs/installation",
    title: "Installation",
    desc: "Install @qeetrix/ui, wire Tailwind v4, styles, and providers.",
  },
  {
    href: "/docs/theming",
    title: "Theming",
    desc: "Light/dark mode and token overrides with CSS variables.",
  },
  {
    href: "/docs/architecture",
    title: "Architecture",
    desc: "How tokens, primitives, components, and blocks fit together.",
  },
  {
    href: "/docs/frameworks/next",
    title: "Frameworks",
    desc: "Next.js App Router, Vite/SPA React, and Remix setup.",
  },
  {
    href: "/docs/testing",
    title: "Testing",
    desc: "Vitest + Testing Library + vitest-axe against real components.",
  },
  {
    href: "/docs/faq",
    title: "FAQ",
    desc: "React-only? Base UI vs Radix? Licensing? Answered here.",
  },
];

export default function DocsPage() {
  return (
    <PageShell
      title="Documentation"
      crumbs={[{ title: "Docs" }]}
      lead="Everything you need to adopt Qeetrix — the group design system that ships as a single package, @qeetrix/ui."
    >
      <div className="space-y-8">
        <p className="text-muted-foreground">
          Qeetrix is one install: 145 UI modules, 6 blocks, OKLCH design tokens, and brand assets.
          These guides take you from install through theming, architecture, and framework-specific
          wiring. Prefer a guided path? Start with{" "}
          <Link href="/learn" className="text-brand-text underline-offset-4 hover:underline">
            Learn Qeetrix
          </Link>
          .
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <Link key={s.href} href={s.href} className="group">
              <Card className="h-full transition-shadow hover:shadow-hover">
                <CardHeader>
                  <CardTitle>{s.title}</CardTitle>
                  <CardDescription>{s.desc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="secondary">v0.4.0</Badge>
          <span>Pre-1.0 and already live across Qeet ID, Docs, Notify, and Logs.</span>
        </div>
      </div>
    </PageShell>
  );
}
