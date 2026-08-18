import { CopyButton } from "@/components/copy-button";

/** A titled code block with copy. (Syntax highlighting via Shiki is a later item.) */
export function CodeBlock({ code, title = "terminal" }: { code: string; title?: string }) {
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">{title}</span>
        <CopyButton value={code} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed">{code}</pre>
    </div>
  );
}
