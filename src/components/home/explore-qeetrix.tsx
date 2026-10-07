import {
  ArrowRightIcon,
  BookOpenIcon,
  BoxIcon,
  FileTextIcon,
  type IconProps,
  LayersIcon,
  WorkflowIcon,
} from "@qeetrix/icons";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  Badge,
  Button,
  Input,
  Label,
  SegmentedControl,
  SegmentedControlItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@qeetrix/ui";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { library } from "@/lib/library";
import { links } from "@/lib/site-links";
import { container, SectionHeader, tone } from "./section";

function ComponentsPreview() {
  return (
    <div className="home-component-shelf relative flex min-h-72 flex-col justify-center gap-6 px-5 py-6 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <AvatarGroup>
            {["QT", "DS", "UI"].map((initials) => (
              <Avatar key={initials} size="sm">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
          <span className="text-caption font-medium text-muted-foreground">
            Qeet workspace
          </span>
        </div>
        <Badge variant="success">Active</Badge>
      </div>
      <div className="grid gap-5 sm:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="explore-workspace">Workspace</Label>
          <Input
            id="explore-workspace"
            defaultValue="Qeet Platform"
            className="min-h-10 bg-card"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="explore-access">Default access</Label>
          <Select defaultValue="member">
            <SelectTrigger
              id="explore-access"
              className="min-h-10 w-full bg-card"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Label className="min-h-11 gap-3 font-normal">
          <Switch defaultChecked />
          Notifications
        </Label>
        <SegmentedControl
          defaultValue="team"
          size="sm"
          aria-label="Workspace visibility"
        >
          <SegmentedControlItem value="team">Team</SegmentedControlItem>
          <SegmentedControlItem value="private">Private</SegmentedControlItem>
        </SegmentedControl>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-4">
        <code className="font-mono text-caption text-muted-foreground">
          @qeetrix/ui
        </code>
        <Button
          nativeButton={false}
          render={<Link href={`${links.components}/button`} />}
        >
          View Button
          <ArrowRightIcon aria-hidden data-icon="inline-end" />
        </Button>
      </div>
    </div>
  );
}

const swatches = [
  { label: "Action", role: "primary", color: "bg-primary" },
  { label: "Brand", role: "subtle", color: "bg-brand-subtle" },
  { label: "Surface", role: "sunken", color: "bg-surface-sunken" },
  { label: "Border", role: "strong", color: "bg-border-strong" },
  { label: "Text", role: "primary", color: "bg-foreground" },
];

function FoundationsPreview() {
  return (
    <Tabs defaultValue="color" className="min-h-72 gap-5 px-5 py-6 sm:px-8">
      <TabsList variant="line" aria-label="Foundation samples">
        <TabsTrigger value="color">Color</TabsTrigger>
        <TabsTrigger value="type">Type</TabsTrigger>
        <TabsTrigger value="space">Spacing</TabsTrigger>
      </TabsList>
      <TabsContent value="color" className="home-state-enter">
        <ul className="grid grid-cols-5 gap-1.5">
          {swatches.map(({ label, role, color }, index) => (
            <li
              key={label}
              className="group/swatch flex min-w-0 flex-col gap-3"
            >
              <span
                aria-hidden
                className={cn(
                  "home-palette-sample block h-24 rounded-md border border-border-subtle sm:h-28",
                  color,
                )}
                style={{ animationDelay: `${index * 45}ms` }}
              />
              <span className="flex flex-col gap-1 text-caption font-medium text-foreground">
                {label}
                <span className="font-mono text-micro font-normal text-muted-foreground">
                  {role}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </TabsContent>
      <TabsContent value="type" className="home-state-enter">
        <div className="flex min-h-40 flex-col justify-between gap-3">
          <div className="flex items-end justify-between gap-3">
            <span className="font-display text-display font-semibold">Aa</span>
            <span className="text-label text-muted-foreground">Qeet Text</span>
          </div>
          <p className="font-display text-heading font-medium text-foreground">
            A familiar voice. At every scale.
          </p>
          <code className="font-mono text-caption text-muted-foreground">
            const interface = &quot;Qeetrix&quot;;
          </code>
        </div>
      </TabsContent>
      <TabsContent value="space" className="home-state-enter">
        <ul className="grid min-h-40 grid-cols-4 items-end gap-3">
          {[2, 4, 6, 8].map((step) => (
            <li key={step} className="flex flex-col items-start gap-3">
              <span
                aria-hidden
                className="home-palette-sample block w-full rounded-t-md border-t-2 border-border-brand bg-brand-subtle"
                style={{ height: `calc(var(--spacing) * ${step} * 3)` }}
              />
              <code className="text-caption text-muted-foreground">
                {step * 4}px
              </code>
            </li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
}

type Entry = {
  icon: ComponentType<IconProps<"outline">>;
  tone: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  preview?: ReactNode;
};

const entries: Entry[] = [
  {
    icon: BoxIcon,
    tone: tone.brand,
    title: "Components",
    description: `${library.componentCount} React modules. Accessible controls, considered variants, and the freedom to compose.`,
    cta: "Browse components",
    href: links.components,
    preview: <ComponentsPreview />,
  },
  {
    icon: LayersIcon,
    tone: tone.sky,
    title: "Foundations",
    description:
      "Color, type, and space with a shared vocabulary. The same tokens in every product.",
    cta: "Explore foundations",
    href: links.foundations,
    preview: <FoundationsPreview />,
  },
  {
    icon: WorkflowIcon,
    tone: tone.violet,
    title: "Patterns",
    description: "Layouts and interactions for real product workflows.",
    cta: "View patterns",
    href: links.patterns,
  },
  {
    icon: BookOpenIcon,
    tone: tone.gold,
    title: "Guides",
    description: "From your first import to a production-ready setup.",
    cta: "Read guides",
    href: links.guides,
  },
  {
    icon: FileTextIcon,
    tone: tone.green,
    title: "Resources",
    description: "Releases, changelog, and ways to contribute.",
    cta: "View resources",
    href: links.resources,
  },
];

export function ExploreQeetrix() {
  return (
    <section
      aria-labelledby="explore-title"
      className={`${container} flex flex-col gap-8 py-16 md:py-20`}
    >
      <SectionHeader
        id="explore-title"
        eyebrow="Explore Qeetrix"
        title="Everything you need. One shared language."
        description="Start with a component. Build on the foundations. Bring the whole system into your product."
      />
      <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        {entries
          .slice(0, 2)
          .map(
            (
              { icon: Icon, tone, title, description, cta, href, preview },
              index,
            ) => (
              <article
                key={title}
                data-home-reveal
                data-home-delay={index * 70}
                className={cn(
                  "home-feature home-collection group flex min-w-0 flex-col overflow-hidden rounded-lg border border-border-subtle bg-card",
                )}
              >
                <div className="home-collection-preview border-b border-border-subtle">
                  {preview}
                </div>
                <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <Icon
                      aria-hidden
                      className={cn("mt-0.5 size-6 shrink-0", tone)}
                    />
                    <div className="flex min-w-0 flex-col gap-2">
                      <h3 className="font-heading text-heading font-semibold text-foreground">
                        {title}
                      </h3>
                      <p className="max-w-lg text-body text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={href}
                    className="group/link mt-auto flex min-h-11 items-center gap-2 self-start rounded-md text-label font-medium text-brand focus-visible:focus-ring"
                  >
                    {cta}
                    <ArrowRightIcon
                      aria-hidden
                      className="size-4 transition-transform duration-fast group-hover/link:translate-x-1 rtl:rotate-180 rtl:group-hover/link:-translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            ),
          )}
      </div>
      <ul className="grid gap-2 border-y border-border-subtle py-2 md:grid-cols-3 md:gap-6">
        {entries
          .slice(2)
          .map(({ icon: Icon, tone, title, description, href }) => (
            <li key={title} data-home-reveal>
              <Link
                href={href}
                className="group flex h-full items-start gap-4 rounded-md px-3 py-5 transition-colors duration-normal hover:bg-surface-interactive focus-visible:focus-ring"
              >
                <Icon
                  aria-hidden
                  className={cn("mt-0.5 size-5 shrink-0", tone)}
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-body font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="text-label text-muted-foreground">
                    {description}
                  </p>
                </div>
                <ArrowRightIcon
                  aria-hidden
                  className="ms-auto mt-1 size-4 shrink-0 text-muted-foreground transition-transform duration-fast group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                />
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
}
