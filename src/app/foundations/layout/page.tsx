import { Container } from "@qeetrix/ui";
import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Layout",
  description:
    "Page and content layout primitives — the content shell, prose measure, responsive breakpoints, and containers.",
};

const BREAKPOINTS = [
  { name: "sm", min: "640px", use: "Large phones — first place two-up card grids appear." },
  { name: "md", min: "768px", use: "Tablets — side navigation and denser toolbars." },
  { name: "lg", min: "1024px", use: "Laptops — three-up grids and a persistent side rail." },
  { name: "xl", min: "1280px", use: "Desktops — the widest content measure." },
  {
    name: "2xl",
    min: "1536px",
    use: "Large desktops — the column stays centred, it does not keep growing.",
  },
];

export default function LayoutFoundationPage() {
  return (
    <PageShell
      title="Layout"
      crumbs={[{ title: "Foundations", href: "/foundations" }, { title: "Layout" }]}
      lead="Layout in Qeetrix is a small set of primitives — a centred content column, a readable prose measure, and a mobile-first breakpoint ladder — composed with Tailwind utilities. There is no bespoke layout engine; you reach for the same width, padding, and gap tokens everywhere."
    >
      <div className="space-y-10">
        <section>
          <h2 className="font-display text-xl font-semibold">The content shell</h2>
          <p className="mt-2 text-muted-foreground">
            Every page sits inside one shell: a horizontally-centred column with responsive side
            gutters. It caps at a comfortable width and stays centred on wide screens rather than
            stretching edge to edge. The same shell drives this documentation site.
          </p>
          <div className="mt-4 rounded-xl border border-border bg-card py-4">
            <Container size="prose">
              <div className="rounded-lg bg-muted px-4 py-6 text-center text-sm text-muted-foreground">
                <code className="font-mono text-foreground">{`<Container size="prose">`}</code>
                <p className="mt-2">Centred column · responsive gutters · capped width</p>
              </div>
            </Container>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Measure for prose</h2>
          <p className="mt-2 text-muted-foreground">
            Running text is held to a comfortable line length so the eye can track from one line to
            the next. Lead paragraphs and body copy cap at roughly 60–75 characters; wrap long-form
            text in a narrower column than the shell it lives in.
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
            <li>
              <code className="font-mono text-foreground">max-w-2xl</code> — lead and paragraph
              prose.
            </li>
            <li>
              <code className="font-mono text-foreground">max-w-4xl</code> — the page shell that
              holds cards, tables, and specimens.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Breakpoints</h2>
          <p className="mt-2 text-muted-foreground">
            Layouts are authored mobile-first: base styles target the smallest screen and each
            breakpoint prefix layers on structure as space allows. These are the Tailwind defaults —
            do not invent new ones.
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-medium">Prefix</th>
                  <th className="px-4 py-2 font-medium">Min width</th>
                  <th className="px-4 py-2 font-medium">Typical use</th>
                </tr>
              </thead>
              <tbody>
                {BREAKPOINTS.map((b) => (
                  <tr key={b.name} className="border-t border-border">
                    <td className="px-4 py-2 font-mono text-foreground">{b.name}</td>
                    <td className="px-4 py-2 font-mono text-muted-foreground">{b.min}</td>
                    <td className="px-4 py-2 text-muted-foreground">{b.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Containers</h2>
          <p className="mt-2 text-muted-foreground">
            Use <code className="font-mono text-foreground">Container</code> for the shared shell:
            <code className="font-mono text-foreground">prose</code>,{" "}
            <code className="font-mono text-foreground">content</code>,{" "}
            <code className="font-mono text-foreground">wide</code>, or{" "}
            <code className="font-mono text-foreground">full</code>. It owns centering and
            responsive gutters; children own internal padding. Use exported breakpoint/query helpers
            and <code className="font-mono text-foreground">useMediaQuery</code> only for behavioral
            changes. CSS remains the default for layout.
          </p>
        </section>

        <p className="text-sm text-muted-foreground">
          Column counts and gaps live on the{" "}
          <Link
            href="/foundations/grid"
            className="text-brand-text underline-offset-4 hover:underline"
          >
            grid
          </Link>{" "}
          page; the gutters and gaps themselves come from the{" "}
          <Link
            href="/foundations/spacing"
            className="text-brand-text underline-offset-4 hover:underline"
          >
            spacing scale
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
