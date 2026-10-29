// The Qeet logo files the Brand page offers: every variant of every logo in @qeetrix/icons, read
// back from the <img> each one renders, whose data URI percent-decodes to the published file byte
// for byte. pages/icons/logos serves them; the page links to them to copy or download.
import { QeetLogo, QeetWordmarkLogo } from "@qeetrix/icons";
import { logoManifest } from "@qeetrix/icons/manifest";
import { type ComponentType, createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

type AnyLogo = ComponentType<{ variant?: string }>;
const LOGOS: Record<string, AnyLogo> = { QeetLogo, QeetWordmarkLogo } as unknown as Record<
  string,
  AnyLogo
>;

export interface LogoFile {
  /** The file's name, without .svg: `qeet`, `qeet-dark`, `qeet-wordmark-plain`. */
  file: string;
  logo: string;
  variant: string;
  href: string;
}

/** Each logo's files, its default first: `<logo id>` for the default, `<logo id>-<variant>` else. */
export const LOGO_FILES: LogoFile[] = logoManifest.logos.flatMap((logo) =>
  logo.variants.map(({ name }) => {
    const file = name === logo.defaultVariant ? logo.id : `${logo.id}-${name}`;
    return { file, logo: logo.componentName, variant: name, href: `/icons/logos/${file}.svg` };
  }),
);

export const fileOf = (logo: string, variant: string) =>
  LOGO_FILES.find((entry) => entry.logo === logo && entry.variant === variant);

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&quot;": '"',
  "&#x27;": "'",
  "&lt;": "<",
  "&gt;": ">",
};

/** A logo file's SVG, as published. */
export function svgOf({ logo, variant }: LogoFile): string {
  const Logo = LOGOS[logo];
  if (!Logo) return "";
  const html = renderToStaticMarkup(createElement(Logo, { variant }));
  const src = (/\ssrc="([^"]*)"/.exec(html)?.[1] ?? "").replace(
    /&(amp|quot|#x27|lt|gt);/g,
    (entity) => ENTITIES[entity] ?? entity,
  );
  return decodeURIComponent(src.slice(src.indexOf(",") + 1));
}
