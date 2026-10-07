import { Container } from "@qeetrix/ui";

const sizes = [
  { size: "prose", max: "42rem", use: "Readable text" },
  { size: "content", max: "56rem", use: "Standard pages (default)" },
  { size: "wide", max: "72rem", use: "Operational layouts" },
  { size: "full", max: "No cap", use: "The parent owns the width" },
] as const;

/**
 * `size` picks the cap: `prose` for readable text, `content` for standard pages, `wide` for
 * operational layouts, and `full` only when the parent owns the width. The frame is a 1280px-wide
 * page drawn at half size.
 *
 * @layout wide
 */
export default function ContainerSizes() {
  return (
    <div className="self-center overflow-hidden rounded-lg border border-border bg-surface-subtle">
      {/* A 1280px-wide page, drawn at half size. */}
      <div
        className="flex w-[1280px] flex-col gap-6 py-12"
        style={{ zoom: 0.5 }}
      >
        {sizes.map((entry) => (
          <Container key={entry.size} size={entry.size}>
            <div className="flex items-center justify-between gap-6 rounded-2xl border-4 border-border-brand border-dashed bg-brand-subtle px-8 py-6 text-2xl">
              <span className="font-mono font-medium">
                size="{entry.size}" · {entry.max}
              </span>
              <span className="text-muted-foreground">{entry.use}</span>
            </div>
          </Container>
        ))}
      </div>
    </div>
  );
}
