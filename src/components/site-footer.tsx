import Link from "next/link";
import { FOOTER, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-5">
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-display font-semibold">
            <span className="inline-block size-5 rounded-md bg-brand" aria-hidden />
            Qeetrix
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            The Qeet Group design system. One install, every interface.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            {SITE.package} · v{SITE.version}
          </p>
        </div>

        {FOOTER.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-semibold text-foreground">{group.title}</h2>
            <ul className="mt-3 space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Qeet Group. Brand orange #F26D0E (OD-DS-03).</p>
          <div className="flex gap-4">
            <a href={SITE.suite} className="hover:text-foreground">
              qeet.in
            </a>
            <a href="https://docs.qeet.in" className="hover:text-foreground">
              docs.qeet.in
            </a>
            <a href={SITE.github} className="hover:text-foreground">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
