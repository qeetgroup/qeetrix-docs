import { BookOpenIcon } from "@qeetrix/icons/icons/book-open";
import { ComponentIcon } from "@qeetrix/icons/icons/component";
import { DownloadIcon } from "@qeetrix/icons/icons/download";
import { PaletteIcon } from "@qeetrix/icons/icons/palette";
import { RocketIcon } from "@qeetrix/icons/icons/rocket";
import { ShapesIcon } from "@qeetrix/icons/icons/shapes";
import { createElement } from "react";

// Icons available to `icon:` in page frontmatter and meta.json. Each is imported from its own
// subpath: the `@qeetrix/icons` root also pulls in every brand logo, which is far too heavy.
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
