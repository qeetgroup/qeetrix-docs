// Icons: the set, its sizes and shapes, filled when selected, icons in components, the common icons
// and right to left. Ported from qeetrix-story (stories/foundations/iconography.stories.tsx) and
// extended; each story is a section. Rendered to HTML (server only: it reads every icon).

import type { IconProps } from "@qeetrix/icons";
import * as Icons from "@qeetrix/icons";
import { ArrowRightIcon } from "@qeetrix/icons/icons/arrow-right";
import { BellIcon } from "@qeetrix/icons/icons/bell";
import { CheckIcon } from "@qeetrix/icons/icons/check";
import { ChevronDownIcon } from "@qeetrix/icons/icons/chevron-down";
import { CircleAlertIcon } from "@qeetrix/icons/icons/circle-alert";
import { CircleCheckIcon } from "@qeetrix/icons/icons/circle-check";
import { CircleXIcon } from "@qeetrix/icons/icons/circle-x";
import { CopyIcon } from "@qeetrix/icons/icons/copy";
import { DownloadIcon } from "@qeetrix/icons/icons/download";
import { EllipsisIcon } from "@qeetrix/icons/icons/ellipsis";
import { FunnelIcon } from "@qeetrix/icons/icons/funnel";
import { HouseIcon } from "@qeetrix/icons/icons/house";
import { InfoIcon } from "@qeetrix/icons/icons/info";
import { KeyRoundIcon } from "@qeetrix/icons/icons/key-round";
import { LayoutDashboardIcon } from "@qeetrix/icons/icons/layout-dashboard";
import { LockIcon } from "@qeetrix/icons/icons/lock";
import { LogOutIcon } from "@qeetrix/icons/icons/log-out";
import { MailIcon } from "@qeetrix/icons/icons/mail";
import { PencilIcon } from "@qeetrix/icons/icons/pencil";
import { PlusIcon } from "@qeetrix/icons/icons/plus";
import { ScanFaceIcon } from "@qeetrix/icons/icons/scan-face";
import { SearchIcon } from "@qeetrix/icons/icons/search";
import { SendIcon } from "@qeetrix/icons/icons/send";
import { SettingsIcon } from "@qeetrix/icons/icons/settings";
import { ShieldCheckIcon } from "@qeetrix/icons/icons/shield-check";
import { StarIcon } from "@qeetrix/icons/icons/star";
import { TrashIcon } from "@qeetrix/icons/icons/trash";
import { TriangleAlertIcon } from "@qeetrix/icons/icons/triangle-alert";
import { UserIcon } from "@qeetrix/icons/icons/user";
import { UsersIcon } from "@qeetrix/icons/icons/users";
import { iconManifest, logoManifest } from "@qeetrix/icons/manifest";
import {
  Badge,
  Button,
  IconButton,
  Input,
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
  Select,
  Tab,
  Tabs,
  TabsList,
  Toggle,
  ToggleGroup,
} from "@qeetrix/react";
import { ICON_SIZE, ICON_STROKE } from "@qeetrix/tokens";
import type { ComponentType, CSSProperties, ReactNode } from "react";

import {
  CopyToken,
  Group,
  type Section,
  Specimen,
  SpecimenRow,
  SpecimenRows,
} from "../foundations/kit";

type Outline = ComponentType<IconProps<"outline">>;
type Fillable = ComponentType<IconProps<"outline" | "filled">>;

/** The drawing grid, in units: every icon's viewBox is 24 × 24. */
const GRID = 24;

const SIZES = (Object.entries(ICON_SIZE) as Array<[keyof typeof ICON_SIZE, number]>).sort(
  (a, b) => a[1] - b[1],
);
const STROKES = (Object.entries(ICON_STROKE) as Array<[keyof typeof ICON_STROKE, number]>).sort(
  (a, b) => b[1] - a[1],
);

/**
 * An icon magnified on a pixel grid: the box is the size token times four, one square per pixel,
 * so the box and the stroke can be counted.
 */
