import { BookOpenIcon } from "@qeetrix/icons/icons/book-open";
import { ComponentIcon } from "@qeetrix/icons/icons/component";
import { DownloadIcon } from "@qeetrix/icons/icons/download";
import { PaletteIcon } from "@qeetrix/icons/icons/palette";
import { RocketIcon } from "@qeetrix/icons/icons/rocket";
import { ShapesIcon } from "@qeetrix/icons/icons/shapes";
import { createElement } from "react";

// Icons available to `icon:` in page frontmatter and meta.json. Each is imported from its own
// subpath. Next's bundler tree-shakes a root import just as well, but anything that runs this
// file unbundled (a script, a test) would load the whole package from the root: over a minute in
// plain Node with @qeetrix/icons 1.0.x, which still bundles 7,429 brand logos, and about 1.6 s
// from 2.0, which drops them.
const icons = {
  BookOpen: BookOpenIcon,
  Component: ComponentIcon,
  Download: DownloadIcon,
  Palette: PaletteIcon,
  Rocket: RocketIcon,
  Shapes: ShapesIcon,
};

export function resolveIcon(icon: string | undefined) {
  if (icon === undefined) return;
  if (!(icon in icons)) {
    console.warn(
      `[icons] Unknown icon "${icon}" — register it in src/lib/icons.ts.`,
    );
    return;
  }
  return createElement(icons[icon as keyof typeof icons]);
}
