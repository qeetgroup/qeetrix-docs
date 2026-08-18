import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  buttonVariants,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Progress,
  Separator,
  Switch,
} from "@qeetrix/ui";
import { ArrowRight, Blocks, Component, Palette, PlayCircle, Shapes, Terminal } from "lucide-react";
import Link from "next/link";
import { CopyButton } from "@/components/copy-button";

const STATS = [
  { value: "116", label: "components" },
  { value: "6", label: "composable blocks" },
  { value: "12", label: "token categories" },
  { value: "WCAG-AA", label: "contrast-gated" },
];

const EXPLORE = [
  {
    title: "Components",
    href: "/components",
    icon: Component,
    desc: "116 accessible, tokenised React components.",
  },
  {
    title: "Blocks",
    href: "/blocks",
    icon: Blocks,
    desc: "6 composable, multi-component patterns.",
  },
  {
    title: "Tokens",
    href: "/tokens",
    icon: Shapes,
    desc: "OKLCH design tokens, contrast-gated to AA.",
  },
  { title: "Icons", href: "/icons", icon: Palette, desc: "Lucide + Qeet brand icons, copy-ready." },
  {
    title: "Playground",
    href: "/play",
    icon: PlayCircle,
    desc: "Live, shareable component sandboxes.",
  },
  {
    title: "Develop",
    href: "/develop/cli",
    icon: Terminal,
    desc: "CLI, registry, and MCP for humans & agents.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28">
        <Badge variant="secondary" className="mb-6">
          Qeetrix · The Qeet Group design system
        </Badge>
        <h1 className="max-w-3xl font-display text-5xl font-semibold tracking-tight sm:text-6xl">
          One install. Every <span className="text-gradient-brand">Qeet</span> interface.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          116 accessible, tokenised React components and 6 composable blocks — built on Base UI and
          Tailwind v4, themable to any brand, ready for humans and AI agents.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/docs/getting-started" className={buttonVariants({ size: "lg" })}>
            Get started <ArrowRight className="size-4" />
          </Link>
          <Link href="/play" className={buttonVariants({ variant: "outline", size: "lg" })}>
            Open Playground
          </Link>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <code className="rounded-lg border border-border bg-card px-3 py-2 font-mono text-sm">
            npx qeetrix init
          </code>
          <CopyButton value="npx qeetrix init" label="Copy" />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4 sm:px-6">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-semibold">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Live showcase */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight">See it live</h2>
        <p className="mt-2 text-muted-foreground">
          Real, interactive components — the same code you ship, not screenshots.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-4 rounded-xl border border-border bg-card p-8 shadow-rest">
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Delete</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>New</Badge>
              <Badge variant="secondary">v0.4</Badge>
              <Badge variant="outline">Base UI</Badge>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Switch defaultChecked />
              <span className="text-sm">Enable notifications</span>
            </div>
            <Progress value={68} />
          </div>
          <div className="flex flex-col justify-center gap-4 rounded-xl border border-border bg-card p-8 shadow-rest">
            <Input placeholder="you@qeet.in" />
            <Alert>
              <AlertTitle>Accessible by construction</AlertTitle>
              <AlertDescription>
                Base UI primitives, contrast-gated tokens, keyboard-ready.
              </AlertDescription>
            </Alert>
            <Link href="/play" className={buttonVariants({ variant: "outline" })}>
              Open the Playground
            </Link>
          </div>
        </div>
      </section>

      {/* Explore */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Explore the system</h2>
        <p className="mt-2 text-muted-foreground">
          This site is built entirely on <code className="font-mono text-sm">@qeetrix/ui</code> — it
          is Qeetrix&rsquo;s own largest reference implementation.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXPLORE.map(({ title, href, icon: Icon, desc }) => (
            <Link key={href} href={href} className="group">
              <Card className="h-full transition-shadow hover:shadow-hover">
                <CardHeader>
                  <Icon className="size-5 text-brand" />
                  <CardTitle className="mt-2 flex items-center gap-1.5">
                    {title}
                    <ArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </CardTitle>
                  <CardDescription>{desc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