function PixelGrid({ box, children }: { box: string; children: ReactNode }) {
  return (
    <span className="qf-ico-grid" style={{ "--qx-ico-box": box } as CSSProperties}>
      {children}
    </span>
  );
}

/** The same five icons in every row, so only the size or the stroke changes. */
const STRIP: Array<{ Icon: Outline; id: string }> = [
  { Icon: SettingsIcon, id: "settings" },
  { Icon: SearchIcon, id: "search" },
  { Icon: BellIcon, id: "bell" },
  { Icon: UsersIcon, id: "users" },
  { Icon: ShieldCheckIcon, id: "shield-check" },
];

/** One size or stroke: magnified on its grid, then the strip at actual size. */
function ScaleSample({ box, stroke }: { box: string; stroke?: string }) {
  const style = stroke ? { strokeWidth: stroke } : undefined;
  return (
    <div className="qf-ico-sample" aria-hidden="true">
      <span className="qf-ico-zoom">
        <PixelGrid box={box}>
          <SettingsIcon shape="sharp" size="100%" style={style} />
        </PixelGrid>
      </span>
      <span className="qf-ico-strip">
        {STRIP.map(({ Icon, id }) => (
          <Icon key={id} shape="sharp" size={box} style={style} />
        ))}
      </span>
    </div>
  );
}

/** The stroke a box draws: the regular stroke is in grid units, so it scales with the box. */
const renderedStroke = (px: number) => Number(((ICON_STROKE.regular * px) / GRID).toFixed(2));

/* ── Size and stroke ──────────────────────────────────────────────────────── */

const Sizes: Section = {
  id: "sizes",
  name: "Size and stroke",
  parameters: {
    docs: {
      description: {
        story:
          "Four box sizes and two stroke weights, magnified on the pixel grid, then actual size.",
      },
    },
  },
  render: () => (
    <Specimen>
      <Group label="Sizes" aside="Magnified 4×: one square is one pixel">
        <SpecimenRows>
          {SIZES.map(([name, px]) => (
            <SpecimenRow
              key={name}
              token={`--qx-size-icon-${name}`}
              meta={
                <>
                  {px}px · ICON_SIZE.{name}
                  <span className="qf-ico-meta-line">stroke {renderedStroke(px)}px</span>
                </>
              }
            >
              <ScaleSample box={`var(--qx-size-icon-${name})`} />
            </SpecimenRow>
          ))}
        </SpecimenRows>
      </Group>
      <Group label="Stroke" aside="In grid units, so a stroke scales with its box">
        <SpecimenRows>
          {STROKES.map(([name, width]) => (
            <SpecimenRow
              key={name}
              token={`--qx-icon-stroke-${name}`}
              meta={`${width} · ICON_STROKE.${name}`}
            >
              <ScaleSample box="var(--qx-size-icon-lg)" stroke={`var(--qx-icon-stroke-${name})`} />
            </SpecimenRow>
          ))}
        </SpecimenRows>
      </Group>
    </Specimen>
  ),
};

/* ── Shapes ───────────────────────────────────────────────────────────────── */

/** Icons with a filled drawing, so every shape and variant exists. */
const SPECIMENS: Array<{ Icon: Fillable; id: string }> = [
  { Icon: StarIcon, id: "star" },
  { Icon: BellIcon, id: "bell" },
  { Icon: ShieldCheckIcon, id: "shield-check" },
  { Icon: KeyRoundIcon, id: "key-round" },
  { Icon: UsersIcon, id: "users" },
  { Icon: HouseIcon, id: "house" },
];

type Shape = "round" | "sharp";
type Variant = "outline" | "filled";

