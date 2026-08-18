export type Template = {
  slug: string;
  title: string;
  description: string;
  /** Qeetrix block slugs this starter is assembled from (link to /blocks/<slug>). */
  blocks: string[];
  /** Component display names this starter leans on (link to /components/<slug>). */
  components: string[];
  stack: string;
  highlights: string[];
};

/** Derive a /components/<slug> path from a component display name. */
export const componentSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

export const TEMPLATES: Template[] = [
  {
    slug: "admin-console",
    title: "Admin console",
    description:
      "A data-driven back office: a collapsible app shell, sortable record tables, and a full settings area — everything a team needs to run operations on day one.",
    blocks: ["dashboard-shell", "settings-layout"],
    components: ["Data table", "Sidebar", "Breadcrumb", "Avatar", "Dropdown menu", "Card", "Badge"],
    stack: "Next.js 16 (App Router) · React 19 · @qeetrix/ui · Tailwind v4 · Bun",
    highlights: [
      "Responsive dashboard shell with a collapsible sidebar, header, and breadcrumb trail.",
      "Sortable, filterable record lists built on the DataTable component.",
      "A sectioned settings area wired from the settings-layout block.",
      "Light and dark out of the box, driven entirely by Qeetrix design tokens.",
    ],
  },
  {
    slug: "marketing",
    title: "Marketing site",
    description:
      "A public landing surface — hero, feature sections, and a conversion-ready pricing table — assembled from the same tokens and components as the product it sells.",
    blocks: ["pricing-table"],
    components: ["Card", "Button", "Badge", "Separator", "Navigation menu"],
    stack: "Next.js 16 (App Router) · React 19 · @qeetrix/ui · Tailwind v4 · MDX",
    highlights: [
      "A responsive pricing table with tiers, feature lists, and a highlighted plan.",
      "Hero and feature sections composed from Card, Button, and Badge.",
      "MDX-ready content sections for changelog, docs, and blog posts.",
      "One brand token re-point rebrands the entire surface.",
    ],
  },
  {
    slug: "auth-app",
    title: "Auth app",
    description:
      "Sign-in, sign-up, forgot-password, and OTP flows on a focused authentication canvas — the login surface every Qeet ID relying party needs.",
    blocks: ["auth"],
    components: ["Field", "Input", "Button", "Checkbox", "OTP input"],
    stack: "Next.js 16 (App Router) · React 19 · @qeetrix/ui · Tailwind v4",
    highlights: [
      "Centred auth shell with login, signup, forgot-password, and OTP forms.",
      "Accessible fields with inline validation and error handling.",
      "Passkey-first layout, ready to wire to a Qeet ID OIDC flow.",
      "Full keyboard and screen-reader support inherited from @qeetrix/ui.",
    ],
  },
  {
    slug: "settings-app",
    title: "Settings app",
    description:
      "A sectioned preferences area with a side rail and grouped forms — profile, security, notifications, and billing, ready to drop into any product.",
    blocks: ["settings-layout"],
    components: ["Field", "Switch", "Separator", "Tabs", "Button"],
    stack: "Next.js 16 (App Router) · React 19 · @qeetrix/ui · Tailwind v4",
    highlights: [
      "Section navigation rail with grouped, scannable setting sections.",
      "Toggle-driven preferences built on Switch and Field.",
      "Tabbed sub-sections for dense settings surfaces.",
      "Save/reset patterns that respect dirty state and validation.",
    ],
  },
  {
    slug: "onboarding-flow",
    title: "Onboarding flow",
    description:
      "A guided, multi-step first-run experience with progress and per-step validation — turn a new signup into an activated user.",
    blocks: ["onboarding-wizard"],
    components: ["Stepper", "Progress", "Field", "Button"],
    stack: "Next.js 16 (App Router) · React 19 · @qeetrix/ui · Tailwind v4",
    highlights: [
      "Multi-step wizard with a visible stepper and progress indicator.",
      "Per-step validation that blocks advancing until a step is complete.",
      "Resumable state so users can leave and return mid-flow.",
      "Accessible focus management between steps.",
    ],
  },
];

export const getTemplate = (slug: string) => TEMPLATES.find((t) => t.slug === slug);
