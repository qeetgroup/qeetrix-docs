// Content-pipeline for ui.qeet.in (spec §D2, "one source, many surfaces").
// Generates component data, component metadata (variants/anatomy/data-slots),
// and token data straight from @qeetrix/ui so the docs never drift.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const here = dirname(fileURLToPath(import.meta.url));
const uiRoot = join(here, "..", "..", "..", "packages", "qeetrix-ui");
const outDir = join(here, "..", "src", "lib", "generated");
mkdirSync(outDir, { recursive: true });

const readJson = (p, fallback) => {
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return fallback;
  }
};

// --- Components (from the @qeetrix/ui manifest — the single source of truth) ---
const manifest = readJson(join(uiRoot, "component-manifest.json"), { count: 0, components: [] });
const components = {
  version: manifest.version ?? null,
  count: manifest.count ?? manifest.components?.length ?? 0,
  components: manifest.components ?? [],
};
writeFileSync(join(outDir, "components.json"), JSON.stringify(components, null, 2));

// --- Component metadata: variants, exports, data-slots (parsed from source) ---
const compDir = join(uiRoot, "src", "components", "ui");
const unquote = (s) => s.replace(/^['"`]|['"`]$/g, "");
const hasExport = (node) => {
  const mods = ts.canHaveModifiers?.(node) ? ts.getModifiers(node) : node.modifiers;
  return !!mods?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
};

function parseComponent(src, filePath) {
  const sf = ts.createSourceFile(filePath, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const exportsSet = new Set();
  const dataSlots = new Set();
  const variants = {};
  const defaults = {};
  const functions = {};
  const internalImports = new Set();
  let primitive;

  // Capture a component function's own props: the destructured parameter names,
  // whether it spreads a rest (…props) to the underlying element, and the props
  // type annotation text (e.g. "ButtonPrimitive.Props & VariantProps<…>").
  const captureFn = (name, params) => {
    if (!/^[A-Z]/.test(name) || functions[name]) return;
    const p = params?.[0];
    const info = { params: [], hasRest: false, propsType: p?.type ? p.type.getText(sf) : null };
    if (p?.name && ts.isObjectBindingPattern(p.name)) {
      for (const el of p.name.elements) {
        if (el.dotDotDotToken) info.hasRest = true;
        else if (ts.isIdentifier(el.name)) info.params.push(el.name.text);
      }
    }
    functions[name] = info;
  };

  const visit = (node) => {
    if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)) {
      for (const el of node.exportClause.elements) {
        const n = el.name.text;
        if (/^[A-Z]/.test(n)) exportsSet.add(n); // components/subcomponents, skip *Variants helpers below
      }
    }
    if (
      (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) &&
      node.name &&
      hasExport(node)
    ) {
      if (/^[A-Z]/.test(node.name.text)) exportsSet.add(node.name.text);
    }
    if (ts.isVariableStatement(node) && hasExport(node)) {
      for (const d of node.declarationList.declarations)
        if (ts.isIdentifier(d.name) && /^[A-Z]/.test(d.name.text)) exportsSet.add(d.name.text);
    }
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const m = node.moduleSpecifier.text;
      if (m.startsWith("@base-ui/react")) primitive = m;
      if (m.startsWith("@/") || m.startsWith("./") || m.startsWith("../")) internalImports.add(m);
    }
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "cva"
    ) {
      const cfg = node.arguments[1];
      if (cfg && ts.isObjectLiteralExpression(cfg)) {
        for (const prop of cfg.properties) {
          if (!ts.isPropertyAssignment(prop)) continue;
          const key = unquote(prop.name.getText(sf));
          if (key === "variants" && ts.isObjectLiteralExpression(prop.initializer)) {
            for (const g of prop.initializer.properties) {
              if (ts.isPropertyAssignment(g) && ts.isObjectLiteralExpression(g.initializer)) {
                const group = unquote(g.name.getText(sf));
                const options = g.initializer.properties
                  .map((o) => (o.name ? unquote(o.name.getText(sf)) : ""))
                  .filter(Boolean);
                if (options.length) variants[group] = { options };
              }
            }
          }
          if (key === "defaultVariants" && ts.isObjectLiteralExpression(prop.initializer)) {
            for (const dv of prop.initializer.properties)
              if (ts.isPropertyAssignment(dv))
                defaults[unquote(dv.name.getText(sf))] = unquote(dv.initializer.getText(sf));
          }
        }
      }
    }
    if (
      ts.isJsxAttribute(node) &&
      node.name.getText(sf) === "data-slot" &&
      node.initializer &&
      ts.isStringLiteral(node.initializer)
    ) {
      dataSlots.add(node.initializer.text);
    }
    if (ts.isFunctionDeclaration(node) && node.name) captureFn(node.name.text, node.parameters);
    if (ts.isVariableStatement(node)) {
      for (const d of node.declarationList.declarations) {
        if (
          ts.isIdentifier(d.name) &&
          d.initializer &&
          (ts.isArrowFunction(d.initializer) || ts.isFunctionExpression(d.initializer))
        ) {
          captureFn(d.name.text, d.initializer.parameters);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);

  for (const g in defaults) if (variants[g]) variants[g].default = defaults[g];
  return {
    exports: [...exportsSet].sort(),
    dataSlots: [...dataSlots].sort(),
    variants,
    functions,
    internalImports: [...internalImports],
    primitive: primitive ?? null,
  };
}

const meta = {};
const sources = {};
let metaCount = 0;
try {
  for (const file of readdirSync(compDir)) {
    if (!file.endsWith(".tsx") || file.endsWith(".test.tsx")) continue;
    const slug = file.replace(/\.tsx$/, "");
    const raw = readFileSync(join(compDir, file), "utf8");
    meta[slug] = parseComponent(raw, file);
    sources[slug] = raw;
    metaCount++;
  }
} catch (e) {
  console.warn("component-meta: skipped —", e.message);
}

// --- Resolve real prop TYPES for the captured params via the TS type checker ---
// Best-effort: only resolves types for the destructured params we already found,
// so it stays fast and relevant (not the hundreds of inherited DOM props).
try {
  let cfgPath = join(uiRoot, "tsconfig.build.json");
  if (!existsSync(cfgPath)) cfgPath = join(uiRoot, "tsconfig.json");
  const cfgRaw = ts.readConfigFile(cfgPath, ts.sys.readFile).config;
  const parsed = ts.parseJsonConfigFileContent(cfgRaw, ts.sys, uiRoot);
  const program = ts.createProgram(parsed.fileNames, {
    ...parsed.options,
    noEmit: true,
    skipLibCheck: true,
    incremental: false,
    composite: false,
  });
  const checker = program.getTypeChecker();
  const t0 = Date.now();
  let resolved = 0;

  for (const [slug, m] of Object.entries(meta)) {
    const sf = program.getSourceFile(join(compDir, `${slug}.tsx`));
    if (!sf) continue;

    const resolveFor = (name, paramNode) => {
      const fn = m.functions[name];
      if (!fn || !paramNode || !fn.params.length) return;
      const wanted = new Set(fn.params);
      try {
        const ptype = checker.getTypeAtLocation(paramNode);
        const types = {};
        for (const prop of checker.getPropertiesOfType(ptype)) {
          const nm = prop.getName();
          if (!wanted.has(nm)) continue;
          const pt = checker.getTypeOfSymbolAtLocation(prop, paramNode);
          let s = checker
            .typeToString(pt, paramNode, ts.TypeFormatFlags.NoTruncation)
            .replace(/\s+/g, " ")
            .trim();
          if (s.length > 90) s = `${s.slice(0, 87)}…`;
          types[nm] = { type: s, optional: !!(prop.flags & ts.SymbolFlags.Optional) };
        }
        if (Object.keys(types).length) {
          fn.paramTypes = types;
          resolved++;
        }
      } catch {
        /* per-function best-effort */
      }
    };

    const walk = (node) => {
      if (ts.isFunctionDeclaration(node) && node.name)
        resolveFor(node.name.text, node.parameters[0]);
      else if (ts.isVariableStatement(node)) {
        for (const d of node.declarationList.declarations) {
          if (
            ts.isIdentifier(d.name) &&
            d.initializer &&
            (ts.isArrowFunction(d.initializer) || ts.isFunctionExpression(d.initializer))
          ) {
            resolveFor(d.name.text, d.initializer.parameters[0]);
          }
        }
      }
      ts.forEachChild(node, walk);
    };
    walk(sf);
  }
  console.log(`  ✔ resolved prop types for ${resolved} functions in ${Date.now() - t0}ms`);
} catch (e) {
  console.warn("prop-type resolution skipped:", e.message);
}

writeFileSync(join(outDir, "component-meta.json"), JSON.stringify(meta, null, 2));
// Raw source per component — powers the shadcn-compatible registry (/r/*).
writeFileSync(join(outDir, "component-source.json"), JSON.stringify(sources, null, 2));

// --- Sandbox assets: compiled CSS + cn util + self-contained component sources ---
// Only components whose sole internal import is `@/lib/utils` (cn) can render in
// an in-browser Sandpack (their other deps — Base UI, cva, lucide — are on npm).
try {
  const css = readFileSync(join(uiRoot, "dist", "index.css"), "utf8");
  const utils = readFileSync(join(uiRoot, "src", "lib", "utils.ts"), "utf8");
  const ALLOWED = new Set(["@/lib/utils"]);
  const sandboxSources = {};
  for (const [slug, m] of Object.entries(meta)) {
    if ((m.internalImports ?? []).every((i) => ALLOWED.has(i)) && sources[slug]) {
      sandboxSources[slug] = sources[slug];
    }
  }
  writeFileSync(
    join(outDir, "sandbox.json"),
    JSON.stringify({ css, utils, sources: sandboxSources }, null, 2),
  );
  console.log(
    `  ✔ sandbox assets: ${Object.keys(sandboxSources).length} self-contained components`,
  );
} catch (e) {
  console.warn("sandbox assets skipped:", e.message);
}

// --- Tokens (full resolved values, consumed by the token explorer) ---
const countLeaves = (o) => {
  let n = 0;
  for (const v of Object.values(o ?? {})) n += v && typeof v === "object" ? countLeaves(v) : 1;
  return n;
};
const tokens = readJson(join(uiRoot, "dist", "styles", "tokens.json"), { light: {}, dark: {} });
const categories = Object.keys(tokens.light ?? {}).sort();
writeFileSync(
  join(outDir, "tokens.json"),
  JSON.stringify({ light: tokens.light ?? {}, dark: tokens.dark ?? {} }, null, 2),
);
const total = countLeaves(tokens.light);

console.log(
  `✔ generated: ${components.count} components, ${metaCount} parsed (variants/anatomy), ${categories.length} token categories (${total} tokens)`,
);
