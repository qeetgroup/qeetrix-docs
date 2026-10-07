/**
 * Writes the component reference — one page per @qeetrix/ui component, plus an overview — to
 * content/docs/components/, from the component manifest the installed package publishes, so the
 * pages match the library they document. Runs before `dev` and `build`.
 *
 * Each page's frontmatter and everything between the generated markers are rewritten on every
 * run. Anything written below the end marker (examples, guidance) is kept. A page whose component
 * has left the manifest is deleted, unless it has hand-written content, which is reported instead.
 *
 *   bun run generate:components
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const outDir = join(root, "content/docs/components");
const require = createRequire(import.meta.url);
const pkgDir = dirname(require.resolve("@qeetrix/ui/package.json"));
const pkg = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8"));
const manifest = JSON.parse(
  readFileSync(require.resolve("@qeetrix/ui/manifest.json"), "utf8"),
);

const START = "{/* qeetrix:generated:start";
const END = "{/* qeetrix:generated:end */}";
const startMarker = `${START} — rewritten from @qeetrix/ui's component manifest by \`bun run generate:components\`. Write your own sections below the end marker. */}`;

// ---------------------------------------------------------------------------------------------
// Descriptions: the first sentence of each component's doc comment in the published types.

function listFiles(dir, suffix) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...listFiles(path, suffix));
    else if (entry.name.endsWith(suffix)) files.push(path);
  }
  return files;
}

const declarations = listFiles(join(pkgDir, "dist/components"), ".d.ts")
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");

const ABBREVIATIONS = new Set(["a.k.a.", "e.g.", "i.e.", "etc.", "vs.", "cf."]);

function description(name) {
  const doc = new RegExp(
    String.raw`/\*\*((?:(?!\*/)[\s\S])*)\*/\s*(?:export\s+)?declare\s+(?:function|const)\s+${name}\b`,
  ).exec(declarations)?.[1];
  if (!doc) return null;
  const text = doc
    .split("\n")
    .map((line) => line.replace(/^\s*\*\s?/, "").trim())
    .join(" ")
    .replace(/\{@link\s+([^}\s]+)[^}]*\}/g, "$1")
    .replace(/\s*\(Gap \d+\)/g, "") // internal tracking references
    .replace(/\s+/g, " ")
    .trim();
  // Up to the first sentence end outside a code span, skipping abbreviations such as "e.g.".
  let inCode = false;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "`") inCode = !inCode;
    if (
      inCode ||
      text[i] !== "." ||
      (i < text.length - 1 && text[i + 1] !== " ")
    )
      continue;
    const word = text
      .slice(text.lastIndexOf(" ", i) + 1, i + 1)
      .replace(/^\(/, "");
    if (!ABBREVIATIONS.has(word.toLowerCase())) return text.slice(0, i + 1);
  }
  return text || null;
}

// ---------------------------------------------------------------------------------------------
// Formatting

