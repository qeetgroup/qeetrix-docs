export type Lesson = { title: string; href: string };

export type Track = {
  slug: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export const TRACKS: Track[] = [
  {
    slug: "fundamentals",
    title: "Fundamentals",
    description:
      "Install @qeetrix/ui, wire up the theme, and render your first components. The shortest path from an empty app to a working Qeetrix surface.",
    lessons: [
      { title: "Install @qeetrix/ui", href: "/docs/installation" },
      { title: "Getting started", href: "/docs/getting-started" },
      { title: "Browse the component catalogue", href: "/components" },
      { title: "Render your first Button", href: "/components/button" },
      { title: "Understand design tokens", href: "/tokens" },
    ],
  },
  {
    slug: "forms-and-validation",
    title: "Forms & validation",
    description:
      "Compose accessible forms with fields, inputs, and inline error handling — then see them in context inside the auth block.",
    lessons: [
      { title: "The Form primitive", href: "/components/form" },
      { title: "Labels, help, and errors with Field", href: "/components/field" },
      { title: "Text input", href: "/components/input" },
      { title: "Select menus", href: "/components/select" },
      { title: "Checkboxes and consent", href: "/components/checkbox" },
      { title: "Forms in context: the auth block", href: "/blocks/auth" },
    ],
  },
  {
    slug: "theming-and-brand",
    title: "Theming & brand",
    description:
      "Drive light and dark, and re-point the brand token to make Qeetrix your own. One variable rebrands the entire system.",
    lessons: [
      { title: "Theming: light, dark, and system", href: "/docs/theming" },
      { title: "Customization and overrides", href: "/docs/customization" },
      { title: "The token reference", href: "/tokens" },
      { title: "Experiment in the theme editor", href: "/theme" },
      { title: "Brand and logos", href: "/brand" },
    ],
  },
  {
    slug: "dashboard-from-blocks",
    title: "Building a dashboard from blocks",
    description:
      "Assemble a working back office from the dashboard-shell and settings-layout blocks, then fill it with data using DataTable.",
    lessons: [
      { title: "What blocks are", href: "/blocks" },
      { title: "The dashboard shell", href: "/blocks/dashboard-shell" },
      { title: "The settings layout", href: "/blocks/settings-layout" },
      { title: "Rendering records with DataTable", href: "/components/data-table" },
      { title: "Navigation with Sidebar", href: "/components/sidebar" },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility with Qeetrix",
    description:
      "Understand the a11y guarantees you inherit from @qeetrix/ui and the ones you still own — backed by a public conformance trail.",
    lessons: [
      { title: "Accessibility overview", href: "/accessibility" },
      { title: "Our accessibility statement", href: "/accessibility/statement" },
      { title: "Read the VPAT", href: "/accessibility/vpat" },
      { title: "Component conformance scorecard", href: "/accessibility/scorecard" },
    ],
  },
  {
    slug: "for-ai-agents",
    title: "Qeetrix for AI agents",
    description:
      "Give coding agents structured access to the system through the MCP server and component registry, then let them build in the playground.",
    lessons: [
      { title: "The Qeetrix MCP server", href: "/develop/mcp" },
      { title: "The component registry", href: "/develop/registry" },
      { title: "Prototype in the playground", href: "/play" },
      { title: "Component reference for agents", href: "/components" },
    ],
  },
];

export const getTrack = (slug: string) => TRACKS.find((t) => t.slug === slug);
