import { buttonVariants } from "@qeetrix/ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-32 text-center">
      <p className="font-mono text-sm text-brand-text">404</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonVariants()}>
          Back home
        </Link>
        <Link href="/components" className={buttonVariants({ variant: "outline" })}>
          Browse components
        </Link>
      </div>
    </div>
  );
}
