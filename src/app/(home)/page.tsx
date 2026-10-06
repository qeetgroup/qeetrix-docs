import { buttonVariants } from "@qeetrix/ui";
import { QeetLogo } from "@qeetrix/ui/brand";
import Link from "next/link";
import { appDescription, appName } from "@/lib/shared";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
      <QeetLogo size={56} />
      <h1 className="font-heading text-4xl font-semibold tracking-tight">
        {appName}
      </h1>
      <p className="max-w-xl text-fd-muted-foreground">{appDescription}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/docs" className={buttonVariants({ size: "lg" })}>
          Get started
        </Link>
        <Link
          href="/docs/installation"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Installation
        </Link>
      </div>
    </div>
  );
}
