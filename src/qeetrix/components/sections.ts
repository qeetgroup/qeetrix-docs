// A component page's sections, tab by tab: what On this page lists and what each section is
// numbered, so the tabs (tabs/*.astro) and the page agree. And where each tab leads next.
import { categories, componentHref } from "../docs/components";
import { packages } from "../packages";
import { type ComponentDoc, TABS, type Tab } from "./types";

export interface SectionItem {
  id: string;
  label: string;
}

export const idOf = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** The sections of one tab, in order. A playground leads the examples when there is one. */
export function sectionsOf(doc: ComponentDoc, tab: Tab, playground = false): SectionItem[] {
  switch (tab) {
    case "examples":
      return [
        ...(playground ? [{ id: "playground", label: "Playground" }] : []),
        ...doc.examples.map((example) => ({ id: example.id, label: example.title })),
      ];
    case "usage":
      return [
        { id: "when-to-use", label: "When to use" },
        { id: "anatomy", label: "Anatomy" },
        { id: "do-and-dont", label: "Do and don't" },
        ...(doc.usage.sizes ? [{ id: "sizes", label: "Sizes" }] : []),
        { id: "content", label: "Content" },
        { id: "related", label: "Related" },
      ];
    case "api":
      return [
        { id: "import", label: "Import" },
        { id: "props", label: "Props" },
        { id: "parts", label: "Parts" },
        ...doc.api.recipes.map((recipe) => ({ id: idOf(recipe.title), label: recipe.title })),
      ];
    case "accessibility":
      return [
        // A static component (a badge, an avatar) takes no keys: no Keyboard section.
        ...(doc.accessibility.keyboard.length ? [{ id: "keyboard", label: "Keyboard" }] : []),
        { id: "behaviour", label: "Behaviour" },
        { id: "tested", label: "Tested" },
      ];
    case "changelog":
      return doc.changelog.map((entry) => ({
        id: `v${entry.version.replaceAll(".", "-")}`,
        label: entry.version,
      }));
  }
}

/** A section's number on its tab: "01". */
export const numberOf = (sections: SectionItem[], id: string) =>
  String(sections.findIndex((section) => section.id === id) + 1).padStart(2, "0");

/** A tab's address. */
export const tabHref = (doc: ComponentDoc, tab: Tab) => {
  const path = TABS.find((entry) => entry.id === tab)?.path ?? "";
  return `${componentHref(doc.name)}${path ? `/${path}` : ""}`;
};

/** What follows a tab: the next tab, and after the last, the next component in the navigation. */
export function nextOf(
  doc: ComponentDoc,
  tab: Tab,
): { href: string; label: string; title: string } | undefined {
  const at = TABS.findIndex((entry) => entry.id === tab);
  const following = TABS[at + 1];
  if (following)
    return {
      href: tabHref(doc, following.id),
      label: `Next — ${doc.name}`,
      title: following.label,
    };
  const all = categories.flatMap((category) =>
    category.items.map((item) => ({ ...item, category: category.name })),
  );
  const here = all.findIndex((item) => item.name === doc.name);
  const after = all[here + 1];
  return after
    ? { href: componentHref(after.name), label: `Next — ${after.category}`, title: after.name }
    : undefined;
}

/** Where a component imports from: the package, or its experimental entry. */
export const moduleOf = (doc: ComponentDoc) =>
  doc.status === "experimental" ? `${packages.react.name}/experimental` : packages.react.name;
