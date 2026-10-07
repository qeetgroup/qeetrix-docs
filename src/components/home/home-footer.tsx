import Github from "@thesvg/react/github";
import Instagram from "@thesvg/react/instagram";
import Linkedin from "@thesvg/react/linkedin";
import X from "@thesvg/react/x";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { links } from "@/lib/site-links";
import { container } from "./section";

type FooterLink = { label: string; href: string };

/**
 * Every entry is a real destination. Left out, because nothing exists to link to yet: a blog,
 * an examples gallery, a tokens page, a roadmap, a licence (the package is UNLICENSED), a brand
 * page, security and status pages, and a YouTube channel.
 */
const columns: { title: string; items: FooterLink[] }[] = [
  {
    title: "Learn",
    items: [
      { label: "Documentation", href: links.docs },
      { label: "Installation", href: links.installation },
      { label: "Guides", href: links.guides },
      { label: "Patterns", href: links.patterns },
    ],
  },
  {
    title: "Build",
    items: [
      { label: "Components", href: links.components },
      { label: "Foundations", href: links.foundations },
      { label: "Theming", href: links.theming },
      { label: "Icons", href: links.icons },
    ],
  },
  {
    title: "Project",
    items: [
      { label: "Changelog", href: links.changelog },
      { label: "Releases", href: links.releases },
      { label: "Contributing", href: links.contributing },
      { label: "npm package", href: links.npm },
    ],
  },
  {
    title: "Qeet",
    items: [
      { label: "About", href: links.qeetAbout },
      { label: "Ecosystem", href: links.qeetEcosystem },
      { label: "Careers", href: links.qeetCareers },
      { label: "Contact", href: links.qeetContact },
    ],
  },
];

/** Monochrome marks in the text colour; LinkedIn ships only its blue, so its paths take the colour. */
const socials = [
  {
    label: "Qeetrix on GitHub",
    href: links.github,
    icon: <Github variant="mono" aria-hidden className="size-4" />,
  },
  {
    label: "Qeet Group on X",
    href: links.qeetX,
    icon: <X variant="mono" aria-hidden className="size-3.5" />,
  },
  {
    label: "Qeet Group on LinkedIn",
    href: links.qeetLinkedIn,
    icon: <Linkedin aria-hidden className="size-4 [&_path]:fill-current" />,
  },
  {
    label: "Qeet Group on Instagram",
    href: links.qeetInstagram,
    icon: <Instagram variant="mono" aria-hidden className="size-4" />,
  },
];

const linkClass =
  "inline-flex min-h-9 items-center rounded-sm text-caption text-muted-foreground transition-colors duration-fast hover:text-foreground focus-visible:focus-ring sm:min-h-0";

function FooterAnchor({ label, href }: FooterLink) {
  return href.startsWith("/") ? (
    <Link href={href} className={linkClass}>
      {label}
    </Link>
  ) : (
    <a href={href} className={linkClass}>
      {label}
    </a>
  );
}

export function HomeFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border-subtle bg-canvas">
      <div
        className={`${container} grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-4 lg:grid-cols-[1.4fr_repeat(4,1fr)]`}
      >
        <div className="col-span-2 flex max-w-xs flex-col gap-3 md:col-span-4 lg:col-span-1">
          <Link
            href="/"
            className="flex items-center gap-2 self-start rounded-md font-heading text-heading font-semibold text-foreground focus-visible:focus-ring"
          >
            <BrandMark height={20} />
            Qeetrix
          </Link>
          <p className="text-label font-medium text-foreground">
            One package. Every surface.
          </p>
          <p className="text-caption text-muted-foreground">
            Accessible components, tokens, foundations and patterns for building
            consistent products across the Qeet ecosystem.
          </p>
          <ul className="-ms-2 mt-1 flex gap-1">
            {socials.map(({ label, href, icon }) => (
              <li key={href}>
                <a
                  href={href}
                  aria-label={label}
                  className="inline-flex size-11 items-center justify-center rounded-md text-muted-foreground transition-colors duration-fast hover:bg-surface-interactive hover:text-foreground focus-visible:focus-ring"
                >
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-label font-semibold text-foreground">
              {column.title}
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {column.items.map((item) => (
                <li key={item.label}>
                  <FooterAnchor {...item} />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border-subtle">
        <div
          className={`${container} flex flex-wrap items-center justify-between gap-3 py-5`}
        >
          <p className="text-caption text-muted-foreground">
            © {year} Qeet Group. All rights reserved.
          </p>
          <ul className="flex gap-4">
            <li>
              <FooterAnchor label="Privacy" href={links.qeetPrivacy} />
            </li>
            <li>
              <FooterAnchor label="Terms" href={links.qeetTerms} />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
