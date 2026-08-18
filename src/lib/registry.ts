import { getMeta } from "@/lib/component-meta";
import sources from "@/lib/generated/component-source.json";
import components from "@/lib/generated/components.json";

const SITE = "https://ui.qeet.in";
const SRC = sources as unknown as Record<string, string>;

export function registrySlugs(): string[] {
  return components.components.map((c) => c.slug);
}

export function buildRegistryIndex() {
  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "qeetrix",
    homepage: SITE,
    items: components.components.map((c) => ({
      name: c.slug,
      type: "registry:ui",
      title: c.name,
      description: `${c.name} — an accessible Qeetrix component (Base UI + Tailwind v4).`,
    })),
  };
}

export function buildRegistryItem(name: string) {
  const c = components.components.find((x) => x.slug === name);
  if (!c) return null;
  const meta = getMeta(name);
  const src = SRC[name];

  const dependencies = ["clsx", "tailwind-merge"];
  if (meta?.primitive) dependencies.push("@base-ui/react");
  if (meta && Object.keys(meta.variants).length) dependencies.push("class-variance-authority");

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: "registry:ui",
    title: c.name,
    description: `${c.name} — an accessible Qeetrix component (Base UI + Tailwind v4).`,
    dependencies,
    registryDependencies: [] as string[],
    files: src ? [{ path: `components/ui/${name}.tsx`, type: "registry:ui", content: src }] : [],
  };
}
