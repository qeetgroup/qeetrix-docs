import { Card, CardDescription, CardHeader, CardTitle } from "@qeetrix/ui";
import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Support channels, how to get help, the showcase of products built on Qeetrix, and where to find the code of conduct.",
};

const CHANNELS: { title: string; desc: string; href: string }[] = [
  {
    title: "GitHub Discussions",
    desc: "Ask questions, share patterns, and propose ideas. The best place to start for anything open-ended.",
    href: "https://github.com/qeetgroup/qeetrix/discussions",
  },
  {
    title: "GitHub Issues",
    desc: "Report bugs and request features with a clear repro. Track known issues and their status.",
    href: "https://github.com/qeetgroup/qeetrix/issues",
  },
  {
    title: "Repository",
    desc: "Browse the source, the ADRs, and the token pipeline. Contributions welcome — see the contributing guide.",
    href: "https://github.com/qeetgroup/qeetrix",
  },
];

export default function CommunityPage() {
  return (
    <PageShell
      title="Community"
      crumbs={[{ title: "Community" }]}
      lead="Qeetrix is built in the open across the Qeet Group. Here is where to get help, see what is being built, and how we work together."
    >
      <div className="space-y-10">
        <section>
          <h2 className="font-display text-xl font-semibold">Support channels</h2>
          <p className="mt-2 mb-4 text-muted-foreground">
            Everything happens on the{" "}
            <a
              href="https://github.com/qeetgroup/qeetrix"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              qeetgroup/qeetrix
            </a>{" "}
            repository.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {CHANNELS.map((c) => (
              <a key={c.href} href={c.href} className="group">
                <Card className="h-full transition-shadow hover:shadow-hover">
                  <CardHeader>
                    <CardTitle>{c.title}</CardTitle>
                    <CardDescription>{c.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">How to get help</h2>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li>
              • <strong>A question or &ldquo;how do I…&rdquo;</strong> — open a GitHub Discussion.
            </li>
            <li>
              • <strong>A bug</strong> — open a GitHub Issue with a minimal reproduction and your{" "}
              <code className="font-mono text-sm">@qeetrix/ui</code> version.
            </li>
            <li>
              • <strong>An idea or breaking change</strong> — start with the{" "}
              <Link href="/rfcs" className="text-brand-text underline-offset-4 hover:underline">
                RFC process
              </Link>
              .
            </li>
            <li>
              • <strong>Want to contribute</strong> — follow the{" "}
              <Link
                href="/contributing"
                className="text-brand-text underline-offset-4 hover:underline"
              >
                contributing guide
              </Link>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Showcase</h2>
          <p className="mt-2 text-muted-foreground">
            Qeetrix is the shared design system for the whole Qeet Group. It is already{" "}
            <strong>live in production in Qeet ID</strong> (both its website and admin console) and
            is being rolled out across the rest of the suite as each product builds its front end.
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>
              • <strong>Qeet ID</strong> — shipping on{" "}
              <code className="font-mono text-sm">@qeetrix/ui</code> today.
            </li>
            <li>
              • <strong>This site (ui.qeet.in)</strong> — built entirely on Qeetrix; its own largest
              reference implementation.
            </li>
            <li>
              • <strong>Qeet Notify, Qeet Logs, and the wider suite</strong> — adopting Qeetrix as
              their consoles come online.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Code of conduct</h2>
          <p className="mt-2 text-muted-foreground">
            All participation is governed by the Qeet Group code of conduct, published with the
            org&rsquo;s shared community health files. Be respectful, assume good intent, and keep
            discussion constructive. You can find it in the{" "}
            <a
              href="https://github.com/qeetgroup/.github"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              qeetgroup/.github
            </a>{" "}
            repository.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
