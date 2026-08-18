export type Block = {
  slug: string;
  name: string;
  description: string;
  exports: string[];
  composes: string[];
  /** Whether a live preview is available (page-state is self-contained). */
  preview?: boolean;
};

export const BLOCKS: Block[] = [
  {
    slug: "auth",
    name: "Auth",
    description:
      "A centred authentication shell with ready-made login, signup, forgot-password, and OTP forms.",
    exports: ["AuthShell", "LoginForm", "SignupForm", "ForgotPasswordForm", "OtpForm"],
    composes: ["Field", "Input", "Button", "Checkbox", "OTPInput"],
  },
  {
    slug: "dashboard-shell",
    name: "Dashboard shell",
    description: "An application shell with a collapsible sidebar, header, and content area.",
    exports: ["DashboardShell"],
    composes: ["Sidebar", "Breadcrumb", "Avatar", "DropdownMenu"],
  },
  {
    slug: "onboarding-wizard",
    name: "Onboarding wizard",
    description: "A multi-step onboarding flow with progress and per-step validation.",
    exports: ["OnboardingWizard"],
    composes: ["Steps", "Progress", "Button", "Field"],
  },
  {
    slug: "page-state",
    name: "Page state",
    description:
      "Full-page states — 404 Not Found, 500 Server Error, and Maintenance — with sensible defaults.",
    exports: ["PageState", "NotFound", "ServerError", "Maintenance"],
    composes: ["Button", "Empty"],
    preview: true,
  },
  {
    slug: "pricing-table",
    name: "Pricing table",
    description: "A responsive pricing table with tiers, feature lists, and a highlighted plan.",
    exports: ["PricingTable", "PricingTier"],
    composes: ["Card", "Badge", "Button", "Separator"],
  },
  {
    slug: "settings-layout",
    name: "Settings layout",
    description: "A settings page layout with a section nav and grouped setting sections.",
    exports: ["SettingsLayout", "SettingsSection"],
    composes: ["Sidebar", "Field", "Switch", "Separator"],
  },
];

export const getBlock = (slug: string) => BLOCKS.find((b) => b.slug === slug);
