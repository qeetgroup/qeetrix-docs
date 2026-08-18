import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Voice & tone",
  description:
    "Product copy guidance — clear, confident, second-person present tense, and grounded in the QEET ethos.",
};

const ETHOS = [
  { letter: "Q", word: "Question", note: "Name the problem plainly before offering a fix." },
  { letter: "E", word: "Explore", note: "Show the options; respect that the reader is deciding." },
  { letter: "E", word: "Envision", note: "Describe the outcome in concrete terms, not hype." },
  { letter: "T", word: "Transform", note: "Tell the reader exactly what to do next." },
];

const EXAMPLES = [
  {
    do: "Save changes to apply the new theme.",
    dont: "Effortlessly supercharge your workflow with our amazing theming engine!",
  },
  {
    do: "This tenant has no users yet. Invite your first teammate to get started.",
    dont: "Oops! Looks like it's a bit lonely in here.",
  },
  {
    do: "Deleting a project removes its data permanently. This cannot be undone.",
    dont: "Are you sure you really want to do this? There's no going back, be careful!",
  },
];

export default function VoiceFoundationPage() {
  return (
    <PageShell
      title="Voice & tone"
      crumbs={[{ title: "Foundations", href: "/foundations" }, { title: "Voice & tone" }]}
      lead="Interface copy is part of the design system. Qeetrix writes clearly and confidently, addresses the reader in the second person and present tense, and leaves marketing adjectives out of reference material. The words carry the same weight as the components they sit in."
    >
      <div className="space-y-10">
        <section>
          <h2 className="font-display text-xl font-semibold">Principles</h2>
          <ul className="mt-3 space-y-3 text-muted-foreground">
            <li>
              <span className="text-foreground">Clear over clever.</span> Say the thing. A reader
              scanning under pressure should never have to decode a joke or a metaphor.
            </li>
            <li>
              <span className="text-foreground">Confident, not loud.</span> State what happens. Drop
              hedges (&ldquo;maybe&rdquo;, &ldquo;just&rdquo;, &ldquo;simply&rdquo;) and
              superlatives (&ldquo;amazing&rdquo;, &ldquo;powerful&rdquo;,
              &ldquo;effortless&rdquo;).
            </li>
            <li>
              <span className="text-foreground">Second person, present tense.</span> &ldquo;You have
              three projects&rdquo; — not &ldquo;The user has&rdquo; or &ldquo;You will have&rdquo;.
            </li>
            <li>
              <span className="text-foreground">Action-led.</span> Buttons and links start with a
              verb: <span className="text-foreground">Save</span>,{" "}
              <span className="text-foreground">Invite teammate</span>,{" "}
              <span className="text-foreground">Delete project</span>.
            </li>
            <li>
              <span className="text-foreground">Sentence case.</span> Headings, labels, and buttons
              use sentence case, never Title Case Or ALL CAPS.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">The QEET ethos</h2>
          <p className="mt-2 text-muted-foreground">
            Question · Explore · Envision · Transform is the arc every piece of guidance should
            follow — name the problem, show the way through, and end with a clear next step.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {ETHOS.map((e) => (
              <div key={e.word} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                <span className="font-display text-2xl font-semibold text-brand">{e.letter}</span>
                <div>
                  <p className="font-medium text-foreground">{e.word}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{e.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">In practice</h2>
          <div className="mt-4 space-y-3">
            {EXAMPLES.map((ex) => (
              <div key={ex.do} className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-card p-3">
                  <p className="text-xs font-medium text-brand-text">Write</p>
                  <p className="mt-1 text-sm text-foreground">{ex.do}</p>
                </div>
                <div className="rounded-lg border border-border bg-muted p-3">
                  <p className="text-xs font-medium text-muted-foreground">Avoid</p>
                  <p className="mt-1 text-sm text-muted-foreground line-through">{ex.dont}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <p className="text-sm text-muted-foreground">
          Voice sets the words; the{" "}
          <Link
            href="/foundations/typography"
            className="text-brand-text underline-offset-4 hover:underline"
          >
            typography
          </Link>{" "}
          foundation sets how they look on the page.
        </p>
      </div>
    </PageShell>
  );
}
