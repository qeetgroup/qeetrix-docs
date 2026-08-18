"use client";

import { Sandpack } from "@codesandbox/sandpack-react";
import { useMemo, useState } from "react";
import { getMeta } from "@/lib/component-meta";
import { EXAMPLE_CODE, EXAMPLE_SLUGS } from "@/lib/examples";
import sandbox from "@/lib/generated/sandbox.json";

const SB = sandbox as { css: string; utils: string; sources: Record<string, string> };

/**
 * Live in-browser sandbox for components that only depend on packages available
 * on the public npm CDN (cva / clsx / tailwind-merge). Base UI–backed components
 * and the full @qeetrix/ui package require the (currently unpublished) packages,
 * so they're excluded here and covered by the Controls playground instead.
 */
function eligibleSlugs(): string[] {
  return EXAMPLE_SLUGS.filter((slug) => {
    const src = SB.sources[slug];
    if (!src) return false;
    if (src.includes("lucide-react")) return false; // icon package version not on public CDN
    if (getMeta(slug)?.primitive) return false; // Base UI version not on public CDN
    return true;
  });
}

function buildFiles(slug: string): Record<string, string> {
  const src = SB.sources[slug].replace(/@\/lib\/utils/g, "./utils");
  const utils = SB.utils.replace(/@\/lib\/utils/g, "./utils");
  const lines = EXAMPLE_CODE[slug].split("\n");
  const importLine = lines[0].replace("@qeetrix/ui", "./ui");
  const body = lines.slice(1).join("\n").trim();
  const indented = body
    .split("\n")
    .map((l) => `      ${l}`)
    .join("\n");
  const app = `import "./styles.css";
${importLine}

export default function App() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", padding: 24 }}>
${indented}
    </div>
  );
}
`;
  return { "/ui.tsx": src, "/utils.ts": utils, "/styles.css": SB.css, "/App.tsx": app };
}

export function Sandbox() {
  const items = useMemo(eligibleSlugs, []);
  const [slug, setSlug] = useState(items[0] ?? "");
  const files = useMemo(() => (slug ? buildFiles(slug) : {}), [slug]);

  if (!items.length) {
    return <p className="text-sm text-muted-foreground">No components are sandbox-ready yet.</p>;
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {items.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSlug(s)}
            className={`rounded-lg border px-3 py-1.5 text-sm capitalize transition-colors ${
              s === slug
                ? "border-brand bg-brand/10 text-brand-text"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.replace(/-/g, " ")}
          </button>
        ))}
      </div>

      <Sandpack
        template="react-ts"
        files={files}
        customSetup={{
          dependencies: {
            "class-variance-authority": "^0.7.1",
            clsx: "^2.1.1",
            "tailwind-merge": "^3.0.0",
          },
        }}
        options={{ editorHeight: 460, showTabs: true, showLineNumbers: true }}
        theme="auto"
      />

      <p className="mt-3 text-xs text-muted-foreground">
        A real in-browser bundle: the component source, <code className="font-mono">cn</code>, and
        the compiled Qeetrix CSS are inlined; cva/clsx/tailwind-merge load from npm. Base UI–backed
        components run here once <code className="font-mono">@qeetrix/ui</code> is published — until
        then, use the Controls tab (which renders the real, current components).
      </p>
    </div>
  );
}
