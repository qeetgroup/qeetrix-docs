import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import type * as PageTree from "fumadocs-core/page-tree";
import { type LoaderPlugin, llms, loader } from "fumadocs-core/source";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { applyMdxPreset } from "fumadocs-mdx/config";
import { defineDocs } from "fumadocs-mdx/macro";
import { qeetrixCodeTheme, transformerLanguage } from "./code-theme";
import { resolveIcon } from "./icons";
import { docsRoute } from "./shared";

/** An `npm install` / `npx` line in another package manager's words. */
function packageCommand(manager: "bun" | "npm" | "pnpm" | "yarn") {
  const add = {
    bun: "bun add",
    npm: "npm install",
    pnpm: "pnpm add",
    yarn: "yarn add",
  };
  const exec = { bun: "bunx", npm: "npx", pnpm: "pnpm dlx", yarn: "yarn dlx" };
  return (code: string) =>
    code
      .split("\n")
      .map((line) =>
        line
          .replace(/^npm (?:install|i)\b/, add[manager])
          .replace(/^npx\b/, exec[manager]),
      )
      .join("\n");
}

const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
    // Fumadocs' preset, with code in the Qeetrix palette (src/lib/code-theme.ts), each block's
    // language recorded for its header, and ```npm blocks as package-manager tabs, Bun first —
    // the reader's choice is remembered across pages.
    mdxOptions: applyMdxPreset({
      rehypeCodeOptions: {
        ...rehypeCodeDefaultOptions,
        themes: { light: qeetrixCodeTheme, dark: qeetrixCodeTheme },
        transformers: [
          ...(rehypeCodeDefaultOptions.transformers ?? []),
          transformerLanguage(),
        ],
      },
      remarkNpmOptions: {
        persist: { id: "package-manager" },
        packageManagers: (["bun", "npm", "pnpm", "yarn"] as const).map(
          (name) => ({ name, command: packageCommand(name) }),
        ),
      },
    }),
  },
  meta: {
    schema: metaSchema,
  },
});

/**
 * Turns each `---[Icon]Name---` separator in a folder's meta.json, with the pages after it, into a
 * collapsible folder of the same name and icon — the component groups that
 * scripts/generate-components.mjs writes from src/lib/component-groups.json. Groups start closed;
 * the sidebar opens the one holding the current page. The pages stay where they are, so their
 * URLs don't change.
 */
function collapsibleGroups(): LoaderPlugin {
  return {
    name: "qeetrix:collapsible-groups",
    transformPageTree: {
      folder(node) {
        if (!node.children.some((child) => child.type === "separator")) {
          return node;
        }
        const children: PageTree.Node[] = [];
        let group: PageTree.Folder | undefined;
        for (const child of node.children) {
          if (child.type === "separator") {
            group = {
              type: "folder",
              $id: `${node.$id ?? "folder"}/group:${String(child.name)}`,
              name: child.name,
              icon: child.icon,
              collapsible: true,
              defaultOpen: false,
              children: [],
            };
            children.push(group);
          } else if (group) {
            group.children.push(child);
          } else {
            children.push(child);
          }
        }
        return { ...node, children };
      },
    },
  };
}

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  icon: resolveIcon,
  plugins: [collapsibleGroups()],
});

export const docsLlms = llms(source, {
  renderPage: async (page) => `# ${page.data.title} (${page.url})

${await page.data.getText("processed")}`,
});
