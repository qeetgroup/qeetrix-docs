import {
  ArrowDownIcon,
  ArrowRightIcon,
  type IconProps,
  Layers2Icon,
  PaletteIcon,
  RulerIcon,
  SparklesIcon,
  SquareRoundCornerIcon,
  TypeIcon,
} from "@qeetrix/icons";
import { Button } from "@qeetrix/ui";
import tokens from "@qeetrix/ui/tokens.json";
import Link from "next/link";
import { type ComponentType, Fragment, type ReactNode } from "react";
import { links } from "@/lib/site-links";
import { container, SectionHeader } from "./section";
import { TokenThemeScope } from "./token-theme-scope";

/**
 * Section 5: primitive → semantic → component, with real token names and values.
 *
 * Values come from `@qeetrix/ui/tokens.json` (resolved per theme). The semantic → primitive arrows
 * are derived from it too: a semantic token's reference is the primitive whose resolved value it
 * equals, in that theme — so the diagram cannot drift from what the library ships. The semantic
 * and component swatches paint with the live CSS variables, which the local theme switch
 * re-resolves; primitives are not published as variables, so they paint with their values.
 */

type Tree = { [key: string]: string | Tree };
const themes = tokens as unknown as { light: Tree; dark: Tree };

function at(tree: Tree, path: string): string {
  return path
    .split(".")
    .reduce<Tree | string>(
      (node, key) => (typeof node === "string" ? node : node[key]),
      tree,
    ) as string;
}

const RAMPS = ["qeet", "graphite"] as const;

/** The primitive a resolved value comes from, as `color.<ramp>.<step>`. */
function primitiveFor(theme: Tree, value: string): string | null {
  const color = theme.color as Tree;
  for (const ramp of RAMPS) {
    for (const [step, candidate] of Object.entries(color[ramp] as Tree)) {
      if (candidate === value) return `color.${ramp}.${step}`;
    }
  }
  return null;
}

/** The ramp, sampled from the brand orange through to the neutral ink. */
const primitiveSwatches = [
  "color.qeet.600",
  "color.qeet.400",
  "color.qeet.150",
  "color.graphite.100",
  "color.graphite.400",
  "color.graphite.900",
].map((path) => ({ path, value: at(themes.light, path) }));
const primitiveExample = primitiveSwatches[0];

/** Roles, each painted through its runtime variable. */
const semanticSwatches = [
  "action.primary",
  "action.primary-hover",
  "surface.brand-subtle",
  "surface.sunken",
  "border.strong",
  "text.primary",
].map((role) => `--qx-color-${role.replace(".", "-")}`);
const semanticExample = {
  path: "color.action.primary",
  variable: "--qx-color-action-primary",
  light: primitiveFor(themes.light, at(themes.light, "color.action.primary")),
  dark: primitiveFor(themes.dark, at(themes.dark, "color.action.primary")),
};

const componentTokens = [
  {
    path: "component.button.primary.background",
    reads: "--qx-color-action-primary",
  },
  {
    path: "component.button.primary.foreground",
    reads: "--qx-color-text-on-brand",
  },
  {
    path: "component.button.primary.background-hover",
    reads: "--qx-color-action-primary-hover",
  },
];

const foundations: {
  label: string;
  href: string;
  icon: ComponentType<IconProps<"outline">>;
}[] = [
  { label: "Colour", href: links.colors, icon: PaletteIcon },
  { label: "Typography", href: links.typography, icon: TypeIcon },
  { label: "Spacing", href: links.spacing, icon: RulerIcon },
  {
    label: "Corners",
    href: `${links.theming}#corners`,
    icon: SquareRoundCornerIcon,
  },
  { label: "Elevation", href: links.elevation, icon: Layers2Icon },
  { label: "Motion", href: links.motion, icon: SparklesIcon },
];

function Stage({
  step,
  title,
  description,
  children,
}: {
  step: number;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <li className="flex min-w-0 flex-col gap-4 rounded-xl border border-border-subtle bg-card p-5 transition-colors duration-normal">
      <div className="flex items-start gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-caption font-semibold text-foreground">
          {step}
        </span>
        <div>
          <h3 className="text-body font-semibold text-foreground">{title}</h3>
          <p className="text-caption text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </li>
  );
}

