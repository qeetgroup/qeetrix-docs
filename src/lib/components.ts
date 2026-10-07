import manifest from "@qeetrix/ui/manifest.json";
import uiPackage from "@qeetrix/ui/package.json";
import componentGroups from "./component-groups.json";
import componentImports from "./component-imports.json";
import { libraryRepo } from "./site-links";

type ManifestComponent = (typeof manifest.components)[number];

export type ComponentStatus = "stable" | "beta" | "experimental" | "deprecated";

export type ComponentMeta = {
  name: string;
  status: ComponentStatus;
  importLine: string;
  deepImport: string;
  /** The component's source at the tag of the installed release, so it matches these docs. */
  sourceUrl: string;
  sourcePath: string;
  pattern: string | null;
  audit: "audited" | "partial" | "not-audited";
  group: { name: string; icon: string } | null;
};

const bySlug = new Map<string, ManifestComponent>(
  manifest.components.map((component) => [component.slug, component]),
);

export const uiVersion = uiPackage.version;

/**
 * The page-header facts for a component page, from the installed @qeetrix/ui manifest. Server
 * code only: the manifest is a quarter of a megabyte.
 */
export function getComponentMeta(slug: string): ComponentMeta | null {
  const component = bySlug.get(slug);
  if (!component) return null;
  const group = componentGroups.groups.find((entry) =>
    entry.components.includes(slug),
  );
  const sourcePath = `src/components/${component.category}/${component.slug}.tsx`;
  return {
    name: component.name,
    status: (component.deprecated
      ? "deprecated"
      : component.status) as ComponentStatus,
    // The module's real exports (scripts/generate-components.mjs): `Chart`, `Toast` and a few
    // other module names are not themselves exports.
    importLine: `import { ${(
      componentImports[slug as keyof typeof componentImports] ?? [
        component.name,
      ]
    ).join(", ")} } from "${component.import}";`,
    deepImport: component.deepImport,
    sourceUrl: `${libraryRepo}/blob/v${uiVersion}/${sourcePath}`,
    sourcePath,
    pattern: component.accessibility.pattern ?? null,
    audit: component.accessibility.audit as ComponentMeta["audit"],
    group: group ? { name: group.name, icon: group.icon } : null,
  };
}
