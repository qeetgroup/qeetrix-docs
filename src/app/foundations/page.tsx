import { Badge, Card, CardDescription, CardHeader, CardTitle } from "@qeetrix/ui";
import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Foundations",
  description:
    "The Qeetrix design language — colour, typography, spacing, radius, elevation, motion, and iconography.",
};

const FOUNDATIONS = [
  {
    href: "/foundations/color",
    title: "Color",
    desc: "OKLCH ramps + brand and semantic roles.",
    ready: true,
  },
  {
    href: "/foundations/typography",
    title: "Typography",
    desc: "Cal Sans + Fira Code and the type scale.",
    ready: true,
  },
  {
    href: "/foundations/spacing",
    title: "Spacing",
    desc: "The spacing scale and layout rhythm.",
    ready: true,
  },
  {
    href: "/foundations/radius",
    title: "Radius",
    desc: "Corner-radius scale from a base radius.",
    ready: true,
  },
  {
    href: "/foundations/elevation",
    title: "Elevation",
    desc: "The rest → hover → popover → modal ladder.",
    ready: true,
  },
  {
    href: "/foundations/motion",
    title: "Motion",
    desc: "Duration + easing tokens; reduced-motion aware.",
    ready: true,
  },
  {
    href: "/foundations/iconography",
    title: "Iconography",
    desc: "Icon sizing and stroke tokens.",
    ready: true,
  },
  {
    href: "/foundations/layout",
    title: "Layout",
    desc: "Page and content layout primitives.",
    ready: true,
  },
  { href: "/foundations/grid", title: "Grid", desc: "The responsive grid system.", ready: true },
  {
    href: "/foundations/density",
    title: "Density",
    desc: "Comfortable and compact metrics.",
    ready: true,
  },
  {
    href: "/foundations/voice",
    title: "Voice & tone",
    desc: "Product copy guidance.",
    ready: true,
  },
];

export default function FoundationsPage() {
  return (
    <PageShell
      variant="wide"
      title="Foundations"
      crumbs={[{ title: "Foundations" }]}
      lead="The design language beneath every component — all driven by the same OKLCH design tokens."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FOUNDATIONS.map((f) => (
          <Link key={f.href} href={f.href} className="group">
            <Card className="h-full transition-shadow hover:shadow-hover">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {f.title}
                  {!f.ready && <Badge variant="secondary">soon</Badge>}
                </CardTitle>
                <CardDescription>{f.desc}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