/** One drawing style: a magnified icon and the specimen set, captioned with its prop. */
function Plate({
  title,
  prop,
  note,
  Detail,
  shape,
  variant,
}: {
  title: string;
  prop: string;
  note: string;
  Detail: Fillable;
  shape: Shape;
  variant: Variant;
}) {
  return (
    <figure className="qf-ico-plate">
      <div className="qf-ico-plate-stage" aria-hidden="true">
        <PixelGrid box="var(--qx-size-icon-lg)">
          <Detail shape={shape} variant={variant} size="100%" />
        </PixelGrid>
        <span className="qf-ico-plate-set">
          {SPECIMENS.map(({ Icon, id }) => (
            <Icon key={id} shape={shape} variant={variant} size="var(--qx-size-icon-lg)" />
          ))}
        </span>
      </div>
      <figcaption className="qf-ico-plate-caption">
        <span className="qf-ico-plate-head">
          <span className="qf-ico-plate-title">{title}</span>
          <CopyToken value={prop} />
        </span>
        <span className="qf-ico-plate-note">{note}</span>
      </figcaption>
    </figure>
  );
}

const Shapes: Section = {
  id: "shapes",
  name: "Shapes",
  parameters: {
    docs: {
      description: {
        story:
          "Every icon has both shapes. Components draw sharp; a filled drawing marks selection.",
      },
    },
  },
  render: () => (
    <Specimen>
      <Group label="Shape">
        <div className="qf-ico-plates">
          <Plate
            title="Round"
            prop='shape="round"'
            note="Lucide's round caps and joins. The default."
            Detail={KeyRoundIcon}
            shape="round"
            variant="outline"
          />
          <Plate
            title="Sharp"
            prop='shape="sharp"'
            note="Square caps, mitered joins, squared corners. What every component draws."
            Detail={KeyRoundIcon}
            shape="sharp"
            variant="outline"
          />
        </div>
      </Group>
      <Group label="Variant">
        <div className="qf-ico-plates">
          <Plate
            title="Outline"
            prop='variant="outline"'
            note="Every icon has one. The default."
            Detail={BellIcon}
            shape="sharp"
            variant="outline"
          />
          <Plate
            title="Filled"
            prop='variant="filled"'
            note="Only where a solid form means something: a selected tab, a pressed toggle."
            Detail={BellIcon}
            shape="sharp"
            variant="filled"
          />
        </div>
      </Group>
    </Specimen>
  ),
};

/* ── In components ────────────────────────────────────────────────────────── */

/**
 * A live component and the icon size it draws, read from the rendered `<svg>` rather than
 * written down, so the label can't drift from the library.
 */
/** Pixel size → size token, for icon-sizes.ts to name what it reads. */
const SIZE_NAMES = JSON.stringify(Object.fromEntries(SIZES.map(([token, px]) => [px, token])));

function Demo({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="qf-ico-demo">
      <div className="qf-ico-demo-stage">{children}</div>
      <div className="qf-ico-demo-meta">
        <span className="qf-ico-demo-name">{name}</span>
        {/* Read from the rendered <svg> in the browser (icon-sizes.ts), so it can't drift. */}
        <code className="qf-ico-demo-size" data-qf-icon-size={SIZE_NAMES} />
      </div>
    </div>
  );
}