function Arrow() {
  return (
    <li
      aria-hidden
      className="flex items-center justify-center text-muted-foreground"
    >
      <ArrowRightIcon className="hidden size-4 lg:block rtl:rotate-180" />
      <ArrowDownIcon className="size-4 lg:hidden" />
    </li>
  );
}

function Swatch({ background }: { background: string }) {
  return (
    <span
      className="h-8 min-w-0 flex-1 rounded-md border border-border-subtle transition-colors duration-normal"
      style={{ background }}
    />
  );
}

/** A token path that wraps only at its dots, never mid-segment. */
function TokenName({ children }: { children: string }) {
  const segments = children.split(".");
  return (
    <code className="font-mono text-caption text-foreground">
      {segments.map((segment, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: segments repeat (`qeet.600.600`) and never reorder
        <Fragment key={index}>
          {segment}
          {index < segments.length - 1 && (
            <>
              .<wbr />
            </>
          )}
        </Fragment>
      ))}
    </code>
  );
}

function Detail({ children }: { children: ReactNode }) {
  return (
    <span className="block font-mono text-micro wrap-break-word text-muted-foreground">
      {children}
    </span>
  );
}

export function TokenArchitecture() {
  return (
    <section
      aria-labelledby="tokens-title"
      className={`${container} flex flex-col py-14`}
    >
      <TokenThemeScope
        header={
          <SectionHeader
            id="tokens-title"
            eyebrow="Foundations, connected"
            title="A token architecture that scales."
            description="From primitive values to component-level tokens, Qeetrix keeps design and code in sync."
          />
        }
        aside={
          <nav aria-label="Foundations" className="lg:pt-2">
            <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1">
              {foundations.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-label text-muted-foreground transition-colors duration-fast hover:bg-surface-interactive hover:text-foreground focus-visible:focus-ring"
                  >
                    <Icon aria-hidden className="size-4 shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        }
      >
        <ol className="grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1.3fr]">
          <Stage
            step={1}
            title="Primitive tokens"
            description="Core, brand-agnostic values."
          >
            <div aria-hidden className="flex gap-2">
              {primitiveSwatches.map((swatch) => (
                <Swatch key={swatch.path} background={swatch.value} />
              ))}
            </div>
            <div>
              <TokenName>{primitiveExample.path}</TokenName>
              <Detail>{primitiveExample.value}</Detail>
            </div>
          </Stage>
          <Arrow />
          <Stage
            step={2}
            title="Semantic tokens"
            description="Meaningful values for design decisions."
          >
            <div aria-hidden className="flex gap-2">
              {semanticSwatches.map((variable) => (
                <Swatch key={variable} background={`var(${variable})`} />
              ))}
            </div>
            <div>
              <TokenName>{semanticExample.path}</TokenName>
              <Detail>var({semanticExample.variable})</Detail>
              <Detail>
                →{" "}
                <span className="dark:hidden">
                  {semanticExample.light ?? "a literal"}
                </span>
                <span className="hidden dark:inline">
                  {semanticExample.dark ?? "a literal"}
                </span>
              </Detail>
            </div>
          </Stage>
          <Arrow />
          <Stage
            step={3}
            title="Component tokens"
            description="Applied to components across the system."
          >
            <div aria-hidden className="flex items-center gap-2" inert>
              <Button size="sm">Button</Button>
              <span
                className="flex h-8 flex-1 items-center justify-center rounded-md text-caption font-medium transition-colors duration-normal"
                style={{
                  background: "var(--qx-component-button-primary-background)",
                  color: "var(--qx-component-button-primary-foreground)",
                }}
              >
                Button text
              </span>
              <Swatch background="var(--qx-component-button-primary-background-hover)" />
            </div>
            <ul className="flex flex-col gap-1.5">
              {componentTokens.map((token) => (
                <li key={token.path}>
                  <TokenName>{token.path}</TokenName>
                  <Detail>→ var({token.reads})</Detail>
                </li>
              ))}
            </ul>
          </Stage>
        </ol>
      </TokenThemeScope>
    </section>
  );
}