/** Prose safe in MDX: `{`, `}`, `<` and `>` escaped outside code spans. */
function mdx(text) {
  return text
    .split(/(`[^`]*`)/)
    .map((part, index) =>
      index % 2 ? part : part.replace(/[{}<>]/g, (ch) => `\\${ch}`),
    )
    .join("");
}

const code = (value) => `\`${value}\``;
const list = (values) => values.map(code).join(" · ");
const kbd = (key) =>
  `<kbd>${key
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")}</kbd>`;
const yaml = (value) => JSON.stringify(value);
const bySlug = new Map(
  manifest.components.map((component) => [component.name, component.slug]),
);
const link = (name) =>
  bySlug.has(name)
    ? `[${name}](/docs/components/${bySlug.get(name)})`
    : code(name);

const STATUS = {
  stable: "Stable",
  beta: "Beta",
  experimental: "Experimental",
  deprecated: "Deprecated",
};
const SUPPORT = {
  supported: "Supported",
  unsupported: "Not supported",
  "not-applicable": "Not applicable",
  unknown: "Not declared",
  "server-safe": "Renders on the server",
  "client-boundary": "Client component",
};
const AUDIT = {
  audited: "Audited",
  partial: "Partly audited",
  "not-audited": "Not yet audited",
};
const RESULT = {
  pass: "Pass",
  partial: "Partial",
  "not-applicable": "Not applicable",
  "not-audited": "Not audited",
};
const DIMENSIONS = {
  semantic: "Semantics",
  name: "Accessible name",
  keyboard: "Keyboard",
  focus: "Focus",
  screenReader: "Screen reader",
  rtl: "Right-to-left",
  reducedMotion: "Reduced motion",
  forcedColors: "Forced colours",
  contrast: "Contrast",
};
const FOCUS = {
  sequential: "Each control is a Tab stop, in order.",
  roving:
    "One Tab stop for the group; arrow keys move between items (roving tab stop).",
  "active-descendant":
    "Focus stays on the input; arrow keys move the active option (`aria-activedescendant`).",
  none: "No focus management of its own.",
};
const TESTS = {
  unit: "unit",
  accessibility: "accessibility (axe)",
  interaction: "interaction",
  visual: "visual",
  hydration: "hydration",
};

function table(head, rows) {
  return [
    `| ${head.join(" | ")} |`,
    `| ${head.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");
}

// ---------------------------------------------------------------------------------------------
// Pages

function componentPage(c) {
  const out = [];
  if (c.deprecated && c.deprecation) {
    const d = c.deprecation;
    const parts = [mdx(d.reason ?? "")];
    if (d.replacement) parts.push(`Use ${link(d.replacement)} instead.`);
    if (d.migration) parts.push(mdx(d.migration));
    if (d.removeIn) parts.push(`It will be removed in ${d.removeIn}.`);
    out.push(
      `<Callout type="warn" title="Deprecated${d.since ? ` since ${d.since}` : ""}">`,
      `  ${parts.filter(Boolean).join(" ")}`,
      "</Callout>",
      "",
    );
  } else if (c.status === "beta" || c.status === "experimental") {
    out.push(
      `<Callout title="${STATUS[c.status]}">`,
      "  Ready to use, but its API may still change before it is marked stable.",
      "</Callout>",
      "",
    );
  }

  out.push(
    "## Import",
    "",
    "```tsx",
    `import { ${c.name} } from "${c.import}";`,
    "```",
    "",
    `It can also be imported on its own from ${code(c.deepImport)}.`,
    "",
  );

  const props = [];
  if (c.api.variants?.length)
    props.push([code("variant"), list(c.api.variants)]);
  if (c.api.sizes?.length) props.push([code("size"), list(c.api.sizes)]);
  if (props.length)
    out.push("## Variants", "", table(["Prop", "Values"], props), "");

  if (c.api.controlled?.length) {
    out.push(
      "## Controlled and uncontrolled",
      "",
      "Pass the value prop to control it, or the default prop to let the component own it.",
      "",
      table(
        ["Value", "Default", "Change"],
        c.api.controlled.map((p) => [
          code(p.value),
          code(p.default),
          code(p.change),
        ]),
      ),
      "",
    );
  }

  if (c.states?.length) out.push("## States", "", list(c.states), "");

  out.push(
    "## Support",
    "",
    table(
      ["Feature", "Status"],
      [
        ["Right-to-left", SUPPORT[c.capabilities.rtl]],
        ["Dark mode", SUPPORT[c.capabilities.darkMode]],
        ["Density", SUPPORT[c.capabilities.density]],
        ["Server rendering", SUPPORT[c.capabilities.ssr]],
        ["Reduced motion", SUPPORT[c.capabilities.reducedMotion]],
      ],
    ),
    "",
  );

  const a = c.accessibility;
  out.push("## Accessibility", "");
  out.push(
    a.pattern && a.pattern !== "none"
      ? `Follows the WAI-ARIA ${code(a.pattern)} pattern. ${AUDIT[a.audit]}.`
      : `No ARIA widget pattern. ${AUDIT[a.audit]}.`,
    "",
  );
  if (a.audit !== "not-audited") {
    out.push(
      table(
        ["Check", "Result"],
        Object.entries(a.dimensions).map(([key, value]) => [
          DIMENSIONS[key] ?? key,
          RESULT[value] ?? value,
        ]),
      ),
      "",
    );
  }
  if (a.keyboard?.length)
    out.push(`**Keyboard:** ${a.keyboard.map(kbd).join(" ")}`, "");
  if (a.focus) {
    const extras = [
      a.focus.contained && "focus is contained",
      a.focus.restored && "focus returns on close",
    ].filter(Boolean);
    out.push(
      `**Focus:** ${FOCUS[a.focus.model] ?? a.focus.model}${extras.length ? ` While open, ${extras.join(" and ")}.` : ""}`,
      "",
    );
  }
  if (a.liveRegion)
    out.push(
      `**Live region:** announced ${a.liveRegion === "assertive" ? "assertively" : "politely"}.`,
      "",
    );
  if (a.exceptions) {
    for (const [key, text] of Object.entries(a.exceptions)) {
      out.push(
        `**Known limitation (${(DIMENSIONS[key] ?? key).toLowerCase()}):** ${mdx(text)}`,
        "",
      );
    }
  }

  const tests = Object.entries(c.testing ?? {})
    .filter(([, on]) => on)
    .map(([key]) => TESTS[key] ?? key);
  if (tests.length) {
    const last = tests.pop();
    out.push(
      "## Tests",
      "",
      `Covered by ${tests.length ? `${tests.join(", ")} and ${last}` : last} tests.`,
      "",
    );
  }

  return out.join("\n").trimEnd();
}

function overviewPage() {
  const components = [...manifest.components].sort((x, y) =>
    x.name.localeCompare(y.name),
  );
  const counts = Object.entries(manifest.statuses ?? {})
    .filter(([, n]) => n > 0)
    .map(([status, n]) => `${n} ${STATUS[status]?.toLowerCase() ?? status}`);
  const last = counts.pop();
  return [
    `\`@qeetrix/ui\` ${pkg.version} has ${components.length} components: ${counts.join(", ")} and ${last}. Each page lists its import, variants, states, support and accessibility, generated from the package's component manifest.`,
    "",
    table(
      ["Component", "Status", "Accessibility"],
      components.map((c) => [
        link(c.name),
        STATUS[c.status] ?? c.status,
        AUDIT[c.accessibility.audit],
      ]),
    ),
  ].join("\n");
}

function render(frontmatter, body, tail) {
  const head = [
    "---",
    ...Object.entries(frontmatter)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${yaml(v)}`),
    "---",
  ];
  return `${[...head, "", startMarker, "", body, "", END].join("\n")}\n${tail}`;
}

/** Hand-written content after the end marker of an existing page, or "". */
function tailOf(file) {
  if (!existsSync(file)) return "";
  const text = readFileSync(file, "utf8");
  const at = text.indexOf(END);
  return at === -1 ? "" : text.slice(at + END.length).replace(/^\n/, "");
}

mkdirSync(outDir, { recursive: true });
const written = new Set(["index.mdx"]);
const indexFile = join(outDir, "index.mdx");
writeFileSync(
  indexFile,
  render(
    {
      title: "Components",
      description:
        "Every component in @qeetrix/ui, with its import, variants, states, support and accessibility.",
    },
    overviewPage(),
    tailOf(indexFile),
  ),
);
for (const c of manifest.components) {
  const name = `${c.slug}.mdx`;
  const file = join(outDir, name);
  written.add(name);
  writeFileSync(
    file,
    render(
      { title: c.name, description: description(c.name) },
      componentPage(c),
      tailOf(file),
    ),
  );
}
// Formatted the way Biome formats it, so generated files pass `bun run lint`.
writeFileSync(
  join(outDir, "meta.json"),
  '{\n  "title": "Components",\n  "icon": "Component",\n  "pages": ["index", "..."]\n}\n',
);

const kept = [];
for (const name of readdirSync(outDir)) {
  if (!name.endsWith(".mdx") || written.has(name)) continue;
  const file = join(outDir, name);
  if (tailOf(file).trim()) kept.push(name);
  else if (readFileSync(file, "utf8").includes(START)) rmSync(file);
}
console.log(
  `✔ ${manifest.components.length} component pages + overview from @qeetrix/ui ${pkg.version}`,
);
if (kept.length) {
  console.warn(
    `⚠ no longer in the manifest, kept for their hand-written content: ${kept.join(", ")}`,
  );
}