const InComponents: Section = {
  id: "in-components",
  name: "In components",
  parameters: {
    docs: {
      description: {
        story:
          "Components size the icon for you: 16px in a control, 20px in a large one. Read live.",
      },
    },
  },
  render: () => (
    <Specimen>
      <div className="qf-ico-demos">
        <Demo name="Button">
          <Button icon={PlusIcon}>Invite users</Button>
        </Demo>
        <Demo name="Button, large">
          <Button size="lg" variant="soft" icon={KeyRoundIcon}>
            Rotate keys
          </Button>
        </Demo>
        <Demo name="IconButton">
          <IconButton icon={SettingsIcon} aria-label="Organisation settings" variant="soft" />
        </Demo>
        <Demo name="Input">
          <span className="qf-ico-demo-fill">
            <Input icon={SearchIcon} aria-label="Search users" placeholder="Search users" />
          </span>
        </Demo>
        <Demo name="Select">
          <span className="qf-ico-demo-fill">
            <Select
              aria-label="Role"
              items={[
                { value: "admin", label: "Admin" },
                { value: "member", label: "Member" },
              ]}
              defaultValue="member"
            />
          </span>
        </Demo>
        <Demo name="Menu">
          <Menu>
            <MenuTrigger
              render={
                <Button variant="soft" icon={ChevronDownIcon}>
                  Actions
                </Button>
              }
            />
            <MenuContent>
              <MenuItem icon={PencilIcon}>Rename</MenuItem>
              <MenuItem icon={CopyIcon}>Duplicate</MenuItem>
              <MenuSeparator />
              <MenuItem icon={TrashIcon} tone="danger">
                Delete
              </MenuItem>
            </MenuContent>
          </Menu>
        </Demo>
        <Demo name="Tabs">
          <Tabs defaultValue="overview">
            <TabsList>
              <Tab value="overview" icon={HouseIcon}>
                Home
              </Tab>
              <Tab value="users" icon={UsersIcon}>
                Users
              </Tab>
            </TabsList>
          </Tabs>
        </Demo>
        <Demo name="Toggle">
          <Toggle icon={StarIcon} filledWhenPressed defaultPressed aria-label="Favourite" />
          <Toggle icon={BellIcon} filledWhenPressed aria-label="Notifications" />
        </Demo>
        <Demo name="Badge">
          <Badge tone="success" icon={CircleCheckIcon}>
            Verified
          </Badge>
        </Demo>
      </div>
    </Specimen>
  ),
};

/* ── Common icons ─────────────────────────────────────────────────────────── */

type Tone = "info" | "success" | "warning" | "danger";

interface Glyph {
  Icon: Outline;
  id: string;
  /** Status icons paint their tone's icon colour, the way Toast draws them. */
  tone?: Tone;
}

const COMMON: Array<{ label: string; aside?: string; icons: Glyph[] }> = [
  {
    label: "Actions",
    icons: [
      { Icon: PlusIcon, id: "plus" },
      { Icon: PencilIcon, id: "pencil" },
      { Icon: CopyIcon, id: "copy" },
      { Icon: TrashIcon, id: "trash" },
      { Icon: DownloadIcon, id: "download" },
      { Icon: SearchIcon, id: "search" },
      { Icon: FunnelIcon, id: "funnel" },
      { Icon: EllipsisIcon, id: "ellipsis" },
    ],
  },
  {
    label: "Status",
    aside: "The tone icons Toast draws",
    icons: [
      { Icon: InfoIcon, id: "info", tone: "info" },
      { Icon: CircleCheckIcon, id: "circle-check", tone: "success" },
      { Icon: TriangleAlertIcon, id: "triangle-alert", tone: "warning" },
      { Icon: CircleAlertIcon, id: "circle-alert", tone: "danger" },
    ],
  },
  {
    label: "Identity and access",
    icons: [
      { Icon: UserIcon, id: "user" },
      { Icon: UsersIcon, id: "users" },
      { Icon: KeyRoundIcon, id: "key-round" },
      { Icon: LockIcon, id: "lock" },
      { Icon: ShieldCheckIcon, id: "shield-check" },
      { Icon: ScanFaceIcon, id: "scan-face" },
      { Icon: MailIcon, id: "mail" },
      { Icon: LogOutIcon, id: "log-out" },
    ],
  },
  {
    label: "Navigation",
    icons: [
      { Icon: HouseIcon, id: "house" },
      { Icon: LayoutDashboardIcon, id: "layout-dashboard" },
      { Icon: SettingsIcon, id: "settings" },
      { Icon: BellIcon, id: "bell" },
    ],
  },
];

/** `circle-check` → `CircleCheckIcon`: the export is the id in PascalCase plus `Icon`. */
const componentName = (id: string) =>
  `${id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")}Icon`;

