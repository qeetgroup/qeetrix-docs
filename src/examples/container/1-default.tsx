import { Container } from "@qeetrix/ui";

/**
 * `Container` centres its content and caps its width: `max-w-4xl` at the default `content`
 * size, with responsive inline gutters. The frame is a 1280px-wide page drawn at half size so the
 * cap shows in this preview; the dashed outline is the container.
 *
 * @layout wide
 */
export default function ContainerDefault() {
  return (
    <div className="self-center overflow-hidden rounded-lg border border-border bg-background">
      {/* A 1280px-wide page, drawn at half size. */}
      <div className="w-[1280px]" style={{ zoom: 0.5 }}>
        <div className="flex h-24 items-center gap-6 border-b-2 border-border bg-card px-8">
          <span className="size-12 rounded-full bg-brand" />
          <span className="h-5 w-28 rounded-full bg-surface-sunken" />
          <span className="h-5 w-28 rounded-full bg-surface-sunken" />
          <span className="h-5 w-28 rounded-full bg-surface-sunken" />
          <span className="ms-auto size-12 rounded-full bg-surface-sunken" />
        </div>
        <div className="bg-surface-subtle py-12">
          <Container className="py-8 outline-4 outline-border-brand outline-dashed">
            <p className="mb-6 font-mono text-2xl text-muted-foreground">
              {"<Container>"} · max-w-4xl (56rem)
            </p>
            <div className="mb-4 h-12 w-1/2 rounded-xl bg-foreground/15" />
            <div className="mb-3 h-6 w-full rounded-full bg-foreground/10" />
            <div className="mb-10 h-6 w-4/5 rounded-full bg-foreground/10" />
            <div className="grid grid-cols-3 gap-6">
              <div className="h-48 rounded-2xl border-2 border-border bg-card" />
              <div className="h-48 rounded-2xl border-2 border-border bg-card" />
              <div className="h-48 rounded-2xl border-2 border-border bg-card" />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
