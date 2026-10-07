import {
  ArrowRightIcon,
  Layers2Icon,
  PaletteIcon,
  RulerIcon,
  SparklesIcon,
  SquareRoundCornerIcon,
  TypeIcon,
} from "@qeetrix/icons";
import {
  Badge,
  buttonVariants,
  Checkbox,
  Input,
  Label,
  SegmentedControl,
  SegmentedControlItem,
  Switch,
} from "@qeetrix/ui";
import tokens from "@qeetrix/ui/tokens.json";
import Link from "next/link";
import { links } from "@/lib/site-links";
import { container, SectionHeader } from "./section";
import { type TokenAccent, TokenThemeScope } from "./token-theme-scope";

const color = tokens.light.color;
const accents: TokenAccent[] = [
  {
    id: "qeet",
    label: "Qeet orange",
    path: "color.qeet.600",
    value: color.qeet[600],
    hover: color.qeet[700],
    bright: color.qeet[400],
    ramp: [
      color.qeet[100],
      color.qeet[200],
      color.qeet[400],
      color.qeet[600],
      color.qeet[700],
    ],
  },
  {
    id: "blue",
    label: "Blue",
    path: "color.info.700",
    value: color.info[700],
    hover: color.info[800],
    bright: color.info[400],
    ramp: [
      color.info[100],
      color.info[200],
      color.info[400],
      color.info[700],
      color.info[800],
    ],
  },
  {
    id: "green",
    label: "Green",
    path: "color.success.700",
    value: color.success[700],
    hover: color.success[800],
    bright: color.success[400],
    ramp: [
      color.success[100],
      color.success[200],
      color.success[400],
      color.success[700],
      color.success[800],
    ],
  },
];

const foundations = [
  { label: "Colour", href: links.colors, icon: PaletteIcon },
  { label: "Typography", href: links.typography, icon: TypeIcon },
  { label: "Spacing", href: links.spacing, icon: RulerIcon },
  { label: "Corners", href: links.theming, icon: SquareRoundCornerIcon },
  { label: "Elevation", href: links.elevation, icon: Layers2Icon },
  { label: "Motion", href: links.motion, icon: SparklesIcon },
];

export function TokenArchitecture() {
  return (
    <section
      aria-labelledby="tokens-title"
      className={`${container} flex flex-col py-16 md:py-20`}
    >
      <TokenThemeScope
        accents={accents}
        header={
          <SectionHeader
            id="tokens-title"
            eyebrow="Foundations, connected"
            title="One change. Every component."
            description="A single source of truth, from the first color decision to the last interaction."
            align="start"
          />
        }
        aside={
          <nav aria-label="Foundations">
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {foundations.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex min-h-11 items-center gap-2.5 rounded-md px-2 py-2 text-label text-muted-foreground transition-colors duration-fast hover:bg-surface-interactive hover:text-foreground focus-visible:focus-ring"
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
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand-subtle text-brand">
                <Layers2Icon aria-hidden className="size-5" />
              </span>
              <div>
                <p className="text-body font-semibold">Qeet Platform</p>
                <p className="text-caption text-muted-foreground">
                  Team workspace
                </p>
              </div>
            </div>
            <Badge>Shared</Badge>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2.5">
              <Label htmlFor="token-project">Project name</Label>
              <Input
                id="token-project"
                defaultValue="Qeet workspace"
                className="min-h-10"
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <p id="token-access-label" className="text-label font-medium">
                Access
              </p>
              <SegmentedControl
                defaultValue="team"
                aria-labelledby="token-access-label"
                className="min-h-10"
              >
                <SegmentedControlItem value="team">Team</SegmentedControlItem>
                <SegmentedControlItem value="private">
                  Private
                </SegmentedControlItem>
              </SegmentedControl>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-y border-border-subtle py-3">
            <Label className="min-h-11 justify-between font-normal">
              Team notifications
              <Switch defaultChecked />
            </Label>
            <Label className="min-h-11 gap-3 font-normal">
              <Checkbox defaultChecked />
              Weekly activity summary
            </Label>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <Link
              href={links.foundations}
              className={buttonVariants({ variant: "outline" })}
            >
              Foundations
            </Link>
            <Link href={links.theming} className={buttonVariants()}>
              View theming
              <ArrowRightIcon
                aria-hidden
                data-icon="inline-end"
                className="rtl:rotate-180"
              />
            </Link>
          </div>
        </div>
      </TokenThemeScope>
    </section>
  );
}