/** One icon: click the tile to copy its import statement (copy.ts). */
function GlyphTile({ Icon, id, tone }: Glyph) {
  const name = componentName(id);
  const statement = `import { ${name} } from "@qeetrix/icons";`;
  return (
    <div className="qf-ico-tile">
      <span
        className="qf-ico-tile-well"
        style={tone ? { color: `var(--qx-color-icon-${tone})` } : undefined}
      >
        <Icon shape="sharp" size="var(--qx-size-icon-lg)" />
      </span>
      <span className="qf-ico-tile-meta">
        <span className="qf-ico-tile-name">
          <span className="qf-ico-tile-label">{name}</span>
          <span className="qf-ico-tile-copied">
            <CheckIcon size={12} aria-hidden /> Copied
          </span>
        </span>
        <code className="qf-ico-tile-id">{id}</code>
      </span>
      {/* Stretched over the whole tile, so the tile is one target. */}
      <button
        type="button"
        className="qf-ico-tile-hit"
        data-copy-value={statement}
        title={statement}
        aria-label={`Copy the import for ${name}`}
      />
    </div>
  );
}

const CommonIcons: Section = {
  id: "common-icons",
  name: "Common icons",
  parameters: {
    docs: {
      description: {
        story: "The icons consoles reach for most. Click one to copy its import.",
      },
    },
  },
  render: () => (
    <Specimen>
      {COMMON.map(({ label, aside, icons }) => (
        <Group key={label} label={label} aside={aside}>
          <div className="qf-ico-tiles">
            {icons.map((glyph) => (
              <GlyphTile key={glyph.id} {...glyph} />
            ))}
          </div>
        </Group>
      ))}
    </Specimen>
  ),
};

/* ── The set ──────────────────────────────────────────────────────────────── */

type AnyIcon = ComponentType<IconProps<"outline" | "filled">>;
const ALL = Icons as unknown as Record<string, AnyIcon | undefined>;
const MANIFEST = iconManifest.icons;
const byId = new Map(MANIFEST.map((icon) => [icon.id, icon]));
const iconOf = (id: string) => ALL[byId.get(id)?.componentName ?? ""];

/** A wall of the icons consoles use, across the set's categories; any missing from a release drop out. */
const WALL = [
  "house",
  "layout-dashboard",
  "users",
  "user",
  "settings",
  "bell",
  "search",
  "mail",
  "calendar",
  "clock",
  "folder",
  "file-text",
  "shield-check",
  "key-round",
  "lock",
  "scan-face",
  "credit-card",
  "wallet",
  "receipt",
  "chart-column",
  "chart-pie",
  "trending-up",
  "globe",
  "map-pin",
  "phone",
  "message-square",
  "send",
  "download",
  "upload",
  "copy",
  "trash",
  "pencil",
  "plus",
  "x",
  "check",
  "circle-check",
  "circle-alert",
  "info",
  "triangle-alert",
  "star",
  "heart",
  "bookmark",
  "tag",
  "funnel",
  "sliders-horizontal",
  "list",
  "table",
  "history",
  "refresh-cw",
  "log-out",
  "external-link",
  "link",
  "image",
  "camera",
  "mic",
  "video",
  "cloud",
  "database",
  "server",
  "code",
  "terminal",
  "git-branch",
  "package",
  "truck",
  "shopping-cart",
  "store",
  "building-2",
  "briefcase",
  "languages",
  "bot",
  "sparkles",
  "zap",
].filter((id) => iconOf(id));

/** The largest categories, with how many icons each holds. */
const CATEGORIES = Object.entries(
  MANIFEST.reduce<Record<string, number>>((count, icon) => {
    for (const category of icon.categories ?? []) count[category] = (count[category] ?? 0) + 1;
    return count;
  }, {}),
)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 12);

const categoryName = (id: string) =>
  (id.charAt(0).toUpperCase() + id.slice(1)).replaceAll("-", " and ");

