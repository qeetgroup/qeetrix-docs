import { ServerCodeBlock } from "fumadocs-ui/components/codeblock.rsc";
import { library } from "@/lib/library";
import { LiveShowcase } from "./live-showcase";
import { container, SectionHeader } from "./section";
import { showcaseCode } from "./showcase-code";

/** Section 3. The code views are highlighted here, at build time, and handed to the client. */
export function ComponentShowcase() {
  const code = Object.fromEntries(
    Object.entries(showcaseCode).map(([id, source]) => [
      id,
      <ServerCodeBlock key={id} code={source} lang="tsx" />,
    ]),
  ) as Record<keyof typeof showcaseCode, React.ReactNode>;

  return (
    <section
      id="showcase"
      aria-labelledby="showcase-title"
      className={`${container} flex scroll-mt-24 flex-col gap-8 pt-6 pb-14`}
    >
      <SectionHeader
        id="showcase-title"
        title="Not a screenshot. Your next interface."
        description="Real Qeetrix components, from everyday inputs to complete product patterns."
      />
      <div data-home-reveal data-home-delay="80">
        <LiveShowcase code={code} version={library.version} />
      </div>
    </section>
  );
}
