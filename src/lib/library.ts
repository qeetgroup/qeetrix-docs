import manifest from "@qeetrix/ui/manifest.json";
import pkg from "@qeetrix/ui/package.json";

/**
 * Facts about the installed @qeetrix/ui, read from its own package metadata and component
 * manifest at build time — so the homepage states what the documented release actually ships
 * rather than numbers typed by hand. Import it from Server Components only: the manifest is large
 * and has no business in a client bundle.
 */

type Capability = Record<string, string>;
type ManifestEntry = { capabilities: Capability };

const components = manifest.components as unknown as ManifestEntry[];
const statuses = manifest.statuses as Record<string, number>;
const audit = manifest.accessibilityAudit as Record<string, number>;

function countCapability(key: string, value: string): number {
  return components.filter((entry) => entry.capabilities[key] === value).length;
}

/** `">=19"` → `"19"`. */
function majorOf(range: string | undefined): string | null {
  return range?.match(/\d+/)?.[0] ?? null;
}

export const library = {
  name: pkg.name,
  version: pkg.version,
  componentCount: manifest.components.length,
  stable: statuses.stable ?? 0,
  beta: statuses.beta ?? 0,
  schemaVersion: manifest.schemaVersion,
  reactMajor: majorOf(
    (pkg as { peerDependencies?: Record<string, string> }).peerDependencies
      ?.react,
  ),
  audited: audit.audited ?? 0,
  rtlSupported: countCapability("rtl", "supported"),
  densitySupported: countCapability("density", "supported"),
  reducedMotionSupported: countCapability("reducedMotion", "supported"),
  clientBoundaries: countCapability("ssr", "client-boundary"),
} as const;
