import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Accessibility statement",
  description:
    "Qeetrix targets WCAG 2.2 Level AA, with AAA where practical. How we measure and maintain conformance.",
};

export default function StatementPage() {
  return (
    <PageShell
      title="Accessibility statement"
      crumbs={[{ title: "Accessibility", href: "/accessibility" }, { title: "Statement" }]}
      lead="Qeetrix is committed to providing an accessible experience for everyone who builds with it and everyone who uses products built with it."
    >
      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="mb-1 font-display text-lg font-semibold">Conformance target</h2>
          <p className="text-muted-foreground">
            Qeetrix components target <strong>WCAG 2.2 Level AA</strong>, and aim for Level AA/AAA
            where practical (for example, colour contrast on core text pairs). This platform
            (ui.qeet.in) itself is held to the same bar.
          </p>
        </section>
        <section>
          <h2 className="mb-1 font-display text-lg font-semibold">How we measure</h2>
          <ul className="space-y-1.5 text-muted-foreground">
            <li>
              • Automated <code className="font-mono">vitest-axe</code> assertions in CI, with a
              coverage ratchet.
            </li>
            <li>
              • A build-time WCAG-AA <strong>token contrast gate</strong> on every semantic
              text/surface pair.
            </li>
            <li>
              • Keyboard interaction and ARIA provided by Base UI primitives and the shared{" "}
              <code className="font-mono">Field</code> contract.
            </li>
            <li>
              • The <code className="font-mono">no-raw-color</code> lint rule keeps colour on
              contrast-checked tokens.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="mb-1 font-display text-lg font-semibold">Known limitations</h2>
          <p className="text-muted-foreground">
            Automated axe coverage is climbing toward the 80% gate; components without coverage yet
            are listed on the{" "}
            <a
              href="/accessibility/scorecard"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              scorecard
            </a>
            . Manual screen-reader verification (VoiceOver, NVDA, JAWS, TalkBack) is ongoing.
          </p>
        </section>
        <section>
          <h2 className="mb-1 font-display text-lg font-semibold">Feedback</h2>
          <p className="text-muted-foreground">
            Found an accessibility issue? Open an issue on{" "}
            <a
              href="https://github.com/qeetgroup/qeetrix"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              github.com/qeetgroup/qeetrix
            </a>
            . See also the machine-readable{" "}
            <a
              href="/accessibility/vpat"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              VPAT
            </a>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
