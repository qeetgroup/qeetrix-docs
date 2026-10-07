import {
  BookOpenIcon,
  ComponentIcon,
  DownloadIcon,
  LayoutTemplateIcon,
  LibraryIcon,
  PaletteIcon,
  RocketIcon,
  ShapesIcon,
} from "@qeetrix/icons";
import { createElement } from "react";

// Icons available to `icon:` in page frontmatter and meta.json.
const icons = {
  BookOpen: BookOpenIcon,
  Component: ComponentIcon,
  Download: DownloadIcon,
  LayoutTemplate: LayoutTemplateIcon,
  Library: LibraryIcon,
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