const TheSet: Section = {
  id: "the-set",
  name: "The set",
  parameters: {
    docs: {
      description: {
        story: `${MANIFEST.length.toLocaleString("en-IN")} icons in ${new Set(MANIFEST.flatMap((icon) => icon.categories ?? [])).size} categories, every one in round and sharp.`,
      },
    },
  },
  render: () => (
    <Specimen>
      <div className="qf-toolbar qf-wall-bar">
        <span className="qf-toolbar-label">Shape</span>
        <ToggleGroup
          variant="segmented"
          size="sm"
          aria-label="Shape of the icons below"
          defaultValue={["round"]}
        >
          <Toggle value="round" data-wall-shape="round">
            Round
          </Toggle>
          <Toggle value="sharp" data-wall-shape="sharp">
            Sharp
          </Toggle>
        </ToggleGroup>
        <span className="qf-toolbar-label">Drawing</span>
        <ToggleGroup
          variant="segmented"
          size="sm"
          aria-label="Drawing of the icons below"
          defaultValue={["outline"]}
        >
          <Toggle value="outline" data-wall-drawing="outline">
            Outline
          </Toggle>
          <Toggle value="filled" data-wall-drawing="filled">
            Filled
          </Toggle>
        </ToggleGroup>
        <span className="qf-toolbar-note">Click an icon to copy its import</span>
      </div>
      <div className="qf-wall-frame">
        <div className="qf-wall" data-shape="round" data-drawing="outline" data-qf-wall>
          {WALL.map((id) => {
            const Icon = iconOf(id) as AnyIcon;
            const icon = byId.get(id);
            const name = icon?.componentName ?? id;
            const filled = icon?.variants.includes("filled");
            return (
              <button
                key={id}
                type="button"
                className="qf-wall-cell"
                data-has-filled={filled ? "" : undefined}
                data-copy-value={`import { ${name} } from "@qeetrix/icons";`}
                aria-label={`Copy the import for ${name}`}
              >
                <Icon size={24} shape="round" data-glyph="round-outline" />
                <Icon size={24} shape="sharp" data-glyph="sharp-outline" />
                {filled && (
                  <Icon size={24} shape="round" variant="filled" data-glyph="round-filled" />
                )}
                {filled && (
                  <Icon size={24} shape="sharp" variant="filled" data-glyph="sharp-filled" />
                )}
                <span className="qf-wall-name" aria-hidden="true">
                  <span className="qf-wall-label">{id}</span>
                  <span className="qf-wall-copied">Copied</span>
                </span>
              </button>
            );
          })}
        </div>
        <a className="qf-wall-cta" href="/icons/browser">
          <b>Browse all {MANIFEST.length.toLocaleString("en-IN")}</b>
          <span>Search by name, tag or category</span>
          <ArrowRightIcon size={20} aria-hidden data-qx-mirror />
        </a>
      </div>
      <ul className="qf-cats" aria-label="The largest categories">
        {CATEGORIES.map(([id, count]) => (
          <li key={id}>
            <a href={`/icons/browser#${id}`}>
              {categoryName(id)}
              <span>{count}</span>
            </a>
          </li>
        ))}
      </ul>
    </Specimen>
  ),
};

/* ── Filled when selected ─────────────────────────────────────────────────── */

const FILLED = ["star", "bell", "house", "bookmark", "heart", "folder"].filter((id) =>
  byId.get(id)?.variants.includes("filled"),
);
const FILLED_COUNT = MANIFEST.filter((icon) => icon.variants.includes("filled")).length;

const Filled: Section = {
  id: "filled",
  name: "Filled when selected",
  parameters: {
    docs: {
      description: {
        story: `Outline at rest; the filled drawing marks the selected one. ${FILLED_COUNT} icons have both.`,
      },
    },
  },
  render: () => (
    <Specimen>
      <div className="qf-filled">
        {FILLED.map((id) => {
          const Icon = iconOf(id) as AnyIcon;
          return (
            <figure key={id} className="qf-filled-pair">
              <span aria-hidden="true">
                <Icon size={24} />
                <Icon size={24} variant="filled" />
              </span>
              <figcaption>
                <code>{id}</code>
              </figcaption>
            </figure>
          );
        })}
      </div>
      <Group label="In components" aside="Tab by default · Toggle with filledWhenPressed">
        <div className="qf-filled-live" aria-hidden="true" inert>
          <Tabs defaultValue="members">
            <TabsList>
              <Tab value="members" icon={UsersIcon}>
                Members
              </Tab>
              <Tab value="settings" icon={SettingsIcon}>
                Settings
              </Tab>
            </TabsList>
          </Tabs>
          <Toggle
            icon={StarIcon}
            aria-label="Star"
            defaultPressed
            filledWhenPressed
            tooltip={false}
          />
          <Toggle icon={BellIcon} aria-label="Notify" filledWhenPressed tooltip={false} />
        </div>
      </Group>
    </Specimen>
  ),
};

