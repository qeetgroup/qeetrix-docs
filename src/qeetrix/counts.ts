// What the installed packages contain, counted at build time, so the numbers the docs state can't
// drift from the release. Server-side only (it reads the file system).
import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { iconManifest } from "@qeetrix/icons/manifest";
import react from "@qeetrix/react/package.json" with { type: "json" };

/** Entry points of @qeetrix/react that aren't a component family. */
const notFamilies = new Set([
  ".",
  "./experimental",
  "./format",
  "./provider",
  "./styles.css",
  "./css/*",
  "./package.json",
]);

/** Each stable family has its own entry point (`./button`, `./tabs`…). */
const stable = Object.keys(react.exports).filter(
  (entry) => !notFamilies.has(entry) && !entry.startsWith("./locales/"),
).length;

/** Experimental families share `./experimental`; each is a folder of the built package. */
const root = dirname(createRequire(import.meta.url).resolve("@qeetrix/react/package.json"));
const experimental = readdirSync(join(root, "dist", "experimental"), {
  withFileTypes: true,
}).filter((entry) => entry.isDirectory()).length;

/** The design tokens: every CSS variable the tokens stylesheet defines, across both schemes. */
const tokensCss = readFileSync(
  createRequire(import.meta.url).resolve("@qeetrix/tokens/tokens.css"),
  "utf8",
);
const tokens = new Set(tokensCss.match(/--qx-[a-z0-9-]+(?=\s*:)/g)).size;

export const counts = {
  stable,
  experimental,
  components: stable + experimental,
  icons: iconManifest.icons.length,
  tokens,
} as const;
