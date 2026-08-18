import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InDevelopment, PageShell } from "@/components/page-shell";
import { getTrack, TRACKS } from "@/lib/learn-tracks";

type Params = { track: string };

export function generateStaticParams() {
  return TRACKS.map((t) => ({ track: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { track } = await params;
  const t = getTrack(track);
  if (!t) return { title: "Track not found" };
  return { title: t.title, description: t.description };
}

export default async function TrackPage({ params }: { params: Promise<Params> }) {
  const { track } = await params;
  const t = getTrack(track);
  if (!t) notFound();

  return (
    <PageShell
      title={t.title}
      status="In development"
      crumbs={[{ title: "Learn", href: "/learn" }, { title: t.title }]}
      lead={t.description}
    >
      <section>
        <h2 className="font-display text-xl font-semibold">Lessons</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Work through these in order — each links to a live page you can read today.
        </p>
        <ol className="mt-4 space-y-2">
          {t.lessons.map((lesson, i) => (
            <li key={lesson.href}>
              <Link
                href={lesson.href}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm transition-shadow hover:shadow-hover"
              >
                <span
                  aria-hidden
                  className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs text-muted-foreground"
                >
                  {i + 1}
                </span>
                <span className="font-medium text-foreground">{lesson.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-10">
        <InDevelopment>
          These lessons point at the existing reference and guide pages today. Interactive, in-page
          exercises with embedded playgrounds are being built and land next.
        </InDevelopment>
      </div>
    </PageShell>
  );
}
