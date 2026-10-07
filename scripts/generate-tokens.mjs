/**
 * Writes src/lib/token-utilities.json from the installed @qeetrix/ui stylesheet, for the
 * Foundations pages:
 *
 * - `utilities`: for each `--qx-*` variable, the Tailwind theme variables mapped to it, e.g.
 *   `--color-canvas: var(--qx-color-surface-canvas)` gives `bg-canvas`, `text-canvas`, …
 * - `theme`: every theme variable the stylesheet defines, such as `font-heading`.
 *
 * Runs before `dev` and `build`; the output is generated, not committed.
 *
 *   bun run generate:tokens
 */
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const require = createRequire(import.meta.url);
const pkgDir = dirname(require.resolve("@qeetrix/ui/package.json"));
const css = readFileSync(join(pkgDir, "dist/styles/index.css"), "utf8");

const start = css.indexOf("@theme inline {");
if (start === -1)
  throw new Error("@qeetrix/ui's stylesheet has no `@theme inline` block.");
const theme = css.slice(start, css.indexOf("\n}\n", start));

const utilities = {};
const names = new Set();
for (const [, name, value] of theme.matchAll(
  /--([a-z0-9-]+)\s*:\s*([^;]+);/g,
)) {
  names.add(name);
  const target = /^var\(--(qx-[a-z0-9-]+)\)$/.exec(value.trim())?.[1];
  if (target) {
    utilities[target] ??= [];
    utilities[target].push(name);
  }
}

writeFileSync(
  join(root, "src/lib/token-utilities.json"),
  `${JSON.stringify({ utilities, theme: [...names].sort() }, null, 2)}\n`,
);
console.log(
  `✔ ${Object.keys(utilities).length} token → utility mappings from @qeetrix/ui's theme`,
);
