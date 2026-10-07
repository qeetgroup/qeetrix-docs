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
  WorkflowIcon,
  WrenchIcon,
} from "@qeetrix/icons";
import Nextjs from "@thesvg/react/nextdotjs";
import Tanstack from "@thesvg/react/tanstack";
import { type ComponentType, createElement, type SVGProps } from "react";

// Icons available to `icon:` in page frontmatter and meta.json, and to the `---[Icon]Name---`
// separators scripts/generate-components.mjs writes from src/lib/component-groups.json. Framework
// marks come from theSVG in their one-colour drawing, so they take the sidebar's text colour.
const brandMarks: Record<
  string,
  ComponentType<SVGProps<SVGSVGElement> & { variant?: "mono" }>
> = {
  Nextjs,
  Tanstack,
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
  Workflow: WorkflowIcon,
  Wrench: WrenchIcon,
};

export function resolveIcon(icon: string | undefined) {
  if (icon === undefined) return;
  if (icon in brandMarks) {
    return createElement(brandMarks[icon], {
      variant: "mono",
      "aria-hidden": true,
    });
  }
  if (!(icon in icons)) {
    console.warn(
      `[icons] Unknown icon "${icon}" — register it in src/lib/icons.ts.`,
    );
    return;
  }
  return createElement(icons[icon as keyof typeof icons]);
}
