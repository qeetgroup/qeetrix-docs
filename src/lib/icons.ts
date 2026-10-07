import {
  AccessibilityIcon,
  ActivityIcon,
  BellRingIcon,
  BookOpenIcon,
  CalendarClockIcon,
  CompassIcon,
  ComponentIcon,
  DownloadIcon,
  LayersIcon,
  LayoutDashboardIcon,
  LayoutTemplateIcon,
  LibraryIcon,
  MousePointerClickIcon,
  PaintbrushIcon,
  PaletteIcon,
  RocketIcon,
  RulerIcon,
  ShapesIcon,
  SparklesIcon,
  TableIcon,
  TextCursorInputIcon,
  TypeIcon,
  WrenchIcon,
} from "@qeetrix/icons";
import { createElement } from "react";
import { BrandLogo, type BrandName } from "@/components/brand-logo";

// Icons available to `icon:` in page frontmatter and meta.json, and to the `---[Icon]Name---`
// separators scripts/generate-components.mjs writes from src/lib/component-groups.json. Framework
// guides show the framework's own logo, in its colours (src/components/brand-logo.tsx).
const brandMarks: Record<string, BrandName> = {
  Nextjs: "nextjs",
  Tanstack: "tanstack",
};

const icons = {
  Accessibility: AccessibilityIcon,
  Activity: ActivityIcon,
  BellRing: BellRingIcon,
  BookOpen: BookOpenIcon,
  CalendarClock: CalendarClockIcon,
  Compass: CompassIcon,
  Component: ComponentIcon,
  Download: DownloadIcon,
  Layers: LayersIcon,
  LayoutDashboard: LayoutDashboardIcon,
  LayoutTemplate: LayoutTemplateIcon,
  Library: LibraryIcon,
  MousePointerClick: MousePointerClickIcon,
  Paintbrush: PaintbrushIcon,
  Palette: PaletteIcon,
  Rocket: RocketIcon,
  Ruler: RulerIcon,
  Shapes: ShapesIcon,
  Sparkles: SparklesIcon,
  Table: TableIcon,
  TextCursorInput: TextCursorInputIcon,
  Type: TypeIcon,
  Wrench: WrenchIcon,
};

export function resolveIcon(icon: string | undefined) {
  if (icon === undefined) return;
  if (icon in brandMarks) {
    return createElement(BrandLogo, { name: brandMarks[icon] });
  }
  if (!(icon in icons)) {
    console.warn(
      `[icons] Unknown icon "${icon}" — register it in src/lib/icons.ts.`,
    );
    return;
  }
  return createElement(icons[icon as keyof typeof icons]);
}