/* ── Right to left ────────────────────────────────────────────────────────── */

/** The icons whose drawing points a direction, which flip in right-to-left. */
const MIRRORED = MANIFEST.filter((icon) => icon.directionality === "mirror");

const RightToLeft: Section = {
  id: "right-to-left",
  name: "Right to left",
  parameters: {
    docs: {
      description: {
        story: `${MIRRORED.length} icons point a reading direction, so they flip in right-to-left by themselves. Arrows and chevrons don't: wrap one in mirrorInRtl() where it means forward or back.`,
      },
    },
  },
  render: () => (
    <Specimen>
      <div className="qf-rtl">
        {(["ltr", "rtl"] as const).map((dir) => (
          <div key={dir} className="qf-rtl-panel" dir={dir}>
            <span className="qf-rtl-label">
              {dir === "ltr" ? "Left to right" : "Right to left"}
            </span>
            <div className="qf-rtl-icons" aria-hidden="true">
              {MIRRORED.map((icon) => {
                const Icon = ALL[icon.componentName] as AnyIcon;
                return (
                  <span key={icon.id} title={icon.id}>
                    <Icon size={20} />
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Specimen>
  ),
};

/* ── Do and don't ─────────────────────────────────────────────────────────── */

/** "Send", in Urdu: an Indian language written right to left. */
const SEND_URDU = "بھیجیں";

/** Four habits, each a pair: what to do beside what not to, drawn with the components. */
const RULES: Array<{
  title: string;
  doLine: string;
  dontLine: string;
  doIt: ReactNode;
  dontIt: ReactNode;
}> = [
  {
    title: "One shape in a place",
    doLine: "Sharp throughout, as the components draw them.",
    dontLine: "Round and sharp side by side.",
    doIt: (
      <span className="qf-rule-icons">
        <SearchIcon shape="sharp" size={28} />
        <BellIcon shape="sharp" size={28} />
        <SettingsIcon shape="sharp" size={28} />
        <StarIcon shape="sharp" size={28} />
      </span>
    ),
    dontIt: (
      <span className="qf-rule-icons">
        <SearchIcon shape="round" size={28} />
        <BellIcon shape="sharp" size={28} />
        <SettingsIcon shape="round" size={28} />
        <StarIcon shape="sharp" size={28} />
      </span>
    ),
  },
  {
    title: "Filled marks the one selected",
    doLine: "Only the current tab fills.",
    dontLine: "Every item filled: nothing reads as current.",
    doIt: (
      <Tabs defaultValue="members">
        <TabsList>
          <Tab value="members" icon={UsersIcon}>
            Members
          </Tab>
          <Tab value="settings" icon={SettingsIcon}>
            Settings
          </Tab>
        </TabsList>
      </Tabs>
    ),
    dontIt: (
      <span className="qf-rule-icons qf-rule-labels">
        <span>
          <UsersIcon size={16} variant="filled" /> Members
        </span>
        <span>
          <SettingsIcon size={16} variant="filled" /> Settings
        </span>
      </span>
    ),
  },
  {
    title: "Let the component size it",
    doLine: "Pass the icon; the button sizes it to 16px.",
    dontLine: "A 24px icon forced into a button.",
    doIt: <Button icon={PlusIcon}>Invite users</Button>,
    dontIt: (
      <Button>
        <PlusIcon size={24} /> Invite users
      </Button>
    ),
  },
  {
    title: "Mirror what points a way",
    doLine: "In Urdu the send arrow points left, the way the text reads.",
    dontLine: "Unmirrored, it points back at the text.",
    doIt: (
      <span className="qf-rule-chip" dir="rtl" lang="ur">
        <SendIcon size={16} /> {SEND_URDU}
      </span>
    ),
    dontIt: (
      <span className="qf-rule-chip" dir="rtl" lang="ur">
        {/* Its own flip turned off, to show what that would look like. */}
        <SendIcon size={16} data-qx-mirror={null} /> {SEND_URDU}
      </span>
    ),
  },
];

const Rules: Section = {
  id: "do-and-dont",
  name: "Do and don't",
  parameters: {
    docs: { description: { story: "Four habits that keep icons clear in every Qeet product." } },
  },
  render: () => (
    <Specimen>
      <div className="qf-rules">
        {RULES.map((rule) => (
          <div key={rule.title} className="qf-rule">
            <b className="qf-rule-title">{rule.title}</b>
            <div className="qf-rule-pair">
              {(["do", "dont"] as const).map((kind) => (
                <figure key={kind} className="qf-rule-case" data-kind={kind}>
                  <div className="qf-rule-stage" aria-hidden="true" inert>
                    {kind === "do" ? rule.doIt : rule.dontIt}
                  </div>
                  <figcaption>
                    <span className="qf-rule-verdict">
                      {kind === "do" ? (
                        <CircleCheckIcon size={16} aria-hidden />
                      ) : (
                        <CircleXIcon size={16} aria-hidden />
                      )}
                      {kind === "do" ? "Do" : "Don't"}
                    </span>
                    <span>{kind === "do" ? rule.doLine : rule.dontLine}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Specimen>
  ),
};

/* ── Qeet logos ───────────────────────────────────────────────────────────── */

type AnyLogo = ComponentType<{ variant?: string; height?: number; alt?: string }>;
const LOGOS = logoManifest.logos;

/** What each logo file is for, by the background it's drawn on. */
const ON: Record<string, string> = { light: "On light", dark: "On dark", any: "On any surface" };

const QeetLogos: Section = {
  id: "qeet-logos",
  name: "Qeet logos",
  parameters: {
    docs: {
      description: {
        story:
          "The Qeet mark and wordmark, each file on the surface it's drawn for. They ship with @qeetrix/icons.",
      },
    },
  },
  render: () => (
    <Specimen>
      {LOGOS.map((logo) => {
        const Logo = ALL[logo.componentName] as unknown as AnyLogo;
        return (
          <Group
            key={logo.id}
            label={logo.title}
            aside={
              <CopyToken
                value={`import { ${logo.componentName} } from "@qeetrix/icons";`}
                label={logo.componentName}
              />
            }
          >
            <div className="qf-logos">
              {logo.variants.map((variant) => {
                const dark = variant.background === "dark" || variant.name.includes("dark");
                return (
                  <figure
                    key={variant.name}
                    className="qf-logo"
                    data-qx-color-scheme={dark ? "dark" : "light"}
                  >
                    <div className="qf-logo-stage">
                      <Logo variant={variant.name} height={logo.id === "qeet" ? 40 : 28} alt="" />
                    </div>
                    <figcaption>
                      <code>
                        {variant.name === logo.defaultVariant
                          ? "default"
                          : `variant="${variant.name}"`}
                      </code>
                      <span>{ON[variant.background] ?? variant.background}</span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </Group>
        );
      })}
      <p className="qf-logo-colour">
        <span
          className="qf-logo-swatch"
          style={{ background: `#${LOGOS[0]?.hex}` }}
          aria-hidden="true"
        />
        <span>
          Qeet orange <code>#{LOGOS[0]?.hex}</code>, the logo's own colour.
        </span>
        <a href="/icons/brand">
          Brand guidelines
          <ArrowRightIcon size={16} aria-hidden data-qx-mirror />
        </a>
      </p>
    </Specimen>
  ),
};

export const sections: Section[] = [
  TheSet,
  Sizes,
  Shapes,
  Filled,
  InComponents,
  CommonIcons,
  RightToLeft,
  Rules,
  QeetLogos,
];
